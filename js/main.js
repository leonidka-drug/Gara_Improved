setInterval(() => {
  highlight(document.querySelector("#buy"))
  highlight(document.querySelector("#sell"))
}, 500)

function highlight(table) {
  for (let offer = 0; offer < 20; offer++) {
    const row = table.tBodies[0].rows[offer]
    const eachNickname = row.cells[1].textContent
    const mainNickname = document.querySelector("#main-highlight").value
    const anyNickname1 = document.querySelector("#highlight-2").value
    const anyNickname2 = document.querySelector("#highlight-3").value

    if (eachNickname === "") {
      row.style.backgroundColor = ""
    } else if (eachNickname == mainNickname) {
      row.style.backgroundColor = "yellow"
    } else if (eachNickname == anyNickname1 || eachNickname == anyNickname2) {
      row.style.backgroundColor = "#b9e8d9"
    } else {
      row.style.backgroundColor = ""
    }
  }
}

const pages = document.querySelectorAll(".page")
pages.forEach(value => {
  value.onclick = () => {
    if (value.classList[2] !== "active") {
      pages.forEach(value => {
        if (value.classList.contains("active")) {
          value.classList.remove("active")
        }
      })
      
      value.classList.add("active")
    }
  }
})