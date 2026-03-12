# Blog Post Translation — Options Overview

## Context

The site has a bilingual UI (FR/EN via `LanguageContext`) but WordPress blog posts
are single-language only. When a user switches to English, UI labels translate but
post titles, excerpts, and content remain in the original language.

The goal is to serve translated blog content (titles, excerpts, body) based on
the user's active language. Three approaches are viable, each with different
tradeoffs on editorial effort, cost, and engineering scope.

---

## Current Architecture

```
LanguageContext (client-side)         → stores 'fr' | 'en' in localStorage + cookie
lib/wordpress.ts                      → fetches posts from WP REST API (no lang param)
lib/wordpress-utils.ts :: BlogPost    → single-language: title, excerpt, content (string)
components/actualite/PostContent.tsx  → renders content HTML as-is
app/actualite/[slug]/page.tsx         → SSR, no language awareness
```

**Key pattern already in use:** The existing `getAllPagesSEO()` function calls a
custom WordPress plugin endpoint (`/wp-json/lc-seo/v1/pages`) that returns
bilingual fields (`title`, `title_en`, `description`, `description_en`, etc.).
Any custom plugin approach should mirror this pattern.

---

## Option A — Polylang (Free Third-Party Plugin)

### How it works
Polylang is a WordPress plugin that creates a parallel post for each language.
An English post gets its own WordPress post entry linked to the French original.
The WP REST API exposes a `?lang=fr` / `?lang=en` query parameter.

### WordPress side
1. Install Polylang (free) on the WP admin
2. Set French as the default language, English as secondary
3. For each post, editors create an English translation directly in WordPress editor
4. REST API automatically filters by `?lang=en`

### Next.js side changes

**`lib/wordpress.ts`**
- Pass `lang` param to all post fetches:
  ```ts
  // getPosts() adds lang to searchParams
  searchParams.set('lang', language); // 'fr' | 'en'

  // getPost(slug) becomes:
  wpFetch(`/posts?slug=${slug}&lang=${language}&_embed=true`)
  ```

**`lib/wordpress-utils.ts`** — no changes (fields stay the same)

**`app/actualite/[slug]/page.tsx`** and **`app/actualite/page.tsx`**
- These are Server Components — they cannot read `LanguageContext` directly
- Language must come from cookie (already set by LanguageContext):
  ```ts
  import { cookies } from 'next/headers';
  const lang = (await cookies()).get('lang')?.value ?? 'fr';
  const post = await getPost(slug, lang);
  ```

**`lib/actualite-page-utils.ts`**
- Accept `lang` parameter, pass through to `getPosts()`

### Pros
- Free, battle-tested, 1M+ installs
- Editors use native WordPress editor — no new tools
- REST API integration works out of the box
- Clean data model: each language is a real WP post

### Cons
- Requires Polylang Pro (~$99/yr) for full REST API support; free version has
  limitations on REST filtering
- If not all posts are translated, English users see nothing for untranslated posts
  (needs fallback logic)
- Editors must manually create an EN version for every post

### Effort
- WordPress: ~1 hour setup + translation time per post
- Next.js: ~1 day (cookie-based lang reading in server components, pass lang to
  all WP fetches, add fallback logic)

---

## Option B — Custom WordPress Plugin (Recommended)

### How it works
Build a small custom WP plugin (following the existing `lc-seo` plugin pattern)
that adds bilingual meta fields to posts: `title_en`, `excerpt_en`, `content_en`.
These are exposed via the standard WP REST API as extra fields on each post object.

A single API call returns the post with both language variants. The Next.js layer
picks the right field based on user language.

### WordPress side
Plugin adds custom meta fields to the post edit screen:
- `_post_title_en` — English title
- `_post_excerpt_en` — English excerpt
- `_post_content_en` — English body (WordPress block editor or plain textarea)

These are registered with `register_post_meta()` and exposed in the REST API via
`show_in_rest: true`.

```php
// custom-post-translations/plugin.php
register_post_meta('post', '_post_title_en',   ['show_in_rest' => true, 'single' => true, 'type' => 'string']);
register_post_meta('post', '_post_excerpt_en', ['show_in_rest' => true, 'single' => true, 'type' => 'string']);
register_post_meta('post', '_post_content_en', ['show_in_rest' => true, 'single' => true, 'type' => 'string']);
```

Meta fields appear in `post.meta` in the REST response (when `?_embed=true` or
after enabling meta in REST).

### Next.js side changes

**`lib/wordpress.ts` — `WPPost` interface**
```ts
export interface WPPost {
  // ... existing fields ...
  meta?: {
    _post_title_en?: string;
    _post_excerpt_en?: string;
    _post_content_en?: string;
  };
}
```

**`lib/wordpress-utils.ts` — `transformPost()`**
```ts
export function transformPost(post: WPPost, lang: 'fr' | 'en' = 'fr'): BlogPost {
  const titleEn = post.meta?._post_title_en;
  const excerptEn = post.meta?._post_excerpt_en;
  const contentEn = post.meta?._post_content_en;

  return {
    // ... existing fields ...
    title: (lang === 'en' && titleEn) ? titleEn : post.title.rendered,
    excerpt: (lang === 'en' && excerptEn) ? excerptEn : post.excerpt.rendered,
    content: (lang === 'en' && contentEn) ? contentEn : post.content.rendered,
  };
}
```
Fallback: if EN field is empty, French content is served (graceful degradation).

**Server components — read language from cookie**
```ts
// app/actualite/[slug]/page.tsx
import { cookies } from 'next/headers';
const lang = ((await cookies()).get('lang')?.value ?? 'fr') as 'fr' | 'en';
const post = transformPost(rawPost, lang);
```

**`lib/actualite-page-utils.ts`**
- Accept `lang` param, pass to `transformPosts(posts, lang)`

### Files to modify
| File | Change |
|------|--------|
| WordPress (new plugin) | Add meta fields + REST exposure |
| `lib/wordpress.ts` | Add `meta` to `WPPost` interface |
| `lib/wordpress-utils.ts` | `transformPost(post, lang)` picks EN or FR field |
| `lib/actualite-page-utils.ts` | Accept + pass `lang` |
| `app/actualite/page.tsx` | Read `lang` cookie, pass to `fetchListingData` |
| `app/actualite/[slug]/page.tsx` | Read `lang` cookie, pass to `transformPost` |
| `app/page.tsx` | Read `lang` cookie for `getFeaturedPosts` transform |

### Pros
- Consistent with existing `lc-seo` plugin architecture
- No third-party plugin license cost
- Single API call returns both language variants (efficient)
- Graceful fallback: untranslated posts show French content
- Full control over field structure
- Editors add translations inline in WP post editor (custom meta box)

### Cons
- Requires developing and maintaining a custom WP plugin
- Translation is manual — editors must fill EN fields for every post

### Effort
- WordPress plugin: ~4–6 hours to build + deploy
- Next.js: ~4–6 hours (interface update, transform lang param, cookie reading)

---

## Option C — Machine Translation via API (DeepL / Google Translate)

### How it works
WordPress posts remain single-language (French). The Next.js layer translates
content on-demand using DeepL API (highest quality for legal/formal text) or
Google Translate. Translations are cached in Next.js fetch cache to avoid
repeated API calls.

### WordPress side
No changes required.

### Next.js side changes

**New utility: `lib/translation-api.ts`**
```ts
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;

export async function translateText(
  text: string,
  targetLang: 'EN' | 'FR'
): Promise<string> {
  const res = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: { Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}` },
    body: new URLSearchParams({ text, target_lang: targetLang }),
    next: { revalidate: 86400 }, // cache translations for 24h
  });
  const data = await res.json();
  return data.translations[0].text;
}
```

**`lib/wordpress-utils.ts`**
```ts
export async function transformPostWithTranslation(
  post: WPPost,
  lang: 'fr' | 'en'
): Promise<BlogPost> {
  if (lang === 'en') {
    const [title, excerpt, content] = await Promise.all([
      translateText(post.title.rendered, 'EN'),
      translateText(post.excerpt.rendered, 'EN'),
      translateText(post.content.rendered, 'EN'),
    ]);
    return { ...transformPost(post), title, excerpt, content };
  }
  return transformPost(post);
}
```

### Pros
- Zero editorial effort — translations are automatic
- No WordPress plugin needed
- Scales to any number of posts immediately

### Cons
- DeepL free tier: 500,000 chars/month; Pro starts at ~$6.99/month
- Legal content translation quality is better than generic but still imperfect —
  legal terminology may be mistranslated
- Translation happens at request time (or ISR time), adding latency
- HTML content (with tags) needs careful handling to avoid breaking markup
- No ability for editors to review/correct translations before users see them

### Effort
- Next.js only: ~1 day (translation utility, async transform, cookie reading)
- Ongoing: monitor API costs, review translation quality

---

## Comparison Summary

| | Polylang | Custom Plugin | Machine Translation |
|---|---|---|---|
| **Editorial effort** | High (translate every post) | High (fill EN fields) | None |
| **Translation quality** | Perfect (human) | Perfect (human) | Good, not guaranteed |
| **WordPress changes** | Install plugin + translate | Build plugin | None |
| **Next.js changes** | Medium | Medium | Medium |
| **Cost** | ~$99/yr (Pro) | Free | ~$7–50/mo API |
| **Graceful fallback** | Needs implementation | Built-in (FR fallback) | Always translates |
| **Time to first EN post** | After editor translates | After plugin built | Immediate |
| **Maintenance** | Plugin updates | Own code | API changes |

---

## Recommended Path

**Start with Option B (Custom Plugin)** because:
1. Mirrors the existing `lc-seo` custom plugin pattern already in use
2. Editors maintain quality control over legal terminology translations
3. Graceful fallback means untranslated posts silently serve French — no broken pages
4. No recurring license cost

**Optionally layer Option C on top**: Use DeepL to auto-fill the EN meta fields
as a draft when a post is published (WordPress hook), letting editors review and
correct before it's treated as "translated". This gives the best of both worlds.

---

## Verification

1. Install plugin on WP staging → confirm `meta._post_title_en` appears in REST
   response (`/wp-json/wp/v2/posts?_embed=true`)
2. Set `lang=en` cookie in browser → reload `/actualite` → confirm EN titles show
3. Leave EN fields empty on a post → confirm French content shown as fallback
4. Set `lang=fr` cookie → confirm French content shown
5. Run `npm run build` → no TypeScript errors
6. Check ISR: ensure translated content is served from cache correctly per language
