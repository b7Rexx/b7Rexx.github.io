class StartGuess {
    constructor(word, hints) {
        document.getElementById('app').style.display = 'none';
        document.getElementById('app_start').style.display = 'block';

        this.word = word;
        this.hints = hints;
        this.count_guess = 6;
        this.status = false;
        var that = this;

        this.start = function () {
            var alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

            var btnAppends = '';
            alphabets.forEach(function (value) {
                btnAppends += "<button class='btn btn-info btn-guess ' data-key='" + value + "'>" + value + "</button>";
            });

            document.getElementById('app_start').innerHTML =
                "<div class='row'>" +
                "<div class='col-md-8 text-center'>" +
                "<b>Choose you letters: </b>" +
                "<span style='font-weight: bold'><i id='count-guess'>" + that.count_guess + "</i> turns left!</span> <hr>" +
                btnAppends +
                "<hr>" +
                "<div><b id='word-reveal'></b></div>" +
                "</div>" +
                "<div class='col-md-4'>" +
                "<img id='hang-image' src='upload/hang-6.png' alt=' '>" +
                "</div>" +
                "</div>";


            wordRevealAction();

            //hint options select action
            var hintClasses = document.getElementsByClassName('btn-guess');
            for (let i = 0; i < hintClasses.length; i++) {
                hintClasses[i].addEventListener('click', function () {
                    var key_attribute = this.getAttribute("data-key");
                    if (that.count_guess > 0) {
                        if (that.hints.indexOf(key_attribute) === -1) {
                            that.hints.push(key_attribute);
                            var splitWord = that.word.split('');
                            if (splitWord.indexOf(key_attribute) === -1)
                                document.getElementById('count-guess').innerHTML = --that.count_guess;

                            switch (that.count_guess) {
                                case 5:
                                    document.getElementById('hang-image').src = "upload/hang-5.png";
                                    break;
                                case 4:
                                    document.getElementById('hang-image').src = "upload/hang-4.png";
                                    break;
                                case 3:
                                    document.getElementById('hang-image').src = "upload/hang-3.png";
                                    break;
                                case 2:
                                    document.getElementById('hang-image').src = "upload/hang-2.png";
                                    break;
                                case 1:
                                    document.getElementById('hang-image').src = "upload/hang-1.png";
                                    break;
                                case 0:
                                    document.getElementById('hang-image').src = "upload/hang-loss.png";
                                    break;
                            }
                        }

                        this.classList.add('guess-btn-clicked');
                        wordRevealAction();
                    }
                });
            }


            function wordRevealAction() {
                var wordReveal = '';
                var separateWord = that.word.split('');
                separateWord.forEach(function (value) {
                    if (that.hints.indexOf(value) === -1)
                        wordReveal += " _ ";
                    else
                        wordReveal += value;
                });

                that.status = separateWord.every(function (value) {
                    if (that.hints.indexOf(value) === -1)
                        return false;
                    else
                        return true;
                });

                if (that.status === true) {
                    document.getElementById('hang-image').src = "upload/hang-win.png";
                    wordReveal += "<i class='text-success'> !Correct</i>"
                }
                document.getElementById('word-reveal').innerHTML = wordReveal;
            }

        }
    }
}