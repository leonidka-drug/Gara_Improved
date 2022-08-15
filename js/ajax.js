const xhrToBuyData = new XMLHttpRequest()
const xhrToSellData = new XMLHttpRequest()

setInterval(() => { 
  xhrToSellData.open("GET", "https://garantex.io/api/v2/otc/ads?direction=sell&payment_method=тинь")
  xhrToSellData.responseType = "json"
  xhrToSellData.send()
}, 4500);

setInterval(() => {
  xhrToBuyData.open("GET", "https://garantex.io/api/v2/otc/ads?direction=buy&payment_method=тинь")
  xhrToBuyData.responseType = "json"
  xhrToBuyData.send()
}, 4500);

xhrToBuyData.onload = () => { responseHandler(xhrToBuyData, document.querySelector("#buy")) }
xhrToSellData.onload = () => { responseHandler(xhrToSellData, document.querySelector("#sell")) }

function responseHandler(xhr, table) {
  if (xhr.status === 200) {
    let response = xhr.response
    let prepared_data = []

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

function formatAmount(amount) {
  let res = ""

  amount = amount.split("")
  let numberOfAfterCommaSimbols = amount.length - amount.findIndex(el => el === ".")
  let digitsNum = 9 + numberOfAfterCommaSimbols
  amount = amount.join("")

  if (amount.length > digitsNum) {
    res = `${amount.slice(0, amount.length - digitsNum)} ${amount.slice(amount.length - digitsNum, amount.length - digitsNum + 3)} ${amount.slice(amount.length - digitsNum + 3, amount.length - digitsNum + 6)} ${amount.slice(amount.length - digitsNum + 6, amount.length)}`
  } else if (amount.length > (digitsNum -= 3)) {
    res = `${amount.slice(0, amount.length - digitsNum)} ${amount.slice(amount.length - digitsNum, amount.length - digitsNum + 3)} ${amount.slice(amount.length - digitsNum + 3, amount.length)}`
  } else if (amount.length > (digitsNum -= 3)) {
    res = `${amount.slice(0, amount.length - digitsNum)} ${amount.slice(amount.length - digitsNum, amount.length)}`
  }

  return res
}
