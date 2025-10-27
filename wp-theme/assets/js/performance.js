// Performance optimization JavaScript
(function() {
    'use strict';
    
    // Lazy loading implementation
    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src], .lazy-load-image');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                }
            });
        }
    }
    
    // Preload critical images
    function preloadCriticalImages() {
        const criticalImages = document.querySelectorAll('.hero-section img, .main-header img');
        criticalImages.forEach(img => {
            if (img.src) {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = img.src;
                document.head.appendChild(link);
            }
        });
    }
    
    // Optimize image loading
    function optimizeImageLoading() {
        // Add loading="lazy" to all images that don't have it
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            img.loading = 'lazy';
            img.decoding = 'async';
        });
    }
    
    // Compress images on client side (for user uploads)
    function compressImage(file, maxWidth = 1920, quality = 0.85) {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = function() {
                const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;
                
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                
                canvas.toBlob(resolve, 'image/jpeg', quality);
            };
            
            img.src = URL.createObjectURL(file);
        });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initLazyLoading();
            preloadCriticalImages();
            optimizeImageLoading();
        });
    } else {
        initLazyLoading();
        preloadCriticalImages();
        optimizeImageLoading();
    }
    
    // Expose compression function globally for form uploads
    window.compressImage = compressImage;
    
})();
