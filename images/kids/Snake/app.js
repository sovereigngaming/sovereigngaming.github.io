let box = document.querySelector('.box');
let snake = [202,203,204,205, 206, 207];
let speed = 300;
const width = 20;
let route = 1;
let eatMe = 1;
let count = 0;
addLength = 2;
let accelerate = 20;
let add = 1;
let score = 0;
let level = 1;

let scoreDisplay = document.querySelector('#score');
let levelDisplay = document.querySelector('#level');

let isToBottom = false;
let isToUp = false;
let isToRight = false;
let isToLeft = false;

let first = true;

let isLeftParam = (snake[0] % width) === 0;
let isRightParam = (snake[0] % width) === width - 1;
let isUpperParam = snake[0] < width;
let isLowerParam = snake[0] > width**2 - width;

// let isUpperLeftEdge = snake[0] === 0;
// let isLowerLeftEdge = snake[0] === ((width**2)-width);
// let isUpperRightEdge = snake[0] === width-1;
// let isLowerRightEdge = snake[0] === ((width**2)-1);

function cutBox() {
  // const clearArray = [];

  for(let i = 0; i < width*width; i++)
  {
    let newDiv = document.createElement('div');
    newDiv.setAttribute('id', i);
    box.append(newDiv);

  }
}

cutBox();

let squares = document.querySelectorAll('.box div');
let restartBtn = document.querySelector('.restart');

squares[snake[0]].classList.add('head');
for(let i = 1 ;i < snake.length ;i++) squares[snake[i]].classList.add('tail');
squares[210].classList.add('block');

restartBtn.addEventListener('click', function () {
  location.reload();
})

let backupNumInd;
function randomSquare() {
  do{
    numInd = Math.floor(Math.random() * squares.length);
  } while(squares[numInd].classList.contains('tail') || squares[numInd].classList.contains('head') || squares[numInd].classList.contains('block') || numInd < width || numInd >= ((width**2)-width) || (numInd % width) === 0 || (numInd%width) === width-1);
  squares[numInd].innerHTML = eatMe;
  speed -= accelerate;
  backupNumInd = numInd;
  
} 

  let previousArrow = 'ArrowLeft';

  window.addEventListener('keydown', function(e) {
    isToBottom = false;
    isToUp = false;
    isToRight = false;
    isToLeft = false;

    if(first) randomSquare(); first = false;

    switch (e.code) {
      case 'ArrowUp':
        
	if(previousArrow === 'ArrowDown') break;
	previousArrow = 'ArrowUp';
  console.log(e.code);
  if(snake[0] < width) 
  {
    alert('Lost');
  location.reload();
  } 
  // console.log('arrowup');
        isToUp = true;
        route = -width; 
        snakeMove(route, speed);
        break;

      case 'ArrowDown':
	if(previousArrow === 'ArrowUp') break;
	previousArrow = 'ArrowDown';
  if(snake[0] > width**2 - width)
  {
  alert('lost');
  location.reload();
  } 
        // console.log('arrowdown');
        isToBottom = true;
        route = +width;
        snakeMove(route, speed);
        break;

      case 'ArrowLeft':
	if(previousArrow === 'ArrowRight') break;
	previousArrow = 'ArrowLeft';
  if((snake[0] % width) === 0) 
  {
    alert('Lost');  
    location.reload();
  }
  
        // console.log('arrowleft');
        isToLeft = true;
        route = -1;
        snakeMove(route, speed);
        break;

      case 'ArrowRight':
	if(previousArrow === 'ArrowLeft') break;
	previousArrow = 'ArrowRight';
  if((snake[0] % width) === width - 1) 
  {
    alert('Lost');
    location.reload();
  }
        // console.log('arrowright');
        isToRight = true;
        route = 1;
        snakeMove(route, speed);
        break;
      case 'Space':
        alert('Paused');
        break;

        // default: 
        // console.log('ignored');
      }

  }
  );

//move the snake
let previousSnakeId;
function snakeMove(route, speed) {
  count = 0; 
	clearInterval(previousSnakeId);

  let snakeId = setInterval(() => {

	let tailEnd = snake[snake.length-1];
	squares[tailEnd].classList.remove('tail');
	snake.pop();	
	snake.unshift(snake[0]+route);
	squares[snake[0]].classList.add('head');
  squares[snake[1]].classList.replace('head','tail');        
  checkNumInd();

  let isLeftParam = (snake[0] % width) === 0;
  let isRightParam = (snake[0] % width) === width - 1;
  let isUpperParam = snake[0] < width;
  let isLowerParam = snake[0] > width**2 - width;

  function hitParameter(snakeId, speed, count) {
    if (
      (isLowerParam && snake[0] + width >= squares.length && route === width) || //if snake hits bottom
      (isRightParam && snake[0] % width === width -1 && route === 1) || //if snake hits right wall
      (isLeftParam && snake[0] % width === 0 && route === -1) || //if snake hits left wall
      (isUpperParam && snake[0] - width < 0 && route === -width) ||//if snake hits the top
      (snake[0] === 0 || snake[0] === ((width**2)-width) || snake[0] === width-1 || snake[0] === ((width**2)-1))
    )
    {
      countToSpeed(speed, snakeId, count);
  }
  
}

function countToSpeed(speed, snakeId, count) {
  count = 0;
  let currId = setInterval(() => {
    count += 10;
    // console.log(count);

    if (count === speed-10)
    {
      clearInterval(currId);
      clearInterval(snakeId);
      setTimeout(() => {
        alert('Lost');
        location.reload();
      }, speed);
    }
    else if(isLeftParam && (isToBottom || isToUp) && !(snake[0] === 0) && !(snake[0] === ((width**2)-width))) clearInterval(currId);
    else if(isUpperParam && (isToRight || isToLeft) && !(snake[0] === width-1) && !(snake[0] === 0)) clearInterval(currId);
    else if(isRightParam && (isToBottom || isToUp) && !(snake[0] === width-1) && !(snake[0] === ((width**2)-1))) clearInterval(currId);
    else if(isLowerParam && (isToRight || isToLeft) && !(snake[0] === ((width**2)-width)) && !(snake[0] === ((width**2)-1))) clearInterval(currId);
    else if(snake[0] === 0 && (isToBottom || isToRight)) clearInterval(currId);
    else if(snake[0] === ((width**2)-width) && (isToRight || isToUp)) clearInterval(currId);
    else if(snake[0] === width-1 && (isToLeft || isToBottom)) clearInterval(currId);
    else if(snake[0] === ((width**2)-1) && (isToLeft || isToUp)) clearInterval(currId);
  }, 10);
}

  for(let i = 0; i < snake.length; i++) 
  {
  if(squares[snake[i]].classList.contains('block'))  
  {
    setTimeout(() => {
    alert('Lost');
    }, 10);
    location.reload();
    break;
  }
  }

  for(let i = 0; i < snake.length;i++)
  {
    if(squares[snake[i]].innerHTML == eatMe) 
	{
	squares[snake[i]].innerHTML = '';
        eatMe++;
        score += 50;
        scoreDisplay.innerHTML = score;

    if(eatMe === 5)
    {
      squares[210].classList.remove('block');
      
      alert('Next Level!');
      level += 1;
      levelDisplay.innerHTML = level;
      setNewBlocks();
      accelerate = 20;
      add = 2;
    } 
    if(eatMe === 10)
    {
      setNewBlocks(width);
      level += 1;
      levelDisplay.innerHTML = level;
      add = 3;
    } 
    if(eatMe === 13)
    {
      alert('Game Finished Good Job!');
      location.reload();
    }


	randomSquare();
    snakeGrow(route, add);

  }
  }
  
	
  if(squares[snake[0]].classList.contains('tail')) 
  {
  alert('Lost');
  location.reload();
  }
  
  
  hitParameter(snakeId, speed, count);

    }, speed);


	previousSnakeId = snakeId;
    }


function snakeGrow(currentDirection, times) {
  if(isToBottom) grow(currentDirection, times);
  if(isToLeft) grow(currentDirection, times);
  if(isToRight) grow(currentDirection, times);
  if(isToUp) grow(currentDirection, times);
}

function grow(currentDirection, times) {
  for(let i = 0; i < times; i++)
  {
    setTimeout(() => {
  squares[snake[0]].classList.replace('head','tail');
  snake.unshift(snake[0]+currentDirection);
  squares[snake[0]].classList.add('head');
  }, 150)
  }
}

function setNewBlocks(horizontal = 1) 
      {
        for(let i = 0; i < 4;i++)
        {
          do{
           blockInd = Math.floor(Math.random() * squares.length);
          } while(
          blockInd < width || 
          blockInd >= ((width**2)-width) || 
          (blockInd % width) === 0 || 
          (blockInd%width) === width-1 || 
          squares[blockInd].classList.contains('tail') ||
          squares[blockInd-horizontal].classList.contains('tail') || 
          squares[blockInd+horizontal].classList.contains('tail') || 
          squares[blockInd].classList.contains('head') || 
          squares[blockInd-horizontal].classList.contains('head') || 
          squares[blockInd+horizontal].classList.contains('head') || 
          squares[blockInd+width].classList.contains('head') || 
          squares[blockInd-width].classList.contains('head') || 
          squares[blockInd].classList.contains('block') || 
          squares[blockInd+horizontal].classList.contains('block') || 
          squares[blockInd-horizontal].classList.contains('block') 
          );
          
          squares[blockInd].classList.add('block');
          squares[blockInd+horizontal].classList.add('block');
          squares[blockInd-horizontal].classList.add('block');
        }
      }

      //Identifies first square in a line
//   function getFirstSquareOfLine(num) {
//     num = num.toString();
//     num = num.substring(0, num.length-1);
//     num = num + '0';
//     return parseInt(num);
// }

// Checks if the snake grows Over the parameters
function checkNumInd() {
  
  if (route === -width && squares[snake[0]].innerHTML == eatMe) // arrow up
  {
    for (let i = 0; i < add+1 ; i++)
    {
      backupNumInd -= width;
      if(backupNumInd < 0) {
        setTimeout(() => {
          alert('Lost');
          location.reload();

        }, 500);
      }
    }
  }
  else if (route === width && squares[snake[0]].innerHTML == eatMe) // arrow down
  {
    for (let i = 0; i < add+1 ; i++)
    {
      backupNumInd += width;
      if(backupNumInd >= width**2) {
        setTimeout(() => {
          alert('Lost');
          location.reload();
        }, 500);
      }
    }
  }
  // else if (route === -1 && squares[snake[0]].innerHTML == eatMe) // arrow left
  // {
  //   let limit = getFirstSquareOfLine(snake[0]);
  
  //   for (let i = 0; i < eatMe+1 ; i++)
  //   {
  //     console.log(eatMe)
  //     console.log(backupNumInd);
  //     backupNumInd -= 1;
  //     console.log(backupNumInd);
      
  //     if( backupNumInd < limit) {
  //       setTimeout(() => {
  //         alert('Lost');
  //       }, 500);
  //     }
  //   }
  // }

  // else if (route === 1 && squares[snake[0]].innerHTML == eatMe) // arrow right
  // {
  //   for (let i = 0; i < eatMe+1 ; i++)
  //   {
  //     let limit = getFirstSquareOfLine(snake[0]);
  //     console.log(eatMe)
  //     console.log(backupNumInd);
  //     backupNumInd += 1;
  //     console.log(backupNumInd);
  //     if(backupNumInd > limit) {
  //       setTimeout(() => {
  //         alert('Lost');
  //       }, 500);
  //     }
  //   }
  // }
}