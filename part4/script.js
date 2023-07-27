
var diary = ""
var emojis = ["🚀","🥰","😎","😀","😕","🤬"] 
var emoji = "😀"
var alertDate = "날짜를 입력 부탁드려요~!"
var alertText = "오늘 하루 있었던 일을 끄적여 볼까요?"
var alertEmoji = "오늘 하루를 이모지로 만들어 보아요~!"
var value =""


function saveHandler() {
    var date = $("#date").val();
    var text = $("#text").val();
    
    if (date == "") {
        alert(alertDate);
        callback();
    }
    if (text == "") {
        alert(alertText);
        callback();
    }
    if (emoji == "") {
        alert(alertEmoji);
        callback();
    }


    diary = `<a href="#" class="list-group-item list-group-item-action" aria-current="true">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${text}</h5>
      <small>${date}</small>
    </div>
    <small id="emojiSize">${emoji}</small>
    </a>`+diary

    $("#result").html(diary);

    localStorage.setItem("diary",diary);

    $("#date").val("");
    $("#text").val("");


}

function emojiSelected(event,value){
    if (value == 1) {
        emoji = "🚀";
    } else if (value == 2) {
        emoji = "🥰"
    } else if (value == 3) {
        emoji = "😎"
    }else if (value == 4) {
        emoji = "😀"
    }else if (value == 5) {
        emoji = "😕"
    }else if (value == 6) {
        emoji = "🤬"
    }

}


$(document).ready(function() {


    diary = localStorage.getItem("diary")
    
    if(diary == null) {
        diary = ""
    }
    $("#emoji").emoji({
        value: 4,
        width: '40px',
        starRating: false,
        emojis : emojis,
        callback : emojiSelected
    }) ;
    $("#result").html(diary);
    $("#save").click(saveHandler);

});