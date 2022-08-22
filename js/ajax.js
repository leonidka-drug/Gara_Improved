const xhrToBuyData = new XMLHttpRequest()
const xhrToSellData = new XMLHttpRequest()

setInterval(() => { 
  xhrToSellData.open("GET", `https://garantex.io/api/v2/otc/ads?direction=sell&payment_method=${getPaymentMethod()}`)
  xhrToSellData.responseType = "json"
  xhrToSellData.send()
}, 4100);

setInterval(() => {
  xhrToBuyData.open("GET", `https://garantex.io/api/v2/otc/ads?direction=buy&payment_method=${getPaymentMethod()}`)
  xhrToBuyData.responseType = "json"
  xhrToBuyData.send()
}, 4100);

xhrToBuyData.onload = () => {
  responseHandler(xhrToBuyData, document.querySelector("#buy"))
}
xhrToSellData.onload = () => {
  responseHandler(xhrToSellData, document.querySelector("#sell"))
}

function responseHandler(xhr, table) {
  if (xhr.status === 200) {
    const response = xhr.response
    let prepared_data = []
    const offsetMultiplier = parseInt(document.querySelector(".active").textContent) - 1

    for (let offerIndex = 0; offerIndex < (response.length < 20 ? response.length : 20); offerIndex++) {
      offset = offsetMultiplier * 20
      offer = offerIndex + offset
      prepared_data[1] = response[offer]["member"]
      prepared_data[2] = response[offer]["payment_method"].slice(0, 50)
      prepared_data[3] = ((response[offer]["price"] - 1) * 100).toFixed(2) + " %"
      prepared_data[4] = formatAmount(response[offer]["min"])
      prepared_data[5] = formatAmount(response[offer]["max"])

      for (let field = 1; field < 6; field++) {
        table.tBodies[0].rows[offerIndex].cells[field].textContent = prepared_data[field]
      }
    }
  }
}

function formatAmount(amount) {
  let res = ""
  let digitsNum = 9 + 3
  amount = parseFloat(amount).toFixed(2) + ""

  if (amount.length > digitsNum) {
    res = `${amount.slice(0, amount.length - digitsNum)} 
      ${amount.slice(amount.length - digitsNum, amount.length - digitsNum + 3)} 
      ${amount.slice(amount.length - digitsNum + 3, amount.length - digitsNum + 6)} 
      ${amount.slice(amount.length - digitsNum + 6, amount.length)}`
  } else if (amount.length > (digitsNum -= 3)) {
    res = `${amount.slice(0, amount.length - digitsNum)} 
      ${amount.slice(amount.length - digitsNum, amount.length - digitsNum + 3)} 
      ${amount.slice(amount.length - digitsNum + 3, amount.length)}`
  } else if (amount.length > (digitsNum -= 3)) {
    res = `${amount.slice(0, amount.length - digitsNum)} 
      ${amount.slice(amount.length - digitsNum, amount.length)}`
  } else {
    res = amount
  }

  return res
}

function getPaymentMethod() {
  let pattern = ""
  const inputText = document.querySelector("#payment").value

  if (inputText === "") {
    pattern = "тинь"
  } else {
    pattern = inputText
  }

  return pattern
}
