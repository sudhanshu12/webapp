<?php
/**
 * The template for displaying archive pages
 *
 * @package BSG_Theme
 */

get_header(); ?>

<main id="primary" class="site-main">
    <?php include dirname(__FILE__) . '/section-header.php'; ?>
    <div class="container">
        <?php if ( have_posts() ) : ?>
            <header class="page-header">
                <?php
                the_archive_title( '<h1 class="page-title">', '</h1>' );
                the_archive_description( '<div class="archive-description">', '</div>' );
                ?>
            </header>

            <?php
            while ( have_posts() ) :
                the_post();
                ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                    <header class="entry-header">
                        <?php
                        the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
                        ?>
                        <div class="entry-meta">
                            <?php
                            bsg_theme_posted_on();
                            bsg_theme_posted_by();
                            ?>
                        </div>
                    </header>

                    <div class="entry-summary">
                        <?php the_excerpt(); ?>
                    </div>

                    <footer class="entry-footer">
                        <?php bsg_theme_entry_footer(); ?>
                    </footer>
                </article>
                <?php
            endwhile;

            the_posts_navigation();

        else :
            ?>
            <section class="no-results not-found">
                <header class="page-header">
                    <h1 class="page-title"><?php esc_html_e( 'Nothing here', 'bsg-theme' ); ?></h1>
                </header>

                <div class="page-content">
                    <p><?php esc_html_e( 'It seems we can&rsquo;t find what you&rsquo;re looking for.', 'bsg-theme' ); ?></p>
                </div>
            </section>
            <?php
        endif;
        ?>
    </div>
</main>

<?php
get_sidebar();
// Footer removed
