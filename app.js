//도큐먼트의 필요한 태그 호출
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

//캔버스 크기,높이(css랑 같은 사이즈)
canvas.width = 700;
canvas.height = 700;

//(디폴트값 설정)strokeStyle=선의 색 ,lineWidth=선의 굵기
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth - 2.5;

//변수 painting 은 디폴트 false로 저장.
let painting = false;

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
}

//마우스클릭 감지 함수호출,마우스 감지 함수호출,마우스 비작동 감지 함수호출
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

//colors의 색깔들을 배열화 하고 forEach문으로 배열요소 각각을 클릭시 실행되게 하였다.
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
