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
            shootValue:qValue,
            strategy:strategyValue
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
        document.getElementsByName(data.message)[0].parentNode.classList.add("hit");
	return;
    }

    if (data.type == 'miss-attack') {
        document.getElementsByName(data.message)[0].parentNode.classList.add("miss");
 	return;
    }

    if (data.type == 'shoot-defense') {
        document.getElementsByName(data.message)[1].parentNode.classList.add("hit");
	return;
    }

    if(data.type == 'miss-defense') {
	document.getElementsByName(data.message)[1].parentNode.classList.add("miss");
	return;
    }

    if (data.type == 'wait') {
        $("#questionPanel").hide();
        $("#answerPanel").hide();
    }

    $("span", chatLine).text(data.type);
    $("p", chatLine).text(data.message);
    $('#messages').append(chatLine)
}

function handleClick(e){
    var position = e.target.firstChild.attributes["name"].value;
    qValue = position;

//Chequear que solo en el opponentBoard se pueda hacer click
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
function shoot() {
    var shoot = $("#X").val()+","+$("#Y").val();
    qValue = shoot;
    sendMessage("shoot");
}

function sendStrategy(){
    var data = "{\"Leviathan\" : {{\"x\" : \"8.0\", \"y\" : \"1.0\"}, {\"x\" : \"8.0\", \"y\" : \"2.0\"}, {\"x\" : \"8.0\", \"y\" : \"3.0\"}, {\"x\" : \"8.0\", \"y\" : \"4.0\"}, {\"x\" : \"8.0\", \"y\" : \"5.0\"}, }, \"NinjaAssassin\" : {{\"x\" : \"8.0\", \"y\" : \"9.0\"}, }, \"Kakarot\" : {{\"x\" : \"0.0\", \"y\" : \"5.0\"}, {\"x\" : \"0.0\", \"y\" : \"6.0\"}, {\"x\" : \"0.0\", \"y\" : \"7.0\"}, {\"x\" : \"0.0\", \"y\" : \"8.0\"}, }, \"RedRibbon\" : {{\"x\" : \"2.0\", \"y\" : \"7.0\"}, {\"x\" : \"2.0\", \"y\" : \"8.0\"}, }, \"Jackie\" : {{\"x\" : \"2.0\", \"y\" : \"6.0\"}, {\"x\" : \"4.0\", \"y\" : \"1.0\"}, {\"x\" : \"4.0\", \"y\" : \"2.0\"}, {\"x\" : \"4.0\", \"y\" : \"3.0\"}, }, }";
    strategyValue = data;
    sendMessage("strategy");
}


$("#leviathanship").draggable();
$("#kaka").droppable({
      drop: function() { alert('dropped'); }
    });


