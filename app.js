document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const ScoreDisplay = document.querySelector("#score");
  const StartBtn = document.querySelector("#start-button");
  const width = 10;

  // The Tetrominoes: each iteration is a rotation to the right
  // l:
  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2], // upside down facing right (1, 11, 21, 2)
    [width, width + 1, width + 2, width * 2 + 2], // rotate right: sideways facing down (10, 11, 12, 22)
    [1, width + 1, width * 2 + 1, width * 2], // normal (1, 11, 21, 20) (technically it is a j)
    [width, width * 2, width * 2 + 1, width * 2 + 2], // sideways facing up (10, 20, 21, 22)
  ];

  // z: looks the same on every other rotation
  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  // t:
  const tTetromino = [
    [1, width, width + 1, width + 2], // upside down(1, 10, 11, 12)
    [1, width + 1, width + 2, width * 2 + 1], // facing right (1, 11, 12, 21)
    [width, width + 1, width + 2, width * 2 + 1], // normal (10, 11, 12, 21)
    [1, width, width + 1, width * 2 + 1], // facing left (1, 10, 11, 21)
  ];

  // o: looks the same on every rotation
  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  // i: looks the same on every other rotation
  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1], // normal (1, 11, 21, 31)
    [width, width + 1, width + 2, width + 3], // sideways (10, 11, 12, 13)
    [1, width + 1, width * 2 + 1, width * 3 + 1], // normal (1, 11, 21, 31)
    [width, width + 1, width + 2, width + 3], // sideways (10, 11, 12, 13)
  ];

  const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];

  let currentPosition = 4;
  let currentRotation = 0;

  // randomly select a tetromino and its first rotation
  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];
  console.log(current);

  // draw the tetromino
  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("tetromino");
    });
  }

  // undraw the tetromino
  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
    });
  }

  // make the tetromino move down every second
  timerId = setInterval(moveDown, 500);

  // move down function
  function moveDown() {
    undraw();
    currentPosition += width;
    draw();
    freeze();
  }

  // freeze function
  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );
      // start a new tetromino falling
      random = Math.floor(Math.random() * theTetrominoes.length);
      current = theTetrominoes[random][currentRotation];
      currentPosition = 4;
      draw();
    }
  }

  // move the tetromino left, unless it is at the edge or there is a blockage
  function moveLeft() {
    undraw();

    // check if the tetromino is at the left edge
    const isAtLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );

    if (!isAtLeftEdge) currentPosition -= 1;

    // if there is a blockage, move the tetromino back to where it was
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }

    draw();
  }

  // move the tetromino right, unless it is at the edge or there is a blockage
  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    );

    if (!isAtRightEdge) currentPosition += 1;

    // if there is a blockage, move the tetromino back to where it was
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }

    draw();
  }

  draw();
});
