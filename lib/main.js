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
    }
  }
}

module.exports = GuessingGame;
