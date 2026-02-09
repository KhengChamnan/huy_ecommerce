let cart = [];
const DELIVERY_FEE = 15;
let appliedDiscount = 0;

function initCart() {
  const savedCart = localStorage.getItem('shopco_cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  } else {
    cart = [
      {
        id: 2,
        name: "Gradient Graphic T-shirt",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
        price: 145,
        size: "Large",
        color: "White",
        quantity: 1
      },
      {
        id: 5,
        name: "Checkered Shirt",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop",
        price: 180,
        size: "Medium",
        color: "Red",
        quantity: 1
      },
      {
        id: 8,
        name: "Skinny Fit Jeans",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop",
        price: 240,
        size: "Large",
        color: "Blue",
        quantity: 1
      }
    ];
    saveCart();
  }
  renderCart();
  updateSummary();
}

function saveCart() {
  localStorage.setItem('shopco_cart', JSON.stringify(cart));
}

function getCart() {
  return cart;
}

function addToCart(product) {
  const existingItem = cart.find(item => 
    item.id === product.id && 
    item.size === product.size && 
    item.color === product.color
  );

  if (existingItem) {
    existingItem.quantity += product.quantity || 1;
  } else {
    cart.push({
      ...product,
      quantity: product.quantity || 1
    });
  }

  saveCart();
  if (typeof updateCartCount === 'function') {
    updateCartCount();
  }
}

function updateQuantity(itemIndex, delta) {
  if (itemIndex >= 0 && itemIndex < cart.length) {
    cart[itemIndex].quantity += delta;
    
    if (cart[itemIndex].quantity <= 0) {
      removeFromCart(itemIndex);
    } else {
      saveCart();
      renderCart();
      updateSummary();
      if (typeof updateCartCount === 'function') {
        updateCartCount();
      }
    }
  }
}

function removeFromCart(itemIndex) {
  if (itemIndex >= 0 && itemIndex < cart.length) {
    cart.splice(itemIndex, 1);
    saveCart();
    renderCart();
    updateSummary();
    if (typeof updateCartCount === 'function') {
      updateCartCount();
    }
  }
}

function calculateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = Math.round(subtotal * (appliedDiscount / 100));
  const total = subtotal - discount + DELIVERY_FEE;

  return {
    subtotal,
    discount,
    deliveryFee: DELIVERY_FEE,
    total
  };
}


function updateSummary() {
  const totals = calculateTotals();

  document.getElementById('subtotal-value').textContent = `$${totals.subtotal}`;
  document.getElementById('discount-value').textContent = appliedDiscount > 0 
    ? `-$${totals.discount}` 
    : `-$0`;
  document.getElementById('delivery-value').textContent = `$${totals.deliveryFee}`;
  document.getElementById('total-value').textContent = `$${totals.total}`;

  const discountRow = document.querySelector('.summary-row:nth-child(2) .summary-label');
  if (appliedDiscount > 0) {
    discountRow.textContent = `Discount (-${appliedDiscount}%)`;
  }
}


function renderCart() {
  const cartItemsContainer = document.getElementById('cart-items');

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <h3 class="empty-cart-title">Your Cart is Empty</h3>
        <p class="empty-cart-text">Add some items to your cart to get started!</p>
        <a href="index.html" class="btn btn-primary">Continue Shopping</a>
      </div>
    `;
    return;
  }

  cartItemsContainer.innerHTML = cart.map((item, index) => `
    <div class="cart-item">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <h3 class="cart-item-name">${item.name}</h3>
        <div class="cart-item-info">
          <span class="cart-item-attribute">Size: ${item.size}</span>
          <span class="cart-item-attribute">Color: ${item.color}</span>
        </div>
        <div class="cart-item-price">$${item.price}</div>
      </div>
      <div class="cart-item-actions">
        <button class="delete-btn" onclick="removeFromCart(${index})" aria-label="Remove item">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </button>
        <div class="cart-quantity-selector">
          <button class="cart-qty-btn" onclick="updateQuantity(${index}, -1)">−</button>
          <span class="cart-qty-value">${item.quantity}</span>
          <button class="cart-qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

function applyPromoCode() {
  const promoInput = document.getElementById('promo-input');
  const code = promoInput.value.trim().toUpperCase();

  const validCodes = {
    'SAVE20': 20,
    'DISCOUNT10': 10,
    'WELCOME15': 15
  };

  if (validCodes[code]) {
    appliedDiscount = validCodes[code];
    updateSummary();
    alert(`Promo code applied! You saved ${appliedDiscount}%`);
    promoInput.value = '';
  } else if (code === '') {
    alert('Please enter a promo code');
  } else {
    alert('Invalid promo code');
  }
}

function goToCheckout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  localStorage.setItem('shopco_discount', appliedDiscount.toString());
  
  window.location.href = 'checkout.html';
}

document.addEventListener('DOMContentLoaded', () => {
  initCart();


  const applyBtn = document.getElementById('apply-promo-btn');
  if (applyBtn) {
    applyBtn.addEventListener('click', applyPromoCode);
  }

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', goToCheckout);
  }


  const promoInput = document.getElementById('promo-input');
  if (promoInput) {
    promoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        applyPromoCode();
      }
    });
  }
});

if (typeof window !== 'undefined') {
  window.cartFunctions = {
    addToCart,
    getCart,
    updateQuantity,
    removeFromCart
  };
}
