function btnClick() {
  
  const optionArr = []
  const form = document.forms
  
  for (i = 0; i < form.length; i++) {
    const select = form[i].elements.mark
    for (n = 0; n < select.options.length; n++) {
      const option = select.options[n]
      if (option.selected) {
        optionArr.push(option.value)
      }
    }
  }

  $.post("/admin/uploadbd",
   {'ids[]': optionArr},
   function(result){
     console.log(result)
  }
);

}