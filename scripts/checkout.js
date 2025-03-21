import {cart,clearCart} from '../data/cart.js';
import { convertToDollars } from './utils/money.js';
import {removeProductFromCart} from '../data/cart.js';

console.log('hello');

// import dayjs from "../node_modules/dayjs/dayjs.min.js";

let today=dayjs();
const lateDeliveryDate=today.add(7,'days');
const earlyDeliveryDate=today.add(3,'days');
const superEarlyDeliveryDate=today.add(1,'days');
let finalInnerHTML='';

const cartSummaryDivElem=document.querySelector('.cart-summary');
const paymentSummaryElem=document.querySelector('.payment-summary');


function addEvenListenersToRadioBtns(){
  const allRadioBtns=document.querySelectorAll('')
}

function giveDateInFormat(date){
  return date.format('dddd')+','+date.format('MMMM,D');
}

function deliveryOptionsHTMLGiver(product){
  let HTML='';
  if(product.deliveryPriceCents==0){
      HTML=`
            <div class="delivery-options" product-id=${product.id}>
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="${product.id}" value=0 >
            <div>
              <div class="delivery-option-date">
              ${giveDateInFormat(lateDeliveryDate)};
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="${product.id}" value=4.99 >
            <div>
              <div class="delivery-option-date">
              ${giveDateInFormat(earlyDeliveryDate)}
              </div>
              <div class="delivery-option-price" delivery-price=4.99>
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input "
              name="${product.id}" value=9.99 >
            <div>
              <div class="delivery-option-date">
                ${giveDateInFormat(superEarlyDeliveryDate)}
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>`;
  } else if(product.deliveryPriceCents==499){
    HTML=`
          <div class="delivery-options" product-id=${product.id}>
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" 
              class="delivery-option-input"
              name="${product.id}" value=0 >
            <div>
              <div class="delivery-option-date">
              ${giveDateInFormat(lateDeliveryDate)};
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input" 
              name="${product.id}" value=4.99 >
            <div>
              <div class="delivery-option-date">
              ${giveDateInFormat(earlyDeliveryDate)}
              </div>
              <div class="delivery-option-price" delivery-price=4.99>
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input "
              name="${product.id}" value=9.99 >
            <div>
              <div class="delivery-option-date">
                ${giveDateInFormat(superEarlyDeliveryDate)}
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>`;
  } else if(product.deliveryPriceCents==999){
    HTML=`<div class="delivery-options" product-id=${product.id}>
    <div class="delivery-options-title">
      Choose a delivery option:
    </div>
    <div class="delivery-option">
      <input type="radio" 
        class="delivery-option-input"
        name="${product.id}" value=0 >
      <div>
        <div class="delivery-option-date">
         ${giveDateInFormat(lateDeliveryDate)};
        </div>
        <div class="delivery-option-price">
          FREE Shipping
        </div>
      </div>
    </div>
    <div class="delivery-option">
      <input type="radio"
        class="delivery-option-input"
        name="${product.id}" value=4.99 >
      <div>
        <div class="delivery-option-date">
         ${giveDateInFormat(earlyDeliveryDate)}
        </div>
        <div class="delivery-option-price" delivery-price=4.99>
          $4.99 - Shipping
        </div>
      </div>
    </div>
    <div class="delivery-option">
      <input type="radio" checked
        class="delivery-option-input "
        name="${product.id}" value=9.99 >
      <div>
        <div class="delivery-option-date">
          ${giveDateInFormat(superEarlyDeliveryDate)}
        </div>
        <div class="delivery-option-price">
          $9.99 - Shipping
        </div>
      </div>
    </div>
  </div>`;
  }
  return HTML;
}

function helper_checkoutItemsRenderer(product){
  if(product.deliveryPriceCents==0){
    return giveDateInFormat(lateDeliveryDate);
  } else if(product.deliveryPriceCents==499){
    return giveDateInFormat(earlyDeliveryDate);
  } else if (product.deliveryPriceCents==999){
    return giveDateInFormat(superEarlyDeliveryDate);  
  }
}

function checkoutItemsRenderer(product){
  
    let HTMLforproducts=`
    <div class="cart-item-container P${product.id}">
            <div class="delivery-date">
              Delivery Date : ${helper_checkoutItemsRenderer(product)}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${product.name}
                </div>
                <div class="product-price">
                  $${convertToDollars(product.priceCents,product.quantity,product.deliveryPriceCents)}
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

              ${deliveryOptionsHTMLGiver(product)}
              
            </div>
          </div>`;

    finalInnerHTML+=HTMLforproducts;
}

function cartEmptyMsgRenderer(){
  console.log('Cart is empty');
  cartSummaryDivElem.innerHTML=`Your Cart Is Empty<br>
  <a class="button-primary view-products-link" href="amazon.html" data-testid="view-products-link">
      View products
    </a>`
}

function renderEachProductInCart(){
  if(cart.length===0){
    // alert('cart is empty');
    cartEmptyMsgRenderer();
    return;
  }
  finalInnerHTML='';
  cart.forEach((product)=>{
    console.log('rendering : '+product.name);
    checkoutItemsRenderer(product);
    addEvenListenerUpdateDeleteToProduct(product);
  })
  cartSummaryDivElem.innerHTML=finalInnerHTML;
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

function changeDeliveryDate(productId,value){
  console.log('inside changeDeliveryDate()');
  
  const productContainerElem=document.querySelector('.P'+productId);
  const deliveryDateElem=productContainerElem.querySelector('.delivery-date');

  if(value==0){
    console.log('first');
    deliveryDateElem.innerHTML=`Delivery Date : ${giveDateInFormat(lateDeliveryDate)}`;
  }  else if(value==4.99){
    console.log('second');
    deliveryDateElem.innerHTML=`Delivery Date : ${giveDateInFormat(earlyDeliveryDate)}`;
  } else if(value==9.99){
    console.log('third');
    deliveryDateElem.innerHTML=`Delivery Date : ${giveDateInFormat(superEarlyDeliveryDate)}`;
  }
}

function changeDeliveryOption(productId,value){
  console.log('inside changeDeliveryOption()');
  
  for(let i=0;i<cart.length;i++){
    if(cart[i].id==productId){
      cart[i].deliveryPriceCents=(Number)(value*100);
      console.log('changed shiping cost to '+value+' for the product '+cart[i].name);
      const productContainerElem=cartSummaryDivElem.querySelector('.P'+productId);
      if(!productContainerElem){
        console.log('product container not found');
        return;
      }
      const productPriceElem=productContainerElem.querySelector('.product-price');
      productPriceElem.innerHTML=`$${convertToDollars(cart[i].priceCents,cart[i].quantity,cart[i].deliveryPriceCents)}`;
      changeDeliveryDate(productId,value);
      localStorage.setItem('cart',JSON.stringify(cart));
      return;
    }
  }
}

function removeAndRenderProductsInCart(productId){
  finalInnerHTML='';
  // alert('cleared innerHTML');
  for(let i=0;i<cart.length;i++){
    if(cart[i].id===productId){
      cart.splice(i,1);
      i--;
      continue;
    }
    checkoutItemsRenderer(cart[i]);
  }
  cartSummaryDivElem.innerHTML=finalInnerHTML;
  // addEventListenerToProductsInCart();
  localStorage.setItem('cart',JSON.stringify(cart));
}

function deleteParticulrProductFromCart(productId){
  let method=3;
  if(method===1){
    removeProductFromCart(productId);

    console.log('cart now : '+JSON.stringify(cart));
  
    cartSummaryDivElem.innerHTML=``; //resetting the HTML to ''
    renderEachProductInCart();
    addEventListenerToProductsInCart();
    localStorage.setItem('cart',JSON.stringify(cart));
  } else if(method===2){
    //faster than method1
    console.log('inside method2');
    removeAndRenderProductsInCart(productId);
    console.log('work done');
  } else if(method==3){
    //faster than method2
    removeProductFromCart(productId);

    const itemToRwmoveFromCartContainerElem=document.querySelector('.P'+productId);
    if(itemToRwmoveFromCartContainerElem){
      itemToRwmoveFromCartContainerElem.remove();
      // alert('product removed form the page');
      if(cart.length==0){
        cartEmptyMsgRenderer();
      }
    }
  }

}

function addEvenListenerUpdateDeleteToProduct(productContainer){
  // product
}

function addEventListenerToProductsInCart(){

  const allDeleteLinksElem=document.querySelectorAll('.js-delete-link');
  const allUpdateLinksElem=document.querySelectorAll('.js-update-link');
  const allRadioBtnElem=document.querySelectorAll('input[type="radio"]');

  allDeleteLinksElem.forEach((deleteLinkElem)=>{
    deleteLinkElem.addEventListener('click',(event)=>{
      const deleteLinkSpanElem=event.target.closest('.js-delete-link');
      console.log('productId = '+deleteLinkSpanElem.dataset.productId);
      deleteParticulrProductFromCart(deleteLinkSpanElem.dataset.productId);
      paymentSummaryRenderer();
    })
  });

  allUpdateLinksElem.forEach((updateBtnElem)=>{
    updateBtnElem.addEventListener('click',()=>{
      alert('You clikced on update');
      paymentSummaryRenderer();
    });
  })

  allRadioBtnElem.forEach((radioElem)=>{
    radioElem.addEventListener('click',()=>{
      console.log('click on radio btn detected');
      console.log('You clicked radio btn of price '+radioElem.value+' & '+radioElem.name);    
      changeDeliveryOption(radioElem.name,radioElem.value);
    paymentSummaryRenderer();
    })
  })
  
  console.log('calling payment summary renderer');
  
}

addEventListenerToProductsInCart();

function checkRadioBtns(){
  console.log('All selected btns are ');
  let allSelectedBtns = document.querySelectorAll('input[type="radio"]:checked');

  allSelectedBtns.forEach((selectedBtn)=>{
    console.log('hello');
    
    console.log(selectedBtn);
  })
}

console.log('checking radio btns');

checkRadioBtns();

const btnElem=document.querySelector('.js-check-radio-btns');

btnElem.addEventListener('click',()=>{
  console.log('calling checkRadioBtns()');
  checkRadioBtns();
})

const showCartBtnElem=document.querySelector('.show-cart');

showCartBtnElem.addEventListener('click',()=>{
  console.log(JSON.stringify(cart));
});

function paymentSummaryRenderer(){
  console.log('inside payment summary renderer');

  let totalItems=0;
  let totalItemsCost=0;
  let totalShippingCost=0;
  let totalCostWithoutTax=0;
  let totalCostWithTax=0;
  let taxCost=0;

  for(let i=0;i<cart.length;i++){
    totalItems+=(Number)(cart[i].quantity);
    totalItemsCost+=(Number)(convertToDollars(cart[i].priceCents,cart[i].quantity));
    totalShippingCost+=(Number)((cart[i].deliveryPriceCents/100).toFixed(2));
  }

  totalCostWithoutTax=totalItemsCost+totalShippingCost;
  taxCost=totalCostWithoutTax*0.1;
  totalCostWithTax=totalCostWithoutTax+taxCost;

  let paymentSummaryTitle=`<div class="payment-summary-title">
            Order Summary
          </div>`;

  let itemsHTML=` <div class="payment-summary-row">
            <div>Items (${totalItems}):</div>
            <div class="payment-summary-money">$${totalItemsCost.toFixed(2)}</div>
          </div>`;

  let shippingHTML=`<div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${totalShippingCost.toFixed(2)}</div>
          </div>`;

  let totalCostHTML=`<div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalCostWithoutTax.toFixed(2)}</div>
          </div>`;

  let totalTaxHTML=`<div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${taxCost.toFixed(2)}</div>
          </div>`;

  let orderTotalHTML=`<div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${totalCostWithTax.toFixed(2)}</div>
          </div>`;

  let placeOrderBtnHTML=`<button class="place-order-button button-primary">
            Place your order
          </button> `;

  paymentSummaryElem.innerHTML=paymentSummaryTitle+itemsHTML+shippingHTML+totalCostHTML+totalTaxHTML+orderTotalHTML+placeOrderBtnHTML;
}

paymentSummaryRenderer();

