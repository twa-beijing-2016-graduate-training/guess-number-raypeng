"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var GuessingGame = require("../lib/main.js");


describe("Guessing Game", function() {

  var engine = GuessingGame();
  var spy_gen = sinon.spy(engine, "generate_random_number");
  var spy_cmp = sinon.spy(engine, "compare_number");
  var check_duplicate = function(num_string) {
    var nums = num_string.split("");
    var sorted = nums.sort();
    return sorted[0] === sorted[1] || sorted[1] === sorted[2] || sorted[2] === sorted[3];
  }

  describe(".compare_number", function() {
    it("should give correct result in form of xAxB", function() {
      expect("0A0B").to.equal(engine.compare_number("1234", "5678"));
      expect("0A1B").to.equal(engine.compare_number("1234", "5671"));
      expect("0A2B").to.equal(engine.compare_number("1234", "5621"));
      expect("0A3B").to.equal(engine.compare_number("1234", "5321"));
      expect("0A4B").to.equal(engine.compare_number("1234", "4321"));
      expect("4A0B").to.equal(engine.compare_number("1234", "1234"));
      expect("3A0B").to.equal(engine.compare_number("1234", "1238"));
      expect("1A3B").to.equal(engine.compare_number("1234", "1111"));
      expect("2A2B").to.equal(engine.compare_number("1234", "1243"));
    });
  });

  describe(".generate_random_number", function() {
    it("should give random number comprised of 4 different digits", function() {
      for (var i = 0; i < 100; i++) {
        var random_number = engine.generate_random_number();
        expect(false).to.equal(check_duplicate(random_number));
      }
    });
  });

  describe(".guess", function() {
    it("should invoke .compare_number and .generate_random_number", function() {
      engine.guess("1234");
      expect(spy_gen).to.have.been.called;
      expect(spy_cmp).to.have.been.called;
    });
  });

  describe(".run_round", function() {
    it("should show leftover chances", function() {
      var response = engine.run_round("1234", 6, "4321");
      expect("Please input your number(6):").to.equal(response.ask_input);
    });
    it("should show invoke .compare_number and give hint", function() {
      var response = engine.run_round("1234", 6, "4321");
      expect(spy_cmp).to.have.been.calledWith("1234", "4321");
      expect("0A4B").to.equal(response.hint);
    });
    it("should show Congratulations when guess is correct", function() {
      var response = engine.run_round("1234", 6, "1234");
      expect(spy_cmp).to.have.been.calledWith("1234", "1234");
      expect("Congratulations").to.equal(response.end_info);
    });
    it("should show Gave Over when no chance left", function() {
      var response = engine.run_round("1234", 0, "1234");
      expect("Game Over").to.equal(response.end_info);
    });
    it("should show error message when input is invalid", function() {
      var response = engine.run_round("1234", 2, "1233");
      expect("Cannot input duplicate numbers!").to.equal(response.err);
    });
  });

});
