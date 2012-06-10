
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
    var startPoss;


    $("#leviathanship, #ninjaassassinship, #kakarotship, #jackieship, #redribbonship").draggable({
        // esto es para que si no cae en un div que draggable, vuelva a su pos inicial.
        snap:'#strategyBoard .boardBody',     // esta opcion es para que se autoajuste a algun div cdo apoyas el barco.( sirve para que no queden resutlados null)
        revert: function (event, ui) {
            //overwrite original position
            if (event[0]== null) {

                $(this).data("draggable").originalPosition = {
                    top: 0,
                    left: 0
                }
                return true;
            }
            else if (!shipOutSide(event[0].className)){
                $(this).data("draggable").originalPosition = {
                    top: 0,
                    left: 0
                }
                return true;
            }

        }

    });

    function shipOutSide (e){
       name = e;
       var shipCenter = document.getElementsByClassName(name)[0].firstChild.attributes.name.value.split(",");
       TestEvent(name,ShipList[name]["length"],ShipList[name]["vertical"],shipCenter);
       for (i=0;i<ShipList[name]["length"];i++){
           if (testShip[name][i]["x"]< 0 || testShip[name][i]["x"]> 9 || testShip[name][i]["y"]< 0 || testShip[name][i]["y"]> 9 ){
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
            click:function (event) {
                if (!ShipList[event.srcElement.name]["vertical"]){
                    ShipList[event.srcElement.name]["vertical"]=true;
                    if (shipOutSide(event.srcElement.name)){
                        ShipList[event.srcElement.name]["grado"]=90;
                        $(this).rotate({ animateTo:90})
                    }
                    else{ ShipList[event.srcElement.name]["vertical"]=false;
                        alert("Se te va IDIOTA")}
                }
                else {
                    ShipList[event.srcElement.name]["vertical"] = false;
                    if (shipOutSide(event.srcElement.name)){
                        ShipList[event.srcElement.name]["grado"]=0;
                        $(this).rotate({ animateTo:0})
                   }
                    else{ ShipList[event.srcElement.name]["vertical"] = true;
                        alert("Se te va IDIOTA")}
                }
            }
        }
    });

