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
        }
    ))
    ;
    $("#talk").val('');
}

function sendStrategyWS(type) {
    typeStr = "strategy";
    var shipsStr = {}


    shipsStr["type"] = "strategy";
    shipsStr["Leviathan"] = {};
    shipsStr["Leviathan"][0] = {};
    shipsStr["Leviathan"][1] = {};
    shipsStr["Leviathan"][0]["x"] = "1";
    shipsStr["Leviathan"][0]["y"] = "1";
    shipsStr["Leviathan"][1]["x"] = "1";
    shipsStr["Leviathan"][1]["y"] = "2";

    shipsStr["Kakarot"] = {};
    shipsStr["Kakarot"][0] = {};
    shipsStr["Kakarot"][1] = {};
    shipsStr["Kakarot"][0]["x"] = "3";
    shipsStr["Kakarot"][0]["y"] = "4"
    shipsStr["Kakarot"][1]["x"] = "3";
    shipsStr["Kakarot"][1]["y"] = "5";

    shipsStr["Jackie"] = {};
    shipsStr["Jackie"][0] = {};
    shipsStr["Jackie"][0]["x"] =  "3";
    shipsStr["Jackie"][0]["y"] =  "2";

    shipsStr["RedRibbon"] = {};
    shipsStr["RedRibbon"][0] = {};
    shipsStr["RedRibbon"][0]["x"] =  "1";
    shipsStr["RedRibbon"][0]["y"] =  "5";

    shipsStr["NinjaAssassin"] = {};
    shipsStr["NinjaAssassin"][0] = {};
    shipsStr["NinjaAssassin"][0]["x"] = "8";
    shipsStr["NinjaAssassin"][0]["y"] =  "5";


    chatSocket.send(JSON.stringify(shipsStr));
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
        document.getElementById("boards").style.display = "block";
        document.getElementById("strategyBoard").style.display = "none";
        document.getElementById("shipsBoard").style.display = "none";

        var parsedObj = JSON.parse(data.message);
        var board = document.getElementById("myBoard");
        var ships = parsedObj.ships;
        for(i=0; i<ships.length;i++){
            for(j=0;j<ships[i].fragments.length;j++){
                document.getElementsByName(ships[i].fragments[j].x+","+ships[i].fragments[j].y)[2].parentNode.classList.add("hit");
            }
        }


    }

    if (data.type == 'shoot-attack') {
        document.getElementsByName(data.message)[1].parentNode.classList.add("hit");
	return;
    }

    if (data.type == 'miss-attack') {
        document.getElementsByName(data.message)[1].parentNode.classList.add("miss");
 	return;
    }

    if (data.type == 'shoot-defense') {
        document.getElementsByName(data.message)[2].parentNode.classList.add("hit");
	return;
    }

    if(data.type == 'miss-defense') {
	document.getElementsByName(data.message)[2].parentNode.classList.add("miss");
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


//$("#leviathanship").draggable();
//$("#kaka").droppable({
      //drop: function() { alert('dropped'); }
    //});


