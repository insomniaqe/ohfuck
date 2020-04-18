setTimeout(() => {
  const clear = document.querySelectorAll(".cart-delete")
  const clearAll = document.querySelector(".btn--cart-clear")

  function funcClear(e) {

    const articulItem = e.target.getAttribute('data-articul')
    const cart = JSON.parse(window.localStorage.getItem('cart'))
  
    const el = cart.indexOf(articulItem)

    cart.splice(el, 1)

    window.localStorage.setItem('cart', JSON.stringify(cart))

    location.reload()
  
  }
  for (i = 0; i < clear.length; i++) {
    clear[i].addEventListener('click', funcClear)
  }

  clearAll.addEventListener('click', () => {
    window.localStorage.removeItem('cart')
    location.reload()
  })
}, 5000)