const box = document.querySelector('.box');
const bombQuantity = 30;
const width = 20;
let flagCount = 0;
let leftClick = false
let rightClick = false;
let flagExcess = false;
let minesNum = bombQuantity;
let squares = [];
let isGameOver = false;
let executeTimer = true;


//Set MineCounter
const mines = document.querySelector('#minesNum');
mines.innerHTML = minesNum;

// Set Timer
const startGameBtn = document.querySelector('#restartGame');
const seconds = document.querySelector('#seconds');
let counter = 99;
seconds.innerHTML = counter;



function cutBox(){

    //assign bombed and empty squares to arrays
    const bombArray = Array(bombQuantity).fill('bomb');
    const clearArray = Array(width*width-bombQuantity).fill('clear');

    //mix in two arrays in the box
    const boxArray = [...clearArray, ...bombArray];
    const shuffledArray = boxArray.sort(() => Math.random() -0.5);
    
    //creates squares and appends
    for(let i = 0; i<width*width; i++)
    {
        const square = document.createElement('div');
        square.setAttribute('id',i);
        square.classList.add(shuffledArray[i])
        box.appendChild(square);
        squares.push(square);

        square.addEventListener('click', function(e){
            click(square);
            leftClick = true;
            setTimeout(() => {
                leftClick = false;
            }, 500)
        });

        //rightClick FlagPopUP
        square.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        flagPopUp(square);
        rightClick = true;

        if(leftClick && rightClick)
        {        
        leftAndRightClick(square);
        leftClick = false;
        rightClick = false;
        }
        });

        square.addEventListener('click', () => runTimer());
        square.addEventListener('contextmenu', () => runTimer());

    }

    //adds number of surrounding bombs
    for(let i = 0; i < squares.length ; i++)
    {
        const isLeftParam = (i % width) === 0;
        const isRightParam = (i % width) === width - 1;
        const isUpperParam = i < width;
        const isLowerParam = i > width**2 - width;
        const isUpperLeftEdge = i === 0;
        const isLowerLeftEdge = i === ((width**2)-width);
        const isUpperRightEdge = i === width-1;
        const isLowerRightEdge = i === ((width**2)-1);
        const isClear = squares[i].classList.contains('clear');
        let bombCount = 0;

        if (!isUpperParam && isClear && !isLeftParam && !isRightParam && !isLowerParam)
        {
            bombCount += countUpperBombs(i);
            bombCount += countAdjacentBombs(i);
            bombCount += countLowerBombs(i);
            
        }

        if(isUpperParam && !isUpperLeftEdge && !isUpperRightEdge && isClear)
        {
            bombCount += countAdjacentBombs(i);
            bombCount += countLowerBombs(i);
        }
        if(isRightParam && !isUpperRightEdge && !isLowerRightEdge && isClear)
        {
            bombCount += countVerticalBombs(i);
            bombCount += countLeftBombs(i);
        }
        if(isLowerParam && !isLowerLeftEdge && !isLowerRightEdge && isClear)
        {
            bombCount += countUpperBombs(i);
            bombCount += countAdjacentBombs(i);
        }
        if(isLeftParam && !isUpperLeftEdge && !isLowerLeftEdge && isClear)
        {
            bombCount += countVerticalBombs(i);
            bombCount += countRightBombs(i);
        }
        if(isUpperLeftEdge && isClear) bombCount += countUpperLeftEdge(i);
        if(isUpperRightEdge && isClear) bombCount += countUpperRightEdge(i);
        if(isLowerLeftEdge && isClear) bombCount += countLowerLeftEdge(i);
        if(isLowerRightEdge && isClear) bombCount += countLowerRightEdge(i);

        squares[i].setAttribute('data',bombCount);

        //Set colors for nums
        switch(squares[i].getAttribute('data')){
            case '1': squares[i].classList.add('one')
            break;
            case '2': squares[i].classList.add('two');
            break;
            case '3': squares[i].classList.add('three');
            break;
            case '4': squares[i].classList.add('four');
            break;
        }

    }

    function countUpperBombs(i){
        let count = 0;
            if(squares[i-width+1].classList.contains('bomb')) count++;
            if(squares[i-width].classList.contains('bomb')) count++;
            if(squares[i-width-1].classList.contains('bomb')) count++;
            return count;
        }
    function countAdjacentBombs(i){
        let count = 0;
            if(squares[i-1].classList.contains('bomb')) count++;
            if(squares[i+1].classList.contains('bomb')) count++;
            return count;
        }
    function countLowerBombs(i){
        let count = 0;
            if(squares[i+width-1].classList.contains('bomb')) count++;
            if(squares[i+width].classList.contains('bomb')) count++;
            if(squares[i+width+1].classList.contains('bomb')) count++;
            return count;
        }
    function countVerticalBombs(i){
        let count = 0;           
            if(squares[i-width].classList.contains('bomb')) count++;
            if(squares[i+width].classList.contains('bomb')) count++;
            return count;
        }
    function countLeftBombs(i){
        let count = 0;
            if(squares[i-width-1].classList.contains('bomb')) count++;
            if(squares[i+width-1].classList.contains('bomb')) count++;
            if(squares[i-1].classList.contains('bomb')) count++;
            return count;
        }
    function countRightBombs(i){
        let count = 0;
            if(squares[i-width+1].classList.contains('bomb')) count++;
            if(squares[i+width+1].classList.contains('bomb')) count++;
            if(squares[i+1].classList.contains('bomb')) count++;
            return count;
        }
        //Functions for the edges
    function countUpperLeftEdge(i){
        let count = 0;
            if(squares[i+1].classList.contains('bomb')) count++;
            if(squares[i+width].classList.contains('bomb')) count++;
            if(squares[i+width+1].classList.contains('bomb')) count++;
            return count;
        }
    function countUpperRightEdge(i){
        let count = 0;
            if(squares[i-1].classList.contains('bomb')) count++;
            if(squares[i+width-1].classList.contains('bomb')) count++;
            if(squares[i+width].classList.contains('bomb')) count++;
            return count;
        }
    function countLowerLeftEdge(i){
        let count = 0;
            if(squares[i-width].classList.contains('bomb')) count++;
            if(squares[i-width+1].classList.contains('bomb')) count++;
            if(squares[i+1].classList.contains('bomb')) count++;
            return count;
        }
    function countLowerRightEdge(i){
        let count = 0;
            if(squares[i-width-1].classList.contains('bomb')) count++;
            if(squares[i-width].classList.contains('bomb')) count++;
            if(squares[i-1].classList.contains('bomb')) count++;
            return count;
        }
    

}

cutBox();


function click(square) {
    let squareId = square.id;
    if(isGameOver) return;
    if(square.classList.contains('checked') || square.classList.contains('flag')) return;
    if(square.classList.contains('bomb')) {
        gameOver(square);
    }
    else {
        let bombNum = square.getAttribute('data');
        square.classList.add('checked');
        if (square.classList.contains('questionMark')) 
        {
            square.classList.remove('questionMark');
            square.innerHTML = '';
        }
        if(bombNum != 0) {
            square.innerHTML = bombNum;
        }
        else {
            checkAndSpread(squareId);
        }
    } 
}

function leftAndRightClick(square) {
    if(isGameOver) return;
    if(square.classList.contains('flag')) return;
    if(square.classList.contains('bomb')) {
        gameOver(square);
    } 
    else{ 
        clearSurrounding(square.id);
    } 
}

//Spread checked until numbers are found
function checkAndSpread(squareId){
        const isLeftParam = (squareId % width) === 0;
        const isRightParam = (squareId % width) === width - 1;
        const isUpperParam = squareId < width;
        const isLowerParam = squareId > width**2 - width;
        
        const isUpperLeftEdge = squareId === "0";
        const isLowerLeftEdge = squareId === `${((width**2)-width)}`;
        const isUpperRightEdge = squareId === `${width-1}`;
        const isLowerRightEdge = squareId === `${((width**2)-1)}`;

        if (!isUpperParam && !isLeftParam && !isRightParam && !isLowerParam)
        {
            clearSurrounding(squareId);
        }

        if(isUpperParam && !(squareId <= 0) && !(squareId >= width-1))
        {
            clearAdjacent(squareId);
            clearLower(squareId);
        }
        if(isRightParam && !(squareId <= width-1) && !(squareId >= width**2-1))
        {
            clearLeft(squareId);
            clearVertical(squareId);
        }
        if(isLowerParam && !(squareId <= width**2 -20) && !(squareId >= width**2 -1))
        {
            clearAdjacent(squareId);
            clearUpper(squareId);
        }
        if(isLeftParam && !(squareId <= 0) && !(squareId >= width**2 -20))
        {
            clearRight(squareId);
            clearVertical(squareId);
        }
        if(isUpperLeftEdge) clearForUpperLeftEdge(squareId);
        if(isUpperRightEdge) clearForUpperRightEdge(squareId);
        if(isLowerLeftEdge) clearForLowerLeftEdge(squareId);
        if(isLowerRightEdge) clearForLowerRightEdge(squareId);

}

function clearSurrounding(squareId){

        clearUpper(squareId);
        clearLower(squareId);
        clearAdjacent(squareId);
        }

function clearUpper(squareId){

        newId = squares[parseInt(squareId) -width].id
        newSquare = document.getElementById(newId);
        click(newSquare);
        newId = squares[parseInt(squareId) -width+1].id
        newSquare = document.getElementById(newId);
        click(newSquare);
        newId = squares[parseInt(squareId) -width-1].id
        newSquare = document.getElementById(newId);
        click(newSquare);
}
function clearAdjacent(squareId){
        
        newId = squares[parseInt(squareId) +1].id
        newSquare = document.getElementById(newId);
        click(newSquare);
        
        newId = squares[parseInt(squareId) -1].id
        newSquare = document.getElementById(newId);
        click(newSquare);

        
}
function clearLower(squareId){
        
        newId = squares[parseInt(squareId) +width-1].id
        newSquare = document.getElementById(newId);
        click(newSquare);
        newId = squares[parseInt(squareId) +width].id
        newSquare = document.getElementById(newId);
        click(newSquare);
        newId = squares[parseInt(squareId) +width+1].id
        newSquare = document.getElementById(newId);
        click(newSquare);
}

function clearVertical(squareId){
        
        newId = squares[parseInt(squareId) -width].id
        newSquare = document.getElementById(newId);
        click(newSquare);
        newId = squares[parseInt(squareId) +width].id
        newSquare = document.getElementById(newId);
        click(newSquare);
}
function clearLeft(squareId){        
                
        newId = squares[parseInt(squareId) -width-1].id
        newSquare = document.getElementById(newId);      
        click(newSquare);
        
        newId = squares[parseInt(squareId) +width-1].id
        newSquare = document.getElementById(newId);      
        click(newSquare);
        
        newId = squares[parseInt(squareId) -1].id
        newSquare = document.getElementById(newId);
        click(newSquare);
        
        
}
function clearRight(squareId){       
        
        newId = squares[parseInt(squareId) -width+1].id
        newSquare = document.getElementById(newId);
        click(newSquare);
        newId = squares[parseInt(squareId) +width+1].id
        newSquare = document.getElementById(newId);
        click(newSquare);
        newId = squares[parseInt(squareId) +1].id
        newSquare = document.getElementById(newId);
        click(newSquare);
}

function clearForUpperLeftEdge(squareId){

        newId = squares[parseInt(squareId) +1].id
        newSquare = document.getElementById(newId);
        click(newSquare);
        newId = squares[parseInt(squareId) +width+1].id
        newSquare = document.getElementById(newId);
        click(newSquare);
        newId = squares[parseInt(squareId) +width].id
        newSquare = document.getElementById(newId);
        click(newSquare);
}
function clearForUpperRightEdge(squareId){

        newId = squares[parseInt(squareId) -1].id
        newSquare = document.getElementById(newId);
        click(newSquare);
        newId = squares[parseInt(squareId) +width-1].id
        newSquare = document.getElementById(newId);
        click(newSquare);
        newId = squares[parseInt(squareId) +width].id
        newSquare = document.getElementById(newId);
        click(newSquare);
}
function clearForLowerLeftEdge(squareId){

        newId = squares[parseInt(squareId) -width].id
        newSquare = document.getElementById(newId);
        click(newSquare);
        newId = squares[parseInt(squareId) -width+1].id
        newSquare = document.getElementById(newId);
        click(newSquare);
        newId = squares[parseInt(squareId) +1].id
        newSquare = document.getElementById(newId);
        click(newSquare);
}
function clearForLowerRightEdge(squareId){

        newId = squares[parseInt(squareId) -width].id
        newSquare = document.getElementById(newId);
        click(newSquare);
        newId = squares[parseInt(squareId) -width-1].id
        newSquare = document.getElementById(newId);
        click(newSquare);
        newId = squares[parseInt(squareId) -1].id
        newSquare = document.getElementById(newId);
        click(newSquare);
}

//flags function
function flagPopUp(square){
    if (isGameOver) return;
    if (!square.classList.contains('checked')) 
    {   
        
        if (!square.classList.contains('flag') && !square.classList.contains('questionMark')) 
        {
            if(flagCount > bombQuantity && !flagExcess){
                alert("Careful Flags Number Exceeded Bomb Amount!");
                flagExcess = true;
            }
        square.classList.add('flag');
        square.innerHTML = ' 🚩'; 
        flagCount ++;
        if(square.classList.contains('flag') && square.classList.contains('bomb'))
        {
        minesNum--;
        mines.innerHTML = minesNum;
        }
        checkForWin();
        } 
        else
        {
        questionMark(square);        
        }
    }
}

//questionMark function
function questionMark(square){
    if(isGameOver) return;
    if(square.classList.contains('flag'))
    {
        if(square.classList.contains('bomb')){
        minesNum++;
        mines.innerHTML = minesNum;
        } 
        square.classList.remove('flag');
        square.classList.add('questionMark');
        square.innerHTML = '❓';
        square.style.color = 'blue';
        flagCount --;
    }
    else
    {
        !square.classList.remove('questionMark');
        square.innerHTML= '';
    }
}

//gameOver function

function gameOver(square){
    isGameOver = true;

    squares.forEach(function (square) {
        if(square.classList.contains('bomb'))
        { 
        square.innerHTML = '💣'; 
        square.classList.add('bombReveal');
        }
    });
    setTimeout(() => {
        alert('Game Over');
        document.location.reload();
    }, 50);
        

}

//checkForWin function

function checkForWin() {
    let count = 0;

    for (let i = 0; i < squares.length; i++ ){
    if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
        count++;
    }
    if (count === bombQuantity){
        isGameOver = true;
        setTimeout(() => {
        alert('You Win');
        document.location.reload();    
        }, 50);        
        checkUnchecked();
        break;
    }
    }
}

function checkUnchecked() {
    for(let i = 0; i < squares.length ;i++)
    {
        let minesNum = squares[i].getAttribute('data');

        if(minesNum != 0) squares[i].innerHTML = minesNum;
        else squares[i].innerHTML = '';

        if(squares[i].classList.contains('questionMark'))
        {
            squares[i].classList.remove('questionMark');            
        } 
        if(squares[i].classList.contains('flag') && !squares[i].classList.contains('bomb')) 
        {
        squares[i].classList.remove('flag');
        
        }
        if(!squares[i].classList.contains('bomb') && !squares[i].classList.contains('checked')) squares[i].classList.add('checked');
    }
}


//set up timer
function runTimer(){
    if(executeTimer)
    {
        executeTimer = false;
        setInterval(() => {
        counter -= 1;
        seconds.innerHTML = counter;

        if(counter === 0)
        {
            setTimeout(() => {
            alert('Time Ran Out! You Lose');
            document.location.reload();
            }, 200);
        }
    }, 1000)
    }
};

startGameBtn.addEventListener('click', function(e){
    document.location.reload();
});
