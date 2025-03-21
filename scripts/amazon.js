import {cart as cart, addToCart as addToCart,clearCart} from '../data/cart.js'
import { products } from '../data/products.js';
import { convertToDollars } from './utils/money.js';

const resetCartBtnElement=document.querySelector('.reset-cart');
resetCartBtnElement.addEventListener('click',()=>{
  resetCart()
})

// productsInCart.push('product2');
// console.log(productsInCart);
// const products=[{
//     name :"Black and Gray Athletic Cotton Socks - 6 Pairs",
//     image : "images/products/athletic-cotton-socks-6-pairs.jpg",
//     rating:{
//         stars:"images/ratings/rating-45.png",
//         count : 87
//     },
//     priceCents   : 1090
// },
// {
//     name : "Intermediate Size Basketball",
//     image : "images/products/intermediate-composite-basketball.jpg",
//     rating :{
//         stars: "images/ratings/rating-40.png",
//         count:127
//     },
//     priceCents:2095
// },
// {
//     name : "Adults Plain Cotton T-Shirt - 2 Pack",
//     image : "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
//     rating : {
//         stars:"images/ratings/rating-45.png",
//         count: 56
//     },
//     priceCents : 799
// }
// ]


// console.log(products);

let HTMLforProducts='';

function renderer(product,param2){
    // console.log('param2 = '+param2);//param2 is index
    
    let HTMLforProduct=` 
        <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars*10}.png">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${convertToDollars(product.priceCents)}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary add-to-cart-req" data-product-Id=${product.id}>
          <div class=show-add-to-cart-notification></div>
          Add to Cart
        </button>
      </div>`;

  HTMLforProducts+=HTMLforProduct;

}

products.forEach(renderer);

const allProductsGridElem=document.querySelector('.products-grid');

if(allProductsGridElem){
  allProductsGridElem.innerHTML+=HTMLforProducts;
}

const addToCartReqAllElem=document.querySelectorAll('.add-to-cart-req');

addToCartReqAllElem.forEach((addToCartReqElem)=>{
  addToCartReqElem.addEventListener('click',(event)=>{
      let productId=event.target.dataset.productId;
      console.log(event.target.dataset.productId);

      const productContainerElem=event.target.closest('.product-container');
    
      const quantityElem=productContainerElem.querySelector('select');
      const nameElem=productContainerElem.querySelector('.product-name');
      const imageURLElem=productContainerElem.querySelector('.product-image');
      const priceElem=productContainerElem.querySelector('.product-price');
      const addedToCartNotificationElem=productContainerElem.querySelector('.added-to-cart');

      if(addedToCartNotificationElem.setTimeoutId){
        console.log('removing the old setTimeout');
        clearTimeout(addedToCartNotificationElem.setTimeoutId);
      }
       
      console.log('showing notification');
      addedToCartNotificationElem.style.opacity="1";
      addedToCartNotificationElem.setTimeoutId=setTimeout(()=>{
        console.log('removing the notification');
        addedToCartNotificationElem.style.opacity="0";
      },2000);
    

      let quantity=(Number)(quantityElem.value);
      const name=nameElem.innerText;
      const image=imageURLElem.src;
      let price=priceElem.innerText;

      console.log(quantity+' '+name+' are requested via add to cart button, cost '+price);

      price=((Number)(price.substring(1))*100).toFixed(2);
      console.log('price = '+price);
      addToCart(productId,quantity,name,price,image);
  });
});

console.log('cart no is : '+JSON.stringify(cart));

function resetCart(){
  console.log('inside resetCart()');
  clearCart();
}