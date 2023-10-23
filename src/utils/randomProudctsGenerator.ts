const objects = [];

for (let i = 0; i < 100; i++) {
  const obj = {
    Name: generateRandomString(10),
    Description: generateRandomString(10),
    Price: getRandomNumber(10, 1000),
    Tags: `tag-${generateRandomNumber(1, 5)}`,
    Quantity: getRandomInt(1, 100),
    ShopId: 1,
    ProductId: generateRandomString(8),
  };
  objects.push(obj);
}

// Print the first object as an example
console.log(JSON.stringify({ 1: objects }));

// Function to generate a random string of a given length
function generateRandomString(length: number) {
  const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomString = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
}

// Function to generate a random number within a range (inclusive)
function getRandomNumber(min: number, max: number) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

// Function to generate a random integer within a range (inclusive)
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
