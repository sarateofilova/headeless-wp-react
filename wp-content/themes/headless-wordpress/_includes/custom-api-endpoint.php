<?php
add_action('rest_api_init', 'custom_rest_endpoints');

// Add a custom REST API endpoint
// apiUrl = `http://your-site-url/wp-json/custom/v1/menu/${menuName}`;
function custom_rest_endpoints() {
    // Homepage endpoint
    register_rest_route('custom/v1', '/homepage-id', array(
        'methods' => 'GET',
        'callback' => 'custom_get_homepage_id',
    ));
    // Menu endpoint
    register_rest_route('custom/v1', '/menu/(?P<menu_name>[\w-]+)', array(
        'methods' => 'GET',
        'callback' => 'custom_get_menu',
    ));
    // Pages endpoint
    register_rest_route('custom/v1', '/pages/(?P<slug>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'custom_get_page_by_slug',
    ));
    // Posts endpoints
    register_rest_route('custom/v1', '/posts/(?P<slug>[a-zA-Z0-9-]+)', array(
        'methods' => 'GET',
        'callback' => 'custom_get_post_by_slug',
    ));
}
// Menus
function custom_get_menu($request) {
    $menu_name = $request->get_param('menu_name');
    $menu = wp_get_nav_menu_object($menu_name);

    if (!$menu) {
        return new WP_Error('menu_not_found', 'Menu not found', array('status' => 404));
    }

    // Get the menu items
    $menu_items = wp_get_nav_menu_items($menu->term_id);
    foreach ($menu_items as &$item) {
        // Fetch the post object based on the object_id
        $post = get_post($item->object_id);

        // Add the post slug to the menu item
        $item->slug = $post?->post_name;
    }


    return $menu_items;
}
// Pages
function custom_get_page_by_slug($request) {
    // Retrieve the slug from the request parameters
    $slug = $request['slug'];

    // Query the page based on the slug
    $page = get_page_by_path($slug);

    if ($page) {
        $template = get_page_template_slug($page->ID);
        // Format the page data
        $formatted_page = array(
            'id' => $page->ID,
            'title' => get_the_title($page),
            'content' => apply_filters('the_content', $page->post_content),
            'slug' => $slug,
            'template' => $template
            // Add more fields as needed
        );

        return rest_ensure_response($formatted_page);
    } else {
        return new WP_Error('not_found', 'Page not found', array('status' => 404));
    }
}
// Posts
function custom_get_post_by_slug($request) {
    // Retrieve the slug from the request parameters
    $slug = $request['slug'];

    // Query the post based on the slug
    $post = get_page_by_path($slug, OBJECT, 'post');

    if ($post) {
        // Format the post data
        $formatted_post = array(
            'id' => $post->ID,
            'title' => get_the_title($post),
            'content' => apply_filters('the_content', $post->post_content),
            'slug' => $slug,
            // Add more fields as needed
        );

        return rest_ensure_response($formatted_post);
    } else {
        return new WP_Error('not_found', 'Post not found', array('status' => 404));
    }
}

// Get homepage ID
function get_homepage_id() {
    return (int)get_option('page_on_front');
}

function custom_get_homepage_id() {
    $homepage_id = get_homepage_id();
    return rest_ensure_response(array('homepage_id' => $homepage_id));
}