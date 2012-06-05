
    var markedShip;
    var leviathanShipLenght = 5;       // todabia no lo uso es por si luks es un nepe .
    var leviathanShipVertical = false;
    var leviathanShipGrado=0;
    var ninjaAssasinShipLenght = 1;
    var ninjaAssasinShipVertical = false;
    var ninjaAssasinGrado=0;
    var RedRibbonShipLenght = 3;
    var RedRibbonShipVertical = false;
    var RedRibbonGrado=0;
    var KakarotShipLenght = 5;
    var KakarotShipVertical = false;
    var KakarotShipGrado=0;
    var JackieShipLenght = 3;
    var JackieShipVertical = false;
    var JackieShipGrado=0;


    $("#leviathanship, #ninjaassassinship, #kakarotship, #jackieship, #redribbonship").draggable({
        revert:"invalid" ,  // esto es para que si no cae en un div que draggable, vuelva a su pos inicial.
        snap:'#strategyBoard .boardBody'     // esta opcion es para que se autoajuste a algun div cdo apoyas el barco.( sirve para que no queden resutlados null)

    });

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

