document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [];
    const cartItemsContainer = document.getElementById('cart-items');

    // Function to add a product to the cart
    function addToCart(product) {
        const existingProduct = cartItems.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cartItems.push(product);
        }
        updateCartDisplay();
    }

    // Function to update the cart display
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        if (cartItems.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            return;
        }

        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <p>${item.name} - ${item.price} x ${item.quantity}</p>
                <button class="btn remove-from-cart" data-id="${item.id}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);
        });

        // Add event listeners for the remove buttons
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                removeFromCart(productId);
            });
        });
    }

    // Function to remove a product from the cart
    function removeFromCart(productId) {
        const productIndex = cartItems.findIndex(item => item.id === productId);
        if (productIndex > -1) {
            cartItems[productIndex].quantity -= 1;
            if (cartItems[productIndex].quantity === 0) {
                cartItems.splice(productIndex, 1);
            }
        }
        updateCartDisplay();
    }

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.closest('.product');
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.querySelector('h3').textContent;
            const productPrice = productElement.querySelector('p').textContent;

            const product = {
                id: productId,
                name: productName,
                price: productPrice
            };

            addToCart(product);
        });
    });
});
