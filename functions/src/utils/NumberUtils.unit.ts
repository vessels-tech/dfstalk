import { splitNumberIntoDigits, getNextAndLastDigit, splitByZeros } from "./NumberUtils";
import assert from 'assert';



describe('Number Utils', function() {
  it('splits a number into digits', () => {
    //Arrange
    const input = 1231823948;
    const expected = [8, 4, 9, 3, 2, 8, 1, 3, 2, 1];

    //Act
    const result = splitNumberIntoDigits(input);


    //Assert
    assert.deepStrictEqual(result, expected);
  });

  it('gets the next and last digits', () => {
    //Arrange
    const input = 1231823948;
    const expected1 = {nextDigit: 4, lastDigit: undefined };
    const expected2 = {nextDigit: 2, lastDigit: 9};
    const expected3 = {nextDigit: 1, lastDigit: 2};
    const expected4 = {nextDigit: 2, lastDigit: 1};
    const expected5 = { nextDigit: undefined, lastDigit: 2};

    //Act
    const result1 = getNextAndLastDigit(input, 0);
    const result2 = getNextAndLastDigit(input, 3);
    const result3 = getNextAndLastDigit(input, 5);
    const result4 = getNextAndLastDigit(input, 7);
    const result5 = getNextAndLastDigit(input, 9);


    // Assert
    assert.deepStrictEqual(result1, expected1);
    assert.deepStrictEqual(result2, expected2);
    assert.deepStrictEqual(result3, expected3);
    assert.deepStrictEqual(result4, expected4);
    assert.deepStrictEqual(result5, expected5);
  });

  it('gets the next and last digits for 0', () => {
    //Arrange
    const input = 0;
    const expected1 = {nextDigit: undefined, lastDigit: undefined };
    
    //Act
    const result1 = getNextAndLastDigit(input, 0);


    // Assert
    assert.deepStrictEqual(result1, expected1);
  });

  it('gets the next and last digits for 1000', () => {
    //Arrange
    const input = 1000;
    const expected1 = { nextDigit: 0, lastDigit: undefined };
    const expected2 = { nextDigit: 0, lastDigit: 0 };
    const expected3 = { nextDigit: 1, lastDigit: 0 };
    const expected4 = { nextDigit: undefined, lastDigit: 0 };

    //Act
    const result1 = getNextAndLastDigit(input, 0);
    const result2 = getNextAndLastDigit(input, 1);
    const result3 = getNextAndLastDigit(input, 2);
    const result4 = getNextAndLastDigit(input, 3);


    // Assert
    assert.deepStrictEqual(result1, expected1);
    assert.deepStrictEqual(result2, expected2);
    assert.deepStrictEqual(result3, expected3);
    assert.deepStrictEqual(result4, expected4);
  });


  it('Splits numbers into groups of 3 zeros', () => {
    //Arrange
    const input1 = 123456789;
    const input2 = 1;
    const input3 = 24124;
    const input4 = 4198427

    const expected1 = { millions: 123, thousands: 456, zeros: 789};
    const expected2 = { millions: 0, thousands: 0, zeros: 1};
    const expected3 = { millions: 0, thousands: 24, zeros: 124};
    const expected4 = { millions: 4, thousands: 198, zeros: 427};

    //Act
    const result1 = splitByZeros(input1);
    const result2 = splitByZeros(input2);
    const result3 = splitByZeros(input3);
    const result4 = splitByZeros(input4);
    
    //Assert
    assert.deepStrictEqual(result1, expected1);
    assert.deepStrictEqual(result2, expected2);
    assert.deepStrictEqual(result3, expected3);
    assert.deepStrictEqual(result4, expected4);
  });

});
