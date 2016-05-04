$(document).ready(function() {

    //word constructor
    function Word(text, definition, address) {
        this.text = text;
        this.definition = definition;
        this.address = address;
    }

    var w1 = new Word('triage', '(in medical use) the assignment of degrees of urgency to wounds or illnesses to decide the order of treatment of a large number of patients or casualties.', 'https://en.wikipedia.org/wiki/Triage');
    var w2 = new Word('rash', 'A rash is a change of the skin which affects its color, appearance, or texture.', 'https://en.wikipedia.org/wiki/Rash');
    var w3 = new Word('sprain', 'A stretching or tearing of ligaments, the fibrous tissue that connects bones and joints.', 'https://en.wikipedia.org/wiki/Sprain');
    var w4 = new Word('abdominal pain', 'Abdominal pain is pain that occurs between the chest and pelvic regions. Abdominal pain can be crampy, achy, dull, intermittent or sharp. It’s also called a stomachache.', 'https://en.wikipedia.org/wiki/Abdominal_pain');
    var w5 = new Word('non cardiac chest pain', 'ecurring angina-like substernal chest pain of noncardiac origin. ', 'https://en.wikipedia.org/wiki/Chest_pain');
    var w6 = new Word('multiple fracture', 'fracture at two or more places in a bone', 'https://en.wikipedia.org/wiki/Bone_fracture');
    var w7 = new Word('laceration', 'a deep cut or tear in skin or flesh.', 'https://en.wikipedia.org/wiki/Wound');
    var w8 = new Word('Renal Calculi', 'A small, hard deposit that forms in the kidneys and is often painful when passed.', 'https://en.wikipedia.org/wiki/Kidney_stone');
    var w9 = new Word('Cardiopulmonary arrest', 'Sudden, unexpected loss of heart function, breathing, and consciousness.', 'https://en.wikipedia.org/wiki/Cardiac_arrest');

    //an array contains all words
    var dict = [w1, w2, w3, w4, w5, w6, w7, w8, w9];

    //sorting function
    dict.sort(function(a, b) {
        var wordA = a.text.toLowerCase(),
            wordB = b.text.toLowerCase()
        if (wordA < wordB) //sort string ascending
            return -1
        if (wordA > wordB)
            return 1
        return 0 //default return value (no sorting)
    })

    //write to html
    for(var i=0;i<=dict.length-1;i++){
    	$('#table-body').append('<tr><td class="col-sm-3"><a href="'+dict[i].address+'">'+dict[i].text +'</a></td><td>'+dict[i].definition+' </td> </tr>')
    }


})
