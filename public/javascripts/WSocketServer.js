var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket;
var WSPath = $("#WSocketPath").val();
var chatSocket = new WS(WSPath);
chatSocket.onmessage = receiveEvent;
$("#talk").keypress(handleReturnKey);
$("#opponentBoard .boardBody").click(handleClick);
var bot = new BattleshipBot();

var leviathanPoss;
var ninjaassassinPoss;
var kakarotPoss;
var jackiePoss;
var redribbonPoss;
var shipsStr;
var testShip;


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

function parseBoard(){

    ShipList ["leviathanship"]["Poss"] = document.getElementsByClassName("leviathanship")[0].firstChild.attributes.name.value.split(",");
    ShipList ["ninjaassassinship"]["Poss"] = document.getElementsByClassName("ninjaassassinship")[0].firstChild.attributes.name.value.split(",");
    ShipList ["kakarotship"]["Poss"] = document.getElementsByClassName("kakarotship")[0].firstChild.attributes.name.value.split(",");
    ShipList ["jackieship"]["Poss"] = document.getElementsByClassName("jackieship")[0].firstChild.attributes.name.value.split(",");
    ShipList ["redribbonship"]["Poss"] = document.getElementsByClassName("redribbonship")[0].firstChild.attributes.name.value.split(",");
    sendStrategyWS();

}

function sendStrategyWS(){



    typeStr = "strategy";
    shipsStr = {}
    shipsStr["type"] = "strategy"

    calculateAndCreate("Leviathan",ShipList["leviathanship"]["length"],ShipList["leviathanship"]["vertical"],ShipList ["leviathanship"]["Poss"]);
    calculateAndCreate("Kakarot",ShipList["kakarotship"]["length"],ShipList["kakarotship"]["vertical"],ShipList ["kakarotship"]["Poss"]);
    calculateAndCreate("Jackie",ShipList["jackieship"]["length"],ShipList["jackieship"]["vertical"],ShipList ["jackieship"]["Poss"]);
    calculateAndCreate("RedRibbon",ShipList["redribbonship"]["length"],ShipList["redribbonship"]["vertical"],ShipList ["redribbonship"]["Poss"]);
    calculateAndCreate("NinjaAssassin",ShipList["ninjaassassinship"]["length"],ShipList["ninjaassassinship"]["vertical"],ShipList ["ninjaassassinship"]["Poss"]);

    chatSocket.send(JSON.stringify(shipsStr));

}

function calculateAndCreate(ShipName,ShipLength,ShipVertical,ShipCenter){

    InicioDelBarco = (parseInt((ShipLength/2).toString().split(".")[0])); // formula para sacra la pimera posicion
                                                                                // del barco busco (la mitad)
    shipsStr[ShipName] = {};

    if(ShipVertical==true){  //se mueve Y
    for (var i=0;i<ShipLength;i=i+1)
    {

        shipsStr[ShipName][i] = {};
        shipsStr[ShipName][i]["x"] = parseInt(ShipCenter[0])+i - InicioDelBarco;  //shipCenter es un arreglo con las posiciones x e y.
        shipsStr[ShipName][i]["y"] = parseInt(ShipCenter[1]) ;
    }
}

if(ShipVertical==false){  //se mueve X
    for (var i=0;i<ShipLength;i=i+1)
        {

            shipsStr[ShipName][i] = {};
            shipsStr[ShipName][i]["x"] = parseInt(ShipCenter[0]);  //shipCenter es un arreglo con las posiciones x e y.
            shipsStr[ShipName][i]["y"] = parseInt(ShipCenter[1])+i - InicioDelBarco;
        }
    }

}

function TestEvent(ShipName,ShipLength,ShipVertical,ShipCenter){

    testShip ={};
    InicioDelBarco = (parseInt((ShipLength/2).toString().split(".")[0])); // formula para sacra la pimera posicion
    // del barco busco (la mitad)
    testShip[ShipName] = {};

    if(ShipVertical==true){  //se mueve Y
        for (var i=0;i<ShipLength;i=i+1)
        {

            testShip[ShipName][i] = {};
            testShip[ShipName][i]["x"] = parseInt(ShipCenter[0])+i - InicioDelBarco;  //shipCenter es un arreglo con las posiciones x e y.
            testShip[ShipName][i]["y"] = parseInt(ShipCenter[1]) ;
        }
    }

    if(ShipVertical==false){  //se mueve X
        for (var i=0;i<ShipLength;i=i+1)
        {

            testShip[ShipName][i] = {};
            testShip[ShipName][i]["x"] = parseInt(ShipCenter[0]);  //shipCenter es un arreglo con las posiciones x e y.
            testShip[ShipName][i]["y"] = parseInt(ShipCenter[1])+i - InicioDelBarco;
        }
    }
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
    if (data.type == 'attinfo'){
        $("#freeow").freeow("Info", data.message, {
            autoHide: true,
            autoHideDelay: 3000
        });
    }
    if (data.type == 'strategyStart'){
        $("#freeow").freeow("Info", data.message, {
            autoHide: true,
            autoHideDelay: 30000
        });

        function restar(){
            for(i=0; i<document.getElementsByClassName("paragraph-freeow").length;i++){
                if(document.getElementsByClassName("paragraph-freeow")[i].innerHTML.indexOf("strategy") != -1){
                    var innerString = document.getElementsByClassName("paragraph-freeow")[i].innerHTML;
                    var lastValue = innerString.substring(37,39);
                    if(parseInt(lastValue)>0){
                        var newValue = (parseInt(lastValue)-1)+" ";
                        var newString = innerString.replace(lastValue,newValue);
                        document.getElementsByClassName("paragraph-freeow")[i].innerHTML = newString;
                    }
                }
            }
        };

        setInterval(restar, 1000);



    }

    if (data.type == 'strategy') {

        document.getElementById("boards").style.display = "block";
        document.getElementById("autoplaydiv").style.display = "block";
        document.getElementById("strategyBoard").style.display = "none";
        document.getElementById("shipsBoard").style.display = "none";

        var parsedObj = JSON.parse(data.message);
        var board = document.getElementById("myBoard");
        var ships = parsedObj.ships;
        for(i=0; i<ships.length;i++){
            for(j=0;j<ships[i].fragments.length;j++){
                console.log(ships[i].fragments[j].x+","+ships[i].fragments[j].y);
                document.getElementsByName(ships[i].fragments[j].x+","+ships[i].fragments[j].y)[2].parentNode.className = "static";
            }
        }

        document.getElementById("main").style.display = "block";

        return;


    }

    if (data.type == 'winner') {
        $("span", chatLine).text(data.type);
        $("p", chatLine).text("YOU WIN !!!");
        $('#messages').append(chatLine);
        document.getElementById("autoplay").checked = false;
        div = document.getElementById("winner");
        div.setAttribute("class","dialogForeground");
        div.style.display = "block";
        setTimeout("",5000);
        div.style.display = "none";
        div.setAttribute("class","");
        return;
    }
     if (data.type == 'looser') {
        $("span", chatLine).text(data.type);
        $("p", chatLine).text("YOU LOOOOOSEEE");
        $('#messages').append(chatLine);
        document.getElementById("autoplay").checked = false;
        div = document.getElementById("looser");
        div.setAttribute("class","dialogForeground");
        div.style.display = "block";
        setTimeout("",5000);
        div.style.display = "none";
        div.setAttribute("class","");
        return;
    }

    if (data.type == 'shoot-attack') {
        document.getElementsByName(data.message)[1].parentNode.className = "hit";
        var pos = data.message.split(",");
        bot.update(parseInt(pos[0]),parseInt(pos[1]),"hit");
	return;
    }

    if (data.type == 'miss-attack') {
        document.getElementsByName(data.message)[1].parentNode.className = "miss";
        var pos = data.message.split(",");
        bot.update(parseInt(pos[0]),parseInt(pos[1]),"miss");
 	return;
    }

   if (data.type == 'shoot-defense') {
        document.getElementsByName(data.message)[2].parentNode.className = "hit";
        if(document.getElementById("autoplay").checked == true){
            var suggest = bot.suggest()
            qValue = suggest.x+","+suggest.y;
            sendMessage("shoot");
        }
	return;
    }

    if(data.type == 'miss-defense') {
	    document.getElementsByName(data.message)[2].parentNode.className = "miss";
        if(document.getElementById("autoplay").checked == true){
            var suggest = bot.suggest()
            qValue = suggest.x+","+suggest.y;
            sendMessage("shoot");
        }
	return;
    }

    if (data.type == 'wait') {
        $("#questionPanel").hide();
        $("#answerPanel").hide();
    }

    $("span", chatLine).text(data.type);
    $("p", chatLine).text(data.message);
    $('#messages').append(chatLine);
}

function handleClick(e){
    var position = e.target.firstChild.attributes["name"].value;
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
function shoot() {
    var shoot = $("#X").val()+","+$("#Y").val();
    qValue = shoot;
    sendMessage("shoot");
}


