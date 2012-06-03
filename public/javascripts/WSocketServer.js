var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket;
var WSPath = $("#WSocketPath").val();
var chatSocket = new WS(WSPath);
chatSocket.onmessage = receiveEvent;
$("#talk").keypress(handleReturnKey);
$("#opponentBoard .boardBody").click(handleClick);

var leviathanPoss;
var ninjaassassinPoss;
var kakarotPoss;
var jackiePoss;
var redribbonPoss;
var shipsStr;

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

function parseBoard(){

    leviathanPoss = document.getElementsByClassName("leviathanship")[0].firstChild.attributes.name.value.split(",");
    ninjaassassinPoss = document.getElementsByClassName("ninjaassassinship")[0].firstChild.attributes.name.value.split(",");
    kakarotPoss = document.getElementsByClassName("kakarotship")[0].firstChild.attributes.name.value.split(",");
    jackiePoss = document.getElementsByClassName("jackieship")[0].firstChild.attributes.name.value.split(",");
    redribbonPoss = document.getElementsByClassName("redribbonship")[0].firstChild.attributes.name.value.split(",");
    createStrategy();

}

function createStrategy(){

    typeStr = "strategy";
    shipsStr = {}
    shipsStr["type"] = "strategy"

    calculateAndCreate("Leviathan",leviathanShipLenght,leviathanShipVertical,leviathanPoss);
    calculateAndCreate("Kakarot",KakarotShipLenght,KakarotShipVertical,kakarotPoss);
    calculateAndCreate("Jackie",JackieShipLenght,JackieShipVertical,jackiePoss);
    calculateAndCreate("RedRibbon",RedRibbonShipLenght,RedRibbonShipVertical,redribbonPoss);
    calculateAndCreate("NinjaAssassin",ninjaAssasinShipLenght,ninjaAssasinShipVertical,ninjaassassinPoss);

}

function calculateAndCreate(ShipName,ShipLength,ShipVertical,ShipCenter){

    var InicioDelBarco = ShipLength-((ShipLength/2).toString().split(".")[0]-1); // formula para sacra la pimera posicion
                                                                                // del barco busco (la mitad - 1)

if(ShipVertical==false){  //se mueve Y

    for (var i=0;i<=ShipLength;i=i+1)
    {
        shipsStr[ShipName] = {};
        shipsStr[ShipName][i] = {};
        shipsStr[ShipName][i]["x"] = ShipCenter[0] ;  //shipCenter es un arreglo con las posiciones x e y.
        shipsStr[ShipName][i]["y"] = ShipCenter[1]+i - InicioDelBarco;
    }
}

if(ShipVertical==false){  //se mueve X
    for (var i=0;i<=ShipLength;i=i+1)
        {
            shipsStr[ShipName] = {};
            shipsStr[ShipName][i] = {};
            shipsStr[ShipName][i]["x"] = ShipCenter[1]+i - InicioDelBarco ;  //shipCenter es un arreglo con las posiciones x e y.
            shipsStr[ShipName][i]["y"] = ShipCenter[0];
        }
    }

}


function sendStrategyWS(type) {
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
                console.log(ships[i].fragments[j].x+","+ships[i].fragments[j].y);
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


