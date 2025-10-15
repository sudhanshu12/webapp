<?php
// Minimal fallback template using centralized functions

// Output meta tags using centralized function
add_action('wp_head', function() {
    bsg_output_meta_tags('home');
    bsg_output_structured_data('home');
});

// Output common assets
add_action('wp_head', function() {
    bsg_output_common_assets();
});

get_header();
?>
<main>
    <h2>Default Template</h2>
    <p>This is a fallback index.php. WordPress requires it even if you have custom templates.</p>
</main>
<?php
// Footer removed
