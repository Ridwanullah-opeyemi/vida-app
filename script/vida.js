const productGrid = document.querySelector(".js-products-grid");
const cart_quantity = document.querySelector(".js-cart-quantity")

products.forEach((product)=>{
    const {id,image,name,rating: {stars},rating:{count},priceCents,} = product
    productGrid.innerHTML +=`
                    <div class="product-container">
                        <div class="product-image-container">
                            <img class="product-image" src="${image}">
                        </div>

                        <div class="product-name limit-text-to-2-lines">
                            ${name}
                        </div>

                        <div class="product-rating-container">
                            <img class="product-rating-stars" src="${`../images/ratings/rating-${stars * 10}.png`}" alt="Stars">
                            <div class="product-rating-count link-primary">
                                ${count}
                            </div>
                        </div>

                        <div class="product-price">
                            $${priceCents}
                        </div>

                        <div class="product-quantity-container">
                            <select>
                                <option selected value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>



                        <div class="product-spacer"></div>

                        <div class="added-to-cart">
                            <img src="images/icons/checkmark.png" alt="Checkmark">
                            Added
                        </div>

                        <button class="add-to-cart-button button-primary js-add-to-cart"
                            data-product-id="${id}">
                            Add to Cart
                        </button>
                    </div>
    `
})

// Object to track product quantities
const cart = {};

// Select all "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".js-add-to-cart");

// Element to display cart quantities (update with your target element's selector)
const cartDisplay = document.querySelector(".js-cart-quantity");

addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        // Get the product ID from the button's data attribute
        const productId = button.getAttribute("data-product-id");

        // Get the selected quantity from the dropdown
        const quantitySelect = button
            .closest(".product-container")
            .querySelector("select");
        const quantity = parseInt(quantitySelect.value, 10);

        // Update the cart object
        if (cart[productId]) {
            cart[productId] += quantity; // Increment quantity if the product is already in the cart
        } else {
            cart[productId] = quantity; // Add new product to the cart
        }

        // Optionally: Log the cart for debugging
        console.log(cart);

        // Update cart quantity display (for all products)
        const totalQuantity = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
        cartDisplay.innerHTML = `${totalQuantity}`;
    });
});
