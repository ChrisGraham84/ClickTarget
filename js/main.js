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

//set up start button
const start_area = document.createElement('section');
start_area.classList.add('start-area');
start_area.innerHTML = "START";
start_area.addEventListener("click", startGame)


function startGame(){
    this.style.display = "none";

        //set up play area
        const play_area = document.createElement('section');
        play_area.classList.add('play-area');
        play_area.id = "playArea";

        //set up inventory area
        const play_inventory = document.createElement('section');
        play_inventory.classList.add('play-inventory');

        //set up timer
        const time_ui = document.createElement('section');
        time_ui.classList.add('time-ui');
        const ticker_ui = document.createElement('span');
        time_ui.appendChild(ticker_ui);

        //set up score area
        const play_ui = document.createElement('section');
        play_ui.classList.add('play-ui');
        const score_ui = document.createElement('span');
        score_ui.innerHTML = `SCORE: ${score}`;
        play_ui.appendChild(score_ui);


    //var countDownDate = new Date("Jan 5, 2024 15:27:25").getTime();
    var t = new Date()
    var countDownDate = t.setSeconds(t.getSeconds() + 35);
    var x = setInterval(()=>{
    var now = new Date().getTime();
    var remainingTime = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    var hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        ticker_ui.innerHTML = `COUNTDOWN: ${seconds}s`

        if(remainingTime < 0){
            clearInterval(x);
            ticker_ui.innerHTML = "TIMEOUT";
            game.removeChild(play_area);
            if(score > 4)
            {
                score_ui.innerHTML = `SCORE ${score} -- YOU WIN`;
            }
            else
            {
                score_ui.innerHTML = `SCORE ${score} -- YOU LOSE`;
            }
            this.style.display = "block";
        }

    },1000);

       
////

        createPlayUnit();
       
        game.appendChild(play_area);
        game.appendChild(play_inventory);
        game.appendChild(time_ui);
        game.appendChild(play_ui);
     
       for(const child of game.children){
        console.log(child.id);
       }

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
}



game.appendChild(start_area);




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