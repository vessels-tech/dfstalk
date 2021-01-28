
function numberBuilder(num: number): Array<string> {
  //Limited just reads from a list of numbers
  const supportedNumbers = [ 
    1000,
    1020,
    1190,
    120,
    1200,
    1360,
    1400,
    150,
    1530,
    1600,
    170,
    1700,
    180,
    1800,
    200,
    2000,
    210,
    240,
    270,
    30,
    300,
    340,
    400,
    510,
    60,
    600,
    680,
    800,
    850,
    90,
  ]
  if (supportedNumbers.indexOf(num) === -1) {
    throw new Error(`Number: ${num} not supported by language model.`)
  }

  return [`${num}`];
}

export default {
  numberBuilder
}