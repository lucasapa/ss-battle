var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket;
var WSPath = $("#WSocketPath").val();
var chatSocket = new WS(WSPath);
chatSocket.onmessage = receiveEvent;
$("#talk").keypress(handleReturnKey);
$("#opponentBoard .boardBody").click(handleClick);

function sendMessage(type) {
    chatSocket.send(JSON.stringify(
        {
            type:type,
            text:$("#talk").val(),
            shootValue:qValue
        }
    ))
    ;
    $("#talk").val('');
}

function receiveEvent(event) {
    var data = JSON.parse(event.data);

    // Handle errors
    if (data.error) {
        chatSocket.close();
        $("#onError span").text(data.error);
        $("#onError").show();
        return
    } else {
        $("#onChat").show();
    }

    // Create the message element
    var chatLine = $('<div class="message"><span></span><user></user><p></p></div>');
    if (data.type == 'chat') {
        $(chatLine).addClass('chat');
        $("user", chatLine).text(data.name + ":");
    }
    if (data.type == 'mistake') $(chatLine).addClass('mistake');
    if (data.type == 'start') $(chatLine).addClass('start');
    if (data.type == 'leave') $(chatLine).addClass('leave');
    if (data.type == 'info') $(chatLine).addClass('info');

    if (data.type == 'ask') {
        $("#questionPanel").show();
        $("#answerPanel").hide();
    }
    if (data.type == 'answer') {
        $("#answerPanel").show();
    }
    if (data.type == 'strategy') {
        //DRAW STRATEGY HERE !
    }

    if (data.type == 'shoot-attack') {


       if(data.message != "miss"){
            document.getElementById(data.message).parentNode.classList.add("hit")
       }else{
            document.getElementById(qValue).parentNode.classList.add("miss")
       }
    }

    if (data.type == 'shoot-defense') {
        if(data.message != "miss"){
            document.getElementById(data.message).parentNode.classList.add("hit")
        }
    }


    if (data.type == 'wait') {
        $("#questionPanel").hide();
        $("#answerPanel").hide();
    }
    if (data.type == 'my-ask' || data.type == 'my-answer') {
        $(chatLine).addClass('question');
        $("#questionPanel").hide();
        $("#answerPanel").hide();
    }
    if (data.type == 'op-ask' || data.type == 'op-answer') {
        $(chatLine).addClass('question');
    }
    $("span", chatLine).text(data.type);
    $("p", chatLine).text(data.message);
    $('#messages').append(chatLine)
}

function handleClick(e){
    var position = e.target.firstChild.id;
    qValue = position;
    sendMessage("shoot");
    console.log('Atacaste en la posición '+ position);
}

function handleReturnKey(e) {
    if (e.charCode == 13 || e.keyCode == 13) {
        e.preventDefault();
        sendMessage("chat");
    }
}

function getServerInfo() {
    sendMessage("serverInfo");
}

var qValue;
var qString;
function shoot() {
    var shoot = $("#X").val()+","+$("#Y").val();
    qValue = shoot;
    sendMessage("shoot");
}

