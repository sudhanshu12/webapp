<?php
/**
 * The template for displaying all pages
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

                <?php if ( get_edit_post_link() ) : ?>
                <footer class="entry-footer">
                    <?php
                    edit_post_link(
                        sprintf(
                            wp_kses(
                                __( 'Edit <span class="screen-reader-text">%s</span>', 'bsg-theme' ),
                                array(
                                    'span' => array(
                                        'class' => array(),
                                    ),
                                )
                            ),
                            get_the_title()
                        ),
                        '<span class="edit-link">',
                        '</span>'
                    );
                    ?>
                </footer>
                <?php endif; ?>
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
