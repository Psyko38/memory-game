const ThemeBTN = document.querySelectorAll(".Theme button");
const NPlayersBTN = document.querySelectorAll(".NPlayers button");
const GridSizeBTN = document.querySelectorAll(".GridSize button");
const Gride = document.querySelector(".Gride");
const MovesUI = document.querySelector(".Moves > p:last-child");
const TimeUI = document.querySelector(".Time > p:last-child");
const Start = document.getElementById("Start");
const SetingUI = document.querySelector(".settings");
const ResetBTN = document.getElementById("Reset");
const NewGame = document.getElementById("NewGame");
const P1Div = document.querySelector(".p1");
const MPDiv = document.querySelector(".mp");
const PopupUI = document.querySelector(".pupump");
const PopupUIMP = document.querySelector(".pupump > .bg:first-child");
const MPresult = document.querySelector(".result");
const MPH1 = document.querySelector(".bg:first-child > h1");
const MPRestartBTN = document.querySelectorAll(".btnn > button:first-child");
const MPNewGameBTN = document.querySelectorAll(".btnn > button:last-child");
const P1PopupUI = document.querySelector(".pupump > .bg:nth-child(2)");
const P1Time = document.querySelector(
  ".result > div:first-child > p:last-child"
);
const P1Moves = document.querySelector(
  ".result > div:last-child > p:last-child"
);
const PauseBTN = document.getElementById("Menu");
const PauseUI = document.querySelector(".bga");
const PauseRestart = document.querySelector(".bga > button:first-child");
const PauseNewGame = document.querySelector(".bga > button:nth-child(2)");
const PauseResume = document.querySelector(".bga > button:last-child");

let STheme = "Numbers";
let STNumPlayers = "1";
let GrideSize = "4x4";

let PlayerID = [];
let MovesConte = 0;
let Finde = 0;

SetupBTN(ThemeBTN, SetHomeBTN);
SetupBTN(NPlayersBTN, SetHomeBTN);
SetupBTN(GridSizeBTN, SetHomeBTN);

Start.addEventListener("click", (e) => {
  Finde = 0;
  SetingUI.style.display = "none";
  SetupGame(GrideSize, STNumPlayers, STheme);
});

ResetBTN.addEventListener("click", (e) => {
  RestartGame();
});

PauseRestart.addEventListener("click", (e) => {
  RestartGame();
});

SetupBTN(MPRestartBTN, RestartGame);

NewGame.addEventListener("click", (e) => {
  window.location.reload();
});

PauseNewGame.addEventListener("click", (e) => {
  window.location.reload();
});

SetupBTN(MPNewGameBTN, Reset);

PauseBTN.addEventListener("click", (e) => {
  setupTime(2);
  PopupUI.style.display = "flex";
  PopupUIMP.style.display = "none";
  P1PopupUI.style.display = "none";
  PauseUI.style.display = "flex";
});

PauseResume.addEventListener("click", (e) => {
  setupTime(3);
  PopupUI.style.display = "none";
  PopupUIMP.style.display = "none";
  P1PopupUI.style.display = "none";
  PauseUI.style.display = "none";
});

function Reset() {
  window.location.reload();
}

function RestartGame() {
  PopupUI.style.display = "none";
  PopupUIMP.style.display = "none";
  P1PopupUI.style.display = "none";
  PauseUI.style.display = "none";

  Finde = 0;
  SetupGame(GrideSize, STNumPlayers, STheme);
}

function SetupGame(GSize, Player, Theme) {
  MovesConte = 0;
  MovesUI.innerText = MovesConte;
  let Size = 0;
  if (GSize == "4x4") {
    Size = 4;
  } else if (GSize == "6x6") {
    Size = 6;
  }
  if (Player == "1") {
    P1Div.style.display = "flex";
    MPDiv.style.display = "none";
    if (GSize === "4x4" && Theme === "Icons") {
      SetupGride(Size, 1);
    } else {
      SetupGride(Size, 0);
    }

    setupTime(1);
    setupTime(4);
  } else if (Player > 1) {
    P1Div.style.display = "none";
    MPDiv.style.display = "flex";
    PlayerSetup(Player);
    if (GSize === "4x4" && Theme === "Icons") {
      SetupGride(Size, 1);
    } else {
      SetupGride(Size, 0);
    }
    PlayerTurn(0);
  }
}

function SetHomeBTN(e, id, BTN) {
  for (let i of BTN) {
    i.classList.remove("active");
  }
  id.classList.add("active");
  let text = id.innerText;
  if ("Numbers" === text || "Icons" === text) {
    STheme = text;
  }
  if ("1" === text || "2" === text || "3" === text || "4" === text) {
    STNumPlayers = text;
  }
  if ("4x4" === text || "6x6" === text) {
    GrideSize = text;
  }
}

function SetupBTN(BTN, functione) {
  for (let i of BTN) {
    i.addEventListener("click", (e) => {
      functione(e, i, BTN);
    });
  }
}

function BuildGride(height, weight, theme) {
  let GetBTN = document.querySelectorAll(".Gride > button");
  if (GetBTN != null) {
    for (let i of GetBTN) {
      i.remove();
    }
  }
  let a = 0;
  const shuffledChildren = [];
  for (let i = 0; i < height * weight; i++) {
    const btn = document.createElement("button");
    shuffledChildren.push(btn);
    if (i % 2 == 0) {
      if (theme === 1) {
        const img = document.createElement("img");
        img.src = `../asset/${a + 1}.svg`;
        img.alt = `Icon ${a}`;
        btn.appendChild(img);
      } else {
        btn.innerText = a;
      }
    } else {
      if (theme === 1) {
        const img = document.createElement("img");
        img.src = `../asset/${a + 1}.svg`;
        img.alt = `Icon ${a}`;
        btn.appendChild(img);
      } else {
        btn.innerText = a;
      }
      a++;
    }
  }
  Gride.style.gridTemplateColumns = "repeat(" + height + ", 1fr)";
  shuffledChildren.sort(() => Math.random() - 0.5);
  for (child of shuffledChildren) {
    Gride.appendChild(child);
  }
  return Gride.children;
}

function SetupGride(Size, theme) {
  let RandomBTN = BuildGride(Size, Size, theme);
  SetupBTN(RandomBTN, RandBTN);
  let LastBTN = null;
  let TotalClick = 0;
  let turn = 0;
  function RandBTN(e, id, BTN) {
    if (
      LastBTN !== id &&
      !id.classList.contains("yes") &&
      !id.classList.contains("active")
    ) {
      if (TotalClick === 2) {
        MovesConte++;
        TotalClick = 0;
        LastBTN = null;
        for (let i of BTN) {
          i.classList.remove("active");
        }
      }
      if (LastBTN && LastBTN.innerHTML === id.innerHTML) {
        id.classList.add("yes");
        LastBTN.classList.add("yes");
        if (STNumPlayers !== "1" && PlayerID[turn]) {
          PlayerID[turn].childNodes[1].innerText =
            Number(PlayerID[turn].childNodes[1].innerText) + 1;
        }
        Finde++;
        if (Finde === (Size * Size) / 2) {
          EndGame();
        }
      } else {
        id.classList.add("active");
      }
      LastBTN = id;
      TotalClick++;
      if (STNumPlayers === "1") {
        MovesUI.innerText = MovesConte;
      }
      if (TotalClick === 2) {
        if (turn < STNumPlayers - 1) {
          turn++;
          if (STNumPlayers > 1) {
            PlayerTurn(turn);
          }
        } else {
          turn = 0;
          if (STNumPlayers > 1) {
            PlayerTurn(turn);
          }
        }
      }
    }
  }
}
var ref;
var startTime = 0;
var holdtime = 0;

function updateTime() {
  let elapsed = Date.now() - startTime;
  let totalElapsed = elapsed + holdtime;
  let seconds = Math.floor(totalElapsed / 1000) % 60;
  let minutes = Math.floor(totalElapsed / 60000);
  TimeUI.innerText = `${minutes}:${seconds}`;
}

function setupTime(Mode) {
  if (Mode == 1) {
    // reset
    clearInterval(ref);
    holdtime = 0;
    startTime = Date.now();
    TimeUI.innerText = "0:0";
  } else if (Mode == 2) {
    // pause
    clearInterval(ref);
    holdtime += Date.now() - startTime;
  } else if (Mode == 3) {
    // resume
    startTime = Date.now();
    ref = setInterval(updateTime, 1000);
  } else if (Mode == 4) {
    // start
    clearInterval(ref);
    holdtime = 0;
    startTime = Date.now();
    TimeUI.innerText = "0:0";
    ref = setInterval(updateTime, 1000);
  }
}

function PlayerSetup(Player) {
  for (let i of PlayerID) {
    i.remove();
  }
  PlayerID = [];
  for (let i = 0; i < Player; i++) {
    MPDiv.innerHTML += `<div class="j"><p>Player ${i + 1}</p><p>0</p></div>`;
  }
  Pl = document.querySelectorAll(".mp > .j");
  for (let i of Pl) {
    PlayerID.push(i);
  }
}

function PlayerTurn(turne) {
  for (let i of PlayerID) {
    i.id = "";
  }
  PlayerID[turne].id = "play";
}

function EndGame() {
  setupTime(2);
  if (STNumPlayers > 1) {
    for (let i of MPresult.querySelectorAll("div")) {
      i.remove();
    }
    const players = PlayerID.map((elm) => ({
      name: elm.childNodes[0].innerText,
      score: Number(elm.childNodes[1].innerText),
    }));
    players.sort((a, b) => b.score - a.score);
    const maxScore = players[0].score;
    let results = [];
    for (let i = 0; i < players.length; i++) {
      let text = players[i].name;
      if (players[i].score === maxScore) {
        text += " (Winner!)";
      }
      text += " / " + players[i].score + " Pairs";
      results.push(text);
    }
    console.log(MPresult);
    for (let i of results) {
      const splite = i.split("/");
      const div = document.createElement("div");
      if (splite[0].includes("Winner!")) {
        div.classList.add("Winer");
        if (MPH1.innerText === "") {
          MPH1.innerText = splite[0].split("(")[0] + " Wins";
        } else {
          MPH1.innerHTML = "It’s a tie!";
        }
      }
      const p1 = document.createElement("p");
      const p2 = document.createElement("p");
      p1.innerHTML = splite[0].trim();
      p2.innerHTML = splite[1].trim();
      div.appendChild(p1);
      div.appendChild(p2);
      MPresult.appendChild(div);
      PopupUI.style.display = "flex";
      PopupUIMP.style.display = "unset";
      P1PopupUI.style.display = "none";
      PauseUI.style.display = "none";
    }
  } else {
    P1Time.innerText = TimeUI.innerText;
    P1Moves.innerText = MovesUI.innerText + " Moves";
    PopupUI.style.display = "flex";
    PopupUIMP.style.display = "none";
    P1PopupUI.style.display = "unset";
    PauseUI.style.display = "none";
  }
}
