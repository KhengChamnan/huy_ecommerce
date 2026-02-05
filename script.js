/* ========================================
   SHOP.CO - JavaScript Functionality
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Animate hamburger icon
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                span.style.transition = 'transform 0.3s ease';
            });
            
            if (nav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // ========================================
    // Banner Close Button
    // ========================================
    const bannerClose = document.querySelector('.banner-close');
    const topBanner = document.querySelector('.top-banner');
    
    if (bannerClose && topBanner) {
        bannerClose.addEventListener('click', function() {
            topBanner.style.transform = 'translateY(-100%)';
            topBanner.style.transition = 'transform 0.3s ease';
            
            setTimeout(() => {
                topBanner.style.display = 'none';
            }, 300);
        });
    }
    
    // ========================================
    // Smooth Scroll for Anchor Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ========================================
    // Loading Overlay
    // ========================================
    function createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p class="loading-text">Loading product...</p>
            </div>
        `;
        document.body.appendChild(overlay);
        return overlay;
    }
    
    function showLoadingOverlay() {
        let overlay = document.querySelector('.loading-overlay');
        if (!overlay) {
            overlay = createLoadingOverlay();
        }
        // Trigger reflow for animation
        overlay.offsetHeight;
        overlay.classList.add('active');
        return overlay;
    }
    
    function hideLoadingOverlay() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
    
    // ========================================
    // Async Product Loading
    // ========================================
    async function loadProductAsync(productId) {
        return new Promise((resolve) => {
            // Simulate async loading (fetching from API)
            setTimeout(() => {
                if (typeof productsData !== 'undefined') {
                    const product = productsData.find(p => p.id === productId);
                    resolve(product);
                } else {
                    resolve(null);
                }
            }, 800); // Simulated network delay
        });
    }
    
    // ========================================
    // Product Card Click Navigation
    // ========================================
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach((card, index) => {
        // Add data-product-id based on section and index
        const section = card.closest('.new-arrivals') ? 'new-arrivals' : 
                       card.closest('.top-selling') ? 'top-selling' : 'related';
        
        let productId;
        if (section === 'new-arrivals') {
            productId = index + 1; // Products 1-4
        } else if (section === 'top-selling') {
            // Get index within top-selling section
            const topSellingCards = document.querySelectorAll('.top-selling .product-card');
            const topSellingIndex = Array.from(topSellingCards).indexOf(card);
            productId = topSellingIndex + 5; // Products 5-8
        } else {
            productId = index + 1;
        }
        
        card.setAttribute('data-product-id', productId);
        
        card.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
        });
        
        card.addEventListener('click', async function(e) {
            e.preventDefault();
            const id = parseInt(this.getAttribute('data-product-id'));
            
            // Show loading overlay
            showLoadingOverlay();
            
            // Async load product data
            try {
                const product = await loadProductAsync(id);
                
                if (product) {
                    // Navigate to product details page with product ID
                    window.location.href = `product-details.html?id=${id}`;
                } else {
                    hideLoadingOverlay();
                    console.error('Product not found');
                }
            } catch (error) {
                hideLoadingOverlay();
                console.error('Error loading product:', error);
            }
        });
    });
    
    // ========================================
    // Scroll Animation (Intersection Observer)
    // ========================================
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section-title, .product-card, .style-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    };
    
    // Initialize scroll animations
    animateOnScroll();
    
    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // ========================================
    // Search Bar Focus Effect
    // ========================================
    const searchInput = document.querySelector('.search-bar input');
    const searchBar = document.querySelector('.search-bar');
    
    if (searchInput && searchBar) {
        searchInput.addEventListener('focus', function() {
            searchBar.style.boxShadow = '0 0 0 2px rgba(0, 0, 0, 0.1)';
        });
        
        searchInput.addEventListener('blur', function() {
            searchBar.style.boxShadow = 'none';
        });
    }
    
});
