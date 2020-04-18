const source = document.querySelectorAll(".product-preview__img")

for(var i = 0; i < source.length; i++) {

  outSource = source[i].src.split(',')
  source[i].src=outSource[0]

}