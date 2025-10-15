<?php
/**
 * Save Wizard Data to WordPress
 * This file handles saving wizard data from the Next.js app to WordPress options
 */

// Only allow this to run if called from WordPress
if (!defined('ABSPATH')) {
    exit;
}

// Handle AJAX request to save wizard data
add_action('wp_ajax_save_wizard_data', 'handle_save_wizard_data');
add_action('wp_ajax_nopriv_save_wizard_data', 'handle_save_wizard_data');

function handle_save_wizard_data() {
    // Verify nonce for security
    if (!wp_verify_nonce($_POST['nonce'], 'save_wizard_data_nonce')) {
        wp_die('Security check failed');
    }

    // Get the wizard data from POST request
    $wizard_data = $_POST['wizard_data'] ?? [];
    
    if (empty($wizard_data)) {
        wp_send_json_error('No data received');
        return;
    }

    // Decode JSON data if it's a string
    if (is_string($wizard_data)) {
        $wizard_data = json_decode($wizard_data, true);
    }

    // Save to WordPress options
    $result = update_option('bsg_settings', $wizard_data);

    if ($result) {
        wp_send_json_success('Wizard data saved successfully');
    } else {
        wp_send_json_error('Failed to save wizard data');
    }
}

// Add REST API endpoint for saving wizard data
add_action('rest_api_init', function () {
    register_rest_route('bsg/v1', '/save-wizard-data', array(
        'methods' => 'POST',
        'callback' => 'save_wizard_data_rest',
        'permission_callback' => '__return_true', // Allow public access for now
    ));
});

function save_wizard_data_rest($request) {
    $wizard_data = $request->get_json_params();
    
    if (empty($wizard_data)) {
        return new WP_Error('no_data', 'No data received', array('status' => 400));
    }

    // Save to WordPress options
    $result = update_option('bsg_settings', $wizard_data);

    if ($result) {
        return new WP_REST_Response(array(
            'success' => true,
            'message' => 'Wizard data saved successfully',
            'data' => $wizard_data
        ), 200);
    } else {
        return new WP_Error('save_failed', 'Failed to save wizard data', array('status' => 500));
    }
}

// Function to get wizard data (used by theme)
function bsg_get_wizard_data() {
    return get_option('bsg_settings', array());
}

// Function to update specific wizard setting
function bsg_update_wizard_setting($key, $value) {
    $settings = get_option('bsg_settings', array());
    $settings[$key] = $value;
    return update_option('bsg_settings', $settings);
}

// Function to get specific wizard setting
function bsg_get_wizard_setting($key, $default = '') {
    $settings = get_option('bsg_settings', array());
    return isset($settings[$key]) ? $settings[$key] : $default;
}
?>
