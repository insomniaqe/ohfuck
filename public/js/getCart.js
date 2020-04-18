const cartItem = JSON.parse(window.localStorage.getItem('cart'))

const funcPostData = data => {
  const price = document.querySelector('.product-total__price')
  const product = document.querySelector('.col-lg-10.product-preview')
  const count = document.querySelector('.product-total__in-stock')

  console.log(typeof data.price)
  price.innerHTML = '<span class="total">Итог к оплате</span>' + data.price
  count.innerHTML = data.product.length + ' товаров'

  for(i=0;i<data.product.length;i++) {

    product.insertAdjacentHTML("afterbegin", `<div class="product-preview__wrapper product-preview__wrapper--cart">
    <div class="product-preview__left">
      <h3 class="product-preview__title product-preview__title--cart"> ${data.product[i]['Наименование детали']} ${data.product[i]['Марка']} ${data.product[i]['Модель']} c ${data.product[i]['Год']} г.</h3>
        <div class="product-preview__info-wrapper">
            <img src="${data.product[i]['URL фото детали']}" alt="${data.product[i]['Наименование детали']} ${data.product[i]['Марка']} ${data.product[i]['Модель']} c ${data.product[i]['Год']} г." class="product-preview__img">
            <div class="product-preview__info">
                <p class="product-preview__text">${data.product[i]['Объем']}, ${data.product[i]['Двигатель']}, ${data.product[i]['КПП']}, ${data.product[i]['Год']}.</p>
                <div class="product-note product-note--cart">
                    <div class="product-note__column">
                        <div class="product-note__wrapper">
                            <p class="product-note__title">Артикул:</p>
                            <p class="product-note__text">${data.product[i]['Артикул']}</p>
                        </div>
                    </div>
                    <div class="product-note__column">
                        <div class="product-note__wrapper">
                            <p class="product-note__title">Оригинал:</p>
                            <p class="product-note__text">Да</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <button class="cart-delete" data-articul="${data.product[i]['Артикул']}"></button>
    </div>`);

  }

}

if(cartItem) {

  const xhr = new XMLHttpRequest()

  xhr.open("POST", "/cart")
  xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
  xhr.send(JSON.stringify({cart: cartItem}))

  xhr.onload = () => {
    const result = JSON.parse(xhr.response)
    funcPostData(result)
  }
}