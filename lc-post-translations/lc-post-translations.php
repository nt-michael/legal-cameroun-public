<?php
/**
 * Plugin Name: LC Post Translations
 * Plugin URI:  https://legalcameroun.com
 * Description: Adds English translation fields (title, excerpt, content) to WordPress posts for the Legal Cameroun bilingual front-end.
 * Version:     1.2.0
 * Author:      RODEC Conseils
 * License:     GPL-2.0+
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/* =========================================================
 * Register post meta + REST API exposure
 * ========================================================= */

add_action( 'init', function () {
	$shared = [
		'object_subtype' => 'post',
		'single'         => true,
		'type'           => 'string',
		'show_in_rest'   => true,
		'auth_callback'  => function () {
			return current_user_can( 'edit_posts' );
		},
	];

	register_post_meta( 'post', '_post_title_en',   $shared );
	register_post_meta( 'post', '_post_excerpt_en', $shared );
	register_post_meta( 'post', '_post_content_en', $shared );
} );

/* =========================================================
 * Meta box — post edit screen
 * ========================================================= */

add_action( 'add_meta_boxes', function () {
	add_meta_box(
		'lc_post_translations',
		'English Translation',
		'lc_pt_render_meta_box',
		'post',
		'normal',
		'default'
	);
} );

function lc_pt_render_meta_box( WP_Post $post ): void {
	$title   = get_post_meta( $post->ID, '_post_title_en',   true );
	$excerpt = get_post_meta( $post->ID, '_post_excerpt_en', true );
	$content = get_post_meta( $post->ID, '_post_content_en', true );

	wp_nonce_field( 'lc_pt_save_' . $post->ID, 'lc_pt_nonce' );
	wp_enqueue_editor();
	?>
	<style>
		.lc-pt-field { margin-bottom: 16px; }
		.lc-pt-field label { display: block; font-weight: 600; margin-bottom: 4px; }
		.lc-pt-field input[type="text"],
		.lc-pt-field textarea { width: 100%; box-sizing: border-box; }
		.lc-pt-field .description { color: #757575; font-size: 12px; margin-top: 4px; }
		.lc-pt-notice { background: #fff8e1; border-left: 4px solid #f0b429; padding: 8px 12px;
		                font-size: 13px; margin-bottom: 16px; border-radius: 2px; }
	</style>

	<p class="lc-pt-notice">
		Leave a field blank to display French content as fallback for English users.
	</p>

	<div class="lc-pt-field">
		<label for="lc_pt_title_en">Title (EN)</label>
		<input type="text" id="lc_pt_title_en" name="lc_pt_title_en"
		       value="<?php echo esc_attr( $title ); ?>" placeholder="English title…">
		<p class="description">Replaces the post title for English-language visitors.</p>
	</div>

	<div class="lc-pt-field">
		<label for="lc_pt_excerpt_en">Excerpt (EN)</label>
		<textarea id="lc_pt_excerpt_en" name="lc_pt_excerpt_en" rows="3"
		          placeholder="English excerpt…"><?php echo esc_textarea( $excerpt ); ?></textarea>
		<p class="description">Plain text. Shown on listing pages and social previews for English users.</p>
	</div>

	<div class="lc-pt-field">
		<label>Content (EN)</label>
		<?php
		wp_editor(
			$content,
			'lcptcontenten',
			[
				'textarea_name' => 'lc_pt_content_en',
				'media_buttons' => true,
				'textarea_rows' => 20,
				'tinymce'       => true,
				'quicktags'     => true,
			]
		);
		?>
		<p class="description">Full post body. Leave blank to show French content.</p>
	</div>
	<?php
}

/* =========================================================
 * Save meta on post save
 * ========================================================= */

add_action( 'save_post_post', function ( int $post_id ): void {
	// Nonce check
	if (
		! isset( $_POST['lc_pt_nonce'] ) ||
		! wp_verify_nonce( $_POST['lc_pt_nonce'], 'lc_pt_save_' . $post_id )
	) {
		return;
	}

	// Skip autosaves and revisions
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( wp_is_post_revision( $post_id ) ) {
		return;
	}

	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	$fields = [
		'lc_pt_title_en'   => '_post_title_en',
		'lc_pt_excerpt_en' => '_post_excerpt_en',
		'lc_pt_content_en' => '_post_content_en',
	];

	foreach ( $fields as $post_key => $meta_key ) {
		if ( ! isset( $_POST[ $post_key ] ) ) {
			continue;
		}

		$value = $meta_key === '_post_content_en'
			? wp_kses_post( $_POST[ $post_key ] )        // allow HTML in content
			: sanitize_textarea_field( $_POST[ $post_key ] ); // plain text for title/excerpt

		if ( $value === '' ) {
			delete_post_meta( $post_id, $meta_key );
		} else {
			update_post_meta( $post_id, $meta_key, $value );
		}
	}
} );

/* =========================================================
 * REST API: expose meta in default post response
 *
 * register_post_meta() with show_in_rest already exposes
 * fields under post.meta. This section ensures the fields
 * are included even when ?_embed is NOT passed and that
 * the REST schema is explicit.
 * ========================================================= */

add_filter( 'rest_prepare_post', function ( WP_REST_Response $response, WP_Post $post ): WP_REST_Response {
	$data = $response->get_data();

	// Ensure meta key is present even if empty (so the client can always
	// destructure post.meta._post_title_en without null-checking the key)
	if ( ! isset( $data['meta'] ) || ! is_array( $data['meta'] ) ) {
		$data['meta'] = [];
	}

	foreach ( [ '_post_title_en', '_post_excerpt_en', '_post_content_en' ] as $key ) {
		if ( ! array_key_exists( $key, $data['meta'] ) ) {
			$data['meta'][ $key ] = get_post_meta( $post->ID, $key, true ) ?: '';
		}
	}

	$response->set_data( $data );
	return $response;
}, 10, 2 );

/* =========================================================
 * Category translations — REST field
 *
 * register_rest_field() on 'category' injects name_en into:
 *   - GET /wp-json/wp/v2/categories          (getCategories call)
 *   - _embedded['wp:term'] on post objects   (transformPost call)
 * ========================================================= */

add_action( 'rest_api_init', function () {
	register_rest_field( 'category', 'name_en', [
		'get_callback'    => function ( array $term ): string {
			return get_term_meta( (int) $term['id'], '_term_name_en', true ) ?: '';
		},
		'update_callback' => function ( string $value, WP_Term $term ): void {
			$clean = sanitize_text_field( $value );
			if ( $clean === '' ) {
				delete_term_meta( $term->term_id, '_term_name_en' );
			} else {
				update_term_meta( $term->term_id, '_term_name_en', $clean );
			}
		},
		'schema'          => [
			'type'        => 'string',
			'description' => 'English name for this category (fallback: French name).',
			'context'     => [ 'view', 'edit' ],
		],
	] );
} );

/* =========================================================
 * Category translations — admin form fields
 * ========================================================= */

// Add field on "Add New Category" form
add_action( 'category_add_form_fields', function (): void {
	?>
	<div class="form-field">
		<label for="lc_term_name_en">Name (EN)</label>
		<input type="text" id="lc_term_name_en" name="lc_term_name_en" value="">
		<p>English name shown to English-language visitors. Leave blank to use the French name as fallback.</p>
	</div>
	<?php
} );

// Add field on "Edit Category" form
add_action( 'category_edit_form_fields', function ( WP_Term $term ): void {
	$name_en = get_term_meta( $term->term_id, '_term_name_en', true );
	?>
	<tr class="form-field">
		<th scope="row"><label for="lc_term_name_en">Name (EN)</label></th>
		<td>
			<input type="text" id="lc_term_name_en" name="lc_term_name_en"
			       value="<?php echo esc_attr( $name_en ); ?>">
			<p class="description">English name shown to English-language visitors. Leave blank to use the French name as fallback.</p>
		</td>
	</tr>
	<?php
} );

/* =========================================================
 * Category translations — save on create and edit
 * ========================================================= */

add_action( 'created_category', 'lc_pt_save_term_name_en' );
add_action( 'edited_category',  'lc_pt_save_term_name_en' );

function lc_pt_save_term_name_en( int $term_id ): void {
	if ( ! isset( $_POST['lc_term_name_en'] ) ) {
		return;
	}
	if ( ! current_user_can( 'manage_categories' ) ) {
		return;
	}

	$value = sanitize_text_field( $_POST['lc_term_name_en'] );

	if ( $value === '' ) {
		delete_term_meta( $term_id, '_term_name_en' );
	} else {
		update_term_meta( $term_id, '_term_name_en', $value );
	}
}

/* =========================================================
 * Category translations — EN column on category list screen
 * ========================================================= */

add_filter( 'manage_edit-category_columns', function ( array $columns ): array {
	$new = [];
	foreach ( $columns as $key => $label ) {
		$new[ $key ] = $label;
		if ( $key === 'name' ) {
			$new['lc_cat_en'] = 'EN';
		}
	}
	return $new;
} );

add_filter( 'manage_category_custom_column', function ( string $out, string $column, int $term_id ): string {
	if ( $column !== 'lc_cat_en' ) {
		return $out;
	}
	$name_en = get_term_meta( $term_id, '_term_name_en', true );
	if ( $name_en ) {
		return '<span style="color:#00a32a" title="' . esc_attr( $name_en ) . '">&#10003; ' . esc_html( $name_en ) . '</span>';
	}
	return '<span style="color:#ccc">—</span>';
}, 10, 3 );

/* =========================================================
 * Admin column — quick visual check (posts)
 * ========================================================= */

add_filter( 'manage_posts_columns', function ( array $columns ): array {
	// Insert after 'title'
	$new = [];
	foreach ( $columns as $key => $label ) {
		$new[ $key ] = $label;
		if ( $key === 'title' ) {
			$new['lc_pt_en'] = 'EN';
		}
	}
	return $new;
} );

add_action( 'manage_posts_custom_column', function ( string $column, int $post_id ): void {
	if ( $column !== 'lc_pt_en' ) {
		return;
	}

	$title   = get_post_meta( $post_id, '_post_title_en',   true );
	$content = get_post_meta( $post_id, '_post_content_en', true );

	if ( $title && $content ) {
		echo '<span style="color:#00a32a" title="Title + Content translated">&#10003;</span>';
	} elseif ( $title || $content ) {
		echo '<span style="color:#f0b429" title="Partial translation">&#9651;</span>';
	} else {
		echo '<span style="color:#ccc" title="Not translated">—</span>';
	}
}, 10, 2 );
