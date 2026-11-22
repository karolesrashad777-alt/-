let cart = [];
let total = 0;

function addItemToCart(productName, price, promptMessage = "") {
    let note = "";
    if (promptMessage) {
        const userInput = prompt(promptMessage);
        note = userInput && userInput.trim() !== ""
            ? userInput.trim()
            : "يُحدد على واتساب";
    }

    const numericPrice = Number(price);
    cart.push({ name: productName, price: numericPrice, note: note });
    total += numericPrice;
    updateCartUI();
    alert(`تم إضافة "${productName}" إلى سلة 𝑀𝑖𝑁𝐴 𝑆𝑇𝑂𝑅𝐸`);
}

function buySingleProduct(productName) {
    const message = `مرحباً 𝑀𝑖𝑁𝐴 𝑆𝑇𝑂𝑅𝐸، أريد طلب: ${productName}`;
    const phoneNumber = "201228471404";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.length;
    document.getElementById('cart-total').innerText = total;

    const cartList = document.getElementById('cart-items');
    cartList.innerHTML = '';

    cart.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.name}</strong> - ${item.price} ج.م` +
                       (item.note ? `<br><small style="color:#666;">تفاصيل: ${item.note}</small>` : '');
        cartList.appendChild(li);
    });
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
}

function checkout() {
    if (cart.length === 0) {
        alert("السلة فارغة! أضف عرضاً أو منتجاً أولاً.");
        return;
    }

    let message = "مرحباً 𝑀𝑖𝑁𝐴 𝑆𝑇𝑂𝑅𝐸، أريد طلب المنتجات التالية:\n";
    cart.forEach(item => {
        message += `- ${item.name} (${item.price} ج.م)`;
        if (item.note) {
            message += ` | تفاصيل: ${item.note}`;
        }
        message += "\n";
    });
    message += `\nالإجمالي: ${total} ج.م`;

    const phoneNumber = "201228471404";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}