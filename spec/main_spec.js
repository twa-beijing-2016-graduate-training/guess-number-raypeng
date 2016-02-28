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

});
