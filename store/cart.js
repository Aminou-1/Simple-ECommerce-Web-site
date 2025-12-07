
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItemsDiv = document.getElementById("cart-items");
const totalPriceDiv = document.getElementById("total-price");


function displayCart() {
    cartItemsDiv.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        cartItemsDiv.innerHTML += 
            `<div class="cart-item">
                <img src="${item.img}" alt="">
                
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>${item.price}DA</p>
                    <p>Qty: ${item.quantity}</p>
                </div>

                <div class="quantity">
                    <button onclick="updateQty(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQty(${index}, 1)">+</button>
                </div>
            </div>
        `;
    });

    totalPriceDiv.textContent = total;
}


function updateQty(index, change) {
    cart[index].quantity += change;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

displayCart();