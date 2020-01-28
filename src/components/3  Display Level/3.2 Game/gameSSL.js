// Import helper functions
import center from '../../../helper functions/centerFunction';
import combineObjects from '../../../helper functions/combineObjectsFunction';


function gameSSL(windowSize) {
  // PRIMARY VARIABLES ///////////////////////////////////////////////////////////////
  // DEFAULT VALUES

  // Fonts
  const fontSize0 = 120;

  // Offsets
  const offset0 = 10;
  const offset1 = 200;
  const offset2 = 100;
  const offset3 = 6;

  // Game Court
  let gameCourtWidth = 600;

  // WINDOWSIZE ADJUSTMENTS //////////////////////////////////////////////////////////
  if (windowSize.width >= 600 + offset1 && windowSize.height >= 600 + offset2) {
    if (windowSize.height >= windowSize.width - offset1) {
      gameCourtWidth = windowSize.width - offset1;
    } else {
      gameCourtWidth = windowSize.height;
    }
  }

  // DEPENDENT VALUES ////////////////////////////////////////////////////////////////

  // GameCourt
  const gameCourtHeight = gameCourtWidth - Math.round(gameCourtWidth / 3);

  // Score Board
  const scoreBoardHeight = Math.round(gameCourtHeight / 4);
  const scoreAreaWidth = gameCourtWidth / 2;
  const scoreArea = {
    position: "absolute",
    width: `${scoreAreaWidth}px`,
    height: `${scoreBoardHeight}px`,
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: `${scoreBoardHeight - offset0}px`,
    fontSize: `${fontSize0}px`
  };

  // Game Court again...
  const gameCourtTop =
    center(windowSize.height, gameCourtHeight) -
    Math.round(scoreBoardHeight / 2);
  const gameCourtLeft = center(windowSize.width, gameCourtWidth);

  // Paddles
  const paddleWidth = Math.round(gameCourtWidth / 60);
  const paddleHeight = Math.round(gameCourtHeight / 6);
  const paddleAreaHeight = Math.round(paddleHeight / 5);

  const paddleAreas = {
    universal: {
      position: "absolute",
      width: `${paddleWidth}px`,
      height: `${paddleAreaHeight}px`
    },
    top: [
      "0px",
      `${paddleAreaHeight}px`,
      `${paddleAreaHeight * 2}px`,
      `${paddleAreaHeight * 3}px`,
      `${paddleAreaHeight * 4}px`
    ]
  };

  const dynamicPaddle = {
    initialTop: center(gameCourtHeight, paddleHeight) + gameCourtTop,
    minTop: gameCourtTop + offset0,
    maxTop: gameCourtTop + gameCourtHeight - paddleHeight - offset0,
    speed: Math.floor(gameCourtWidth / 100)
  };

  // Ball
  const ballSize = Math.round(gameCourtWidth / 40);

  const player1ServeLeft = gameCourtLeft + offset0 * 2 + paddleWidth;

  const allPossibleAngleSets = [
    // [
    //   [4, -4],
    //   [5, -3],
    //   [6, 0],
    //   [5, 3],
    //   [4, 4]
    // ],
    [
      [5, -5],
      [6, -4],
      [7, 0],
      [6, 4],
      [5, 5]
    ],
    [
      [6, -5],
      [7, -3],
      [8, 0],
      [7, 3],
      [6, 5]
    ],
    [
      [7, -6],
      [8, -4],
      [9, 0],
      [8, 4],
      [7, 6]
    ],
    [
      [7, -7],
      [9, -4],
      [10, 0],
      [9, 4],
      [7, 7]
    ],
    [
      [8, -8],
      [10, -5],
      [11, 0],
      [10, 5],
      [8, 8]
    ],
    [
      [9, -8],
      [11, -5],
      [12, 0],
      [11, 5],
      [9, 8]
    ],
    [
      [9, -9], 
      [12, - 5], 
      [13, 0], 
      [12, 5], 
      [9, 9]
    ],
    [
      [10, -10],
      [12, -7],
      [14, 0],
      [12, 7],
      [10, 10]
    ],
    [
      [11, -10],
      [13, -7],
      [15, 0],
      [13, 7],
      [11, 10]
    ]
  ];

  console.log(allPossibleAngleSets);

  const firstAngleIndex = Math.floor((gameCourtWidth - 600) / 100);
  const angleSets = [];

  for (let i = 0; i < 6; i++) {
    angleSets[i] = allPossibleAngleSets[i + firstAngleIndex];
  }

  // RETURN /////////////////////////////////////////////////////////////////////////
  return {
    gameCourt: {
      position: "absolute",
      width: `${gameCourtWidth}px`,
      height: `${gameCourtHeight}px`,
      left: `${gameCourtLeft}px`,
      top: `${gameCourtTop}px`
    },
    verticalLine: {
      position: "absolute",
      width: `${gameCourtWidth / 2}px`,
      height: `${gameCourtHeight}px`,
      zIndex: "-1"
    },
    scoreBoard: {
      container: {
        position: "absolute",
        width: `${gameCourtWidth}px`,
        height: `${scoreBoardHeight}px`,
        left: `${center(windowSize.width, gameCourtWidth)}px`,
        top: `${gameCourtHeight + gameCourtTop}px`
      },
      player1Score: scoreArea,
      player2Score: combineObjects([scoreArea, { left: `${scoreAreaWidth}px` }])
    },
    paddle1: {
      container: {
        width: `${paddleWidth}px`,
        height: `${paddleHeight}px`,
        position: "absolute",
        left: `${gameCourtLeft + offset0}px`
      },
      areas: paddleAreas,
      dynamic: dynamicPaddle
    },
    paddle2: {
      container: {
        width: `${paddleWidth}px`,
        height: `${paddleHeight}px`,
        position: "absolute",
        left: `${gameCourtLeft + gameCourtWidth - offset0 - paddleWidth}px`
      },
      areas: paddleAreas,
      dynamic: dynamicPaddle
    },
    ball: {
      static: {
        position: "absolute",
        width: `${ballSize}px`,
        height: `${ballSize}px`,
        borderRadius: `${ballSize}px`,
        zIndex: "-1"
      },
      dynamic: {
        initialLeft: player1ServeLeft,
        initialTop: gameCourtTop + center(gameCourtHeight, ballSize) - offset3,
        serveTop: center(paddleHeight, ballSize),
        player1ServeLeft: player1ServeLeft,
        player2ServeLeft:
          gameCourtLeft +
          gameCourtWidth -
          paddleWidth -
          ballSize -
          offset0 * 2 -
          offset3,
        topBoundary: gameCourtTop + ballSize / 2,
        bottomBoundary: gameCourtTop + gameCourtHeight - ballSize,
        leftBoundary: gameCourtLeft - offset2,
        rightBoundary: gameCourtLeft + gameCourtWidth + offset2,
        player1Hpos: [
          gameCourtLeft + offset0,
          gameCourtLeft + offset0 + paddleWidth
        ],
        player2Hpos: [
          gameCourtLeft + (gameCourtWidth - 1) - offset3 - paddleWidth,
          gameCourtLeft + (gameCourtWidth - 1) - offset3
        ],
        paddleHeight: paddleHeight,
        paddleAreaHeight: paddleAreaHeight,
        ballSize: ballSize,
        angleSets: angleSets,
        paddleSpeed: dynamicPaddle.speed
      },
      blackBlocks: {
        block1: {
          position: "absolute",
          width: `${gameCourtLeft}px`,
          height: `${windowSize.height}px`,
          color: "black",
          fontSize: `${gameCourtWidth / 7}px`,
          textAlign: "center",
          verticalAlign: "middle",
          lineHeight: `${gameCourtWidth}px`
        },
        block2: {
          position: "absolute",
          width: `${gameCourtWidth + offset0}px`,
          height: `${gameCourtTop}px`,
          left: `${gameCourtLeft}px`,
          textAlign: "center",
          fontSize: `${gameCourtWidth / 30}px`,
          color: `rgb(0, 109, 103)`
        },
        block3: {
          position: "absolute",
          width: `${gameCourtLeft}px`,
          height: `${windowSize.height}px`,
          left: `${gameCourtLeft + gameCourtWidth + 5}px`,
          color: "black",
          fontSize: `${gameCourtWidth / 7}px`,
          textAlign: "center",
          verticalAlign: "middle",
          lineHeight: `${gameCourtWidth}px`
        },
        block4: {
          position: "absolute",
          width: `${gameCourtWidth + offset0}px`,
          height: `${windowSize.height -
            scoreBoardHeight -
            gameCourtHeight -
            gameCourtTop}px`,
          top: `${gameCourtHeight + gameCourtTop + scoreBoardHeight + 5}px`,
          left: `${gameCourtLeft}px`
        }
      }
    }
  };
}

export default gameSSL;