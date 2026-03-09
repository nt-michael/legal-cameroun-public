<?php
/**
 * Plugin Name: LC SEO Manager
 * Plugin URI:  https://legalcameroun.com
 * Description: Manage per-page SEO metadata for the Legal Cameroun Next.js front-end.
 * Version:     1.0.0
 * Author:      RODEC Conseils
 * License:     GPL-2.0+
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'LC_SEO_OPTION', 'lc_page_seo_configs' );

/* =========================================================
 * REST API endpoints
 * ========================================================= */

add_action( 'rest_api_init', function () {

	// GET /wp-json/lc-seo/v1/pages — public
	register_rest_route( 'lc-seo/v1', '/pages', [
		[
			'methods'             => WP_REST_Server::READABLE,
			'callback'            => 'lc_seo_get_pages',
			'permission_callback' => '__return_true',
		],
		[
			'methods'             => WP_REST_Server::CREATABLE,
			'callback'            => 'lc_seo_upsert_page',
			'permission_callback' => function () {
				return current_user_can( 'manage_options' );
			},
			'args'                => lc_seo_page_args(),
		],
	] );

	// DELETE /wp-json/lc-seo/v1/pages/{slug}
	register_rest_route( 'lc-seo/v1', '/pages/(?P<slug>[a-zA-Z0-9_\-\/]+)', [
		'methods'             => WP_REST_Server::DELETABLE,
		'callback'            => 'lc_seo_delete_page',
		'permission_callback' => function () {
			return current_user_can( 'manage_options' );
		},
	] );
} );

function lc_seo_get_pages(): WP_REST_Response {
	$configs = get_option( LC_SEO_OPTION, [] );
	return new WP_REST_Response( [ 'success' => true, 'data' => array_values( $configs ) ], 200 );
}

function lc_seo_upsert_page( WP_REST_Request $request ): WP_REST_Response {
	$configs = get_option( LC_SEO_OPTION, [] );
	$slug    = sanitize_text_field( $request->get_param( 'slug' ) );

	$entry = [
		'slug'                    => $slug,
		'name'                    => sanitize_text_field( $request->get_param( 'name' ) ?? '' ),
		'title'                   => sanitize_text_field( $request->get_param( 'title' ) ?? '' ),
		'description'             => sanitize_textarea_field( $request->get_param( 'description' ) ?? '' ),
		'keywords'                => sanitize_text_field( $request->get_param( 'keywords' ) ?? '' ),
		'canonical'               => esc_url_raw( $request->get_param( 'canonical' ) ?? '' ),
		'robots'                  => sanitize_text_field( $request->get_param( 'robots' ) ?? '' ),
		'og_title'                => sanitize_text_field( $request->get_param( 'og_title' ) ?? '' ),
		'og_description'          => sanitize_textarea_field( $request->get_param( 'og_description' ) ?? '' ),
		'og_type'                 => sanitize_text_field( $request->get_param( 'og_type' ) ?? 'website' ),
		'og_image'                => esc_url_raw( $request->get_param( 'og_image' ) ?? '' ),
		'og_image_width'          => (int) ( $request->get_param( 'og_image_width' ) ?? 0 ),
		'og_image_height'         => (int) ( $request->get_param( 'og_image_height' ) ?? 0 ),
		'og_image_alt'            => sanitize_text_field( $request->get_param( 'og_image_alt' ) ?? '' ),
		'twitter_card'            => sanitize_text_field( $request->get_param( 'twitter_card' ) ?? 'summary_large_image' ),
		'twitter_title'           => sanitize_text_field( $request->get_param( 'twitter_title' ) ?? '' ),
		'twitter_description'     => sanitize_textarea_field( $request->get_param( 'twitter_description' ) ?? '' ),
		'twitter_image'           => esc_url_raw( $request->get_param( 'twitter_image' ) ?? '' ),
		// English variants
		'title_en'                => sanitize_text_field( $request->get_param( 'title_en' ) ?? '' ),
		'description_en'          => sanitize_textarea_field( $request->get_param( 'description_en' ) ?? '' ),
		'keywords_en'             => sanitize_text_field( $request->get_param( 'keywords_en' ) ?? '' ),
		'og_title_en'             => sanitize_text_field( $request->get_param( 'og_title_en' ) ?? '' ),
		'og_description_en'       => sanitize_textarea_field( $request->get_param( 'og_description_en' ) ?? '' ),
		'og_image_alt_en'         => sanitize_text_field( $request->get_param( 'og_image_alt_en' ) ?? '' ),
		'twitter_title_en'        => sanitize_text_field( $request->get_param( 'twitter_title_en' ) ?? '' ),
		'twitter_description_en'  => sanitize_textarea_field( $request->get_param( 'twitter_description_en' ) ?? '' ),
	];

	$configs[ $slug ] = $entry;
	update_option( LC_SEO_OPTION, $configs );

	return new WP_REST_Response( [ 'success' => true, 'data' => $entry ], 200 );
}

function lc_seo_delete_page( WP_REST_Request $request ): WP_REST_Response {
	$configs = get_option( LC_SEO_OPTION, [] );
	$slug    = $request->get_param( 'slug' );

	if ( ! isset( $configs[ $slug ] ) ) {
		return new WP_REST_Response( [ 'success' => false, 'message' => 'Not found' ], 404 );
	}

	unset( $configs[ $slug ] );
	update_option( LC_SEO_OPTION, $configs );

	return new WP_REST_Response( [ 'success' => true ], 200 );
}

function lc_seo_page_args(): array {
	return [
		'slug' => [ 'required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field' ],
	];
}

/* =========================================================
 * Admin UI
 * ========================================================= */

function lc_seo_known_paths(): array {
	return [
		'/', '/a-propos', '/actualite', '/contact', '/devis',
		'/creation-entreprise', '/creation-entreprise/sarl',
		'/creation-entreprise/sarlu', '/creation-entreprise/sas',
		'/creation-entreprise/association',
		'/modification-entreprise', '/modification-entreprise/dissolution',
		'/modification-entreprise/sarl-vers-sas', '/modification-entreprise/sas-vers-sarl',
		'/modification-entreprise/transfert-siege',
		'/fiches-pratiques', '/fiches-pratiques/immatriculation-avec-atom',
		'/fiches-pratiques/presentation-societe-etablissement',
		'/fiches-pratiques/prix-des-transferts', '/fiches-pratiques/tutoriel-consultation',
		'/simulateurs', '/simulateurs/is', '/simulateurs/salaire', '/simulateurs/tva',
		'/prendre-un-rendez-vous',
		'/mentions-legales', '/politique-de-confidentialite', '/conditions-generales',
	];
}

add_action( 'admin_menu', function () {
	add_menu_page(
		'LC SEO Manager', 'LC SEO',
		'manage_options', 'lc-seo-manager',
		'lc_seo_list_page',
		'dashicons-search', 80
	);
	add_submenu_page(
		'lc-seo-manager', 'Configurations SEO', 'Toutes les configs',
		'manage_options', 'lc-seo-manager', 'lc_seo_list_page'
	);
	add_submenu_page(
		'lc-seo-manager', 'Nouvelle page SEO', 'Nouvelle page SEO',
		'manage_options', 'lc-seo-manager-new', 'lc_seo_edit_page'
	);
} );

add_action( 'admin_init', 'lc_seo_handle_admin_actions' );

function lc_seo_handle_admin_actions(): void {
	if ( ! isset( $_POST['lc_seo_action'] ) ) {
		return;
	}
	if ( ! check_admin_referer( 'lc_seo_nonce' ) ) {
		wp_die( 'Security check failed.' );
	}
	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( 'Insufficient permissions.' );
	}

	$action  = sanitize_text_field( $_POST['lc_seo_action'] );
	$configs = get_option( LC_SEO_OPTION, [] );

	if ( $action === 'save' ) {
		$slug_choice = sanitize_text_field( $_POST['slug_choice'] ?? '' );
		$slug = $slug_choice === '__other__'
			? sanitize_text_field( $_POST['slug'] ?? '' )
			: $slug_choice;

		if ( $slug ) {
			$configs[ $slug ] = [
				'slug'                    => $slug,
				'name'                    => sanitize_text_field( $_POST['name'] ?? '' ),
				'title'                   => sanitize_text_field( $_POST['title'] ?? '' ),
				'description'             => sanitize_textarea_field( $_POST['description'] ?? '' ),
				'keywords'                => sanitize_text_field( $_POST['keywords'] ?? '' ),
				'canonical'               => esc_url_raw( $_POST['canonical'] ?? '' ),
				'robots'                  => sanitize_text_field( $_POST['robots'] ?? '' ),
				'og_title'                => sanitize_text_field( $_POST['og_title'] ?? '' ),
				'og_description'          => sanitize_textarea_field( $_POST['og_description'] ?? '' ),
				'og_type'                 => sanitize_text_field( $_POST['og_type'] ?? 'website' ),
				'og_image'                => esc_url_raw( $_POST['og_image'] ?? '' ),
				'og_image_width'          => (int) ( $_POST['og_image_width'] ?? 0 ),
				'og_image_height'         => (int) ( $_POST['og_image_height'] ?? 0 ),
				'og_image_alt'            => sanitize_text_field( $_POST['og_image_alt'] ?? '' ),
				'twitter_card'            => sanitize_text_field( $_POST['twitter_card'] ?? 'summary_large_image' ),
				'twitter_title'           => sanitize_text_field( $_POST['twitter_title'] ?? '' ),
				'twitter_description'     => sanitize_textarea_field( $_POST['twitter_description'] ?? '' ),
				'twitter_image'           => esc_url_raw( $_POST['twitter_image'] ?? '' ),
				// English variants
				'title_en'                => sanitize_text_field( $_POST['title_en'] ?? '' ),
				'description_en'          => sanitize_textarea_field( $_POST['description_en'] ?? '' ),
				'keywords_en'             => sanitize_text_field( $_POST['keywords_en'] ?? '' ),
				'og_title_en'             => sanitize_text_field( $_POST['og_title_en'] ?? '' ),
				'og_description_en'       => sanitize_textarea_field( $_POST['og_description_en'] ?? '' ),
				'og_image_alt_en'         => sanitize_text_field( $_POST['og_image_alt_en'] ?? '' ),
				'twitter_title_en'        => sanitize_text_field( $_POST['twitter_title_en'] ?? '' ),
				'twitter_description_en'  => sanitize_textarea_field( $_POST['twitter_description_en'] ?? '' ),
			];
			update_option( LC_SEO_OPTION, $configs );
		}
		wp_safe_redirect( admin_url( 'admin.php?page=lc-seo-manager&saved=1' ) );
		exit;
	} elseif ( $action === 'delete' ) {
		$slug = sanitize_text_field( $_POST['delete_slug'] ?? '' );
		if ( $slug && isset( $configs[ $slug ] ) ) {
			unset( $configs[ $slug ] );
			update_option( LC_SEO_OPTION, $configs );
		}
	}
}

function lc_seo_list_page(): void {
	$configs = get_option( LC_SEO_OPTION, [] );
	?>
	<div class="wrap">
		<h1 class="wp-heading-inline">LC SEO Manager</h1>
		<a href="<?php echo esc_url( admin_url( 'admin.php?page=lc-seo-manager-new' ) ); ?>" class="page-title-action">Ajouter</a>
		<hr class="wp-header-end">

		<?php if ( isset( $_GET['saved'] ) && $_GET['saved'] === '1' ): ?>
		<div class="notice notice-success is-dismissible"><p>Configuration enregistrée.</p></div>
		<?php endif; ?>

		<?php if ( empty( $configs ) ): ?>
		<p>Aucune configuration enregistrée.</p>
		<?php else: ?>
		<table class="widefat fixed striped">
			<thead>
				<tr>
					<th>Slug</th><th>Nom</th><th>Title</th><th>og:image</th><th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<?php foreach ( $configs as $cfg ): ?>
				<tr>
					<td><?php echo esc_html( $cfg['slug'] ); ?></td>
					<td><?php echo esc_html( $cfg['name'] ); ?></td>
					<td><?php echo esc_html( $cfg['title'] ); ?></td>
					<td><?php echo $cfg['og_image'] ? '<a href="' . esc_url( $cfg['og_image'] ) . '" target="_blank">Image</a>' : '—'; ?></td>
					<td>
						<a href="<?php echo esc_url( admin_url( 'admin.php?page=lc-seo-manager-new&edit=' . urlencode( $cfg['slug'] ) ) ); ?>">Modifier</a>
						&nbsp;|&nbsp;
						<form method="post" style="display:inline;">
							<?php wp_nonce_field( 'lc_seo_nonce' ); ?>
							<input type="hidden" name="lc_seo_action" value="delete">
							<input type="hidden" name="delete_slug" value="<?php echo esc_attr( $cfg['slug'] ); ?>">
							<button type="submit" onclick="return confirm('Supprimer ?')" class="button-link-delete">Supprimer</button>
						</form>
					</td>
				</tr>
				<?php endforeach; ?>
			</tbody>
		</table>
		<?php endif; ?>
	</div>
	<?php
}

function lc_seo_edit_page(): void {
	wp_enqueue_media();

	$configs = get_option( LC_SEO_OPTION, [] );
	$edit    = null;
	if ( isset( $_GET['edit'] ) ) {
		$edit_slug = sanitize_text_field( $_GET['edit'] );
		$edit      = $configs[ $edit_slug ] ?? null;
	}

	$current_slug    = $edit['slug'] ?? '';
	$current_slug_choice = in_array( $current_slug, lc_seo_known_paths(), true )
		? $current_slug
		: ( $current_slug !== '' ? '__other__' : '' );
	?>
	<div class="wrap">
		<h1><?php echo $edit !== null ? 'Modifier : ' . esc_html( $edit['slug'] ) : 'Nouvelle page SEO'; ?></h1>

		<form method="post">
			<?php wp_nonce_field( 'lc_seo_nonce' ); ?>
			<input type="hidden" name="lc_seo_action" value="save">

			<table class="form-table">
				<tr><th>Slug (chemin Next.js)</th><td>
					<select name="slug_choice" id="slug_choice">
						<option value="">— Choisir un chemin —</option>
						<?php foreach ( lc_seo_known_paths() as $p ): ?>
						<option value="<?php echo esc_attr( $p ); ?>" <?php selected( $current_slug_choice, $p ); ?>><?php echo esc_html( $p ); ?></option>
						<?php endforeach; ?>
						<option value="__other__" <?php selected( $current_slug_choice, '__other__' ); ?>>Autre (personnalisé)</option>
					</select>
					<input type="text" name="slug" id="slug_custom"
					       value="<?php echo esc_attr( $edit['slug'] ?? '' ); ?>"
					       placeholder="/mon-chemin-personnalise"
					       style="display:none; margin-top:6px;" class="regular-text">
				</td></tr>
				<tr><th>Nom affiché</th><td>
					<input type="text" name="name" value="<?php echo esc_attr( $edit['name'] ?? '' ); ?>" class="regular-text">
				</td></tr>
				<tr><th colspan="2"><strong>Balises de base</strong></th></tr>
				<tr><th>Title</th><td>
					<input type="text" name="title" value="<?php echo esc_attr( $edit['title'] ?? '' ); ?>" class="large-text">
				</td></tr>
				<tr><th>Description</th><td>
					<textarea name="description" rows="3" class="large-text"><?php echo esc_textarea( $edit['description'] ?? '' ); ?></textarea>
				</td></tr>
				<tr><th>Keywords</th><td>
					<input type="text" name="keywords" value="<?php echo esc_attr( $edit['keywords'] ?? '' ); ?>" class="large-text">
				</td></tr>
				<tr><th>Canonical URL</th><td>
					<input type="url" name="canonical" value="<?php echo esc_attr( $edit['canonical'] ?? '' ); ?>" class="large-text">
				</td></tr>
				<tr><th>Robots</th><td>
					<input type="text" name="robots" value="<?php echo esc_attr( $edit['robots'] ?? '' ); ?>" placeholder="index,follow" class="regular-text">
				</td></tr>
				<tr><th colspan="2"><strong>Open Graph</strong></th></tr>
				<tr><th>og:title</th><td>
					<input type="text" name="og_title" value="<?php echo esc_attr( $edit['og_title'] ?? '' ); ?>" class="large-text">
				</td></tr>
				<tr><th>og:description</th><td>
					<textarea name="og_description" rows="3" class="large-text"><?php echo esc_textarea( $edit['og_description'] ?? '' ); ?></textarea>
				</td></tr>
				<tr><th>og:type</th><td>
					<input type="text" name="og_type" value="<?php echo esc_attr( $edit['og_type'] ?? 'website' ); ?>" class="regular-text">
				</td></tr>
				<tr><th>og:image URL</th><td>
					<input type="url" name="og_image" id="og_image" value="<?php echo esc_attr( $edit['og_image'] ?? '' ); ?>" class="large-text">
					<button type="button" class="button lc-media-btn" data-target="og_image"
					        data-width="og_image_width" data-height="og_image_height">
						Choisir depuis la médiathèque
					</button>
					<div id="og_image_preview" style="margin-top:6px;">
						<?php if ( $edit['og_image'] ?? '' ): ?>
						<img src="<?php echo esc_url( $edit['og_image'] ); ?>" style="max-width:200px;max-height:80px;">
						<?php endif; ?>
					</div>
				</td></tr>
				<tr><th>og:image width</th><td>
					<input type="number" name="og_image_width" id="og_image_width" value="<?php echo esc_attr( $edit['og_image_width'] ?? '' ); ?>" class="small-text">
				</td></tr>
				<tr><th>og:image height</th><td>
					<input type="number" name="og_image_height" id="og_image_height" value="<?php echo esc_attr( $edit['og_image_height'] ?? '' ); ?>" class="small-text">
				</td></tr>
				<tr><th>og:image alt</th><td>
					<input type="text" name="og_image_alt" value="<?php echo esc_attr( $edit['og_image_alt'] ?? '' ); ?>" class="regular-text">
				</td></tr>
				<tr><th colspan="2"><strong>Twitter Card</strong></th></tr>
				<tr><th>twitter:card</th><td>
					<select name="twitter_card">
						<?php foreach ( [ 'summary_large_image', 'summary', 'app', 'player' ] as $card ): ?>
						<option value="<?php echo esc_attr( $card ); ?>" <?php selected( $edit['twitter_card'] ?? 'summary_large_image', $card ); ?>><?php echo esc_html( $card ); ?></option>
						<?php endforeach; ?>
					</select>
				</td></tr>
				<tr><th>twitter:title</th><td>
					<input type="text" name="twitter_title" value="<?php echo esc_attr( $edit['twitter_title'] ?? '' ); ?>" class="large-text">
				</td></tr>
				<tr><th>twitter:description</th><td>
					<textarea name="twitter_description" rows="3" class="large-text"><?php echo esc_textarea( $edit['twitter_description'] ?? '' ); ?></textarea>
				</td></tr>
				<tr><th>twitter:image URL</th><td>
					<input type="url" name="twitter_image" id="twitter_image" value="<?php echo esc_attr( $edit['twitter_image'] ?? '' ); ?>" class="large-text">
					<button type="button" class="button lc-media-btn" data-target="twitter_image">
						Choisir depuis la médiathèque
					</button>
					<div id="twitter_image_preview" style="margin-top:6px;">
						<?php if ( $edit['twitter_image'] ?? '' ): ?>
						<img src="<?php echo esc_url( $edit['twitter_image'] ); ?>" style="max-width:200px;max-height:80px;">
						<?php endif; ?>
					</div>
				</td></tr>
				<tr><th colspan="2"><strong>English overrides</strong></th></tr>
				<tr><th>Title (EN)</th><td>
					<input type="text" name="title_en" value="<?php echo esc_attr( $edit['title_en'] ?? '' ); ?>" class="large-text">
				</td></tr>
				<tr><th>Description (EN)</th><td>
					<textarea name="description_en" rows="3" class="large-text"><?php echo esc_textarea( $edit['description_en'] ?? '' ); ?></textarea>
				</td></tr>
				<tr><th>Keywords (EN)</th><td>
					<input type="text" name="keywords_en" value="<?php echo esc_attr( $edit['keywords_en'] ?? '' ); ?>" class="large-text">
				</td></tr>
				<tr><th>og:title (EN)</th><td>
					<input type="text" name="og_title_en" value="<?php echo esc_attr( $edit['og_title_en'] ?? '' ); ?>" class="large-text">
				</td></tr>
				<tr><th>og:description (EN)</th><td>
					<textarea name="og_description_en" rows="3" class="large-text"><?php echo esc_textarea( $edit['og_description_en'] ?? '' ); ?></textarea>
				</td></tr>
				<tr><th>og:image alt (EN)</th><td>
					<input type="text" name="og_image_alt_en" value="<?php echo esc_attr( $edit['og_image_alt_en'] ?? '' ); ?>" class="regular-text">
				</td></tr>
				<tr><th>twitter:title (EN)</th><td>
					<input type="text" name="twitter_title_en" value="<?php echo esc_attr( $edit['twitter_title_en'] ?? '' ); ?>" class="large-text">
				</td></tr>
				<tr><th>twitter:description (EN)</th><td>
					<textarea name="twitter_description_en" rows="3" class="large-text"><?php echo esc_textarea( $edit['twitter_description_en'] ?? '' ); ?></textarea>
				</td></tr>
			</table>

			<?php submit_button( 'Enregistrer' ); ?>
		</form>
	</div>

	<script>
	(function() {
		// Slug dropdown toggle
		var slugChoice = document.getElementById('slug_choice');
		var slugCustom = document.getElementById('slug_custom');
		function toggleSlugCustom() {
			slugCustom.style.display = slugChoice.value === '__other__' ? 'block' : 'none';
		}
		slugChoice.addEventListener('change', toggleSlugCustom);
		toggleSlugCustom();
	})();

	jQuery(function($) {
		$('.lc-media-btn').on('click', function() {
			var btn = $(this);
			var frame = wp.media({
				title: 'Choisir une image',
				button: { text: 'Utiliser cette image' },
				multiple: false,
				library: { type: 'image' }
			});
			frame.on('select', function() {
				var a = frame.state().get('selection').first().toJSON();
				$('#' + btn.data('target')).val(a.url);
				if (btn.data('width'))  $('#' + btn.data('width')).val(a.width || '');
				if (btn.data('height')) $('#' + btn.data('height')).val(a.height || '');
				$('#' + btn.data('target') + '_preview')
					.html('<img src="' + a.url + '" style="max-width:200px;max-height:80px;margin-top:6px;">');
			});
			frame.open();
		});
	});
	</script>
	<?php
}
