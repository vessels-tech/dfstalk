
function numberBuilder(num: number): Array<string> {
  //Limited just reads from a list of numbers
  const supportedNumbers = [ 
    1000,
    120,
    150,
    170,
    180,
    200,
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