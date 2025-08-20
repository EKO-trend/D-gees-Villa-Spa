// script.js
const OWNER_WHATSAPP = "2348023441145"; // Replace with your WhatsApp number

let cart = {};

function formatCurrency(n) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(n);
}

function renderCart() {
  const cartItems = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("subtotal");
  cartItems.innerHTML = "";
  let subtotal = 0;
  Object.keys(cart).forEach(name => {
    const { qty, price } = cart[name];
    const line = price * qty;
    subtotal += line;
    const div = document.createElement("div");
    div.innerHTML = `${name} x ${qty} = ${formatCurrency(line)} <button onclick="removeFromCart('${name}')">Remove</button>`;
    cartItems.appendChild(div);
  });
  subtotalEl.textContent = formatCurrency(subtotal);
}

function addToCart(name, price) {
  if (!cart[name]) {
    cart[name] = { qty: 0, price: price };
  }
  cart[name].qty++;
  renderCart();
}

function removeFromCart(name) {
  delete cart[name];
  renderCart();
}

function finishOrder() {
  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const address = document.getElementById("custAddress").value;
  const date = document.getElementById("custDate").value;
  const time = document.getElementById("custTime").value;
  const note = document.getElementById("custNote").value;

  if (!name || !phone || Object.keys(cart).length === 0) {
    alert("Please fill required fields and add at least one item.");
    return;
  }

  let summary = `*D'gees Villa Spa* — New Order\n\n*Order Summary:*\n`;
  let subtotal = 0;
  Object.keys(cart).forEach(itemName => {
    const { qty, price } = cart[itemName];
    const line = price * qty;
    subtotal += line;
    summary += `• ${itemName} x ${qty} = ${formatCurrency(line)}\n`;
  });
  summary += `\nSubtotal: ${formatCurrency(subtotal)}\n\n*Customer Details:*\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nAddress: ${address}\nPreferred Date: ${date}\nPreferred Time: ${time}`;
  if (note) summary += `\nNote: ${note}`;

  const url = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(summary)}`;
  window.open(url, "_blank");
}

document.getElementById("finishOrderBtn").addEventListener("click", finishOrder);
document.getElementById("checkoutBtn").addEventListener("click", finishOrder);

renderCart();
