
var initCash=0; // 최초 현금 보유량

var initStocks ={};
   
var stocks={}; // 총 주식 보유량
var cash; // 총 현금 보유량
var stocksPrice; // 총 보유주식 평가금액
var total; // 총 보유자산 (현금 + 주식)
var tradeHistory; // 거래 기록
var key = 0;


// $("#initCash").on("keyup",function(key){
//     if(key.keyCode==13) {
//         initCash = $("#initCash").val();
//         cash = parseFloat(initCash);
//         alert("엔터눌렀져욤?");
//         showResult();
//         $("#initCash").hide();
//         localStorage.setItem("cash",cash) ;
//     }
// });


function initCashInput() {
    let initCashInput = prompt("현금보유량을 입력해 주세요:", 1000000);
    if (initCashInput == null || initCashInput == "") {
      alert("값을 입력해주세요.");
      callback();
    } 
    cash = parseFloat(initCashInput);
    showResult();
    localStorage.setItem("cash",cash) ;
    cash = localStorage.getItem("cash")
    if (cash !== null) {
        $("#initCashInput").hide();
        $("#initCashAdd").show();
        $("#initCashMinus").show();
    }
  }

function initCashAdd() {
    let initCashAdd = prompt("입금 금액을 입력해 주세요", 1000000);
    if (initCashAdd == null || initCashAdd == "") {
      alert("값을 입력해주세요.");
      callback();
    } 
    cashAdd = parseFloat(initCashAdd);
    
    cash = localStorage.getItem("cash");
    cash = parseFloat(cash);
    cash = cash + cashAdd;
    localStorage.setItem("cash",cash) ;
    
    if (cash !== null) {
        $("#initCashInput").hide();
        $("#initCashAdd").show();
        $("#initCashMinus").show();
    }
    showResult();
  }

function initCashMinus() {
    let initCashMinus = prompt("출금 금액을 입력해 주세요", 1000000);
    if (initCashMinus == null || initCashMinus == "") {
      alert("값을 입력해주세요.");
      callback();
    } 
    cashMinus = parseFloat(initCashMinus);
    
    cash = localStorage.getItem("cash");
    cash = parseFloat(cash);
    cash = cash - cashMinus;
    if(cash <0) {
        alert("출금 할 수 있는 현금이 부족합니다.");
        callback();
    }
    localStorage.setItem("cash",cash) ;
    
    if (cash !== null) {
        $("#initCashInput").hide();
        $("#initCashAdd").show();
        $("#initCashMinus").show();
    }
    showResult();
  }

function getStocksPrice() {
    stocksPrice = 0;

    for(var event in stocks) {
        var stock = stocks[event];
   
        stocksPrice = stocksPrice + stock["price"] * stock["amount"];
        
    }

}



function setStock(event, price, amount) {
    var stock = stocks[event];
  

    stocks[event] = {
        price : price,
        amount : amount +stock["amount"]
    }
  
    localStorage.setItem("stocks",JSON.stringify(stocks));

}

function showResult() {
    total = cash + stocksPrice;

    var profit = total - cash;
    var percentage = profit / cash * 100;

    percentage = Math.round(percentage);

    $("#total").html(total.toLocaleString());
  
    $("#cash").html(cash.toLocaleString());
    $("#stocks-price").html(stocksPrice.toLocaleString());
    $("#profit").html(profit.toLocaleString());
    $("#percentage").html(percentage);
    
    
    // tradeHistory = localStorage.getItem([1]) ;
    $("#trade-history").html(tradeHistory);

    $("time.timeago").timeago();
    ///매수, 매도에따른 Tradehistory 라인 색깔
    // $('.sales').each(function(){
    //     if($(this).text() == '매수'){
    //       $(this).parent().css({'background-color' : '--success'})
    //     }
    //     else{
    //        $(this).parent().css({'background-color' : '#f08080'})
    //     }
    //    });
    var dataP=[];
    for (var event in stocks){
        var stock = stocks[event];
        sprice = stock["price"];
        sprice = parseFloat(sprice);
        samount = stock["amount"];
        // samount = parseFloat(samount);
        y= sprice*samount;
        y= Math.round(y/stocksPrice*100); 
        label=event;
        
        if(y==0 || stocksPrice==0){
                ;
        }
        else {
            dataP.push({ y:y,label:label});
        }
    }

    if(dataP==0){
        $("#chartContainer").hide();
        $("#piechart").show();
    }
    else{
        $("#chartContainer").show();
        $("#piechart").hide();
        
        var options = {
            
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 40,
            toolTipContent: "<b>{label}</b>: {y}%",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} : {y}%",
            dataPoints: dataP
            }]
        };
        $("#chartContainer").CanvasJSChart(options);
    }
}

function buyHandler() {
    var datetime = $("#datetime").val();
    var event = $("#event").val();
    var price = $("#price").val();
    var amount = $("#amount").val();
    
    
    if (datetime == "") {
        alert("날짜를 입력해주세요.");
        callback();
    }
    if (event == "") {
        alert("종목을 선택해 주세요.");
        callback();
    }
    if (price == "") {
        alert("평단가를 입력해 주세요.");
        callback();
    }
    if (amount == "") {
        alert("수량을 입력해 주세요.");
        callback();
    }
   
    price = parseFloat(price);
    amount = parseFloat(amount);

    var buyPrice = price * amount;

    if(buyPrice>cash) {

        alert("보유 현금이 부족합니다.");
        return false;

    }
    
    cash = cash - buyPrice;

    localStorage.setItem("cash",cash) ;
    
    key = key+ 1 
    tradeHistory =`
        <tr class = "table-success">
            <td><button type="button" id="${key}" onclick="reply_click(this.id)" class="btn btn-primary btn-sm">삭제</button></td>
            <th scope="row">
                <time class="timeago" datetime=${datetime}>${datetime}</time>
            </th>
            <td class="sname">${event}</td>
            <td class="sales">매수</td>
            <td class="price">${price}</td>
            <td class="amount">${amount}</td> 
            <td>${buyPrice.toLocaleString()}</td>
        </tr>`;
    
    
    localStorage.setItem(key,tradeHistory);
    
    tradeHistory = "";
    
    for (var i = 0; i <key+1; i++) {
       
        value = localStorage.getItem([i]);
        
        tradeHistory = value + tradeHistory
    }
 


  

    setStock(event, price, amount);

    getStocksPrice();
    
    showResult();
    $("#datetime").val("");
    $("#price").val("");
    $("#amount").val("");

}

function sellHandler () {
    var datetime = $("#datetime").val();
    var event = $("#event").val();
    var price = $("#price").val();
    var amount = $("#amount").val();

    if (datetime == "") {
        alert("날짜를 입력해주세요.");
        callback();
    }
    if (event == "") {
        alert("종목을 선택해 주세요.");
        callback();
    }
    if (price == "") {
        alert("평단가를 입력해 주세요.");
        callback();
    }
    if (amount == "") {
        alert("수량을 입력해 주세요.");
        callback();
    }
    
    price = parseFloat(price);
    amount = parseFloat(amount);

    var sellPrice = price * amount;

    if(amount>stocks[event]["amount"]) {
        alert("매도 수량이 보유량보다 많습니다.");
        return false;

    }

    cash = cash + sellPrice;

    localStorage.setItem("cash",cash) ;

    
    key = key+ 1 
    tradeHistory = `
    <tr class="table-danger">
        <td><button type="button" id="${key}" onclick="reply_click(this.id)" class="btn btn-primary btn-sm">삭제</button></td>
        <th scope="row">
            <time class="timeago" datetime=${datetime}>${datetime}</time>
        </th>
        <td class="sname">${event}</td>
        <td class="sales">매도</td>
        <td class="price">${price}</td>
        <td class="amount">${amount}</td> 
        <td>${sellPrice.toLocaleString()}</td>
    </tr>`;
    
    localStorage.setItem(key,tradeHistory);

    tradeHistory = "";

    for (var i = 0; i <key+1; i++) {
       
        value = localStorage.getItem([i]);
        
        tradeHistory = value + tradeHistory
    }

    setStock(event, price, -1*amount);

    getStocksPrice();
    
    showResult();

    $("#datetime").val("");
    $("#price").val("");
    $("#amount").val("");

}


function reply_click(clicked_id)
  {
    if(confirm("삭제하시겠습니까 ?") == true){
        alert("삭제되었습니다");
    }
    else{
        return ;
    }
    var delKey = clicked_id;


    //delkey에 해당하는 value값을 reverse-매수
    value = localStorage.getItem([delKey]);

    $("#trade-history").html(value);
    var remEvent = $('.sname').text();
    var remPrice = $('.price').text();
    var remAmount = $('.amount').text();
    var remSales = $('.sales').text();
  
    remPrice = parseFloat(remPrice);
    //  *1000;

    
    localStorage.removeItem([delKey]);

    var keys =Object.keys(localStorage)
   
    keys = keys.map(item=> item[0]).filter(val => !isNaN(val));

    keys = Math.max(...keys)

    if(keys==-Infinity) {
        keys=0;
    }


   
    for (i = keys+2; i > 0; i--) {
        if(keys==0){
            lastPrice = 0;
            break
        }
        value =localStorage.getItem(i); 
        $("#trade-history").html(value);
        var event = $('.sname').text();
        var lastPrice = $('.price').text();
        lastPrice = parseFloat(lastPrice);
        
        if(event == remEvent) {
            break;   
        }
        else { lastPrice= 0}

    }
    lastPrice = lastPrice;


    var newAmount = 0
    for (i = keys+2; i > 0; i--) {
        if(keys==0){
            newAmount = 0;
            break
        }
        value =localStorage.getItem(i); 
        $("#trade-history").html(value);
        var event = $('.sname').text();
        var amount = $('.amount').text();
        var sales = $('.sales').text();
        amount = parseFloat(amount);
        if(isNaN(amount)) {
            amount=0;
        }
        if(event == remEvent && sales =="매수") {
            amount = amount;
            newAmount = amount+newAmount;
        }    
        if(event == remEvent && sales =="매도") {
            amount = amount*-1;
            newAmount = amount+newAmount;
        }
       
        
    }
   
    
    
    
    stocks[remEvent] = {
        price : lastPrice,
        amount : newAmount 
    }

    tradeHistory = "";

    for (var i = 0 ; i < keys+2 ; i++ ) {
            

                
            value = localStorage.getItem([i]);
            
            $("#trade-history").html(value);
            if ( value == null) {
                continue
            };
                    
            tradeHistory = value + tradeHistory  ;
        
    }
    


   
   console.log(remSales);



    if (remSales == "매수") {
  
        // 매수 삭제의 경우 해당 price 50000, amount 2 제거해서 cash원상복귀
        var sellPrice = remPrice * remAmount;
        
      
        cash = cash + sellPrice;


        localStorage.setItem("cash",cash) ;
         // 매수 삭제의 경우 해당 price 50000, amount 2 제거해서 stocksPrice원상 복귀
        // var stock = stocks[remEvent];

    
    }
            
    // 이제,,, 가장큰 key 값을 기준으로 for문 돌면서 sname=삼성전자이면 price값 가져오기
    if (remSales == "매도") {
    

   
        // 매도 삭제의 경우 해당 price 50000, amount 2 제거해서 cash원상복귀
        var buyPrice = remPrice * remAmount;

 
        cash = cash - buyPrice;


        localStorage.setItem("cash", cash);
        // 매수 삭제의 경우 해당 price 50000, amount 2 제거해서 stocksPrice원상 복귀
        // var stock = stocks[remEvent];
    }
    
 
    
    // var stock = stocks[remEvent];
    
    // stocks[remEvent] = {
    //     price : lastPrice,
    //     amount : Amount 
    // }
    

  
    localStorage.setItem("stocks", JSON.stringify(stocks));

    getStocksPrice();

    showResult();
    $("#datetime").val("");
    $("#price").val("");
    $("#amount").val("");

    

       
    
  }



$(document).ready(function() {

    eventList = ``
    $.getJSON("lists.json", function(data){
        for (i = 0 ; i<data.length; ++i) {
            if (data[i]["시장구분"] == "KOSPI") {
            list=data[i]["종목명"];
            eventList=`<option value=${list}>${list}</option>`+eventList;
            initStocks[list]= {
                price:0,
                amount: 0
            }
            
           }
        }
        
    
        $("#lists").html(JSON.stringify(eventList));
    }).fail(function(){
        console.log("An error has occurred.");
    });

    stocks=initStocks

    
    // $("#lists").on("keyup", function() {
    //     var value = $(this).val().toLowerCase();
    //     $("#lists option").filter(function() {
    //       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    //     });
    //   });

   

    stocks = JSON.parse(localStorage.getItem("stocks"));
    
    if (stocks == null) {
        stocks = initStocks;
    }

    cash = localStorage.getItem("cash");

    if (cash == null) {
        cash = initCash;
        $("#initCashAdd").hide();
        $("#initCashMinus").hide();
    }


    cash = parseFloat(cash);

    tradeHistory = localStorage.getItem("tradeHistory");

    if(tradeHistory == null) {

        tradeHistory = "";

    }
    if (cash !== 0) {
        $("#initCashInput").hide();
        $("#initCashAdd").show();
        $("#initCashMinus").show();;
    }

    getStocksPrice();
    showResult();

    $("#buy").click(buyHandler);
    $("#sell").click(sellHandler);
    $("#initCashInput").click(initCashInput);
    $("#initCashAdd").click(initCashAdd);
    $("#initCashMinus").click(initCashMinus);
    $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#trade-history tr").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });


});



























