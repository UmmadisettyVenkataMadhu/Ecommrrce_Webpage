// ===============================
// ✅ Product Data
// ===============================
const products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 89,
    discount: 20,
    rating: 4.5,
    description: "Organic cotton, fairtrade certified, waterproof wireless earbuds.",
    image: "https://spy.com/wp-content/uploads/2020/08/61IRjjz7S7L._AC_SL1500_.jpg"
  },
  {
    id: 2,
    name: "AirPods Max",
    price: 559,
    discount: 10,
    rating: 4.8,
    description: "High-fidelity audio with active noise cancellation and long battery life.",
    image: "https://i5.walmartimages.com/asr/36594a72-c70c-4652-8d8d-9c3b5c5ec1d1.af54394bd9dcc01481178f47f48ec03e.jpeg?odnHeight=372&odnWidth=372&odnBg=FFFFFF"
  },
  {
    id: 3,
    name: "Bose BT Earphones",
    price: 289,
    discount: 15,
    rating: 4.6,
    description: "Clear sound with deep bass, lightweight design, and wireless Bluetooth.",
    image: "https://th.bing.com/th?id=OPAC.BqYgLH81dVOL%2fQ474C474&w=592&h=550&o=5&dpr=1.3&pid=21.1"
  },
  {
    id: 4,
    name: "Beats Solo 3",
    price: 199,
    discount: 25,
    rating: 4.2,
    description: "Wireless on-ear headphones with up to 40 hours of battery life.",
    image: "https://th.bing.com/th?id=OPAC.oqTwMUFo%2fYIghQ474C474&w=592&h=550&o=5&dpr=1.3&pid=21.1"
  },
  {
    id: 5,
    name: "SIOVS WIFI SECURITY CAMERA",
    price: 188,
    discount: 20,
    rating: 4.3,
    description: "1080P Full HD WiFi spy camera with built-in battery for home security.",
    image: "https://rukminim2.flixcart.com/image/312/312/l1xwqkw0/sports-action-camera/z/c/k/wireless-hd-1080p-home-small-spy-camera-nanny-camera-built-in-original-imagdebkvxwq6gn9.jpeg?q=70"
  },
  {
    id: 6,
    name: "Lenovo LOQ Gaming Laptop",
    price: 50000,
    discount: 10,
    rating: 4.2,
    description: "12th Gen Intel i5, RTX 2050 GPU, 12GB RAM, 512GB SSD, designed for gamers and students.",
    image: "https://m.media-amazon.com/images/I/81tmCrtiRgL.jpg"
  },
  {
    id: 7,
    name: "Apple iPhone 17 Pro Max",
    price: 150000,
    discount: 10,
    rating: 5.0,
    description: "Latest iPhone with A19 Bionic chip, triple-camera system, 5G, and 256GB storage.",
    image: "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/0/p/g/-original-imahft6cfwg6yta2.jpeg?q=70"
  },
  {
    id: 8,
    name: "Samsung Galaxy Tab S9 Ultra",
    price: 110000,
    discount: 15,
    rating: 4.7,
    description: "14.6-inch AMOLED tablet with S Pen, Snapdragon chipset, and 5G connectivity.",
    image: "https://tse3.mm.bing.net/th/id/OIP.QpfyYDoLeNaV_3ZThth0KQHaFC?rs=1&pid=ImgDetMain&o=7&rm=3"
  }
];

// ===============================
// ✅ Display Products (Homepage)
// ===============================
if (document.getElementById("product-list")) {
  const list = document.getElementById("product-list");
  products.forEach(p => {
    const discountedPrice = (p.price - (p.price * p.discount / 100)).toFixed(2);
    list.innerHTML += `
      <div class="product">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p><del>$${p.price}</del> <strong>$${discountedPrice}</strong> (${p.discount}% OFF)</p>
        <p>⭐ ${p.rating}/5</p>
        <button onclick="viewDetails(${p.id})">View Details</button>
      </div>
    `;
  });
}

// ===============================
// ✅ Navigate to Product Details
// ===============================
function viewDetails(id) {
  localStorage.setItem("selectedProduct", id);
  window.location.href = "details.html";
}

// ===============================
// ✅ Load Product Details Page
// ===============================
if (document.getElementById("product-details")) {
  const id = localStorage.getItem("selectedProduct");
  const product = products.find(p => p.id == id);
  if (product) {
    const discountedPrice = (product.price - (product.price * product.discount / 100)).toFixed(2);
    document.getElementById("product-details").innerHTML = `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p><del>$${product.price}</del> <strong>$${discountedPrice}</strong> (${product.discount}% OFF)</p>
        <p>⭐ ${product.rating}/5</p>
        <p>${product.description}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
  }
}

// ===============================
// ✅ Add to Cart
// ===============================
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id == id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}

// ===============================
// ✅ Show Cart Page
// ===============================
if (document.getElementById("cart-items")) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    let total = 0;
    cart.forEach((p, index) => {
      const discountedPrice = (p.price - (p.price * p.discount / 100)).toFixed(2);
      total += parseFloat(discountedPrice);
      container.innerHTML += `
        <div class="product">
          <img src="${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p><del>$${p.price}</del> <strong>$${discountedPrice}</strong> (${p.discount}% OFF)</p>
          <p>⭐ ${p.rating}/5</p>
          <button onclick="removeFromCart(${index})">Remove</button>
        </div>
      `;
    });

    container.innerHTML += `
      <h3>Total: $${total.toFixed(2)}</h3>
      <button onclick="checkout()">Proceed to Buy</button>
    `;
  }
}

// ===============================
// ✅ Remove from Cart
// ===============================
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload(); // refresh cart
}

// ===============================
// ✅ Checkout (Buy Page)
// ===============================
function checkout() {
  window.location.href = "buy.html";
}

if (document.getElementById("buy-page")) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("buy-page");

  if (cart.length === 0) {
    container.innerHTML = "<p>No items to buy. Go back to shop!</p>";
  } else {
    let total = 0;
    cart.forEach(p => {
      const discountedPrice = (p.price - (p.price * p.discount / 100)).toFixed(2);
      total += parseFloat(discountedPrice);
    });

    container.innerHTML = `
      <h2>Confirm Purchase</h2>
      <p>Total Amount: <strong>$${total.toFixed(2)}</strong></p>
      <button onclick="placeOrder()">Place Order</button>
    `;
  }
}

function placeOrder() {
  localStorage.removeItem("cart");
  alert("✅ Order placed successfully!");
  window.location.href = "index.html";
}
