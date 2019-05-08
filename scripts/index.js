/**
 * index.js
 * - All our useful JS goes here, awesome!
 */
 const HORIZONTAL_LINE = 135;

console.log("JavaScript is amazing!");
document.addEventListener("keydown", moveJura);
let jura = document.getElementById("jurica");
console.log("hehe",parseInt(getComputedStyle(jura).bottom));

let x=0;
let y=0;

function moveJura(event){
  let jura = document.getElementById("jurica");
  switch(event.key){
    case "ArrowLeft":
      if(parseInt(getComputedStyle(jura).top) > HORIZONTAL_LINE){
        x = parseInt(getComputedStyle(jura).left)-5;
        jura.style.left = `${x}px`;
      }
    break;
      case "ArrowRight":
      if(parseInt(getComputedStyle(jura).top) > HORIZONTAL_LINE){
        x = parseInt(getComputedStyle(jura).left)+5;
        jura.style.left = `${x}px`;
      }
    break;
      case "ArrowUp":
      if(parseInt(getComputedStyle(jura).top) > HORIZONTAL_LINE){
        jump(20);
      }
    break;
      case "ArrowDown":
      if(parseInt(getComputedStyle(jura).top) > HORIZONTAL_LINE){
        y = parseInt(getComputedStyle(jura).top)+5;
        jura.style.top = `${y}px`;
      }
    break;
  }
}

function jump(counter, pauseInterval){
  while(counter>0){
    if (counter>9){
      y = parseInt(getComputedStyle(jura).top)-5;
      jura.style.top = `${y}px`;
    }
    if (counter<10){
      y = parseInt(getComputedStyle(jura).top)+5;
      jura.style.top = `${y}px`;
    }
    counter--;
  }
}
