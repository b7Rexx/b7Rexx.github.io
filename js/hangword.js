class HangWord {
    constructor() {
        document.getElementById('app').style.display = 'block';
        document.getElementById('app_start').style.display = 'none';

        this.word = null;
        this.hints = [];
        var that = this;
        this.getWord = function (callback) {
            var hintOptions = [];

            //generate options on word change
            document.getElementById('get_word').onkeyup = function (e) {
                var appendHintOptions = "";
                var thatvalue = this.value;

                //store values
                that.word = thatvalue;
                that.hints = [];

                if (thatvalue.trim() === '')
                    document.getElementById('start_btn').disabled = true;
                else
                    document.getElementById('start_btn').disabled = false;

                if (!(hintOptions.includes(e.key))) {
                    if (e.keyCode >= 48 && e.keyCode <= 57)
                        hintOptions.push(e.key);
                    if (e.keyCode >= 65 && e.keyCode <= 90)
                        hintOptions.push(e.key);
                }
                hintOptions.sort();
                hintOptions.forEach(function (value) {
                    if (thatvalue.indexOf(value) !== -1)
                        appendHintOptions += "<button class='hintOptionBtn btn btn-info' data-key='" + value + "'>" + value + "</button>";
                });
                document.getElementById('hint_options').innerHTML = appendHintOptions;

                //hint options select action
                var hintClasses = document.getElementsByClassName('hintOptionBtn');
                for (let i = 0; i < hintClasses.length; i++) {
                    hintClasses[i].addEventListener('click', function () {
                        var key_attribute = this.getAttribute("data-key");
                        if (that.hints.indexOf(key_attribute) === -1) {
                            that.hints.push(key_attribute);
                            this.classList.add('btn-clicked');
                        } else {
                            that.hints.splice(that.hints.indexOf(key_attribute), 1);
                            this.classList.remove('btn-clicked');
                        }
                    });
                }
            };

            //return  word with hint
            document.getElementById('start_btn').onclick = function () {
                var guess_count = document.getElementById('guess_count_input').value || 5;
                var start = {
                    'word': that.word,
                    'hints': that.hints,
                    'guess_count': guess_count
                };
                callback(start);
            };
        };
    }
}