
    var markedShip;

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

                    //$(this).addclass(merkedShip);
                   // out: $ (this).removeClass("").addClass("boardBody ui-droppable over");


          //  over: $(this).addClass(ui.draggable).attr('id')


            //$(this).removeClass('boardBody ui-droppable over').addClass('boardBody ui-droppable');

    });
