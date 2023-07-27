function plusHandler() {
    var firstNumber = $("#first-number").val();
    var secondNumber = $("#second-number").val();

    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    var result = firstNumber + secondNumber;

    $("#result").text(result);
}

function minusHandler() {
    var firstNumber = $("#first-number").val();
    var secondNumber = $("#second-number").val();

    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    var result = firstNumber - secondNumber;

    $("#result").text(result);
}

function multiHandler() {
    var firstNumber = $("#first-number").val();
    var secondNumber = $("#second-number").val();

    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    var result = firstNumber * secondNumber;

    $("#result").text(result);
}

function divideHandler() {
    var firstNumber = $("#first-number").val();
    var secondNumber = $("#second-number").val();

    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    var result = (firstNumber / secondNumber).toFixed(2);

    $("#result").text(result);
}

$(document).ready(function() {
    $("#plus").click(plusHandler);
    $("#minus").click(minusHandler);
    $("#multi").click(multiHandler);
    $("#divide").click(divideHandler);
});