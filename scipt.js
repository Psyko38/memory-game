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
	Finde = 0;
	SetupGame(GrideSize, STNumPlayers, STheme);
});

NewGame.addEventListener("click", (e) => {
	window.location.reload();
});

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
		SetupGride(Size);
		setupTime();
	} else if (Player > 1) {
		P1Div.style.display = "none";
		MPDiv.style.display = "flex";
		PlayerSetup(Player);
		SetupGride(Size);
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

function BuildGride(height, weight) {
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
			btn.innerText = a;
		} else {
			btn.innerText = a;
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

function Time(time) {
	let NowTime = Date.now() - time;
	let secondes = Math.floor(NowTime / 1000) % 60;
	let minutes = Math.floor(NowTime / 60000);
	TimeUI.innerText = `${minutes}:${secondes}`;
}

function SetupGride(Size) {
	let RandomBTN = BuildGride(Size, Size);
	SetupBTN(RandomBTN, RandBTN);
	let LastBTN = "";
	let TotalClick = 0;
	let turn = 0;
	function RandBTN(e, id, BTN) {
		if (
			LastBTN != id &&
			id.classList != "yes" &&
			id.classList != "active"
		) {
			if (TotalClick == 2) {
				MovesConte++;
				TotalClick = 0;
				LastBTN = "";
				for (let i of BTN) {
					i.classList.remove("active");
				}
			}
			if (LastBTN.innerText == id.innerText) {
				id.classList.add("yes");
				LastBTN.classList.add("yes");
				PlayerID[turn].childNodes[1].innerText =
					Number(PlayerID[turn].childNodes[1].innerText) + 1;
				Finde++;
				if (Finde == (Size * Size) / 2) {
					EndGame();
				}
			} else {
				id.classList.add("active");
			}
			LastBTN = id;
			TotalClick++;
			if (STNumPlayers == "1") {
				MovesUI.innerText = MovesConte;
			}
			if (TotalClick == 2) {
				if (turn < STNumPlayers - 1) {
					turn++;
					PlayerTurn(turn);
				} else {
					turn = 0;
					PlayerTurn(turn);
				}
			}
		}
	}
}
let ref = "";
function setupTime() {
	TimeUI.innerText = "0:0";
	let time = Date.now();
	clearInterval(ref);
	ref = setInterval(Time, 1000, time);
}

function PlayerSetup(Player) {
	for (let i of PlayerID) {
		i.remove();
	}
	PlayerID = [];
	for (let i = 0; i < Player; i++) {
		MPDiv.innerHTML += `<div class="j"><p>Player ${
			i + 1
		}</p><p>0</p></div>`;
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
	let myList = [];
	let player = [];
	for (let i of PlayerID) {
		myList.push(Number(i.childNodes[1].innerText));
	}
	myList = myList.sort((a, b) => a - b);
	myList = myList.reverse();

	for (let i of myList) {
		for (let y of PlayerID) {
			if (i == y.childNodes[1].innerText) {
				if (myList[0] == i) {
					player.push(
						y.childNodes[0].innerText +
							" (Winner!) / " +
							i +
							" Pairs"
					);
				} else {
					player.push(
						y.childNodes[0].innerText + " / " + i + " Pairs"
					);
				}
			}
		}
	}
	console.log(player);
}
