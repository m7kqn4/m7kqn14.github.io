function updatePrice() {
  let s = document.getElementsByName("prodType");
  let select = s[0];
  let price = 0;
  let prices = getPrices();
  let priceIndex = parseInt(select.value) - 1;
  if (priceIndex >= 0) {
    price = prices.prodTypes[priceIndex];
  }
  
  let radioDiv = document.getElementById("radios");
  let checkDiv = document.getElementById("checkboxes");
  
  if (select.value == "1") {
    radioDiv.style.display = "none";
    checkDiv.style.display = "none";
  }
  else if (select.value == "2") {
    radioDiv.style.display = "none";
    checkDiv.style.display = "block";
  }
  else if (select.value == "3") {
    radioDiv.style.display = "block";
    checkDiv.style.display = "none";
  }
  
  if (select.value == "3") {
    let radios = document.getElementsByName("prodOptions");
    radios.forEach(function(radio) {
      if (radio.checked) {
        let optionPrice = prices.prodOptions[radio.value];
        if (optionPrice !== undefined) {
          price += optionPrice;
        }
      }
    });
  }

  if (select.value == "2") {
    let checkboxes = document.querySelectorAll("#checkboxes input");
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        let propPrice = prices.prodProperties[checkbox.name];
        if (propPrice !== undefined) {
          price += propPrice;
        }
      }
    });
  }
  
  let input = document.getElementsByName("number")[0];
  let rDiv = document.getElementById("result");
  let eDiv = document.getElementById("error");
  
  let nValue = input.value.trim();
  let quantity = 1;
  
  if (nValue !== "") {
    let regex = /^[1-9]\d*$/;
    if (!regex.test(nValue)) {
      eDiv.textContent = "Ошибка: введите положительное число";
      rDiv.textContent = "";
      return;
    }
    quantity = parseInt(nValue, 10);
  }
  
  eDiv.textContent = "";
  let totalPrice = price * quantity;
  
  let prodPrice = document.getElementById("prodPrice");
  prodPrice.innerHTML = "Цена за единицу: " + price + " рублей";
  
  rDiv.innerHTML = "Общая стоимость: " + totalPrice + " рублей";
}

function getPrices() {
  return {
    prodTypes: [54, 39, 89],
    prodOptions: {
      option1: 0,
      option2: 25,
      option3: 130,
    },
    prodProperties: {
      prop1: 17,
      prop2: 21,
    }
  };
}

window.addEventListener('DOMContentLoaded', function (event) {
  let radioDiv = document.getElementById("radios");
  radioDiv.style.display = "none";
  
  let checkDiv = document.getElementById("checkboxes");
  checkDiv.style.display = "none";
  
  let s = document.getElementsByName("prodType");
  let select = s[0];
  select.addEventListener("change", function(event) {
    updatePrice();
  });
  
  let radios = document.getElementsByName("prodOptions");
  radios.forEach(function(radio) {
    radio.addEventListener("change", function(event) {
      updatePrice();
    });
  });

  let checkboxes = document.querySelectorAll("#checkboxes input");
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener("change", function(event) {
      updatePrice();
    });
  });

  let numberInput = document.getElementsByName("number")[0];
  numberInput.addEventListener("input", function(event) {
    updatePrice();
  });

  updatePrice();
});


