<?php
/**
 * Theme basic setup.
 *
 * @package DPI
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

add_action('after_setup_theme', 'dpi_setup');
add_filter('excerpt_more', 'dpi_custom_excerpt_more');
add_filter('http_request_args', 'dpi_hidden_theme', 5, 2);

if (!function_exists('dpi_setup')) {
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function dpi_setup() {

		/*
         * Make theme available for translation.
         * Translations can be filed in the /languages/ directory.
         * If you're building a theme based on dpi, use a find and replace
         * to change 'dpi' to the name of your theme in all the template files
         */
		load_theme_textdomain('dpi', get_template_directory() . '/languages');


		// Add default posts and comments RSS feed links to head.
		add_theme_support('automatic-feed-links');


		/*
         * Let WordPress manage the document title.
         * By adding theme support, we declare that this theme does not use a
         * hard-coded <title> tag in the document head, and expect WordPress to
         * provide it for us.
         */
		add_theme_support('title-tag');

		// This theme uses wp_nav_menu() in X location(s).
		register_nav_menus(
			array(
				'main-menu' => 'Main Menu',
                'footer-menu' => 'Footer Menu'
			)
		);

		/*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
		add_theme_support('html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		));


		add_theme_support('post-thumbnails');


		/*
        * Move YOAST to bottom.
        *
        */
		add_filter('wpseo_metabox_prio', 'yoasttobottom');
		function yoasttobottom()
		{
			return 'low';
		}


		add_action('wp_head', 'dpi_add_favicon');
		/*
         * Adds favicons to header
         *
         *
         *
         */
		function dpi_add_favicon() { ?>
			<!-- Custom Favicons -->
			<!-- Generate favicon here: https://realfavicongenerator.net/ -->
			<!-- Put contents in /assets/files/images/favicon/ -->
			<link rel="apple-touch-icon" sizes="114x114" href="<?php echo get_template_directory_uri(); ?>/assets/files/images/favicon/apple-touch-icon.png">
			<link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri(); ?>/assets/files/images/favicon/favicon-32x32.png">
			<link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri(); ?>/assets/files/images/favicon/favicon-16x16.png">
			<link rel="manifest" href="<?php echo get_template_directory_uri(); ?>/assets/files/images/favicon/site.webmanifest">
			<link rel="mask-icon" href="<?php echo get_template_directory_uri(); ?>/assets/files/images/favicon/safari-pinned-tab.svg" color="#5bbad5">

		<?php }

        /**
         * IMAGE SIZES
         */
        /*
          Standard image sizes (already exist by default in WP)

            thumbnail -> 150 x 150
            medium -> 300 x 300
            medium_large -> 768 x 768
            large -> 1024 x 1024
         */

        //Retina Image Sizes
        add_image_size('thumbnail_retina', 300, 300, false); // thumbnail * 2
        add_image_size('medium_retina', 600, 600, false);  // medium * 2
        add_image_size('medium_large_retina', 1536, 1536, false); // medium_large * 2
        add_image_size('large_retina', 2048, 2048, false); //large * 2


        //END IMAGE SIZES

	}
}

if (!function_exists('dpi_custom_excerpt_more')) {
	/**
	 * Removes the ... from the excerpt read more link
	 *
	 * @param string $more The excerpt.
	 *
	 * @return string
	 */
	function dpi_custom_excerpt_more($more) {
		if (!is_admin()) {
			$more = '';
		}
		return $more;
	}
}

// Exclude this theme from update checks
function dpi_hidden_theme($r, $url){
	if (0 !== strpos($url, 'http://api.wordpress.org/themes/update-check')) {
		return $r;
	}

	$themes = unserialize($r['body']['themes']);
	unset(
		$themes[get_option('template')],
		$themes[get_option('stylesheet')]
	);
	$r['body']['themes'] = serialize($themes);

	return $r;
}
