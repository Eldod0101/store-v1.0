let productsData = [
    { id: 1, name: "Apple MacBook Air M2", src: "img/1.jpg", price: 999, description: "13.6-inch, Apple M2 chip, 8GB RAM, 256GB SSD", href: "product1.html" },
    { id: 2, name: "Dell XPS 13 9310", src: "img/2.jpg", price: 1199, description: "13.4-inch, Intel i7 11th Gen, 16GB RAM, 512GB SSD", href: "product2.html" },
    { id: 3, name: "HP Spectre x360 14", src: "img/3.jpg", price: 1249, description: "13.5-inch, Intel i7 11th Gen, 16GB RAM, 512GB SSD", href: "product3.html" },
    { id: 4, name: "Lenovo ThinkPad X1 Carbon", src: "img/4.jpg", price: 1499, description: "14-inch, Intel i7 12th Gen, 16GB RAM, 1TB SSD", href: "product4.html" },
    { id: 5, name: "ASUS ROG Zephyrus G14", src: "img/5.jpg", price: 1599, description: "14-inch, AMD Ryzen 9, 32GB RAM, 1TB SSD, GeForce RTX 3060", href: "product5.html" },
    { id: 6, name: "Microsoft Surface Laptop 5", src: "img/6.jpg", price: 1299, description: "13.5-inch, Intel i7 12th Gen, 16GB RAM, 512GB SSD", href: "product6.html" }
];



// Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update cart UI
const updateCartUI = () => {
    let cartContainer = document.querySelector(".cart-items");
    let cartItems = cart.map((product, index) => {
        if (!product) return ""; // Prevents accessing 'src' of null
        return `<div class="cart-item">
                <img src="${product.src}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price} $</p>
                <button class="removeBTN" onclick="removeFromCart(${index})">Remove</button>
            </div>`;
    }).join("");

    let totalPrice = document.querySelector(".total");
    let total = cart.reduce((acc, product) => acc + (product ? product.price : 0), 0);

    if (cart.length === 0) {
        cartContainer.innerHTML = "Cart is empty";
        totalPrice.innerHTML = `Total: $0`;
    } else {
        cartContainer.innerHTML = cartItems;
        totalPrice.innerHTML = `Total: $${total}`;
    }
};


// Add to cart
let addToCart = (id) => {
    let product = productsData.find((product) => product.id === id);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
        Showcart();
        cartState = false;
        const toast = document.getElementById('toast');

        // Show the toast
        toast.classList.remove('hidden');
        toast.classList.add('show');

        // Hide the toast after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');

            // Optionally hide the toast completely after the animation
            setTimeout(() => {
                toast.classList.add('hidden');
            }, 500); // Match this duration to the CSS transition duration
        }, 3000); // Display for 3 seconds
    } else {
        console.error("Product not found");
    }
};

// Remove from cart
let removeFromCart = (index) => {
    cart.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage

    // Update the cart UI after removing the product
    updateCartUI();
};

// Initial UI update
updateCartUI();

// Cart toggle functionality
let Showcart = document.getElementById("Showcart");
let AllCart = document.querySelector(".cart");
let cartState = false;

Showcart.addEventListener("click", Showcart = () => {
    cartState = !cartState;
    AllCart.style.display = cartState ? "block" : "none";


});

let closeCart = document.getElementById("closeCart");
closeCart.addEventListener("click", () => {
    AllCart.style.display = "none";
    cartState = false;
});

// Reload cart data if local storage changes (in case of multiple tabs)
window.addEventListener("storage", () => {
    cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartUI();
});


//cart clear

let cartClear = document.querySelector(".cartClear");
cartClear.addEventListener("click", () => {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
})