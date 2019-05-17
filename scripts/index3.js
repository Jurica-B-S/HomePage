/**
 * index.js
 * - All our useful JS goes here, awesome!
 */
 const HORIZONTAL_LINE = 140;
 //const LEFT_MARGIN = 140;
 //const RIGHT_MARGIN = 140;

console.log("JavaScript is amazing!");

let jura = document.getElementById("jurica");
document.addEventListener("keydown", moveJura);
document.addEventListener("keyup", stopJura);
let screen_interval = setInterval(check_state, 50);
//console.log("hehe",parseInt(getComputedStyle(jura).top));
console.log(screen_interval);
let x = 0;
let y = 0;
let jump_direction = 1;
let left_right_direction = 1;
let move_interval = 1;
let jump_height=60;
let last_y_pos =  parseInt(getComputedStyle(jura).top);
console.log(parseInt(getComputedStyle(jura).top))
let map_keys_pressed = new Map();
let map_of_events = new Map();

map_of_events.set("move",false);

console.log(window.innerWidth);

let mesh = [];
for(let j = 0; j < window.innerWidth + 2000; j++){
  let pom = [];
  for(let k = 0; k < 200; k++){
    pom.push(0);
  }
  mesh.push(pom);
}
let platforms = document.getElementsByClassName("platform");
let platforms_array = [];
for(let i=0; i < platforms.length; i++){
  platforms_array.push({left:parseInt(getComputedStyle(platforms[i]).left), top:parseInt(getComputedStyle(platforms[i]).top), width:parseInt(getComputedStyle(platforms[i]).width), height:parseInt(getComputedStyle(platforms[i]).height)});
}
console.log(platforms, platforms.length);
create_mesh();
//print_mesh();

function create_mesh(){
  let anchor_x;
  let anchor_y;
  let width;
  let height;
  for(let i=0; i < platforms.length; i++){
    anchor_x = platforms_array[i].left;
    anchor_y = platforms_array[i].top;
    width = platforms_array[i].width;
    height = platforms_array[i].height;
      for(let j = anchor_x; j < anchor_x + width; j++){
        for(let k = anchor_y; k < anchor_y + height; k++){
          mesh[j][k] = 1;
        }
      }
  }
}

function print_mesh(){
  for(let j = 0; j < window.innerWidth + 2000; j++){
    for(let k = 0; k < 200; k++){

    }
      console.log(mesh[j]);
  }
}


function check_state(){
  if(map_keys_pressed.has(38) && !map_keys_pressed.has(37) && !map_keys_pressed.has(39) && !map_of_events.get("move")){
     map_of_events.set("move",true);
     move_interval = setInterval(jump, 20);
     last_y_pos = parseInt(getComputedStyle(jura).top);
     console.log("jump");
  }

  if(map_keys_pressed.has(37) && !map_keys_pressed.has(38) && !map_keys_pressed.has(39) && !map_of_events.get("move")){
    map_of_events.set("move",true);
      move_interval = setInterval(move_left, 20);
  }
  if(map_keys_pressed.has(39) && !map_keys_pressed.has(38) && !map_keys_pressed.has(37)  && !map_of_events.get("move")){
      map_of_events.set("move",true);
      move_interval = setInterval(move_right, 20);
  }

  if(map_keys_pressed.has(39) && map_keys_pressed.has(38)  && !map_of_events.get("move")){
     map_of_events.set("move",true);
     move_interval = setInterval(jump_right, 20);
     console.log("rightjump");
  }
  if(map_keys_pressed.has(37) && map_keys_pressed.has(38)  && !map_of_events.get("move")){
     map_of_events.set("move",true);
     move_interval = setInterval(jump_left, 20);
     console.log("leftjump");
  }

}

function moveJura(event){
   map_keys_pressed.set(event.keyCode, true);
   //console.log("keyCode",event.keyCode);
}

function stopJura(event){
   map_keys_pressed.delete(event.keyCode);
   //console.log("keyCode",event.keyCode);
}

function jump(){
  jump_height--;
  if (jump_height === 30){
      jump_direction = -1;
  }
  y = parseInt(getComputedStyle(jura).top) - 5 * jump_direction;
  jura.style.top = `${y}px`;
  if (jump_height === 1){
    y = parseInt(getComputedStyle(jura).top)-5;
    jura.style.top = `${y}px`;
    jump_height=60;
    jump_direction = 1;
    if(move_interval !== -1) {
      clearInterval(move_interval)
    };
    move_interval=-1;
    map_of_events.set("move",false);
    last_y_pos =  parseInt(getComputedStyle(jura).top);
    console.log("clear_interval",move_interval);
  }
  if(check_collision_up()){
    jump_direction = -1;
    jump_height = (last_y_pos - parseInt(getComputedStyle(jura).top)) / 5 + 1;
    y = parseInt(getComputedStyle(jura).top)+5;
    jura.style.top = `${y}px`;
  }
//  if(check_collision_down()){

//  }
}
function move_right(){
  if((check_collision_down()) || parseInt(getComputedStyle(jura).top) === 180){
      x = parseInt(getComputedStyle(jura).left)+5;
      jura.style.left = `${x}px`;
      if(move_interval !== -1) {
        clearInterval(move_interval)
      };
      move_interval=-1;
      map_of_events.set("move",false);
  }
  else{
    y = parseInt(getComputedStyle(jura).top)+5;
    jura.style.top = `${y}px`;
  }

  console.log("clear_interval",move_interval);
}

function move_left(){
  if((check_collision_down()) || parseInt(getComputedStyle(jura).top) === 180){
      x = parseInt(getComputedStyle(jura).left)-5;
      jura.style.left = `${x}px`;
      if(move_interval !== -1) {
        clearInterval(move_interval)
      };
      move_interval=-1;
      map_of_events.set("move",false);
  }
  else{
    y = parseInt(getComputedStyle(jura).top)+5;
    jura.style.top = `${y}px`;
  }
  console.log("clear_interval",move_interval);
}

function jump_right(){
  jump_height--;
  if (jump_height === 30){
      jump_direction = -1;
  }
  y = parseInt(getComputedStyle(jura).top) - 5 * jump_direction;
  x = parseInt(getComputedStyle(jura).left) + 3 * left_right_direction;
  jura.style.top = `${y}px`;
  jura.style.left = `${x}px`;


  if ((jump_height === 1 && check_collision_down()) || parseInt(getComputedStyle(jura).top) === 180){
    y = parseInt(getComputedStyle(jura).top);
    x = parseInt(getComputedStyle(jura).left)+3;
    jura.style.left = `${x}px`;
    jura.style.top = `${y}px`;
    console.log("hehe",parseInt(getComputedStyle(jura).top));
    jump_direction = 1;
    left_right_direction = 1;
    jump_height=60;
    if(move_interval !== -1) {
      clearInterval(move_interval)
    };
    move_interval=-1;
    map_of_events.set("move",false);
    console.log("clear_interval",move_interval);
  }
  if(check_collision_down() && jump_height !== 1){
    console.log("collison down");
    jump_direction = 1;
    left_right_direction = 1;
    jump_height=60;
    if(move_interval !== -1) {
      clearInterval(move_interval)
    };
    move_interval=-1;
    map_of_events.set("move",false);
  }
  if(check_collision_up()){
    jump_direction = -1;
    jump_height = (last_y_pos - parseInt(getComputedStyle(jura).top)) / 5 + 1;
    y = parseInt(getComputedStyle(jura).top)+5;
    jura.style.top = `${y}px`;
  }
  if(check_collision_right()){
    console.log("collison right")
    left_right_direction = -1;
    x = parseInt(getComputedStyle(jura).left)-5;
    jura.style.left = `${x}px`;
  }
}

function jump_left(){
  jump_height--;
  if (jump_height === 30){
      jump_direction = -1;
  }
  y = parseInt(getComputedStyle(jura).top) - 5 * jump_direction;
  x = parseInt(getComputedStyle(jura).left)- 3 * left_right_direction;
  console.log(x);
  jura.style.top = `${y}px`;
  jura.style.left = `${x}px`;
  if ((jump_height === 1 && check_collision_down()) || parseInt(getComputedStyle(jura).top) === 180){
    y = parseInt(getComputedStyle(jura).top);
    x = parseInt(getComputedStyle(jura).left)-3;
    jura.style.left = `${x}px`;
    jura.style.top = `${y}px`;
    console.log("hehe",parseInt(getComputedStyle(jura).top));
    jump_direction = 1;
    left_right_direction = 1;
    jump_height=60;
    if(move_interval !== -1) {
      clearInterval(move_interval)
    };
    move_interval=-1;
    map_of_events.set("move",false);
    console.log("clear_interval",move_interval);
  }
  if(check_collision_down() && jump_height !== 1){
    console.log("collison down");
    jump_direction = 1;
    left_right_direction = 1;
    jump_height=60;
    if(move_interval !== -1) {
      clearInterval(move_interval)
    };
    move_interval=-1;
    map_of_events.set("move",false);
  }
  if(check_collision_up()){
    console.log("collison up")
    jump_direction = -1;
    jump_height = (last_y_pos - parseInt(getComputedStyle(jura).top)) / 5 + 1;
    y = parseInt(getComputedStyle(jura).top)+5;
    jura.style.top = `${y}px`;
  }
  if(check_collision_left()){
    console.log("collison left")
    left_right_direction = -1;
    x = parseInt(getComputedStyle(jura).left)+5;
    jura.style.left = `${x}px`;
  }

}


function check_collision_up(){
  if(mesh[parseInt(getComputedStyle(jura).left)][parseInt(getComputedStyle(jura).top)] === 1 || mesh[parseInt(getComputedStyle(jura).left) + parseInt(getComputedStyle(jura).width)][parseInt(getComputedStyle(jura).top)] === 1){
    return true;
  }
  return false;
}
function check_collision_down(){
  if(mesh[parseInt(getComputedStyle(jura).left)+3][parseInt(getComputedStyle(jura).top) + parseInt(getComputedStyle(jura).height)] === 1 || mesh[parseInt(getComputedStyle(jura).left) + parseInt(getComputedStyle(jura).width) - 3][parseInt(getComputedStyle(jura).top) + parseInt(getComputedStyle(jura).height)] === 1 || parseInt(getComputedStyle(jura).top) === 180){
    return true;
  }
  return false;
}
function check_collision_right(){
  if(mesh[parseInt(getComputedStyle(jura).left) + parseInt(getComputedStyle(jura).width)][parseInt(getComputedStyle(jura).top)] === 1 || mesh[parseInt(getComputedStyle(jura).left) + parseInt(getComputedStyle(jura).width)][parseInt(getComputedStyle(jura).top) + parseInt(getComputedStyle(jura).height) -1] === 1){
    return true;
  }
  return false;
}
function check_collision_left(){
  if(mesh[parseInt(getComputedStyle(jura).left)][parseInt(getComputedStyle(jura).top)] === 1 || mesh[parseInt(getComputedStyle(jura).left)][parseInt(getComputedStyle(jura).top) + parseInt(getComputedStyle(jura).height)-1] === 1){
    return true;
  }
  return false;
}
