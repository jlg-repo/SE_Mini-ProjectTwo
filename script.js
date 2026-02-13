
 
 // TODO: Cart counter, total price in cart, live cart maybe, second click on cart should close it if live cart, unified styling of buttons
 // TODO: README.md. Check rubric for requirements

 // cart is now a singleton object instead of an array. Keys are product ids, values are objects with name, price, and quantity. This makes it easier to look up items in the cart and update quantities without having to search through an array.


 // array with each element as an object with id, name, price, image, and description
 // id is the index of the product in the array, name is the name of the product, price is the price of the product, image is the image of the product, and description is the description of the product
 // this can be used for cards, and by the cart to display the name, price, and image of the product in the cart
 const PRODUCTS = [
    {id: "croissant", name: "Croissant", price: 3.00, image: "./croissant.jpg", desc: "Flaky and buttery, our croissants are made fresh daily."},
    {id: "eclair", name: "Eclair", price: 2.50, image: "./eclair.jpg", desc: "Chocolate eclair. Pretty tasty."},
    {id: "lemonbar", name: "Lemon Bar", price: 2.00, image: "./lemonbar.jpg", desc: "For those days when you want something sweet but you don't want something sweet."},
    {id: "muffin", name: "Muffin", price: 2.75, image: "./muffin.jpg", desc: "For those times when you're hungry but you don't know what you want to eat."}
 ]

 

 // cart as singleton object with keys as product ids and values as quantity of that product in the cart
 let cart = {};

 // array to store the history of actions taken by the user, such as adding or removing items from the cart, and clearing the cart
 let actionHistory = [];

function addToCart(btn) {
    // read data id attribute of button to get product id
    const id = btn.getAttribute("data-id");

    // search PRODUCTS for entry whose id matches productId
    const product = PRODUCTS.find(p => p.id === id);

    if (cart[id]) {
        // Entry already exists, increment quantity
        cart[id].qty+=1;

    } else {
        cart[id] = {name: product.name, price: product.price, qty: 1};
    }
    logAction(`Added ${product.name} to cart`); //template literal, cleaner than string concatenation
    renderCart();
    openCart();
}

function changeQty(id, delta) {
    if (!cart[id]) return; // if no entry for this product, do nothing

    cart[id].qty += delta; // change quantity by delta, which can be positive or negative
    if (cart[id].qty <= 0) {
        logAction(`Removed ${cart[id].name} from cart`); // log removal if quantity goes to 0 or below, must be before deletion or logging breaks!
        delete cart[id]; // remove entry from cart if quantity is 0 or less
    } else {
        const polarity = delta > 0 ? "increased" : "decreased";
        logAction(`${polarity} ${cart[id].name} quantity to ${cart[id].qty}`); // log quantity change
    }
    renderCart(); // re-render cart to reflect changes


}
function clearCart() {
    cart = {};
    logAction("Cleared cart");
    renderCart();

}

function renderCart() {
    // Render the entire cart: clear existing content and re-create it based on the current state of the cart object
    // the BIG function

    // Grab the DOM elements we need
    const itemsContainer = document.getElementById("cartDrawerItems");
    const totalEl = document.getElementById("cartTotal");
    const badgeEl = document.getElementById("cartBadge");
    const labelEl = document.getElementById("cartItemCount");
    const checkoutBtn = document.getElementById("cartCheckoutBtn");

    // Object.entries converts cart object into kv pairs, [id, itemData]
    // This makes the objects loopable, and we can create DOM elements for each item in the cart
    // if cart is { croissant: {name,price,qty:2}, eclair: {name,price,qty:1} }
    // then Object.entries(cart) is [ ["croissant", {name,price,qty:2}], ["eclair", {name,price,qty:1}] ]
    const entries = Object.entries(cart);

    // iterate over a loop. i thought about using reduce here as it seems JS developers like it
    // but it would be more confusing than a for loop, so here we are

    let totalQty = 0;
    let totalPrice = 0;

    for (const id in cart) {
        totalQty += cart[id].qty;
        totalPrice += cart[id].price * cart[id].qty;
    }

    badgeEl.textContent = totalQty; // update badge with total quantity
    badgeEl.classList.toggle("visible", totalQty > 0); // show badge if there's at least one item, hide if empty
    if (totalQty == 0) {
        labelEl.textContent = "Your cart is empty";


    } else {
        labelEl.textContent = `You have ${totalQty} item(s) in your cart`; // pluralize "item" if more than 1

    }

    totalEl.textContent = `Total: $${totalPrice.toFixed(2)}`; // update total price, fixed to 2 decimal places

    checkoutBtn.disabled = totalQty === 0; // fancy Copilot autocomplete here, disable checkout button if cart is empty

    if (entries.length === 0) { // rebuild the cart with an empty message if there's nothing in it
        itemsContainer.innerHTML = '<p class="cart-empty-msg">Add something to get started.</p>'; // show empty message if no items
        return;
    }

      // Build one big HTML string by looping over every item in the cart.
  // Each iteration adds one row of HTML to the string.
  let html = "";

  for (const id in cart) {
    const item = cart[id];
    html += `
      <div class="cart-item-row">
        <div class="cart-item-info">
          <span class="cart-item-name">${item.name}</span>
          <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
        </div>
        <div class="cart-qty-stepper">
          <button onclick="changeQty('${id}', -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty('${id}', 1)">+</button>
        </div>
      </div>
    `;
  }

  // Assign the finished string to innerHTML.
  // This clears whatever rows were there before and draws the new ones.
  itemsContainer.innerHTML = html;

}

function openCart() {
  document.getElementById("cartDrawer").classList.add("open");
  document.getElementById("cartOverlay").classList.add("open");
}

function closeCart() {
  document.getElementById("cartDrawer").classList.remove("open");
  document.getElementById("cartOverlay").classList.remove("open");
}

// Adds a timestamped entry to the front of the array.
// unshift() is like push() but adds to the front instead of the back.
// (this is copilot autocomplete, had to look up how unshift works)
// the newest action always appears at the top of the list.
function logAction(message) {
  actionHistory.unshift(new Date().toLocaleTimeString() + " — " + message);
  renderHistory();
}

function clearHistory() {
  actionHistory = [];
  renderHistory();
}

function renderHistory() {
  const container = document.getElementById("cartHistory");

  if (actionHistory.length === 0) {
    container.innerHTML = "<p class='cart-empty-msg'>No actions yet.</p>";
    return;
  }

  // Same loop pattern as renderCart — build a string, assign to innerHTML
  let html = "";
  for (const entry of actionHistory) { // for of - array loop, iterates over values directly instead of indices
    html += "<p class='history-entry'>" + entry + "</p>";
  }
  container.innerHTML = html;
}

function generateCards() {
    const container = document.querySelector(".cards");
    PRODUCTS.forEach((product) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <p>${product.name} - $${product.price.toFixed(2)}<br><br>${product.desc}</p>
            <button class="cardButton" data-id="${product.id}" onclick="addToCart(this)">
                Add to Cart
            </button>
        `;
        container.appendChild(card);
    });
}

generateCards();
renderCart();
renderHistory();
