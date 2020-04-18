// Registry
document.querySelector("#signUp .btn").onclick = function sendSms() {

  const xhr = new XMLHttpRequest()
  const name = document.querySelector("#signUp .signName").value
  const phone = document.querySelector("#signUp .signPhone").value
  const innerPhone = document.querySelector("#smsConfirm .returnNumber")
  innerPhone.innerHTML = phone

  xhr.open("POST", "/register")
  xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
  xhr.send(JSON.stringify({name: name, phone: phone}))

  xhr.onload = () => {
    document.querySelector("#smsConfirm .requestId").value = xhr.response
    $('#signUp').modal('hide')
    $('#smsConfirm').modal('show')
  }


}


document.querySelector("#smsConfirm .btn").onclick = function confirmSms() {

  const xhr = new XMLHttpRequest()
  const pin = document.querySelector("#smsConfirm .confirm").value
  const requestId = document.querySelector("#smsConfirm .requestId").value
  const name = document.querySelector("#signUp .signName").value
  const phone = document.querySelector("#signUp .signPhone").value

  xhr.open("POST", "/verify")
  xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
  xhr.send(JSON.stringify({pin: pin, requestId: requestId, name: name, phone: phone}))

  xhr.onload = () => {
    $('#smsConfirm').modal('hide')
    location.reload()
  }

}

// SignIn
document.querySelector("#signIn .btn").onclick = function sendSignInSms() {

  const xhr = new XMLHttpRequest()
  const phone = document.querySelector("#signIn .signPhone").value
  const innerPhone = document.querySelector("#smsSignIn .returnNumber")
  innerPhone.innerHTML = phone

  xhr.open("POST", "/signin")
  xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
  xhr.send(JSON.stringify({phone: phone}))

  xhr.onload = () => {
    document.querySelector("#smsSignIn .requestId").value = xhr.response
    $('#signIn').modal('hide')
    $('#smsSignIn').modal('show')
  }


}

document.querySelector("#smsSignIn .btn").onclick = function signInSms() {

  const xhr = new XMLHttpRequest()
  const pin = document.querySelector("#smsSignIn .confirm").value
  const requestId = document.querySelector("#smsSignIn .requestId").value
  const phone = document.querySelector("#signIn .signPhone").value

  xhr.open("POST", "/signInSms")
  xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
  xhr.send(JSON.stringify({pin: pin, requestId: requestId, phone: phone}))

  xhr.onload = () => {
    $('#smsSignIn').modal('hide')
    location.reload()
  }

}

// Logout
document.querySelector(".log_out").onclick = function logout() {
  document.cookie = "authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
  location.reload()
}