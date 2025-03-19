export let cart=JSON.parse(localStorage.getItem('cart')) || createCart();

function createCart(){
  let tempCart=[];
  localStorage.setItem('cart',JSON.stringify(tempCart));
  return tempCart;
}

const cartQuantityIconElem=document.querySelector('.cart-quantity');
if(cartQuantityIconElem){
  cartQuantityIconElem.innerText=cart.length;
}

export function addToCart(productId,quantity,name,priceCents,image){
    for(let i=0;i<cart.length;i++){
      if(cart[i].id==productId){
        console.log('requested item already present in the cart');
        cart[i].quantity+=quantity;
        localStorage.setItem('cart',JSON.stringify(cart));
        return;
      }
    }
    const newItem={
      id:productId,
      quantity:quantity,
      name:name,
      image:image,
      priceCents:priceCents*quantity,
      shippingCost : 0
    } 
    cart.push(newItem);
    console.log('requested item added in the cart');
    console.log('cart : '+cart);
    localStorage.setItem('cart',JSON.stringify(cart));
    const cartQuantityIconElem=document.querySelector('.cart-quantity');
    if(cartQuantityIconElem){
      cartQuantityIconElem.innerText=cart.length;
    }
    
}
  
export function clearCart(){
  cart=[];
  localStorage.setItem('cart',JSON.stringify(cart));
  console.log('cart resetted');
}

export function removeProductFromCart(productId){
 for(let i=0;i<cart.length;i++){
    if(cart[i].id==productId){
      console.log('deleted from cart');
      cart.splice(i,1);
      return;
    }
  }
}