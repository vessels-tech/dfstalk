

      1,000 -> thousand one
      1,997 -> thousand one hundred nine ninety and seven
     29,003 -> twenty and nine thousand and three
     36,027 -> thirty and six thousand twenty and seven
    412,238 -> hundred four ten and two thousand hundred two thirty and eight
  3,067,883 -> million three sixty and seven thousand hundred eight eighty and three
562,495,011 -> hundred five sixty and two million hundred four ninety and five thousand ten and one


basic iteration:

## 1,000 -> thousand one

0:
0:
0:
1:if (nextDigit) {
    'one', 'thousand'
  } else {
    'thousand', 'one'
  }

## 1,997 -> thousand one hundred nine ninety and seven

7: seven
9:if(lastDigit > 0) {
    'and'
  } 
  'ninety'
   
9: 'hundred', 'nine'
1:if (nextDigit) {
    'one', 'thousand'
  } else {
    'thousand', 'one'
  } 

## 29,003 -> twenty and nine thousand and three

3: three
0: 
   last digit > 0: 'and'
0:
9:if (nextDigit) {
    'nine', 'thousand'
  } else {
    'thousand', 'nine'
  }
2:if (lastDigit > 0) {
    'and'
  }
 'twenty'
 

   
## 412,238 -> hundred four ten and two thousand hundred two thirty and eight

8: 'eight'
3: if(lastDigit > 0) {
    'and'
  } 
  'thirty'
2: 'hundred', 'two'
2: if (nextDigit) {
    'two', 'thousand'
  } else {
    'thousand', 'two'
  }
1: if(lastDigit > 0) {
    'and'
  } 
  'ten'
4: 'hundred', 'four'


## 3,067,883 -> million three sixty and seven thousand hundred eight eighty and three

3: 'three'
8:if(lastDigit > 0) {
    'and'
  }
 'eighty'
8: 'hundred', 'eight'
7: if (nextDigit) {
    'seven', 'thousand'
  } else {
    'thousand', 'seven'
  }
6:if(lastDigit > 0) {
    'and'
  }
  'sixty'
0: ''
3: if (nextDigit) {
    'three', 'million'
  } else {
    'million', 'three'
  }


## 562,495,011 -> hundred five sixty and two million hundred four ninety and five thousand ten and one

1: 'one'
1:if(lastDigit > 0) {
    'and'
  }
 'ten'
0: ''
5: if (nextDigit) {
    'five', 'thousand'
  } else {
    'thousand', 'five'
  }
9:if(lastDigit > 0) {
    'and'
  }
 'ninety'
4: 'hundred', 'four'
2: if (nextDigit) {
    'two', 'million'
  } else {
    'million', 'two'
  }
6:if(lastDigit > 0) {
    'and'
  }
 'sixty'
5: 'hundred', 'five'