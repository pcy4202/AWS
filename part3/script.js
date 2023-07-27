function calculateHandler() {
    
    var loan = $("#loan").val();
    var interest = $("#interest").val();
    var period = $("#period").val();

    if (loan == "" || loan == 0 ) {
        $("#result").text(`대출금을 입력 하세요.`)
    }
    else if (interest == ""|| interest == 0) {
        $("#result").text(`대출금리를 입력 하세요.`)
    }
    else if (period == ""|| period == 0) {
        $("#result").text(`대출기간을 입력 하세요.`)
    }

    else {
    console.log(loan);
    loan = Number(loan.replaceAll(',', ''));

    interest = parseFloat(interest);
    period = parseFloat(period);


    var interestMonth = interest / 12 / 100;

    var div1 = loan * interestMonth * (1 + interestMonth) ** period;
    var div2 = (1 + interestMonth) ** period-1;

    var result = Math.round(div1 / div2).toLocaleString();

    var resultText = `고객님의 월 상환액은 <mark>${result}</mark>원 입니다.`
   
    $("#result").html(resultText);
    }
}

function refreshHandler() {
    $("#loan").val(0);
    $("#interest").val(0);
    $("#period").val(0);

    $("#result").text("");
}

function loan100Handler() {
    var loan = $("#loan").val();

    if (loan == "") {
        loan = 0;
    }
    else{
        loan = Number(loan.replaceAll(',', ''));
    }
   
    loan = loan + 1000000;
    loan = loan.toLocaleString()
    

    $("#loan").val(loan);

}

function loan1000Handler() {
    var loan = $("#loan").val();

    if (loan == "") {
        loan = 0;
    }
    else{
        loan = Number(loan.replaceAll(',', ''));
    }
   

    loan = loan + 10000000;
    loan = loan.toLocaleString()
    
    

    $("#loan").val(loan);

}

function loan10000Handler() {
    var loan = $("#loan").val();

    if (loan == "") {
        loan = 0;
    }
    else{
        loan = Number(loan.replaceAll(',', ''));
    }
   
    loan = loan + 100000000;
    loan = loan.toLocaleString()
    
    

    $("#loan").val(loan);

}



function interest3Handler() {
    var interest = $("#interest").val();

    if( interest == "") {
        interest = 0
    }

    interest = parseFloat(interest);

    interest = interest + 3;

    $("#interest").val(interest);
}

function interest4Handler() {
    var interest = $("#interest").val();

    if( interest == "") {
        interest = 0
    }

    interest = parseFloat(interest);

    interest = interest + 4;

    $("#interest").val(interest);
}


function interest5Handler() {
    var interest = $("#interest").val();

    if( interest == "") {
        interest = 0
    }

    interest = parseFloat(interest);

    interest = interest + 5;

    $("#interest").val(interest);
}

function period1Handler() {
    var period = $("#period").val();

    if( period == "") {
        period = 0
    }
    period = parseFloat(period);

    period = period + 12;
    
    $("#period").val(period)

}

function period3Handler() {
    var period = $("#period").val();

    if( period == "") {
        period = 0
    }
    period = parseFloat(period);

    period = period + 36;
    
    $("#period").val(period)

}

function period5Handler() {
    var period = $("#period").val();

    if( period == "") {
        period = 0
    }
    period = parseFloat(period);

    period = period + 60;
    
    $("#period").val(period)

}

const input = document.querySelector('#loan');
console.log(input);
input.addEventListener('keyup', function(e) {
  let value = e.target.value;
  value = Number(value.replaceAll(',', ''));
  if(isNaN(value)) {
    input.value = 0;
  }else {
    const formatValue = value.toLocaleString();
    input.value = formatValue;
  }
})

$(document).ready(function() {
    $("#calculate").click(calculateHandler);
    $("#refresh").click(refreshHandler);


    $("#loan-100").click(loan100Handler);
    $("#loan-1000").click(loan1000Handler);
    $("#loan-10000").click(loan10000Handler);

    $("#interest-3").click(interest3Handler);
    $("#interest-4").click(interest4Handler);
    $("#interest-5").click(interest5Handler);

    $("#period-1").click(period1Handler);
    $("#period-3").click(period3Handler);
    $("#period-5").click(period5Handler);
});