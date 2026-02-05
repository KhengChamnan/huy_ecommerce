/* ========================================
   SHOP.CO - Product Details JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Load Product Data from URL
    // ========================================
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;
    
    // Find the product from productsData
    if (typeof productsData !== 'undefined') {
        const product = productsData.find(p => p.id === productId);
        
        if (product) {
            // Update page title
            document.title = `${product.name} - SHOP.CO`;
            
            // Update product title
            const productTitle = document.querySelector('.product-title');
            if (productTitle) productTitle.textContent = product.name;
            
            // Update product images
            const mainImage = document.getElementById('main-product-image');
            if (mainImage) {
                mainImage.src = product.image.replace('w=300&h=400', 'w=450&h=530');
                mainImage.alt = product.name;
            }
            
            // Update thumbnails
            const thumbnails = document.querySelectorAll('.thumbnail img');
            thumbnails.forEach(thumb => {
                thumb.src = product.image.replace('w=300&h=400', 'w=150&h=170');
                thumb.alt = `${product.name} view`;
            });
            
            // Update price
            const currentPriceLarge = document.querySelector('.current-price-large');
            const originalPriceLarge = document.querySelector('.original-price-large');
            const discountBadgeLarge = document.querySelector('.discount-badge-large');
            
            if (currentPriceLarge) currentPriceLarge.textContent = `$${product.price}`;
            
            if (product.originalPrice && originalPriceLarge) {
                originalPriceLarge.textContent = `$${product.originalPrice}`;
                originalPriceLarge.style.display = 'inline';
            } else if (originalPriceLarge) {
                originalPriceLarge.style.display = 'none';
            }
            
            if (product.discount && discountBadgeLarge) {
                discountBadgeLarge.textContent = `-${product.discount}%`;
                discountBadgeLarge.style.display = 'inline';
            } else if (discountBadgeLarge) {
                discountBadgeLarge.style.display = 'none';
            }
            
            // Update rating
            const ratingValue = document.querySelector('.product-rating-large .rating-value');
            if (ratingValue) ratingValue.textContent = `${product.rating}/5`;
            
            const starsContainer = document.querySelector('.product-rating-large');
            if (starsContainer) {
                const fullStars = Math.floor(product.rating);
                const hasHalfStar = product.rating % 1 >= 0.5;
                const starsHtml = '★'.repeat(fullStars);
                const starsSpan = starsContainer.querySelector('.stars');
                const starsHalfSpan = starsContainer.querySelector('.stars-half');
                if (starsSpan) starsSpan.textContent = starsHtml;
                if (starsHalfSpan) starsHalfSpan.style.display = hasHalfStar ? 'inline' : 'none';
            }
            
            // Update description
            const productDescription = document.querySelector('.product-description');
            if (productDescription) productDescription.textContent = product.description;
            
            // Update color options
            const colorOptionsContainer = document.querySelector('.color-options');
            if (colorOptionsContainer && product.colors) {
                colorOptionsContainer.innerHTML = product.colors.map((color, index) => `
                    <button class="color-btn ${index === 0 ? 'active' : ''}" data-color="${color}" style="background-color: ${color};" aria-label="Color ${index + 1}">
                        ${index === 0 ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>' : ''}
                    </button>
                `).join('');
                
                // Re-attach color button event listeners
                initColorButtons();
            }
            
            // Update size options
            const sizeOptionsContainer = document.querySelector('.size-options');
            if (sizeOptionsContainer && product.sizes) {
                sizeOptionsContainer.innerHTML = product.sizes.map((size, index) => `
                    <button class="size-btn ${index === 2 ? 'active' : ''}">${size}</button>
                `).join('');
                
                // Re-attach size button event listeners
                initSizeButtons();
            }
            
            // Update breadcrumb
            const breadcrumbList = document.querySelector('.breadcrumb-list');
            if (breadcrumbList) {
                const lastBreadcrumb = breadcrumbList.querySelector('li:last-child span');
                if (lastBreadcrumb) lastBreadcrumb.textContent = product.name;
            }
        }
    }
    
    // ========================================
    // Initialize Color Buttons
    // ========================================
    function initColorButtons() {
        const colorButtons = document.querySelectorAll('.color-btn');
        colorButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                colorButtons.forEach(b => {
                    b.classList.remove('active');
                    b.innerHTML = '';
                });
                this.classList.add('active');
                this.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            });
        });
    }
    
    // ========================================
    // Initialize Size Buttons
    // ========================================
    function initSizeButtons() {
        const sizeButtons = document.querySelectorAll('.size-btn');
        sizeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                sizeButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // ========================================
    // Thumbnail Gallery
    // ========================================
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                // Update main image
                const thumbnailImg = this.querySelector('img');
                if (thumbnailImg) {
                    // Get larger version of the image
                    const newSrc = thumbnailImg.src.replace('w=150&h=170', 'w=450&h=530');
                    mainImage.style.opacity = '0';
                    mainImage.style.transition = 'opacity 0.3s ease';
                    
                    setTimeout(() => {
                        mainImage.src = newSrc;
                        mainImage.style.opacity = '1';
                    }, 150);
                }
            });
        });
    }
    
    // ========================================
    // Color Selection
    // ========================================
    const colorButtons = document.querySelectorAll('.color-btn');
    
    colorButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all color buttons
            colorButtons.forEach(b => {
                b.classList.remove('active');
                const svg = b.querySelector('svg');
                if (svg) svg.style.opacity = '0';
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            const svg = this.querySelector('svg');
            if (svg) svg.style.opacity = '1';
        });
    });
    
    // ========================================
    // Size Selection
    // ========================================
    const sizeButtons = document.querySelectorAll('.size-btn');
    
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all size buttons
            sizeButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
    
    // ========================================
    // Quantity Selector
    // ========================================
    const qtyMinus = document.querySelector('.qty-btn.minus');
    const qtyPlus = document.querySelector('.qty-btn.plus');
    const qtyValue = document.querySelector('.qty-value');
    
    if (qtyMinus && qtyPlus && qtyValue) {
        let quantity = 1;
        
        qtyMinus.addEventListener('click', function() {
            if (quantity > 1) {
                quantity--;
                qtyValue.textContent = quantity;
                qtyValue.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    qtyValue.style.transform = 'scale(1)';
                }, 150);
            }
        });
        
        qtyPlus.addEventListener('click', function() {
            if (quantity < 99) {
                quantity++;
                qtyValue.textContent = quantity;
                qtyValue.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    qtyValue.style.transform = 'scale(1)';
                }, 150);
            }
        });
        
        qtyValue.style.transition = 'transform 0.15s ease';
    }
    
    // ========================================
    // Add to Cart Button
    // ========================================
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            // Get current product data
            const urlParams = new URLSearchParams(window.location.search);
            const productId = parseInt(urlParams.get('id')) || 1;
            const product = productsData.find(p => p.id === productId);
            
            if (!product) {
                alert('Product not found!');
                return;
            }
            
            // Get selected options
            const selectedColorBtn = document.querySelector('.color-btn.active');
            const selectedSizeBtn = document.querySelector('.size-btn.active');
            const quantity = parseInt(document.querySelector('.qty-value')?.textContent || 1);
            
            // Validate selections
            if (!selectedSizeBtn) {
                alert('Please select a size');
                return;
            }
            
            // Get color name from color code
            const colorCode = selectedColorBtn?.dataset.color || product.colors[0];
            const colorNames = {
                '#4F4631': 'Olive',
                '#314F4A': 'Green',
                '#31344F': 'Navy',
                '#1A1A2E': 'Dark Blue',
                '#2D3436': 'Gray',
                '#636E72': 'Light Gray',
                '#E74C3C': 'Red',
                '#3498DB': 'Blue',
                '#2ECC71': 'Green',
                '#000000': 'Black',
                '#FFFFFF': 'White',
                '#E67E22': 'Orange',
                '#2C3E50': 'Dark Blue',
                '#ECF0F1': 'White',
                '#95A5A6': 'Silver',
                '#1ABC9C': 'Teal',
                '#9B59B6': 'Purple',
                '#F39C12': 'Yellow',
                '#34495E': 'Navy',
                '#BDC3C7': 'Light Gray',
                '#7F8C8D': 'Gray',
                '#5D6D7E': 'Blue Gray',
                '#2E4053': 'Dark Gray',
                '#1B2631': 'Black'
            };
            
            // Create cart item model
            const cartItem = {
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.price,
                size: selectedSizeBtn.textContent,
                color: colorNames[colorCode] || 'Default',
                quantity: quantity
            };
            
            // Get existing cart from localStorage
            let cart = [];
            const savedCart = localStorage.getItem('shopco_cart');
            if (savedCart) {
                cart = JSON.parse(savedCart);
            }
            
            // Check if item with same id, size, and color already exists
            const existingItemIndex = cart.findIndex(item => 
                item.id === cartItem.id && 
                item.size === cartItem.size && 
                item.color === cartItem.color
            );
            
            if (existingItemIndex > -1) {
                // Update quantity if item exists
                cart[existingItemIndex].quantity += cartItem.quantity;
            } else {
                // Add new item to cart
                cart.push(cartItem);
            }
            
            // Save cart to localStorage
            localStorage.setItem('shopco_cart', JSON.stringify(cart));
            
            // Visual feedback
            const originalText = this.textContent;
            this.textContent = 'Added to Cart ✓';
            this.style.backgroundColor = '#01AB31';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
            
            // Log for verification
            console.log('Product added to cart:', cartItem);
            console.log('Current cart:', cart);
        });
    }

    
    // ========================================
    // Tab Navigation
    // ========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Here you would typically show/hide content based on tab
            // For now, only Reviews tab has content
        });
    });
    
    // ========================================
    // Review Card Hover Effects
    // ========================================
    const reviewCards = document.querySelectorAll('.review-card');
    
    reviewCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // ========================================
    // Load More Reviews Button
    // ========================================
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            
            // Simulate loading more reviews
            setTimeout(() => {
                this.textContent = 'No More Reviews';
                this.style.opacity = '0.6';
            }, 1500);
        });
    }
    
    // ========================================
    // Image Zoom on Hover (Desktop)
    // ========================================
    const galleryMain = document.querySelector('.gallery-main');
    
    if (galleryMain && window.innerWidth > 768) {
        galleryMain.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transition = 'transform 0.5s ease';
                img.style.transform = 'scale(1.1)';
            }
        });
        
        galleryMain.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    }
    
});
