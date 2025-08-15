const productPrices = {
  "Bow Hair Clip": 4000,
  "Lip Gloss": 1000,
  "Perfume": 1000,
  "Pink Lip Cream":2000,
  "Head Band":1000,
  "Scrunchie":1000
};

function updatePrice() {
  const product = document.getElementById("product").value;
  const quantity = parseInt(document.getElementById("quantity").value || "1");
  const price = productPrices[product] || 0;
  document.getElementById("totalPrice").value = `₦${(price * quantity).toLocaleString()}`;
}

function selectProduct(name, price) {
  document.getElementById("product").value = name;
  updatePrice();
}

document.getElementById("quantity").addEventListener("input", updatePrice);

document.getElementById("orderForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const product = document.getElementById("product").value;
  const quantity = document.getElementById("quantity").value;
  const total = document.getElementById("totalPrice").value;

  const message = `*New Order - D'gess Villa Spa & Cosmetics*%0A
%0A*Name:* ${name}
%0A*Phone:* ${phone}
%0A*Email:* ${email}
%0A*Address:* ${address}
%0A*Product:* ${product}
%0A*Quantity:* ${quantity}
%0A*Total:* ${total}
%0A*Payment Method:* Bank Transfer
%0A%0APlease confirm availability and delivery timing.`;

  // 👇 Your business WhatsApp number in international format (remove the +)
  const businessPhone = "2348023441145"; // <-- Replace this with your real WhatsApp number

  // Open WhatsApp chat with pre-filled message
  window.open(`https://wa.me/${businessPhone}?text=${message}`, "_blank");
});
