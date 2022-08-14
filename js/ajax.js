let table = document.querySelector('#buy')
const xhr = new XMLHttpRequest()
let response = xhr.response
let prepared_data = []

xhr.onload = function() {
  if (this.status === 200) {
    response = xhr.response
    prepared_data = []
    
    for (let offer = 0; offer < 20; offer++) {
      prepared_data[0] = response[offer]["member"]
      prepared_data[1] = response[offer]["payment_method"].slice(0, 50)
      prepared_data[2] = ((response[offer]["price"] - 1) * 100).toFixed(2) + " %"
      prepared_data[3] = formatAmount(response[offer]["max"])

      if (table.tBodies[0].rows[offer].cells[0].textContent == "FastCoin") {
        table.tBodies[0].rows[offer].style.backgroundColor = "yellow"
      } else {
        table.tBodies[0].rows[offer].style.backgroundColor = ""
      }

      for (let field = 0; field < 4; field++) {
        table.tBodies[0].rows[offer].cells[field].textContent = prepared_data[field]
      }
    }
  }
}

setInterval(() => { 
  xhr.open("GET", "https://garantex.io/api/v2/otc/ads?direction=buy&payment_method=тинь")
  xhr.responseType = "json"
  xhr.send()
}, 2000);

function formatAmount(amount) {
  let res = ''

  amount = amount.split('')
  let numberOfAfterCommaSimbols = amount.length - amount.findIndex(el => el === ".")
  let digitsNum = 6 + numberOfAfterCommaSimbols
  amount = amount.join("")

  if (amount.length > digitsNum) {
    res = `${amount.slice(0, amount.length - digitsNum)} ${amount.slice(amount.length - digitsNum, amount.length - digitsNum + 3)} ${amount.slice(amount.length - digitsNum + 3, amount.length)}`
  } else if (digitsNum -= 3) {
    res = `${amount.slice(0, amount.length - digitsNum)} ${amount.slice(amount.length - digitsNum, amount.length)}`
  }

  return res
}

