document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById("orderForm");
    var input = form.elements.number;
    var pSelect = form.elements.product;
    var rDiv = document.getElementById("result");
    var eDiv = document.getElementById("error");
    var calculateB = document.getElementById("calculateB");

    calculateB.addEventListener("click", function () {
        rDiv.textContent = "";
        eDiv.textContent = "";

        var nValue = input.value.trim();

        var regex = /^[1-9]\d*$/;
        if (!regex.test(nValue)) {
            eDiv.textContent = "Ошибка: введите положительное число";
            return;
        }

        var number = parseInt(nValue, 10);
        var price = parseInt(pSelect.value, 10);

        var total = number * price;
        rDiv.textContent = "Стоимость заказа: " + total + " руб ";
    });
});

