const characterCodes = [115,119,115,119,97,97,97,32,32,32,32,32,105,106,105,106,106,107,107,106,100,115,69,101,100,100,119,113,66,118,102,99,52,52,51,53,103,53,54,119,119,65,119,119,67,99,99,99,99,50,50,50,79,119,119,101,102,78,119,52,53,53,50,51,101,115,119,100,119,115,119,32,101,102,102,73,119,119,101,51,53,54,54,55,83,32,65,119,101,102,102,32,93,93,93,91,71,50,100,119,113,82,51,102,69,99,102,65,113,51,99,84,99,99,32,101,101,100,102,97,80,76,100,99,102,99,65,119,101,67,102,99,52,52,52,69,118,32,118,99,119,32,100,99,44,46,44,46,114,32,100,101,102,44,32,46,44,100,84,79,32,100,99,100,99,87,79,115,100,99,115,100,99,82,75,51,52,53,51,53,46];

// Step 1: Filter valid ASCII codes and return only uppercase letters and spaces
const validCharacterCodes = characterCodes.filter(code => (code >= 65 && code <= 90) || code === 32);

// Step 2: Convert to characters
const characters = validCharacterCodes.map(code => String.fromCharCode(code));

// Step 3: Reduce consecutive spaces
let results = characters.join('').replace(/\s+/g, ' ');
results = results.replace(/^\s+/g, '');

// Output the result
console.log(results);
