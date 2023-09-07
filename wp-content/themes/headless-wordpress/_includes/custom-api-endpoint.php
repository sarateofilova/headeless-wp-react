<?php
// Add a custom REST API route to fetch a menu (any menu)
// apiUrl = `http://your-site-url/wp-json/custom/v1/menu/${menuName}`;
function custom_get_menu_endpoint() {
    register_rest_route('custom/v1', '/menu/(?P<menu_name>[\w-]+)', array(
        'methods' => 'GET',
        'callback' => 'custom_get_menu',
    ));
}

function custom_get_menu($request) {
    $menu_name = $request->get_param('menu_name');
    $menu = wp_get_nav_menu_object($menu_name);

    if (!$menu) {
        return new WP_Error('menu_not_found', 'Menu not found', array('status' => 404));
    }

    // Get the menu items
    $menu_items = wp_get_nav_menu_items($menu->term_id);

    return $menu_items;
}

add_action('rest_api_init', 'custom_get_menu_endpoint');

