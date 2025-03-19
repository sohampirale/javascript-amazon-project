import {cart,clearCart} from '../data/cart.js';
import { convertToDollars } from './utils/money.js';
import {removeProductFromCart} from '../data/cart.js';

const cartSummaryDivElem=document.querySelector('.cart-summary');

function checkoutItemsRenderer(product){
  let todaysDate=new Date();
  todaysDate.setDate(todaysDate.getDate());

  let lateDeliveryDate=new Date();
  lateDeliveryDate.setDate(todaysDate.getDate()+9);
  let earlyDeliveryDate=new Date();
  earlyDeliveryDate.setDate(todaysDate.getDate()+5);
  let superEarlyDeliveryDate=new Date();
  superEarlyDeliveryDate.setDate(todaysDate.getDate()+2);
  console.log(lateDeliveryDate);
  console.log(earlyDeliveryDate);
  console.log(superEarlyDeliveryDate);
  
    let HTMLforproducts=`<div class="cart-item-container P${product.id}">
            <div class="delivery-date">
              ${lateDeliveryDate.toDateString()}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${product.name}
                </div>
                <div class="product-price">
                  $${convertToDollars(product.priceCents*product.quantity)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${product.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-link" data-product-id="${product.id}">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${product.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                     Delivery Date : ${lateDeliveryDate.toDateString()}
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Delivery Date :${earlyDeliveryDate.toDateString()}
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                  <div>
                    <div class="delivery-option-date">
                      Delivery Date : ${superEarlyDeliveryDate.toDateString()}
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;

    cartSummaryDivElem.innerHTML+=HTMLforproducts;
}

function renderEachProductInCart(){
  if(cart.length===0){
    // alert('cart is empty');
    console.log('Cart is empty');
    cartSummaryDivElem.innerHTML=`Your Cart Is Empty<br>
    <a class="button-primary view-products-link" href="amazon.html" data-testid="view-products-link">
        View products
      </a>`
      return;
  }
  cart.forEach((product)=>{
    console.log('rendering : '+product.name);
    checkoutItemsRenderer(product);
  })
}

renderEachProductInCart();

console.log('cart now : '+JSON.stringify(cart));

function parymentSummaryRenderer(){
    let orderSummaryHTML=`<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.length}):</div>
            <div class="payment-summary-money">$42.75</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$4.99</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$47.74</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$4.77</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$52.51</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
}

function removeAndRenderProductsInCart(productId){
  cartSummaryDivElem.innerHTML='';
  alert('cleared innerHTML');
  for(let i=0;i<cart.length;i++){
    if(cart[i].id===productId){
      cart.splice(i,1);
      i--;
      continue;
    }
    checkoutItemsRenderer(cart[i]);
  }
  addEventListenerToProductsInCart();
  localStorage.setItem('cart',JSON.stringify(cart));
}

function deleteParticulrProductFromCart(productId){
  let method=2;
  if(method===1){
    removeProductFromCart(productId);

    console.log('cart now : '+JSON.stringify(cart));
  
    cartSummaryDivElem.innerHTML=``; //resetting the HTML to ''
    renderEachProductInCart();
    addEventListenerToProductsInCart();
    localStorage.setItem('cart',JSON.stringify(cart));
  } else if(method===2){
    console.log('inside method2');
    removeAndRenderProductsInCart(productId);
    console.log('work done');
  }

}

function addEventListenerToProductsInCart(){
  const allDeleteLinksElem=document.querySelectorAll('.js-delete-link');
  allDeleteLinksElem.forEach((deleteLinkElem)=>{
    deleteLinkElem.addEventListener('click',(event)=>{
      const deleteLinkSpanElem=event.target.closest('.js-delete-link');
      console.log('productId = '+deleteLinkSpanElem.dataset.productId);
      deleteParticulrProductFromCart(deleteLinkSpanElem.dataset.productId);
    })
  });
  
}

addEventListenerToProductsInCart();