let gameSeq = [];

let userSeq = [];

let btns = ['yellow', 'red', 'purple', 'green'];

let started = false;

let level = 0;

let highScore = localStorage.getItem('highScore') || 0;


let h2 = document.querySelector('h2');

document.addEventListener('keypress', function () {

 if (started == false) {

  console.log('started');

  started = true;

  levelup();
 }
})

function gameFlash (btn) {

  btn.classList.add('flash');
  setTimeout(function () {
    btn.classList.remove('flash')
  }, 250);

}



function userPress (btn) {

  btn.classList.add('userPress');
  setTimeout(function () {
    btn.classList.remove('userPress')
  }, 250);

}


function levelup () {

  userSeq = [];


  level ++;

  h2.innerText = `Level ${level}`;

  let random = Math.floor(Math.random() *3);

  let randomColor = btns[random];

  let randomBtn = document.querySelector(`.${randomColor}`);

  gameSeq.push(randomColor);

  console.log(gameSeq);
  gameFlash (randomBtn);
}



function checkAnswer (index) {

if (userSeq[index]== gameSeq[index]) {

  if (userSeq.length == gameSeq.length) {

    setTimeout(levelup, 1000);
  }

} else {

        if (level > highScore) {

            highScore = level;

            localStorage.setItem('highScore', highScore);

            h2.innerText = `Game over, new highscore: ${highScore} | Press any button to start again`;

        }
        else if (level < highScore) {

            h2.innerText = `Game Over, your score was ${level}, Highscore: ${highScore}, press any button to start again`;
        }

        document.querySelector('body').style.backgroundColor = 'red';

        setTimeout(() => {

            document.querySelector('body').style.backgroundColor = 'white';

        }, 150);

        reset();
    }
} 


function btnPress () {

  let btn = this;


  userPress(btn);

  userColor = btn.getAttribute('id')
  userSeq.push(userColor);

  console.log(userSeq);

  checkAnswer(userSeq.length-1);
}

let allBtns = document.querySelectorAll('.btn');

for (btn of allBtns) {
  btn.addEventListener('click', btnPress);
}




function reset() {

  started = false;
  gameSeq = [];
  userSeq = [];
    level = 0;
  
}

