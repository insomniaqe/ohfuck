const buy = document.querySelectorAll(".btn--product-buy")

function send(e) {
  const articulItem = e.target.getAttribute('data-articul')
  const articul = []
  const cart = JSON.parse(window.localStorage.getItem('cart'))

  if(cart) {
    articul.unshift(articulItem)
    const result = articul.concat(cart)

    window.localStorage.setItem('cart', JSON.stringify(result))
  } else {
    articul.unshift(articulItem)
    window.localStorage.setItem('cart', JSON.stringify(articul))
  }

  location.reload()

}
for (i = 0; i < buy.length; i++) {
  buy[i].addEventListener('click', send)
}