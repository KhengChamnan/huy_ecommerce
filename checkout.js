const DELIVERY_FEE = 15;
let cart = [];
let appliedDiscount = 0;

document.addEventListener('DOMContentLoaded', () => {
  initCheckout();
  setupEventListeners();
});

function initCheckout() {
  const savedCart = localStorage.getItem('shopco_cart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }

  if (cart.length === 0) {
    alert('Your cart is empty!');
    window.location.href = 'cart.html';
    return;
  }

  const savedDiscount = localStorage.getItem('shopco_discount');
  if (savedDiscount) {
    appliedDiscount = parseInt(savedDiscount);
  }

  renderOrderSummary();
  updateSummaryTotals();
}

function renderOrderSummary() {
  const summaryItemsContainer = document.getElementById('summary-items');
  
  if (!summaryItemsContainer) return;

  summaryItemsContainer.innerHTML = cart.map(item => `
    <div class="summary-item">
      <div class="summary-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="summary-item-details">
        <h4 class="summary-item-name">${item.name}</h4>
        <p class="summary-item-info">Size: ${item.size} | Color: ${item.color}</p>
        <p class="summary-item-quantity">Qty: ${item.quantity}</p>
      </div>
      <div class="summary-item-price">$${item.price * item.quantity}</div>
    </div>
  `).join('');
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

function updateSummaryTotals() {
  const totals = calculateTotals();

  document.getElementById('subtotal-value').textContent = `$${totals.subtotal}`;
  document.getElementById('discount-value').textContent = appliedDiscount > 0 
    ? `-$${totals.discount}` 
    : `-$0`;
  document.getElementById('delivery-value').textContent = `$${totals.deliveryFee}`;
  document.getElementById('total-value').textContent = `$${totals.total}`;

  const discountLabel = document.getElementById('discount-label');
  if (discountLabel && appliedDiscount > 0) {
    discountLabel.textContent = `Discount (-${appliedDiscount}%)`;
  }
}

function setupEventListeners() {
  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const customerInfo = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
    city: formData.get('city'),
    state: formData.get('state'),
    zip: formData.get('zip'),
    country: formData.get('country'),
    paymentMethod: formData.get('paymentMethod')
  };

  if (!validateForm(customerInfo)) {
    alert('Please fill in all required fields.');
    return;
  }

  const order = createOrder(customerInfo);

  saveOrder(order);

  clearCart();

  showSuccessMessage(order);
}

function validateForm(data) {
  return Object.values(data).every(value => value && value.trim() !== '');
}

function createOrder(customerInfo) {
  const totals = calculateTotals();
  const orderId = `ORDER-${Date.now()}`;
  const orderDate = new Date().toISOString();

  return {
    orderId,
    orderDate,
    status: 'pending',
    customerInfo,
    items: cart.map(item => ({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      subtotal: item.price * item.quantity
    })),
    pricing: {
      subtotal: totals.subtotal,
      discount: totals.discount,
      discountPercentage: appliedDiscount,
      deliveryFee: totals.deliveryFee,
      total: totals.total
    }
  };
}

function saveOrder(order) {
  const existingOrders = localStorage.getItem('shopco_orders');
  let orders = existingOrders ? JSON.parse(existingOrders) : [];

  orders.push(order);

  localStorage.setItem('shopco_orders', JSON.stringify(orders));
}

function clearCart() {
  localStorage.removeItem('shopco_cart');
  localStorage.removeItem('shopco_discount');
}

function showSuccessMessage(order) {
  alert(
    `Order placed successfully!\n\n` +
    `Order ID: ${order.orderId}\n` +
    `Total: $${order.pricing.total}\n\n` +
    `Thank you for your purchase, ${order.customerInfo.firstName}!\n` +
    `A confirmation email will be sent to ${order.customerInfo.email}`
  );

  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1000);
}
