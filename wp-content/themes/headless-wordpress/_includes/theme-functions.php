<?php
/**
 * General functions
 *
 * @package DPI
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if (!class_exists('ACF')) {
    // this filter will be triggered when user saves an ACF group
    add_filter('acf/settings/save_json', 'json_save_point');
// this filter loas the json saved in above save_point
    add_filter('acf/settings/load_json', 'json_load_point');
}

function json_save_point($path) {
    $path = get_stylesheet_directory() . '/acf-json';
    return $path;
}

function json_load_point( $paths ) {
    // remove original path (optional)
    unset($paths[0]);

    // append path
    $paths[] = get_stylesheet_directory() . '/acf-json';

    // return
    return $paths;

}
// Set-up ACF-options-archive for Theme Settings
if (function_exists('acf_add_options_page') ) {
    $themeSettings = [
        'page_title' => "Theme settings",
        'menu_title' => "Theme settings",
        'menu_slug' =>  "theme_settings",
        'capability' => 'edit_pages',
        'redirect' => false
    ];
    acf_add_options_page($themeSettings);
}


function dpi_render_components($components, $type = '')
{
    $x = 0;
    foreach ($components as $item) {
        $itemName = str_replace('_', '-', $item['acf_fc_layout']);

        $component = [];
        $component['id'] = uniqid($itemName);
        $component['name'] = $itemName;
        $component['class'] = $itemName;
        $component['data'] = isset($item[$item['acf_fc_layout']][0]) ? $item[$item['acf_fc_layout']][0][$item['acf_fc_layout']] : [];
        $componentScriptPath = '/assets/js/components/' . $itemName . '.min.js';
        if (file_exists(get_template_directory() . $componentScriptPath)) {
            dpi_enqueue_component_script($itemName, $componentScriptPath);
        }

        get_template_part('components-templates/' . $itemName, false, $component);

        $x++;
    }
}

function dpi_render_single_component($item)
{
    $itemName = str_replace('_', '-', key($item[0]));
    $component = [];
    $component['id'] = uniqid($itemName);
    $component['class'] = $itemName;
    $component['data'] = get_component_data($item);

    $componentScriptPath = '/assets/js/components/' . $itemName . '.min.js';

    if (file_exists(get_template_directory() . $componentScriptPath)) {
        dpi_enqueue_component_script($itemName, $componentScriptPath);
    }

    get_template_part('components-templates/' . $itemName, false, $component);
}

function get_component_data($component)
{
    return reset($component[0]);
}

function dpi_enqueue_component_script($componentName, $componentScriptPath)
{
    // Get the theme data.
    $the_theme = wp_get_theme();
    $theme_version = $the_theme->get('Version');
    $js_version_main = $theme_version . '.' . filemtime(get_template_directory() . $componentScriptPath);
    wp_enqueue_script($componentName . '-scripts', get_template_directory_uri() . $componentScriptPath, array('jquery'), $js_version_main, true);

    // Example:
    // Swiper JS
    if ($componentName === 'component-swiper') {
        wp_dequeue_script($componentName . '-scripts');
        wp_enqueue_script('swiper', '//unpkg.com/swiper@8/swiper-bundle.min.js', [], '1.8.1', true);
        wp_enqueue_script($componentName . '-scripts', get_template_directory_uri() . $componentScriptPath, array('jquery', 'swiper'), $js_version_main, true);
    }
}