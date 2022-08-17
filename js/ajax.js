const xhrToBuyData = new XMLHttpRequest()
const xhrToSellData = new XMLHttpRequest()

setInterval(() => { 
  xhrToSellData.open("GET", "https://garantex.io/api/v2/otc/ads?direction=sell&payment_method=тинь")
  xhrToSellData.responseType = "json"
  xhrToSellData.send()
}, 4100);

setInterval(() => {
  xhrToBuyData.open("GET", "https://garantex.io/api/v2/otc/ads?direction=buy&payment_method=тинь")
  xhrToBuyData.responseType = "json"
  xhrToBuyData.send()
}, 4100);

setInterval(() => {
  highlight(document.querySelector("#buy"))
  highlight(document.querySelector("#sell"))
}, 500)

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

      for (let field = 0; field < 4; field++) {
        table.tBodies[0].rows[offer].cells[field].textContent = prepared_data[field]
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
  }

  return res
}

function highlight(table) {
  for (let offer = 0; offer < 20; offer++) {
    const row = table.tBodies[0].rows[offer]
    const nick = row.cells[0].textContent

    if (nick == "FastCoin") {
      row.style.backgroundColor = "yellow"
    } else if (nick == "Piu" || nick == "Olegblatnov") {
      row.style.backgroundColor = "#b9e8d9"
    } else {
      row.style.backgroundColor = ""
    }
  }
}

