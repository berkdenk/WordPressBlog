<?php
/**
 * * Plugin Name: Custom API Plugin
 * Plugin URI: https://yourwebsite.com
 * Description: Adds a custom REST API endpoint and a Custom Post Type.
 * Version: 1.0.0
 * Author: admin
 */ 

 if (!defined('ABSPATH')) {
    exit;
}

// REST API Endpoint for Blog Posts
function custom_blog_api_endpoint() {
    register_rest_route('custom/v1', '/blog/', array(
        'methods'  => 'GET',
        'callback' => 'get_blog_posts',
    ));
}
add_action('rest_api_init', 'custom_blog_api_endpoint');

function get_blog_posts() {
    $posts = get_posts(array(
        'post_type'   => 'post',
        'numberposts' => 10,
        'post_status' => 'publish',
    ));

    $response = array();

    foreach ($posts as $post) {
        $response[] = array(
            'ID'        => $post->ID,
            'title'     => $post->post_title,
            'content'   => wp_trim_words($post->post_content, 50, '...'),
            'date'      => $post->post_date,
            'author'    => get_the_author_meta('display_name', $post->post_author),
            'permalink' => get_permalink($post->ID),
        );
    }

    return rest_ensure_response($response);
}

// REST API Endpoint for User Registration
function custom_user_registration() {
    register_rest_route('custom/v1', '/register/', array(
        'methods'  => 'POST',
        'callback' => 'handle_user_registration',
    ));
}
add_action('rest_api_init', 'custom_user_registration');

function handle_user_registration($request) {
    $params = $request->get_params();

    $username = sanitize_text_field($params['username']);
    $email    = sanitize_email($params['email']);
    $password = sanitize_text_field($params['password']);

    if (username_exists($username) || email_exists($email)) {
        return new WP_Error('user_exists', 'Username or email already exists', array('status' => 400));
    }

    $user_id = wp_create_user($username, $password, $email);

    if (is_wp_error($user_id)) {
        return new WP_Error('registration_failed', 'User registration failed', array('status' => 400));
    }

    return rest_ensure_response(array(
        'message' => 'User registered successfully',
        'user_id' => $user_id
    ));
}