
    var markedShip;
    ShipList = {};
    ShipList ["leviathanship"] = {};
    ShipList ["leviathanship"]["length"]=5;
    ShipList ["leviathanship"]["vertical"]=false;
    ShipList ["leviathanship"]["grado"]=0;
    ShipList ["ninjaassassinship"] = {};
    ShipList ["ninjaassassinship"]["length"]=1;
    ShipList ["ninjaassassinship"]["vertical"]=false;
    ShipList ["ninjaassassinship"]["grado"]=0;
    ShipList ["redribbonship"] = {};
    ShipList ["redribbonship"]["length"]=3;
    ShipList ["redribbonship"]["vertical"]=false;
    ShipList ["redribbonship"]["grado"]=0;
    ShipList ["kakarotship"] = {};
    ShipList ["kakarotship"]["length"]=5;
    ShipList ["kakarotship"]["vertical"]=false;
    ShipList ["kakarotship"]["grado"]=0;
    ShipList ["jackieship"] = {};
    ShipList ["jackieship"]["length"]=3;
    ShipList ["jackieship"]["vertical"]=false;
    ShipList ["jackieship"]["grado"]=0;
    var leviathanShipLenght = 5;
    var leviathanShipVertical = false;
    var leviathanShipGrado=0;
    var ninjaAssasinShipLenght = 1;
    var ninjaAssasinShipVertical = false;
    var ninjaAssasinGrado=0;
    var RedRibbonShipLenght = 3;
    var RedRibbonShipVertical = false;
    var RedRibbonShipGrado=0;
    var KakarotShipLenght = 5;
    var KakarotShipVertical = false;
    var KakarotShipGrado=0;
    var JackieShipLenght = 3;
    var JackieShipVertical = false;
    var JackieShipGrado=0;
    var endPoss;
    var startPoss;


    $("#leviathanship, #ninjaassassinship, #kakarotship, #jackieship, #redribbonship").draggable({
        revert:"invalid" ,  // esto es para que si no cae en un div que draggable, vuelva a su pos inicial.
        snap:'#strategyBoard .boardBody',     // esta opcion es para que se autoajuste a algun div cdo apoyas el barco.( sirve para que no queden resutlados null)
        start: function(e) {
            startPoss = (e.clientX +","+ e.clientY).split(",");
        },
        revert: function (event, ui) {
            //overwrite original position
            if (!shipOutSide(event)){
                $(this).data("draggable").originalPosition = {
                    top: 0,
                    left: 0
                }
                return true;
            }
            return false;
        }

    });

    function shipOutSide (e){
       var shipCenter = document.getElementsByClassName(e[0].className)[0].firstChild.attributes.name.value.split(",");
       TestEvent(e[0].className,ShipList[e[0].className]["length"],ShipList[e[0].className]["vertical"],shipCenter);
       for (i=0;i<ShipList[e[0].className]["length"];i++){
           if (testShip[e[0].className][i]["x"]< 0 || testShip[e[0].className][i]["x"]> 9 || testShip[e[0].className][i]["y"]< 0 || testShip[e[0].className][i]["y"]> 9 ){
                 return false;
           }
        }
        return true;
    }

    $("#strategyBoard .boardBody").droppable({
        drop: function (event, ui) {
             markedShip = $(ui.draggable).attr('id');
            $(this).removeClass("boardBody ui-droppable").addClass(markedShip);
        },
        out: function() {
            if($(this)[0].className != markedShip && $(this)[0].className != "boardBody ui-droppable"){

            }else{
                $(this).removeClass(markedShip).addClass("boardBody ui-droppable");
            }
        }
     });



    $("#leviathanship, #ninjaassassinship, #kakarotship, #jackieship, #redribbonship").rotate({
        bind:{
            click:function () {
                if ($(this).attr("name") == "leviathanship"){
                    if (leviathanShipVertical == false){
                        leviathanShipVertical = true;
                        leviathanShipGrado=90;
                        $(this).rotate({ animateTo:90})
                    }
                    else {
                        leviathanShipVertical = false;
                        leviathanShipGrado=0;
                        $(this).rotate({ animateTo:0})
                    }

                }
                if ($(this).attr("name") == "ninjaassassinship"){
                    if (ninjaAssasinShipVertical == false){
                        ninjaAssasinShipVertical = true;
                        ninjaAssasinGrado=90;
                        $(this).rotate({ animateTo:90})
                    }
                    else {
                        ninjaAssasinShipVertical = false;
                        ninjaAssasinGrado=0;
                        $(this).rotate({ animateTo:0})
                    }

                }
                if ($(this).attr("name") == "kakarotship"){
                    if (KakarotShipVertical == false){
                        KakarotShipVertical = true;
                        KakarotShipGrado=90;
                        $(this).rotate({ animateTo:90})
                    }
                    else {
                        KakarotShipVertical = false;
                        KakarotShipGrado=0;
                        $(this).rotate({ animateTo:0})
                    }

                }
                if ($(this).attr("name") == "jackieship"){
                    if (JackieShipVertical == false){
                        JackieShipVertical = true;
                        JackieShipGrado=90;
                        $(this).rotate({ animateTo:90})
                    }
                    else {
                        JackieShipVertical = false;
                        JackieShipGrado=0;
                        $(this).rotate({ animateTo:0})
                    }

                }
                if ($(this).attr("name") == "redribbonship"){
                    if (RedRibbonShipVertical == false){
                        RedRibbonShipVertical = true;
                        RedRibbonGrado=90;
                        $(this).rotate({ animateTo:90})
                    }
                    else {
                        RedRibbonShipVertical = false;
                        RedRibbonGrado=0;
                        $(this).rotate({ animateTo:0})
                    }

                }
            }
        }

    });

