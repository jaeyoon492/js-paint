//도큐먼트의 필요한 태그 호출
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

//변수의 디폴트값 설정.
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

//캔버스 사이즈 설정.
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//캔버스배경색 디폴트값 설정.
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

//strokeStyle=선의 색 ,lineWidth=선의 굵기
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

//변수 painting은 디폴트 false로 저장 ,변수 filling은 디폴트 false로 저장.
let painting = false;
let filling = false;

//그림멈춤함수
function stopPainting() {
  painting = false;
}

//그림작동함수
function startPainting() {
  painting = true;
}

//마우스를 움직이면 발동하는 함수
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    //비클릭시
    ctx.beginPath(); //path = 라인, path의 시작점 = 마우스 위치.
    ctx.moveTo(x, y); //path를 만들면 x,y좌표로 path를 이동.
  } else {
    //클릭시
    ctx.lineTo(x, y); //path 이전시작점에서 현재 마우스 위치까지 라인이 생성됨.(마우스가 움직이는 동안 상시발동)
    ctx.stroke(); //path를 현재의 stroke style로 획을 그음.(마우스가 움직이는 동안 상시발동)
  }
}

//배열안의 선택된 색상을 메인색으로 바꾸는 함수.
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

//brush의 사이즈를 바꾸는 함수이다. (console.log의 target.value를 상수변수로 초기화하여 ctx.lineWidth에 저장한다. )
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

//FIll모드 버튼의 이름을 바꾸는 함수이다.
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}

//마우스클릭 감지 함수호출,마우스 감지 함수호출,마우스 비작동 감지 함수호출
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

//colors의 색깔들을 배열화 하고 forEach문으로 배열요소 각각을 클릭시 실행되게 하였다.
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
