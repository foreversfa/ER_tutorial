$(document).ready(function() {

    function Question(qstring, idnum, qtype, optional) {

        this.qstring = qstring;
        this.idnum = idnum;
        this.qtype = qtype;
        this.optional = optional;
    }

    var q1 = new Question('Do you have an medical insurance?',
        '11',
        'radio', [{
            text: "Yes, for sure",
            next: '21',
            comment: ''
        }, {
            text: "Nope I don't",
            next: '51',
            comment: 'You need to get an insurance IMMEDIATELLY'
        }]);

    var q2 = new Question('Does your insurance cover all emergency cases?',
        '21',
        'radio', [{
            text: "Yep, luckily",
            next: '31',
            comment: ""
        }, {
            text: "Nope it doesn't",
            next: '32',
            comment: ''
        }]);

    var q3 = new Question('Does your emergency include all hospitals/emergency rooms?',
        '31',
        'radio', [{
            text: 'Yep, my insurance is wonderful',
            next: '51',
            comment: "Good, you don't need to worry about insurance"
        }, {
            text: "Nope",
            next: '42',
            comment: ''
        }]);

    var q4 = new Question('What diseases/situations are excluded?',
        '32',
        'text', [{
            text: 'Type here',
            next: '31',
            comment: "Here are the situations that will cost you a lot when you go to ER:"
        }]);

    var q5 = new Question('Where should you go?',
        '42',
        'text', [{
            text: 'Type here',
            next: '51',
            comment: "Here are emergency room that you can go:"
        }]);

    var q6 = new Question('Do you have friends that can help you in an emergency case?',
        '51',
        'radio', [{
            text: 'Yep, there are some one closely related to me',
            next: '61',
            comment: ""
        }, {
            text: "Nope, I don't have close friends",
            next: '62',
            comment: ''
        }]);

    var q7 = new Question('Type their names and phone numbers in one line?',
        '61',
        'text', [{
            text: 'Type here',
            next: '62',
            comment: "Here are friends that will help you:"
        }]);

    var q8 = new Question('Do you install Uber or Lyft in your phone?',
        '62',
        'radio', [{
            text: 'Yep, I already installed and had an account',
            next: '',
            comment: "You can use them to call for a taxi when you are in an emergency."
        }, {
            text: "Nope, I don't have one",
            next: '',
            comment: 'You had better install one of Uber or Lyft. They can be your most convenient drivers in your emergency'
        }]);



    //This is database array
    var database = [q1, q2, q3, q4, q5, q6, q7, q8];

    //This is answered questions array

    var answered = [];

    //this is showed questions array
    var showed = [];
    // this is a pointer point to current question;
    var currentQuestion;
    //this is index of question
    var questionIndex = 1;
    //This is number of click for a text question
    var clickNum = {};

    //this variable measure if form is finished or not
    var finished = false;
    // var initialQuestion = '<label for="01">1. Do you have an insurance plan?</label><div class="radio"><label><input type="radio" name="01" value=1>Yep for sure</label></div><div class="radio"><label><input type="radio" name="01" value=0>Nope I do not have one</label></div>';

    //find which one in the database is input question. input is the idnum, return is a Question object
    function findQuestion(input) {

        for (var i = database.length - 1; i >= 0; i--) {
            if (database[i].idnum === input) {
                return database[i];
            }
        };


    }

    function finish(){
        //print out finish words to the screen
        $('form').append('<p class="finish" style="margin-top:30px">You have finished the todo list. Follow it and you will be equiped with enough weapons to fight agianst an emergency :)</p>')
        $('form').append('<button type="button" class="btn btn-primary finish" id="printButton">Print List</button>')
        $('#warning').hide();
        finished = true;
    }

    function unfinish(){
        //undo finish
        finished = false;
        $('.finish').remove();
        $('#warning').show();

    }

    function printCurrent() {

        var returnString;
        //find which one in the database is input question

        //return string that will appear on the web page
        //true option has a value of 0, false option has a value of 1. this is for selecting element in an array
        if (typeof currentQuestion == 'undefined') {
            finish();
            //append print style sheet to head
            //$('head').append('<link rel="stylesheet" type="text/css" media="print" href="css/print.css" />')

            return;

        }

        //this will print radio type question to screen
        if (currentQuestion.qtype == 'radio') {
            returnString = '<label for = "' + currentQuestion.idnum + '" name ="' + currentQuestion.idnum + '">' + questionIndex + '. ' +
                currentQuestion.qstring + '</label><div class="' +
                currentQuestion.qtype + '" name ="' + currentQuestion.idnum + '"><label><input type="' +
                currentQuestion.qtype + '" name="' + currentQuestion.idnum +
                '" value="0">' + currentQuestion.optional[0].text + '</label></div><div class="' +
                currentQuestion.qtype + '" name ="' + currentQuestion.idnum + '"><label><input type="' +
                currentQuestion.qtype + '" name="' + currentQuestion.idnum +
                '" value="1">' + currentQuestion.optional[1].text + '</label></div>';

            $('form').append(returnString);
        }

        //this will print text type question to screen
        if (currentQuestion.qtype == 'text') {
            returnString = '<label for = "' + currentQuestion.idnum + '" name ="' + currentQuestion.idnum + '">' + questionIndex + '. ' +
                currentQuestion.qstring + '</label><div class="form-group" name="' + currentQuestion.idnum + '"><input name="' + currentQuestion.idnum +
                '" type="text" class="form-control" placeholder="' + currentQuestion.optional[0].text +
                '" ><button type="button" class="btn btn-primary addButton"  name="' + currentQuestion.idnum + '">+</button></div>';
            $('form').append(returnString);
            printComment(0);
        }

    }

    //this function print out currentQuestion's comment, if any, to the website.
    function printComment(input) {
        if (currentQuestion.optional[input].comment == "") {
            return;
        } else {
            $('#comment').append('<p name="' + currentQuestion.idnum + '"><strong>' + currentQuestion.optional[input].comment + '</strong></p>')
        }
    }

    currentQuestion = q1;

    printCurrent();
    //push the first question to the showed array
    showed.push(currentQuestion.idnum)

    //When a radio button is clicked, pop up new questions and comments

    $(document).on("click", "input[type='radio']", function() {
        //if the form is already finished, undo it.
        if(finished){
            unfinish();
        }
        //this is a copy of showed arr
        var showedcopy = showed;
        //this is a copy of answered arr
        var answeredcopy = answered;
        //this is the index of clicked question
        var clickAt = answered.indexOf(this.name);
        //this is the current question
        currentQuestion = findQuestion(this.name);
        //This is the clicked value
        var clickedValue = $(this).val();

        console.log(clickAt);
        if (clickAt > -1) {
            //this is to remove the showed questions under
            for (var i = showed.length - 1; i >= clickAt; i--) {

                $('[name="' + showed[i] + '"]').remove()
                $('[name="' + showed[i] + 'comment"]').remove()
                if(showed[i] in clickNum){
                    delete clickNum[showed[i]];
                }
                showedcopy.splice(i, 1);

                // questionIndex--;
            };

            for (var i = answered.length - 1; i >= clickAt; i--) {
                answeredcopy.splice(i, 1);

            };

            showed = showedcopy;
            answered = answeredcopy;

            showed.push(currentQuestion.idnum);
            questionIndex = showed.length;
            printCurrent();

            return;
        }
        var clickedValue = $(this).val();
        answered.push(currentQuestion.idnum);
        printComment(clickedValue);

        currentQuestion = findQuestion(currentQuestion.optional[clickedValue].next);
        if(typeof currentQuestion=="undefined"){
            printCurrent();
            return;
        }
        showed.push(currentQuestion.idnum);
        questionIndex = showed.length;
        printCurrent();



    })

    //when .addButton is cliked
    $(document).on('click', '.addButton', function() {
        //if text question never asked before
        if(!clickNum[this.name]){
            //add to clickNum object this question
            clickNum[this.name]=0;
            //and print out next question
            answered.push(currentQuestion.idnum);
            currentQuestion = findQuestion(currentQuestion.optional[0].next);
            showed.push(currentQuestion.idnum);
            questionIndex = showed.length;
            printCurrent();
            $('#comment').append('<div name="'+this.name+'comment"></div>')

        }
        
        var inputValue = $('input[name=' + this.name + ']').val();
        if (inputValue != '') {
            $('div[name="'+this.name+'comment"]').append('<p name="'+this.name+'"><strong>&nbsp;&nbsp;&nbsp;' + inputValue + '</strong></p>');
            $('input[name=' + this.name + ']').val("");
            clickNum[this.name]++;
        }
    })
    //this will listen to enter key and trigger click on the button
    $(document).on('focus',"input[type='text']",function(){
        $('input[name=' + this.name + ']').keydown(function(e){
            if(e.which === 13){
                $(".addButton").click();
                return false;
            }
        })
    })

    //this is print button
    $(document).on('click','#printButton',function(){
        window.print();
    })

})
