let currentRow = 1;
let cuttentIndex = 1;
let currentWord = "";
let givenWord = words[generateRandom()];
// const givenWord = "tight";
let isGameOver = false;

const colorCells = (status = false) => {
  if (status)
    document
      .querySelector(`.row:nth-child(${currentRow})`)
      .querySelectorAll(`.cell`)
      .forEach((cell) => cell.classList.add("success"));
  else {
    let copyOfGiverWord = new String(givenWord);
    [...currentWord].forEach((letter, index) => {
      //   console.log({ letter, index, givenIndex: givenWord.indexOf(letter) });
      const _i = copyOfGiverWord.indexOf(letter);
      const className =
        _i === -1 ? "no-match" : _i === index ? "success" : "wrong-pos";
      document
        .querySelector(`.row:nth-child(${currentRow})`)
        .querySelector(`.cell:nth-child(${index + 1})`)
        .classList.add(className);
      copyOfGiverWord = copyOfGiverWord.replace(letter, "_");
    });
  }
};

document.addEventListener("keydown", function ({ key }) {
  //   console.log({cuttentIndex, key});
  if (!isGameOver) {
    if (key && key.length == 1 && cuttentIndex <= 5 && /[A-Za-z]/.test(key)) {
      document
        .querySelector(`.row:nth-child(${currentRow})`)
        .querySelector(`.cell:nth-child(${cuttentIndex})`).innerHTML = key;
      cuttentIndex++;
      currentWord += key;
    } else if ("Backspace" === key && cuttentIndex >= 2) {
      cuttentIndex--;
      document
        .querySelector(`.row:nth-child(${currentRow})`)
        .querySelector(`.cell:nth-child(${cuttentIndex})`).innerHTML = "";
      currentWord = currentWord.slice(0, -1);
    } else if ("Enter" === key && currentWord.length != 0) {
      // console.log({ currentRow, cuttentIndex });
      // console.log(currentWord, currentWord.length != 0);
      if (currentWord.length != 5) alert("Not enough letters");
      else {
        if (!words.includes(currentWord.toLocaleLowerCase())) {
          alert("Invalid word");
        } else if (givenWord === currentWord) {
          //   console.log("Winner");
          isGameOver = true;
          colorCells(true);
          document.querySelector(".answer").innerHTML = "&#x1f602";
          document.querySelector(".show-answer").innerHTML = "Reset";
        } else {
          //   console.log("not correct word");
          colorCells();
          if (currentRow < 5) {
            currentRow++;
            cuttentIndex = 1;
            currentWord = "";
          } else {
            isGameOver = true;
            alert("game over and you lost");
          }
        }
      }
    }
  }
});

function generateRandom(min = 0, max = 500) {
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
}

const resetGame = () => {
  currentRow = 1;
  cuttentIndex = 1;
  currentWord = "";
  givenWord = words[generateRandom()];
  isGameOver = false;
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.innerHTML = "";
    cell.classList = ["cell"];
  });
  document.querySelector(".show-answer").innerHTML = "Show Answer";
};

const showAnswer = (e) => {
  if (!isGameOver) alert(`Given word is ${givenWord}`);
  resetGame();
};
