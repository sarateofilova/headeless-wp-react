<?php
/**
 * DPI Theme functions and definitions
 *
 * @package DPI
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$dpi_includes = array(
    '/theme-functions.php',                // Loads all general functions
//    '/wp-components.php',
//    '/wp-dashboard.php',                   // Clears dashboard and adds DPI styling
//    '/wp-enqueue.php',                     // Enqueue scripts and styles.
//    '/wp-editor.php',                      // Add extra editor functions. (Does not work with Gutenberg)
    '/wp-setup.php',                       // Theme setup and custom theme supports.
    '/custom-api-endpoint.php',                       // Theme setup and custom theme supports.
//    '/wp-reset.php',                       // Remove redundant WordPress functions
//    '/wp-translations.php',                // Adds Polylang translations
);

flush_rewrite_rules();
foreach ( $dpi_includes as $file ) {
    $filepath = locate_template( '_includes' . $file );
    if ( ! $filepath ) {
        trigger_error( sprintf( 'Error locating /includes%s for inclusion', $file ), E_USER_ERROR );
    }
    require_once $filepath;
}