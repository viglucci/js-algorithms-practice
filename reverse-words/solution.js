// Decode the message by reversing the words
function reverseWords(letters) {
  
  const matrix = [[]];
  let wordCount = 0;

  for (let i = letters.length - 1; i >= 0; i--) {
    if (letters[i] === ' ') {
      matrix.push([letters[i]]);
      wordCount += 2;
      matrix.push([]);
    } else {
      matrix[wordCount].push(letters[i]);
    }
  }

  let letterIndex = 0;
  for(let j = 0; j <= wordCount; j++) {
    let wordChars = matrix[j];
    for (let k = wordChars.length - 1; k > -1; k--) {
      letters[letterIndex] = wordChars[k];
      letterIndex++;
    }
  }
}


// Tests

let desc = 'one word';
let input = 'vault'.split('');
reverseWords(input);
let actual = input.join('');
let expected = 'vault';
assertEqual(actual, expected, desc);

desc = 'two words';
input = 'thief cake'.split('');
reverseWords(input);
actual = input.join('');
expected = 'cake thief';
assertEqual(actual, expected, desc);

desc = 'three words';
input = 'one another get'.split('');
reverseWords(input);
actual = input.join('');
expected = 'get another one';
assertEqual(actual, expected, desc);

desc = 'multiple words same length';
input = 'rat the ate cat the'.split('');
reverseWords(input);
actual = input.join('');
expected = 'the cat ate the rat';
assertEqual(actual, expected, desc);

desc = 'multiple words different lengths';
input = 'yummy is cake bundt chocolate'.split('');
reverseWords(input);
actual = input.join('');
expected = 'chocolate bundt cake is yummy';
assertEqual(actual, expected, desc);

desc = 'empty string';
input = ''.split('');
reverseWords(input);
actual = input.join('');
expected = '';
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
  if (a === b) {
    console.log(`${desc} ... PASS`);
  } else {
    console.log(`${desc} ... FAIL: ${a} != ${b}`);
  }
}
