const CartObjects = () => 
{
 NameArray = new Array[("Croissant"),("Eclair"),("LemonBar"),("Muffin")]
 ImageArray = new Array[("")]
 CartArrary = new Array[("")]
 return { NameArray, ImageArray, CartArray };
}

function AddToCart(clicked_id) {
    CartArrary.push(clicked_id)
}
function ClearCart() {
    CartArrary = new Array[("")]
}
function RemoveFromCart(clicked_id) {
    /** 
     * https://stackoverflow.com/questions/16491758/remove-objects-from-array-by-object-property
     * modified from
     *  **/
for (var i = 0; i < CartArrary.length; i++) {
    var obj = CartArrary[i];

    if (listToDelete.indexOf(clicked_id.id) !== -1) {
        CartArrary.splice(i, 1);
    }
}
}
function DisplayCartItems(){
    for (var i=0; i <CartArrary.length;i++){
            const p = document.createElement("p");
            p.text = NameArray[i];
             divContainer.appendChild(p);
    }
}