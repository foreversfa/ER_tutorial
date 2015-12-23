$(document).ready(function() {

    function Word(text, category, definition, address) {
        this.text = text;
        this.category = category;
        this.definition = definition;
        this.address = address;
    }

    var w2 = new Word('rash', 'green', 'A rash is a change of the skin which affects its color, appearance, or texture.', 'https://en.wikipedia.org/wiki/Rash');
    var w3 = new Word('sprain', 'green', 'A stretching or tearing of ligaments, the fibrous tissue that connects bones and joints.', 'https://en.wikipedia.org/wiki/Sprain');
    var w4 = new Word('abdominal pain', 'yellow', 'Abdominal pain is pain that occurs between the chest and pelvic regions. Abdominal pain can be crampy, achy, dull, intermittent or sharp. It’s also called a stomachache.', 'https://en.wikipedia.org/wiki/Abdominal_pain');
    var w5 = new Word('non cardiac chest pain', 'yellow', 'ecurring angina-like substernal chest pain of noncardiac origin. ', 'https://en.wikipedia.org/wiki/Chest_pain');
    var w6 = new Word('multiple fracture', 'yellow', 'fracture at two or more places in a bone', 'https://en.wikipedia.org/wiki/Bone_fracture');
    var w7 = new Word('laceration', 'yellow', 'a deep cut or tear in skin or flesh.', 'https://en.wikipedia.org/wiki/Wound');
    var w8 = new Word('Renal Calculi', 'yellow', 'A small, hard deposit that forms in the kidneys and is often painful when passed.', 'https://en.wikipedia.org/wiki/Kidney_stone');
    var w9 = new Word('Cardiopulmonary arrest', 'red', 'Sudden, unexpected loss of heart function, breathing, and consciousness.', 'https://en.wikipedia.org/wiki/Cardiac_arrest');

    //an array contains all words
    var dict = [w2, w3, w4, w5, w6, w7, w8, w9];
    //check if finished
    var finished = 0;
    //append words to the area

    for (var i = 0; i <= dict.length - 1; i++) {
        // $('.wordlist').append('<div class="words ">'+dict[i].text+'</div>');
        $('<div>' + dict[i].text + '</div>').data('category', dict[i].category).attr('class', 'words').appendTo($('.wordlist')).draggable({
            containment: '.content',
            cursor: 'move',
            revert: true,
            start: function(event, ui) {
                ui.helper.data('dropped', false);
                $(this).draggable("option", "revert", true);
            }

            // stop: function(event,ui){
            // 	if(!ui.helper.data('dropped')){
            		
            		
            // 	}
            // }
        })
    }

    //make words draggleble;


    // $('.words').draggable({containment:'.content',cursor:'move',revert:true})

    //make area droppable;
    $('.dropArea').droppable({
        accept: '.words',
        drop: wordsDrop
    });




    function wordsDrop(event, ui) {
        var match = (ui.draggable.data('category') == $(this).parent().attr('id'));
        ui.draggable.data('dropped', true);
        var dropped = ui.draggable;
        var droppedOn = $(this);
        if (match) {
            ui.draggable.attr({
                "class": "words ui-draggable correct"
            });
            finished++;
            $(dropped).detach().css({top: 0,left: 0}).appendTo(droppedOn);
            ui.draggable.draggable('option', 'revert', false);
            
            if(finished==dict.length){
            	console.log('111111');
            	$('<div><img src="img/welldone.jpg" alt="Well Done"></div>').attr('class','successText').prependTo($('.symptom'));
            }
        } else {
            ui.draggable.attr({
                "class": "words ui-draggable false"
            });
            $(dropped).detach().css({top: 0,left: 0}).appendTo(droppedOn);
            ui.draggable.draggable('option', 'revert', false);
        }
    }

})
