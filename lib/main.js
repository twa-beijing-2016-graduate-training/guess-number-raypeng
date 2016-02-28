function GuessingGame() {
  return {
    compare_number: function (answer, guess) {
      var num_a = 0, num_b = 0;
      for (var i = 0; i < 4; i++) {
        if (guess[i] == answer[i]) {
          num_a++;
        } else if (answer.indexOf(guess[i]) !== -1) {
          num_b++;
        }
      }
      return num_a.toString() + "A" + num_b.toString() + "B";
    },
    generate_random_number: function() {
      var shuffle = function(array) {
        for (var i = array.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
        return array;
      };
      var base = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
      var shuffled = shuffle(base);
      return shuffled.slice(0, 4).join("");
    },
    guess: function(user_guess) {
      var answer = this.generate_random_number();
      return this.compare_number(answer, user_guess);
    }
  }
}

module.exports = GuessingGame;
