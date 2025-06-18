// declare and define variables that refer to HTML elements
let btn = document.querySelector(".startBtn");
let time = document.querySelector(".time")
let score = document.querySelector(".score")
let test = document.querySelector(".test")

// running time of the timer (during an iteration when the value changes)
// necessary for countdown functionality
let curr_time = document.querySelector(".time");

let seconds = 60;
let points = 0;

// variable that holds the letter typed
let typed;
// spans hold individual letters of the test word
let spans;
// keeps track of when the game is active (to prevent double starting the game)
let game_active = false;

// make your list of test words here
// you may change the existing words
let list = ["the","quick","brown","fox","jumps","over","the","lazy","dog"];

/*
 *
 * countdown()
 * 
 */
function countdown() {
    timer = setInterval(function() {
        seconds -= 1;
        curr_time.innerHTML = seconds;

        // timer ends
        if (seconds <= 0) {
            //ending alert
            alert("game Over! Your score was " + points);

            // resets all HTML elements
            score.innerHMTL = "0";
            test.innerHTML = "";
            time.innerHTMl = "60";

            game_active = false;

            clearInterval(timer);
            seconds = 60;
            points = 0;
        }
    }, 1000);
}






/*
 *
 * random_word()
 * 
 */
function random_word() {
    let random = Math.floor(Math.random() * list.length);
    let word = list[random].split("");

    //clears any previous words/characters
    test.innerHTML = "";

    for (let i = 0; i < word.length; i++) {
        //create an inline span container for the letter
        let span = document.createElement("span");
        //creates a class that applies to all of the spans that make up the word
        span.classList.add("span");

        //shows what a span is
        span.style.border = "solid red";

        //changes HTML of the span to show each letter
        span.innerHTML = word[i];
        test.appendChild(span);
    }

    // defines a variable that refers to all spans     
    spans = document.querySelectorAll(".span");
} 


/*
 *
 * btn event listener
 * 
 */
// button must start countdown and produce random word
btn.addEventListener("click", function() {
    //prevents restarting mid-game
    if (game_active === true) {
        return;
    }
    //prevents button double click/ further clicks
    // btn.disabled = true; //unnecessary
    // status of if there is a game/round that is ongoing
    game_active = true;

    // uses/calls function that allow for countdown timer
    // uses/calls function for random word generation
    countdown();
    random_word();
});

/*
 *
 * typing(event)
 * 
 */
function typing(event) {
    typed = event.key;
    console.log(typed);

    for (let i = 0; i < spans.length; i++) {
        if (spans[i].innerHTML === typed) {
            if ((spans[i].classList.contains("background") === false) && 
                    (spans[i-1] === undefined || spans[i-1].classList.contains("background") === true)) {
                spans[i].classList.add("background");
                break;
            }
        }
    }

    let checker = 0;
    for (let j = 0; j < spans.length; j++) {
        //checker checks how many spans have background colors
        if (spans[j].className === "span background") {
            checker++;
        }
        //checks when the entire word is typed
        if (checker === spans.length) {
            //updates points
            points = points + 1;
            score.innerHTML = points;

            //resets
            //temporarily stops keyboard input during transition
            document.removeEventListener("keydown", typing, false);

            //re-enables keyboard input and gives new word after 200ms delay
            setTimeout(function(){
                random_word(); // give another word
                document.addEventListener("keydown", typing, false);
            }, 200);
        }
    }
}


//enables keyboard input (default)
document.addEventListener("keydown", typing, false);