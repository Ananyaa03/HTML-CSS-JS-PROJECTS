document.addEventListener("DOMContentLoaded", function () {
    const products = [
        { id: 1, name: "Product 1", price: 10.99 },
        { id: 2, name: "Product 2", price: 20.99 },
        { id: 3, name: "Product 3", price: 30.99 }
    ];

    const cart = [];

    const productList = document.getElementById("product-list");
    const cartItems = document.
    getElementById("cart-items");
    const emptyCartMessage = document.getElementById("empty-cart");
    const cartTotalMessage = document.getElementById("cart-total");
    const totalPriceDisplay = document.getElementById("total-price");
    const checkoutButton = document.getElementById("checkout-btn");

    //Adding products dynamically to the product list
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to Cart</button>
        `;
        
        productList.appendChild(productDiv); 
    });


    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute("data-id"));
            const product = products.find((p) => p.id === productId);
            addToCart(product);
        }
    });

    function addToCart(product){
        cart.push(product);
        renderCart();  
    }

    function renderCart(){
        cartItems.innerText = "";
        let totalPrice = 0;

        if(cart.length > 0){ 
            emptyCartMessage.classList.add("hidden");
            cartTotalMessage.classList.remove("hidden");
            cart.forEach((item, index) => {
                totalPrice += item.price;
                const cartItem = document.createElement("div");cartItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                <button class="remove-btn" data-index="${index}">Remove</button>
                `;
                cartItems.appendChild(cartItem);
                totalPriceDisplay.textContent = `$${totalPrice.toFixed(2)}`;
            });

            //event listener for remove buttons
            const removeButtons = document.querySelectorAll(".remove-btn");
            removeButtons.forEach(button => {
                button.addEventListener("click", (e) => {
                    const index = parseInt(e.target.getAttribute("data-index"));
                    cart.splice(index, 1);
                    renderCart();
                });
            });
        }
        else{
            emptyCartMessage.classList.remove("hidden");
            cartTotalMessage.classList.add("hidden");
            totalPriceDisplay.textContent = "$0.00";
        }
    }
});