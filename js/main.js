//Limits
let min_x = 0;
let max_x = 275;
let min_y = 0;
let max_y = 375;
if(window.innerwidth < 700){
     min_x = 0;
     max_x = 575;
     min_y = 0;
     max_y = 375;
}
//start with a 0 score
let score = 0;


//get game div
const game = document.getElementById('game');

//set up play area
const play_area = document.createElement('section');
play_area.classList.add('play-area');

//set up inventory area
const play_inventory = document.createElement('section');
play_inventory.classList.add('play-inventory');

//set up score area
const play_ui = document.createElement('section');
play_ui.classList.add('play-ui');
const score_ui = document.createElement('span');
score_ui.innerHTML = `SCORE: ${score}`;
play_ui.appendChild(score_ui);

createPlayUnit();


game.appendChild(play_area);
game.appendChild(play_inventory);
game.appendChild(play_ui);


function createPlayUnit(){
    //initialize Play Unit
    const play_unit = document.createElement('div');
    play_unit.classList.add('play-unit');
    play_unit.addEventListener("click", takeDamage);
    play_unit.dataset.hp = 4;
    getRandomPoint(play_unit);
    getRandomColor(play_unit);
    play_area.appendChild(play_unit);
}

function getRandomColor(playUnit){
    var color = getColorList()[Math.floor(Math.random() * getColorList().length)]

    playUnit.style.backgroundColor = color;
}

function getRandomPoint(playUnit){
    var x = Math.floor(Math.random() * max_x);
    var y = Math.floor(Math.random() * max_y);

    playUnit.style.left = `${x}px`;
    playUnit.style.top = `${y}px`;
}

function takeDamage(){
    //take damage
    this.dataset.hp--;
    this.classList.add('play-unit-take-damge');
    setTimeout(() => this.classList.remove('play-unit-take-damge'), 300);
    //show damage
    const damage_1_ui = document.createElement('span')
    damage_1_ui.classList.add('damage-1-ui');
    damage_1_ui.innerHTML = 1;
    damage_1_ui.style.top = `${parseInt(this.style.top) + -10}px` ;
    damage_1_ui.style.left = this.style.left;
    play_area.appendChild(damage_1_ui);
    setTimeout(() => {damage_1_ui.style.opacity = 0;damage_1_ui.style.top = `${parseInt(this.style.top) + -50}px`; }, 50);
    setTimeout(() => play_area.removeChild(damage_1_ui), 5000);

    

    //remove from play area if hp is 0
    if(this.dataset.hp <= 0){
        play_area.removeChild(this);
        //add held item to inventory
        this.style.top = "0px";
        this.style.left = "0px";
        this.classList.remove('play-unit-take-damge');
        this.classList.add('play-unit-inventory-item');
        this.removeEventListener("click", takeDamage);
        play_inventory.appendChild(this);
        //update score
        score++;
        score_ui.innerHTML = `SCORE: ${score}`;
        //create another play unit
        createPlayUnit();
    }
    else{
        //move to a randome point
        getRandomPoint(this);
    }
    
}

function getColorList(){
    const colorList = [
        "pink",
        "indianred",
        "lightcoral",
        "gold",
        "darkorange",
        "forestgreen",
        "springgreen",
        "olive",
        "darkolivegreen",
        "aqua",
        "darkturquoise",
        "teal",
        "powderblue",
        "cornflowerblue",
        "royalblue",
        "slateblue",
        "thisle",
        "mediumorchid",
        "darkviolet",
        //"mistyrose", to light
        "silver",
        "slategray",
        "burlywood",
        "rosybrown",
        "sandybrown",
        "peru",
        "sienna"
    ]

    return colorList;
}