// Shared data fetching for actualite listing pages

import { getPosts, getCategories, getCategoryBySlug, isWordPressConfigured } from '@/lib/wordpress';
import { transformPosts } from '@/lib/wordpress-utils';
import type { BlogPost } from '@/lib/wordpress-utils';
import { blogPosts as staticPosts, categories as staticCategories } from '@/lib/actualite-data';
import type { BlogPost as StaticBlogPost } from '@/lib/actualite-data';

export interface CategoryInfo {
  id: number;
  name: string;
  slug: string;
}

export interface ListingData {
  posts: BlogPost[] | StaticBlogPost[];
  categories: CategoryInfo[];
  totalPages: number;
  currentPage: number;
  currentCategory?: string;
  useWordPress: boolean;
}

export async function fetchListingData(page: number = 1, categorySlug?: string): Promise<ListingData> {
  let posts: BlogPost[] | StaticBlogPost[] = staticPosts;
  let categories: CategoryInfo[] = staticCategories.map((name, i) => ({ id: i, name, slug: name.toLowerCase().replace(/\s+/g, '-') }));
  let totalPages = 1;
  let useWordPress = false;

  if (isWordPressConfigured()) {
    try {
      // Resolve category slug to ID if provided
      let categoryId: number | undefined;
      if (categorySlug) {
        const cat = await getCategoryBySlug(categorySlug);
        if (cat) categoryId = cat.id;
      }

      const [postsData, wpCategories] = await Promise.all([
        getPosts({ page, perPage: 9, category: categoryId }),
        getCategories(),
      ]);

      posts = transformPosts(postsData.posts);
      categories = wpCategories.map(c => ({ id: c.id, name: c.name, slug: c.slug }));
      totalPages = postsData.totalPages;
      useWordPress = true;
    } catch (error) {
      console.error('Failed to fetch from WordPress, using static data:', error);
    }
  }

  return {
    posts,
    categories,
    totalPages,
    currentPage: page,
    currentCategory: categorySlug,
    useWordPress,
  };
}
