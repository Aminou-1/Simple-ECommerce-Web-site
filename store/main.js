import { products } from "./products.js";

const LxText = document.querySelector(".products .js-text");
const LxH4 = document.querySelector(".contacts .js-h4");
const LxIcon = document.querySelectorAll(".contacts .js-icon");

const observer = new IntersectionObserver(entries =>{
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("inview");
        }
    });
}, {threshold: 0.5});

observer.observe(LxText);
observer.observe(LxH4);
LxIcon.forEach(icon =>{
    observer.observe(icon);
});



const container = document.getElementById("products-container");
const modal = document.getElementById("productModal");
const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalDesc = document.getElementById("modalDesc");
const modalQty = document.getElementById("modalQty");
const closeModal = document.querySelector(".close");
const addCartBtn = document.getElementById("addCartBtn");
const cartCountEl = document.getElementById("cart-count");


products.forEach((product, index) => {
    const productHTML =`
        <div class="img-">
            <img class="imgbox" src="${product.img}" alt="${product.name}">
            <button class="view-btn">View</button>
        </div>
    `;
    container.insertAdjacentHTML("beforeend", productHTML);
});


let currentProductIndex = null;
document.querySelectorAll(".view-btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const product = products[index];
        currentProductIndex = index;

        modal.style.display = "flex";
        modalImg.src = product.img;
        modalName.textContent = product.name;
        modalPrice.textContent = product.price + " DA";
        modalDesc.textContent = product.details;
        modalQty.value = 1;


        modalImg.style.animation = "none";
        modalImg.offsetHeight;
        modalImg.style.animation = "";

        document.querySelectorAll(".detail-item").forEach(item => {
            item.style.animation = "none";
            item.offsetHeight;
            item.style.animation = "";
        });
    });
});


closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
});


addCartBtn.addEventListener("click", () => {
    if (currentProductIndex === null) return;

    const quantity = parseInt(modalQty.value) || 1;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];


    const existingIndex = cart.findIndex(item => item.name === products[currentProductIndex].name);
    if (existingIndex !== -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        const productToAdd = { ...products[currentProductIndex], quantity };
        cart.push(productToAdd);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${quantity} item(s) added to cart!`);
    modalQty.value = 1;
});


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalQty;
}


updateCartCount();