/**
 * index.js
 * - All our useful JS goes here, awesome!
 */
 const HORIZONTAL_LINE = 140;

console.log("JavaScript is amazing!");
document.addEventListener("keydown", moveJura);
let jura = document.getElementById("jurica");
console.log("hehe",parseInt(getComputedStyle(jura).top));

let x=0;
let y=0;
let jump_direction=1;
let jump_interval = 1;

function moveJura(event){
  let jura = document.getElementById("jurica");

    switch(event.key){
      case "ArrowLeft":
          x = parseInt(getComputedStyle(jura).left)-5;
          jura.style.left = `${x}px`;
      break;
        case "ArrowRight":
          x = parseInt(getComputedStyle(jura).left)+5;
          jura.style.left = `${x}px`;
      break;
        case "ArrowUp":
        if(parseInt(getComputedStyle(jura).top) === HORIZONTAL_LINE && jump_interval === 1){
          console.log("starting jump",parseInt(getComputedStyle(jura).top));
          jump_interval = setInterval(jump, 20);
        }
      break;
        case "ArrowDown":
        if(parseInt(getComputedStyle(jura).top) >= HORIZONTAL_LINE){
          y = parseInt(getComputedStyle(jura).top)+5;
          jura.style.top = `${y}px`;
        }
      break;
    }
}

function jump(){
  if (parseInt(getComputedStyle(jura).top) < HORIZONTAL_LINE - 70){
      jump_direction = -1;
  }
  y = parseInt(getComputedStyle(jura).top) - 5 * jump_direction;
  jura.style.top = `${y}px`;

  if (parseInt(getComputedStyle(jura).top) > HORIZONTAL_LINE){
    y = parseInt(getComputedStyle(jura).top)-5;
    jura.style.top = `${y}px`;
    console.log("hehe",parseInt(getComputedStyle(jura).top));
    jump_direction = 1;
    clearInterval(jump_interval);
    jump_interval=1;
    console.log("clear_interval",jump_interval);
  }
}
