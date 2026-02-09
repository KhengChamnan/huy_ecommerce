function getCartItemCount() {
    const savedCart = localStorage.getItem('shopco_cart');
    if (!savedCart) return 0;
    
    try {
        const cart = JSON.parse(savedCart);
        return cart.reduce((total, item) => total + (item.quantity || 0), 0);
    } catch (error) {
        console.error('Error parsing cart data:', error);
        return 0;
    }
}

function updateCartCount() {
    const cartCountElement = document.getElementById('cart-count');
    if (!cartCountElement) return;
    
    const count = getCartItemCount();
    cartCountElement.textContent = count;
    
    if (count > 0) {
        cartCountElement.classList.add('visible');
    } else {
        cartCountElement.classList.remove('visible');
    }
    
    cartCountElement.style.transform = 'scale(1.3)';
    setTimeout(() => {
        cartCountElement.style.transform = 'scale(1)';
    }, 200);
}

document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

window.addEventListener('storage', function(e) {
    if (e.key === 'shopco_cart') {
        updateCartCount();
    }
});
