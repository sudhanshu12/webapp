<?php
/**
 * The template for displaying all single posts
 *
 * @package BSG_Theme
 */

get_header(); ?>

<main id="primary" class="site-main">
    <?php include dirname(__FILE__) . '/section-header.php'; ?>
    <div class="container">
        <?php
        while ( have_posts() ) :
            the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header class="entry-header">
                    <?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
                    <div class="entry-meta">
                        <?php
                        bsg_theme_posted_on();
                        bsg_theme_posted_by();
                        ?>
                    </div>
                </header>

                <div class="entry-content">
                    <?php
                    the_content();

                    wp_link_pages( array(
                        'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'bsg-theme' ),
                        'after'  => '</div>',
                    ) );
                    ?>
                </div>

                <footer class="entry-footer">
                    <?php bsg_theme_entry_footer(); ?>
                </footer>
            </article>
            <?php
        endwhile;
        ?>
    </div>

    <!-- Standard About Section -->
    <?php include dirname(__FILE__) . '/section-about.php'; ?>
</main>

<?php
get_sidebar();
// Footer removed
