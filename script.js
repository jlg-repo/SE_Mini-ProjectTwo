
 
 // TODO: Cart counter, total price in cart, live cart maybe, second click on cart should close it if live cart, unified styling of buttons
 // TODO: README.md. Check rubric for requirements

 
 NameArray = new Array("Croissant","Eclair","LemonBar","Muffin")
 ImageArray = new Array("")
 CartArray = new Array()

function AddToCart(clicked_id) {
    CartArray.push(clicked_id)
      console.log(CartArray);

}
function ClearCart() {
    CartArray = new Array("")
        console.log("Cleared cart");
              console.log(CartArray)
}
function RemoveFromCart(index) {
    /**Filter or store id# remove 1 of an id instance */
     console.log("Removing");
 CartArray.splice(CartArray[index],1);
 console.log(index);
}
function DisplayCartItems(){

    
    console.log("Accesing Cart")
    const divContainer = document.getElementById("CartItems");
    divContainer.innerHTML = "";
    // TODO: Fix boolean display issue when cart = 0
    // TODO: Investigate live cart updating
    // TODO: Create new class for remove button and clear button to change their styling together
    
    for (var i=0; i <CartArray.length;++i){
        console.log(CartArray)
            const p = document.createElement("p");
            const bakedNumber= CartArray[i]
            p.textContent = NameArray[bakedNumber];
            const removeButton = document.createElement("Button");
            removeButton.textContent = "Remove";
            removeButton.onclick  = () => RemoveFromCart(i);
            divContainer.appendChild(p);
            divContainer.appendChild(removeButton);
    }
    const ClearButton = document.createElement("Button");
    ClearButton.textContent = "Clear Cart";
    ClearButton.onclick = () => ClearCart();
    divContainer.appendChild(ClearButton);
}