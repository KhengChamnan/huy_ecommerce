/* ========================================
   SHOP.CO - Product Data
   ======================================== */

const productsData = [
    // New Arrivals
    {
        id: 1,
        name: "T-shirt with Tape Details",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop",
        price: 120,
        originalPrice: null,
        discount: null,
        rating: 4.5,
        category: "new-arrivals",
        description: "This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.",
        colors: ["#4F4631", "#314F4A", "#31344F"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 2,
        name: "Skinny Fit Jeans",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=300&h=400&fit=crop",
        price: 240,
        originalPrice: 260,
        discount: 20,
        rating: 3.5,
        category: "new-arrivals",
        description: "Premium skinny fit jeans made from high-quality denim. Perfect for casual and semi-formal occasions.",
        colors: ["#1A1A2E", "#2D3436", "#636E72"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 3,
        name: "Checkered Shirt",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop",
        price: 180,
        originalPrice: null,
        discount: null,
        rating: 4.5,
        category: "new-arrivals",
        description: "Classic checkered shirt with a modern twist. Made from premium cotton for all-day comfort.",
        colors: ["#E74C3C", "#3498DB", "#2ECC71"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 4,
        name: "Sleeve Striped T-shirt",
        image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=300&h=400&fit=crop",
        price: 130,
        originalPrice: 160,
        discount: 30,
        rating: 4.5,
        category: "new-arrivals",
        description: "Stylish striped t-shirt with unique sleeve design. Perfect for a casual yet fashionable look.",
        colors: ["#000000", "#FFFFFF", "#E67E22"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    // Top Selling
    {
        id: 5,
        name: "Vertical Striped Shirt",
        image: "https://images.unsplash.com/photo-1608234807905-4466023792f5?w=300&h=400&fit=crop",
        price: 212,
        originalPrice: 232,
        discount: 20,
        rating: 5.0,
        category: "top-selling",
        description: "Elegant vertical striped shirt for a sophisticated look. Made from premium quality fabric.",
        colors: ["#2C3E50", "#ECF0F1", "#95A5A6"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 6,
        name: "Courage Graphic T-shirt",
        image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=300&h=400&fit=crop",
        price: 145,
        originalPrice: null,
        discount: null,
        rating: 4.0,
        category: "top-selling",
        description: "Bold graphic t-shirt featuring unique courage-themed design. Express yourself with style.",
        colors: ["#1ABC9C", "#9B59B6", "#F39C12"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 7,
        name: "Loose Fit Bermuda Shorts",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=300&h=400&fit=crop",
        price: 80,
        originalPrice: null,
        discount: null,
        rating: 3.0,
        category: "top-selling",
        description: "Comfortable loose fit bermuda shorts, perfect for summer days and casual outings.",
        colors: ["#34495E", "#BDC3C7", "#7F8C8D"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 8,
        name: "Faded Skinny Jeans",
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=300&h=400&fit=crop",
        price: 210,
        originalPrice: null,
        discount: null,
        rating: 4.5,
        category: "top-selling",
        description: "Trendy faded skinny jeans with a modern wash. A must-have staple for your wardrobe.",
        colors: ["#5D6D7E", "#2E4053", "#1B2631"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    // Additional Products
    {
        id: 9,
        name: "Classic Polo Shirt",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop",
        price: 95,
        originalPrice: 120,
        discount: 25,
        rating: 4.0,
        category: "new-arrivals",
        description: "Timeless polo shirt with premium cotton blend. Perfect for both casual and business casual settings.",
        colors: ["#2C3E50", "#E74C3C", "#FFFFFF"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 10,
        name: "Denim Jacket",
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=300&h=400&fit=crop",
        price: 280,
        originalPrice: null,
        discount: null,
        rating: 5.0,
        category: "top-selling",
        description: "Classic denim jacket with modern cut. A versatile piece for layering in any season.",
        colors: ["#4A6FA5", "#2C3E50", "#1C1C1C"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 11,
        name: "Gradient Hoodie",
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=300&h=400&fit=crop",
        price: 165,
        originalPrice: 200,
        discount: 35,
        rating: 4.5,
        category: "new-arrivals",
        description: "Modern gradient hoodie with soft fleece interior. Stay warm and stylish all day long.",
        colors: ["#667EEA", "#764BA2", "#F093FB"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 12,
        name: "Cargo Pants",
        image: "https://images.unsplash.com/photo-1624378440070-7b44ce149849?w=300&h=400&fit=crop",
        price: 190,
        originalPrice: null,
        discount: null,
        rating: 4.0,
        category: "new-arrivals",
        description: "Functional cargo pants with multiple pockets. Combines utility with contemporary street style.",
        colors: ["#4A4A4A", "#8B7355", "#2F4F2F"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 13,
        name: "Bomber Jacket",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=400&fit=crop",
        price: 320,
        originalPrice: 400,
        discount: 80,
        rating: 4.5,
        category: "top-selling",
        description: "Premium bomber jacket with satin lining. An iconic piece for your outerwear collection.",
        colors: ["#1C1C1C", "#2E4057", "#8B4513"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 14,
        name: "Oxford Dress Shirt",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=400&fit=crop",
        price: 155,
        originalPrice: null,
        discount: null,
        rating: 4.5,
        category: "top-selling",
        description: "Crisp oxford dress shirt perfect for formal occasions. Made from wrinkle-resistant fabric.",
        colors: ["#FFFFFF", "#87CEEB", "#FFB6C1"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 15,
        name: "Zip-Up Hoodie",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=400&fit=crop",
        price: 135,
        originalPrice: 180,
        discount: 45,
        rating: 3.5,
        category: "new-arrivals",
        description: "Comfortable zip-up hoodie with adjustable drawstring. Perfect for layering or wearing solo.",
        colors: ["#2C3E50", "#95A5A6", "#C0392B"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 16,
        name: "Chino Pants",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300&h=400&fit=crop",
        price: 170,
        originalPrice: null,
        discount: null,
        rating: 4.0,
        category: "top-selling",
        description: "Versatile chino pants with a tailored fit. Ideal for business casual or smart casual looks.",
        colors: ["#D2B48C", "#708090", "#2F4F4F"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 17,
        name: "Athletic Track Jacket",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop",
        price: 145,
        originalPrice: 175,
        discount: 30,
        rating: 4.5,
        category: "new-arrivals",
        description: "Sporty track jacket with breathable fabric. Great for workouts or casual athletic wear.",
        colors: ["#000000", "#0066CC", "#FF6B6B"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    },
    {
        id: 18,
        name: "Classic White Sneakers",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop",
        price: 195,
        originalPrice: null,
        discount: null,
        rating: 5.0,
        category: "top-selling",
        description: "Clean white sneakers with minimalist design. A versatile essential that pairs with everything.",
        colors: ["#FFFFFF", "#F8F8F8", "#E8E8E8"],
        sizes: ["Small", "Medium", "Large", "X-Large"]
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = productsData;
}
