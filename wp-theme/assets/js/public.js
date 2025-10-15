document.addEventListener('DOMContentLoaded', function () {
    // Hamburger menu toggle for mobile
    const hamburger = document.getElementById('hamburger-menu');
    const nav = document.getElementById('main-nav');
    
    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('open');
            hamburger.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
        });
        
        // Close menu on nav link click (mobile UX)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('open');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('open');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                nav.classList.remove('open');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    // "View All Service Areas" Button
    const viewAllBtn = document.getElementById('view-all-areas-btn');
    const hiddenCities = document.querySelectorAll('.hidden-cities');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function (e) {
            e.preventDefault();
            hiddenCities.forEach(city => {
                city.style.display = 'flex';
            });
            viewAllBtn.style.display = 'none';
        });
    }

    // Customer Reviews Slider
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const track = document.querySelector('.slider-track');
    const nextButton = document.querySelector('.slider-btn.next');
    const prevButton = document.querySelector('.slider-btn.prev');
    
    if (track) {
        let slides = Array.from(track.children);
        let currentIndex = 0;
        let slideWidth = 0;
        let slidesInView = 3;

        function updateSlider() {
            if (window.innerWidth <= 800) {
                slidesInView = 1;
            } else {
                slidesInView = 3;
            }

            slideWidth = sliderWrapper.clientWidth / slidesInView;
            track.style.transform = 'translateX(-' + slideWidth * currentIndex + 'px)';
        }

        function moveToSlide(targetIndex) {
            if (targetIndex < 0) {
                targetIndex = slides.length - slidesInView;
            } else if (targetIndex > slides.length - slidesInView) {
                targetIndex = 0;
            }
            track.style.transform = 'translateX(-' + slideWidth * targetIndex + 'px)';
            currentIndex = targetIndex;
        }

        nextButton.addEventListener('click', () => {
            moveToSlide(currentIndex + 1);
        });

        prevButton.addEventListener('click', () => {
            moveToSlide(currentIndex - 1);
        });

        window.addEventListener('resize', updateSlider);
        updateSlider();
    }

    // Reviews: Read more / Show less toggle (works across homepage/service/location)
    const reviewLinks = Array.from(document.querySelectorAll('.reviews-section a')).filter(a => a.textContent.trim().toLowerCase() === 'read more');
    reviewLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const card = link.closest('.review-card');
            const text = card ? (card.querySelector('.review-text-truncate') || card.querySelector('.review-text') || card.querySelector('p')) : null;
            if (!text) return;
            const expanded = link.getAttribute('data-expanded') === '1';
            if (expanded) {
                // Collapse back to truncated view
                text.style.maxHeight = '7.5em';
                text.style.display = '-webkit-box';
                text.style.webkitLineClamp = '5';
                text.style.overflow = 'hidden';
                link.textContent = 'Read more';
                link.setAttribute('data-expanded', '0');
            } else {
                // Expand to full text
                text.style.maxHeight = 'none';
                text.style.display = 'block';
                text.style.webkitLineClamp = 'unset';
                text.style.overflow = 'visible';
                link.textContent = 'Show less';
                link.setAttribute('data-expanded', '1');
            }
        });
    });
});
