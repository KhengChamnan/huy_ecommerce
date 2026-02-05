/* ========================================
   SHOP.CO - Products Page JavaScript
   ======================================== */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Initialize the products page
  loadAllProducts();
});

/**
 * Load and display all products
 */
function loadAllProducts() {
  const productsGrid = document.getElementById('products-grid');
  const productsCount = document.getElementById('products-count');

  if (!productsGrid || !productsData) {
    console.error('Products grid or product data not found');
    return;
  }

  // Clear existing content
  productsGrid.innerHTML = '';

  // Update products count
  productsCount.textContent = productsData.length;

  // Create and append product cards
  productsData.forEach((product) => {
    const productCard = createProductCard(product);
    productsGrid.appendChild(productCard);
  });
}

/**
 * Create a product card element
 * @param {Object} product - Product data object
 * @returns {HTMLElement} Product card element
 */
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.style.cursor = 'pointer';

  // Create product image
  const imageDiv = document.createElement('div');
  imageDiv.className = 'product-image';
  const img = document.createElement('img');
  img.src = product.image;
  img.alt = product.name;
  imageDiv.appendChild(img);

  // Create product name
  const name = document.createElement('h3');
  name.className = 'product-name';
  name.textContent = product.name;

  // Create rating
  const rating = createRatingElement(product.rating);

  // Create price
  const price = createPriceElement(product);

  // Assemble the card
  card.appendChild(imageDiv);
  card.appendChild(name);
  card.appendChild(rating);
  card.appendChild(price);

  // Add click event to navigate to product details
  card.addEventListener('click', function () {
    window.location.href = `product-details.html?id=${product.id}`;
  });

  return card;
}

/**
 * Create rating element
 * @param {Number} rating - Product rating value
 * @returns {HTMLElement} Rating element
 */
function createRatingElement(rating) {
  const ratingDiv = document.createElement('div');
  ratingDiv.className = 'product-rating';

  const stars = document.createElement('span');
  stars.className = 'stars';
  stars.textContent = getStarRating(rating);

  const ratingValue = document.createElement('span');
  ratingValue.className = 'rating-value';
  ratingValue.textContent = `${rating.toFixed(1)}/5`;

  ratingDiv.appendChild(stars);
  ratingDiv.appendChild(ratingValue);

  return ratingDiv;
}

/**
 * Create price element with discount if applicable
 * @param {Object} product - Product data object
 * @returns {HTMLElement} Price element
 */
function createPriceElement(product) {
  const priceDiv = document.createElement('div');
  priceDiv.className = 'product-price';

  if (product.originalPrice && product.discount) {
    // Product has a discount
    const currentPrice = document.createElement('span');
    currentPrice.className = 'current-price';
    currentPrice.textContent = `$${product.price}`;

    const originalPrice = document.createElement('span');
    originalPrice.className = 'original-price';
    originalPrice.textContent = `$${product.originalPrice}`;

    const discountBadge = document.createElement('span');
    discountBadge.className = 'discount-badge';
    discountBadge.textContent = `-${product.discount}%`;

    priceDiv.appendChild(currentPrice);
    priceDiv.appendChild(originalPrice);
    priceDiv.appendChild(discountBadge);
  } else {
    // Regular price
    priceDiv.textContent = `$${product.price}`;
  }

  return priceDiv;
}

/**
 * Generate star rating string based on rating value
 * @param {Number} rating - Rating value (0-5)
 * @returns {String} Star rating string
 */
function getStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let stars = '★'.repeat(fullStars);
  if (hasHalfStar) {
    stars += '★'; // Using full star for simplicity
  }
  stars += '☆'.repeat(emptyStars);

  return stars;
}

/**
 * Mobile menu toggle functionality
 */
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn && nav) {
  mobileMenuBtn.addEventListener('click', function () {
    nav.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });
}
