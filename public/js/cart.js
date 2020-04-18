const cart = JSON.parse(window.localStorage.getItem('cart'))

if(cart) document.querySelector(".cart__count").innerHTML = cart.length