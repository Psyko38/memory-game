const ThemeBTN = document.querySelectorAll(".Theme button");
const NPlayersBTN = document.querySelectorAll(".NPlayers button");
const GridSizeBTN = document.querySelectorAll(".GridSize button");
const Gride = document.querySelector(".Gride");
const MovesUI = document.querySelector(".Moves > p:last-child");
const TimeUI = document.querySelector(".Time > p:last-child");

let STheme = "Numbers";
let STNumPlayers = "1";
let GrideSize = "4x4";

let MovesConte = 0;

SetupBTN(ThemeBTN, SetHomeBTN);
SetupBTN(NPlayersBTN, SetHomeBTN);
SetupBTN(GridSizeBTN, SetHomeBTN);

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

let RandomBTN = BuildGride(6, 6);

SetupBTN(RandomBTN, RandBTN);

let LastBTN = "";
let TotalClick = 0;
function RandBTN(e, id, BTN) {
	if (LastBTN != id || id.classList == "yes") {
		if (TotalClick == 2) {
			TotalClick = 0;
			LastBTN = "";
			for (let i of BTN) {
				i.classList.remove("active");
			}
		}
		if (LastBTN.innerText == id.innerText) {
			id.classList.add("yes");
			LastBTN.classList.add("yes");
		} else {
			id.classList.add("active");
		}
		LastBTN = id;
		TotalClick++;
		if (STNumPlayers == "1") {
			MovesConte++;
			MovesUI.innerText = MovesConte;
		}
	}
}
let time = Date.now();
function Time() {
	let NowTime = Date.now() - time;
	let secondes = Math.floor(NowTime / 1000) % 60;
	let minutes = Math.floor(NowTime / 60000);
	TimeUI.innerText = `${minutes}:${secondes}`;
}

let ref = setInterval(Time, 1000);
//clearInterval(ref);
