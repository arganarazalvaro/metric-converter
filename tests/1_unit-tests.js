/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

var chai = require("chai");
var assert = chai.assert;
var ConvertHandler = require("../controllers/convertHandler.js");

var convertHandler = new ConvertHandler();

suite("Unit Tests", function() {
  suite("Function convertHandler.getNum(input)", function() {
    test("Whole number input", function(done) {
      var input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", function(done) {
      var input = "3.25mi";
      assert.equal(convertHandler.getNum(input), 3.25);
      done();
    });

    test("Fractional Input", function(done) {
      var input = "12/8mi";
      assert.equal(convertHandler.getNum(input), 1.5);
      done();
    });

    test("Fractional Input w/ Decimal", function(done) {
      var input = "27/5.4mi";
      assert.equal(convertHandler.getNum(input), 5);
      done();
    });

    test("Invalid Input (double fraction)", function(done) {
      var input = "3/7.2/4L";
      assert.equal(convertHandler.getNum(input), "invalid number");
      done();
    });

    test("No Numerical Input", function(done) {
      var input = "kg";
      assert.equal(convertHandler.getNum(input), 1);
      assert.equal(convertHandler.getUnit(input), "kg");
      done();
    });
  });

    // Next, we'll test the .getUnit() method of our converter:
  suite('Function convertHandler.getUnit(input)', function() {
    
    // For each of the possible units that our converter is designed to manage, irrespective of capitalization, it should return a properly formatted unit:
    test('For Each Valid Unit Inputs', function(done) {
      // Given the following possible unit inputs...
      let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      // ... we expect the following, correctly typed, unit formats to be returned by our converter:
          // N.B. The metric units should actually be Kg, Km, and L.... but that's not how this boilerplate and its test suite are set up...
      let expected = ["gal", "L", "mi", "km", "lbs", "kg", "gal", "L", "mi", "km", "lbs", "kg"];
      
      // We'll make sure that each of the inputs will return the matching expected output:
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getUnit(ele), expected[i]);
      });
      
      done();
    });
    
    
    // If the input unit is not of a valid type, we expect our converter to respond with, "invalid unit":
    test('Unknown Unit Input', function(done) {
      let input = ["20.0", "12.5 pounds", "3/5kilograms"];
      
      // If the input units are either missing or not in an expected format, the getUnit() method of our converter should return, "invalid unit":
      input.forEach(function (ele) {        
        assert.equal(convertHandler.getUnit(ele), "invalid unit");
      });
      
      done();
    });  
    
  });

  // We'll now test our converter to make sure that it returns the correct "opposite" unit:
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','L','mi','km','lbs','kg'];
      let expected = ['L','gal','km','mi','kg','lbs'];
      
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expected[i]);
      });
      
      done();
    });
    
  });  

  suite("Function convertHandler.spellOutUnit(unit)", function() {
    test("For Each Valid Unit Inputs", function(done) {
      var input = ["gal", "l", "mi", "km", "lbs", "kg", "GAL", "L", "MI", "KM", "LBS", "KG"];
      let expect = [
        "gallons",
        "litres",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
        "gallons",
        "litres",
        "miles",
        "kilometers",
        "pounds",
        "kilograms"
      ];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", function() {
    test("Gal to L", function(done) {
      var input = [5, "gal"];
      var expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("L to Gal", function(done) {
      var input = [5, "L"];
      var expected = 1.32086;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Mi to Km", function(done) {
      var input = [5, "mi"];
      var expected = 8.04672;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Km to Mi", function(done) {
      var input = [5, "km"];
      var expected = 3.10686;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Lbs to Kg", function(done) {
      var input = [5, "lbs"];
      var expected = 2.26796;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });

    test("Kg to Lbs", function(done) {
      var input = [5, "kg"];
      var expected = 11.0231;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      ); //0.1 tolerance
      done();
    });
  });
});