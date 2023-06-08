let deckId = "";
let round = 0;
let player1Score = 0;
let player2Score = 0;
fetch("https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then((res) => res.json()) // parse response as JSON
  .then((data) => {
    console.log(data);
    deckId = data.deck_id;
  })
  .catch((err) => {
    console.log(`error ${err}`);
  });
document.querySelector("button").addEventListener("click", drawTwo);

function drawTwo() {
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;
  round++;
  document.querySelector("#round").innerText = `round ${round}`;
  if (round <= 26) {
    fetch(url)
      .then((res) => res.json()) // parse response as JSON
      .then((data) => {
        console.log(data);
        document.querySelector("#player1").src = data.cards[0].image;
        document.querySelector("#player2").src = data.cards[1].image;
        let player1Val = Number(convertToNum(data.cards[0].value));
        let player2Val = Number(convertToNum(data.cards[1].value));
        if (player1Val > player2Val) {
          player1Score++;
          document.querySelector("h3").innerText = "player 1 wins";
          document.querySelector("h3").style.background = "rgb(82, 113, 255)";
          document.querySelector("#score1").innerText = player1Score;
        } else if (player2Val > player1Val) {
          player2Score++;
          document.querySelector("h3").innerText = "player 2 wins";
          document.querySelector("h3").style.background = "rgb(255, 87, 87)";
          document.querySelector("#score2").innerText = player2Score;
        } else {
          document.querySelector("h3").innerText = "time for war";
          document.querySelector("h3").style.background = "green";
          document.querySelector("#player1").src = "./img/war.jpg";
          document.querySelector("#player2").src = "./img/war.jpg";
          if (Math.random() < 0.25) {
            player1Score -= 3;
            document.querySelector(".warResult").innerText =
              "player1 lost 3 points";
            document.querySelector("#score1").innerText = player1Score;
          } else if (Math.random() > 0.5) {
            player2Score -= 3;
            document.querySelector(".warResult").innerText =
              "player2 lost 3 points";
            document.querySelector("#score2").innerText = player2Score;
          } else if (Math.random() > 0.75) {
            player1Score += 3;
            document.querySelector(".warResult").innerText =
              "player1 wins 3 points";
            document.querySelector("#score1").innerText = player1Score;
          } else {
            player2Score += 3;
            document.querySelector(".warResult").innerText =
              "player2 wins 3 points";
            document.querySelector("#score2").innerText = player2Score;
          }
        }
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
  } else {
    document.querySelector("#player1").src = "./img/gameOver.jpg";
    document.querySelector("#player2").src = "./img/gameOver.jpg";
    document.querySelector("#round").innerText = ``;
    document.querySelector(".btn").style.display = "none";
    document.querySelector(".warResult").innerText = "";
    if (player1Score > player2Score) {
      document.querySelector("h3").innerText = "player 1 wins";
    } else if (player1Score < player2Score) {
      document.querySelector("h3").innerText = "player 2 wins";
    }
  }
}
function convertToNum(val) {
  if (val === "ACE") {
    return 14;
  } else if (val === "KING") {
    return 13;
  } else if (val === "QUEEN") {
    return 12;
  } else if (val === "JACK") {
    return 11;
  } else {
    return val;
  }
}
