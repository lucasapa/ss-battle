
    var markedShip;
    var leviathanShip = 5;
    var ninjaAssasinShip = 1;
    var RedRibbonShip = 2;
    var KakarotShip = 4;
    var JackieShip = 3;

    $("#leviathanship, #ninjaassassinship, #kakarotship, #jackieship, #redribbonship").draggable({
        revert:"invalid"      // esto es para que si no cae en un div que draggable, vuelva a su pos inicial.
    });

    $("#strategyBoard .boardBody").droppable({
        over: function (event, ui) {
            var markedShip = $(ui.draggable).attr('id');
            $(this).removeClass("boardBody ui-droppable").addClass(markedShip);
        },
        out: function() {
            $(this).removeClass(markedShip).addClass("boardBody ui-droppable");
        }
     });

    var strategyBoard = $("#strategyBoard > div")[0];