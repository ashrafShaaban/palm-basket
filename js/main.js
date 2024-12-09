
let openmenu = document.querySelector(".header .icons i:last-child");
let closemenu = document.querySelector(".header .header-nav .close-menu");
let mymenu = document.querySelector(".header .header-nav");

let cartcount = document.querySelector(".header .icons span");
let cartContent = document.querySelector(".cart-content");
let cartTotalprice = document.querySelector(".total-price");

let cart=document.querySelector(".cart");
let order=document.querySelector(".order");
let closecart= document.querySelector(".cart #cart-close");
let opencart=document.querySelector("#cart-icon");

let buybtn=document.querySelector(".btn-buy");
let itemsArr = [];




openmenu.onclick = function(){
    mymenu.classList.toggle("active");
  
}
closemenu.onclick = function(){
    mymenu.classList.remove("active");
  
}

opencart.onclick = function(){
    cart.classList.add("active");
}
closecart.onclick = function()
{
    cart.classList.remove("active");
}

if(document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded",start);
}else{
    start();
}

function start(){
  
  loadCart();
  addevents();
}
function update(){
    addevents();
    update_total_price();
}
function addevents(){
   //   remove product from cart
   let carttrashs = document.querySelectorAll(".cart .cart-remove");
   carttrashs.forEach(carttrash => carttrash.addEventListener("click",removeItem_Handler));

   // handle product quantity
   let cartProductsquantity= document.querySelectorAll(".product-quantity");

   cartProductsquantity.forEach((Productquantity)=>
   {
    Productquantity.addEventListener("change",change_Handler);
   })

   // add product to cart
   let add_btn=  document.querySelectorAll(".add-cart");

   add_btn.forEach((add_item)=> add_item.addEventListener("click",addItem_Handler));
}


function addItem_Handler(){
    let cart = JSON.parse(localStorage.getItem('cartcontent')) || [];
    let item = this.parentElement;
    let title = item.querySelector(".product-title").innerHTML;
    let price = item.querySelector(".product-price").innerHTML;
    let imgsrc = item.querySelector("img").src;
   
   let newItem = {
    title,
    price,
    imgsrc,
   };
   // check if product exist or not
    if(cart.find((el) => el.title == newItem.title)){
        alert("This item is already exist");
        return;
    }else
    {
        cart.push(newItem);
    }

   // add product to cart
   let cartboxElement = CartBoxContent(title,price,imgsrc);
   let newnode = document.createElement("div");
   newnode.innerHTML= cartboxElement;
   
   cartContent.appendChild(newnode);
   
   cartcount.innerHTML++;
   
   
   localStorage.setItem("cartCount",cartcount.innerHTML);
   localStorage.setItem("cartcontent",JSON.stringify(cart));
   update();

}
function removeItem_Handler(){
    
    this.parentElement.remove();
    let cart = JSON.parse(localStorage.getItem('cartcontent')) || [];
    cartcount.innerHTML--;
    cart=cart.filter((el)=> 
        {
            return el.title != this.parentElement.querySelector(".cart-product-title").innerHTML
        }
    )
    localStorage.setItem("cartCount",cartcount.innerHTML);
    localStorage.setItem('cartcontent', JSON.stringify(cart));
    update();
    // loadCart();
   
}

function change_Handler(){

    if(isNaN(this.value) || this.value <0){
        this.value = 1;
    }
    this.value =Math.floor(this.value);



    update();
}
function update_total_price(){
    let cartBoxes=document.querySelectorAll(".cart-box");
   
   
    let Total=0;
    let totalinreset=0;
    cartBoxes.forEach((cartBox)=>{
        let productPrice = cartBox.querySelector(".cart-price");
        let productTitle =cartBox.querySelector(".cart-product-title");
        let price = parseFloat(productPrice.innerHTML);
        let productQuantity= cartBox.querySelector(".product-quantity").value;
        
        Total += price * productQuantity;
        totalinreset+=price;
        
        
        
       
    })

    cartTotalprice.innerHTML =  Total + "EGP" ;
    
    // itemArr.push(productsobj);

    localStorage.setItem("totalprice",totalinreset);
}


function CartBoxContent(title,price,imgsrc){
    return `
            <div class="cart-box">
            <img src=${imgsrc} class="cart-img"/>
            <div class="details">
                <div class="cart-product-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="product-quantity">
            </div>

            <!-- remove product -->
            <i class="fa-solid fa-trash cart-remove"></i>
        </div>
    `
}

// save cart to local storage
// window.onload=function(){
//     loadCart();
// }

function loadCart(){
    
        // Get the cart data from localStorage
        let cart = JSON.parse(localStorage.getItem('cartcontent')) || [];
        let cCount = localStorage.getItem("cartCount");
        let totalPrice=localStorage.getItem("totalprice") || 0;
    //     if (totalPrice) {
    //     return totalPrice;  // Convert it back to a number
    // } else {
    //     return 0;  // Default total if no price is stored
    // }
      
        // If the cart is empty, display a message
        
      
        // Otherwise, render the cart items
        let cartHTML = '';
        cart.forEach(item => {
          cartHTML += `
        
                <div class="cart-box">
                    <img src=${item.imgsrc} class="cart-img"/>
                        <div class="details">
                            <div class="cart-product-title">${item.title}</div>
                            <div class="cart-price">${item.price}</div>
                            <input type="number" value="1" class="product-quantity">
                        </div>

                    <!-- remove product -->
                    <i class="fa-solid fa-trash cart-remove"></i>
                </div>
       
          `;
        });
      
        // Insert cart items into the cart container

        cartcount.innerHTML = cCount;
       cartContent.innerHTML = cartHTML;
       cartTotalprice.innerHTML = totalPrice + "EGP";
 
      
}

buybtn.addEventListener("click",openbuyform);

function openbuyform(){
    let cartBoxes=document.querySelectorAll(".cart-box");
    let buydiv=document.createElement("div");
    buydiv.classList.add("popup-overlay");
    let form=document.createElement("form");
    form.classList.add("form-var")
    form.method="POST";
   
    
    
    cartBoxes.forEach((cartbox)=>{
           let itemdiv=document.createElement("div");
        itemdiv.classList.add("itemdiv");
        
       let itemimg= document.createElement("img");

       itemimg.src=cartbox.querySelector("img").src; 
        
       
       let itemTitle = document.createElement("input");
       itemTitle.value=cartbox.querySelector(".cart-product-title").innerHTML;
       itemTitle.id="title";
       itemTitle.readOnly=true;
       let Titlelabel = document.createElement("label");
       Titlelabel.setAttribute('for',itemTitle.id);
       Titlelabel.textContent="Name of item";
       let itemTitelvalue=itemTitle.value;

       let itemQuantity = document.createElement("input");
       itemQuantity.value =  cartbox.querySelector(".product-quantity").value;
       itemQuantity.readOnly=true;
       itemQuantity.id="quantity";
       let quantitylabel = document.createElement("label");
       quantitylabel.setAttribute('for',itemQuantity.id);
       quantitylabel.textContent="Total Quantity";
       let itemQuantityvalue=itemQuantity.value;

       let itemprice = document.createElement("input");
       itemprice.value=(parseFloat(cartbox.querySelector(".cart-price").innerHTML) * itemQuantity.value) + "EGP";
       itemprice.readOnly=true;
       itemprice.id="price";
       let pricelabel = document.createElement("label");
       pricelabel.setAttribute('for',itemprice.id);
       pricelabel.textContent="Total Price of item";
       let itemPricevalue=itemprice.value;


       let itemobj={
        itemTitelvalue,
        itemQuantityvalue,
        itemPricevalue,
       }
     
      
      itemdiv.appendChild(itemimg);
      itemdiv.appendChild(Titlelabel);
      itemdiv.appendChild(itemTitle);
      itemdiv.appendChild(quantitylabel);
      itemdiv.appendChild(itemQuantity);
      itemdiv.appendChild(pricelabel);
      itemdiv.appendChild(itemprice);
       
      itemsArr.push(itemobj);
       form.appendChild(itemdiv);
    })
    
     let totalItemsprice=document.querySelector("div");
     totalItemsprice.classList.add("totalitemprice");
     totalItemsprice.innerHTML = `Total Price of Order : ${cartTotalprice.innerHTML}` ;

     form.appendChild(totalItemsprice);
     let totalOrderprice=totalItemsprice.innerHTML;

     let Name = document.createElement("input");
     Name.type="text";
     Name.id="name";
     Name.placeholder = "enter your name";
     Name.classList.add("cell");

     let address = document.createElement("input");
     address.type="text";
     address.id="address";
     address.placeholder = "enter your address";
     address.classList.add("cell");
     address.classList.add("add");

     let phone = document.createElement("input");
     phone.type="number";
     phone.id="phone";
     phone.placeholder = "enter your phone";
     phone.classList.add("cell");
     
     let email = document.createElement("input");
     email.type="email";
     email.id="email";
     email.placeholder = "enter your email";
     email.classList.add("cell");
  
     form.appendChild(Name);
     form.appendChild(email);
     form.appendChild(address);
     form.appendChild(phone);
     
     let sumbitdiv=document.createElement("div");
     sumbitdiv.classList.add("submitbtn");
     let submitbtn=document.createElement("button");
     submitbtn.classList.add("spanbtn");
     
     submitbtn.type="sumbit";
     submitbtn.innerHTML="Send Your Order";
     
     sumbitdiv.appendChild(submitbtn);

     form.appendChild(sumbitdiv);
    
     let myButton = document.createElement("span");
    myButton.className= "PopUp-Btn";
    let BtnText = document.createTextNode("X");
    myButton.appendChild(BtnText);
     form.appendChild(myButton);


     form.appendChild(sumbitdiv);
    
   
    
    
    buydiv.appendChild(form);
    document.body.appendChild(buydiv);
    console.log(itemsArr);
  
    function sendMail(){
        let parms={
           
            orderitems:JSON.stringify(itemsArr,null,2),
            totalorderprice:totalItemsprice.innerHTML,

            name:document.getElementById("name").value,
            address:document.getElementById("address").value,
            phone:document.getElementById("phone").value,
        }

        emailjs.send("service_9sz6z6m", "template_dv3sgyx", parms)
        .then(response => {
            console.log("Email sent successfully:", response);
            Swal.fire({
                title: "Thanks for making your order!",
                text: "Our marketing Team will contact you in your email to confirm your order!",
                icon: "success"
              });
              document.querySelector(".popup-overlay").remove();
        })
        .catch(error => {
            console.error("Error sending email:", error);
            alert("Failed to send order.");
            document.querySelector(".popup-overlay").remove();
        });

      
       
    }
    form.onsubmit=()=>{
        
        sendMail();
     
        return false;
       
        
    }
      
   
}
document.addEventListener("click",(e)=>{
   if(e.target.className === "PopUp-Btn"){
     document.querySelector(".popup-overlay").remove();
   }
})
// document.addEventListener("submit",(e)=>{
//     if(e.target.className === "form-var"){
       
//        sendMail();
//        return false;
//     }
// })

// function sendMail(){
//         let parms={
           
//             orderitems:JSON.stringify(itemsArr,null,2),
            
//         }

//         emailjs.send("service_9sz6z6m", "template_dv3sgyx", parms)
//         .then(response => {
//             console.log("Email sent successfully:", response);
//             alert("Order sent successfully!");
//         })
//         .catch(error => {
//             console.error("Error sending email:", error);
//             alert("Failed to send order.");
//         });
//         window.location.reload();
       
//     }
