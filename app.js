let rightScroll = document.querySelector('#rightScroll');
let leftScroll = document.querySelector('#leftScroll');

let firstImg = document.querySelector('#firstMainImg');
let secondImg = document.querySelector('#secondMainImg');
let thirdImg = document.querySelector('#thirdMainImg');

firstImg.classList.add('orderOne');
secondImg.classList.add('orderTwo');
thirdImg.classList.add('orderThree');

let previousOrder = ['orderOne', 'orderTwo', 'orderThree'];
let imageNum = [firstImg, secondImg, thirdImg];
let currentOrder = ['orderOne', 'orderTwo', 'orderThree'];

//left and right scroll

leftScroll.addEventListener('click', () => {

    for(let i = 0 ;  i < imageNum.length ;i++)
    {
    imageNum[i].classList.remove(previousOrder[i]);
    }

    holder = previousOrder[2];
    previousOrder.pop();
    previousOrder.unshift(holder);

    
        for(let i = 0 ; i < imageNum.length ; i++)
    {
        imageNum[i].classList.add(previousOrder[i]);
    } 

});

rightScroll.addEventListener('click', () => {
    

        for(let i = 0 ;  i < imageNum.length ;i++)
    {
    imageNum[i].classList.remove(previousOrder[i]);
    }

    holder = previousOrder[0];
    previousOrder.shift();
    previousOrder.push(holder);

    for(let i = 0; i < imageNum.length ; i++)
    {
        imageNum[i].classList.add(previousOrder[i]);
    }
});

//click for categories

const category = {
    car: [['Supercross','Go Crazy Mazy','3'], ['TrophyLite Rally','The Famous Rally','4'], ['DeathChase','Cars Show!','3'], ['Pixel Racing','Race Race Race!','3'], ['Xtreme','Smash Smash Smash','3'], ['Wheel Thunder','Wheels War','3'], ['Evolution','Build Cars From Scratch!','5'], ['Gear','Get Your Gears Ready!','3'], ['Nevada','Car','4'], ['Surmount','Car','5'], ['GoPro','Car','2'], ['Hill Climb','Car','4'], ['Death','Car','5'], ['Carabians','Car','5'], ['Car Music','Car','3'], ['Car Wars','Car','4'], ['Simba Car','Car','4'], ['Lionista','Car','2']],
    cooking: [['Cooking City','Develop Restaurants!','4'], ['Cooking Craze','Cook Cook Cook','5'], ['Cooking Fever','Find Balance','3'], ['Perfect Slices','Cut Everything!','4'], ['Restaurant Story','Innovate Restaurant','3'], ['Great Pizza','Make Pizza','5'], ['Mamamiya', 'Your Old Classic Mamamiya','4'], ['Yummy Yumm','Make The Best Dishes','3'], ["Amy's Restaurant",'Cooking','3'], ["Charlie's Restaurant",'Cooking','5'], ['Wonder Restaurant','Cooking','3'], ['Chicken Kitchen','Cooking','4'], ['Carrots','Cooking','4'], ['Potato','Cooking','2'], ['Animals','Cooking','3'], ['Hunt And Cook','Cooking','4'], ['Seemless ','Cooking','4'], ['Explore','Cooking','3']],
    shooting: [['Aliens Extermination','Terminate The Aliens','5'], ['Beast Busters', 'Hunt The Beasts','4'], ['Big Buck Hunter', 'Hunt And Get The Bounty','5'], ['Bullet Mark', 'Shooting','4'], ['Shoot The Dead', 'Kill Those Zombies','5'], ['Shoot The Living', "Shoot Everyone",'3'], ['Gunblade', 'Adventure','3'], ['Kill', 'Shoot','3'], ['Shoot The Bots','Shooting','4'], ['Robo-Hunt','Shooting','4'], ['Eggs','Shooting','5'], ['Money Grabber','Shooting','4'], ['Lone Wolf','Shooting','5'], ['Summary','Shooting','3'], ['Souta','Shooting','2'], ['Amber','Shooting','4'], ['Saga','Shooting','2'], ['Chick Chock','Shooting','5']],
    racing: [['The Race','Win The Race','4'], ['Forza','Pick Your Racing Car','3'], ['Need For Speed','Racing','5'], ['F1 2019','Race','4'], ['Dirt Rally','Race The Woods','5'], ['Speed','Race','3'], ['Hit The Jungle','Race In The Jungle','4'], ['Race Or Die','Race Bet','5'], ['Race Is Life','Race','4'], ['Race Is Drugs','Race','4'], ['Hit The Road','Racing','3'], ['Up & Down','Racing','2'], ['Antifa','Racing','3'], ['Shan','Racing','4'], ['Kouma','Racing','4'], ['Lamborghini','Racing','5'], ['Shupa','Racing','2'], ['FreDoa','Racing','4'], ['SimbaBimba','Racing','2'], ['Kick The Engine','Racing','3']],
    dressup: [["Cindy's Dress up Friends",'Dress Up Cindy','3'], ['Covet Fashion','Fashion','5'], ['Fabulous series','Design And Dress Up','3'], ['Kim: HollyWood','Dress Up Stars','3'], ['Nikki','Dress Up Nikki','3'], ['Dress Me', 'Dress Up','4'], ['Dress Her','Dress Up','3'], ['Fashion','Dress Up','4'], ['Dress Design','Dress Up','3'], ['Dress Dora','Dress Up Dora','4'], ["Can't Find My Dress", 'Find The Dress!','4'], ['Mystic Princess Dress Up','Dress The Princess','4'], ['Shopping Mall Girl','Shopping','4'], ['Clear Up','Dress Up','4'], ['MakeUp','Dress Up','3'], ["Nad's Show",'Dress Up','4'], ['Ram','Dress Up','4'], ['Kristina','Dress Up','2'], ['Old Rome Dress Up','Dress Up','3'], ['Get Up','Dress Up','4'], ['Shneider','Dress Up','4'], ['Seraya','Dress Up','4'], ['BlewMe','Dress Up','4']],
    puzzle: [['Acrostic','Hard Puzzle','4'], ['Anagram',"Medium Puzzle",'3'], ['Brain Teaser','Puzzle','3'], ['Burr Puzzle','Puzzle','3'], ['Maze Puzzle','Put The Maze Back In Pieces','5'], ['Chess Puzzle','Solve The Puzzle','5'], ['Lola Puzzle','Puzzle','2'], ['Brain Smacker','Hard Puzzle','3'], ['Daze Maze','Puzzle','3'], ['StraightLane','Puzzle','4'], ['Souba','Puzzle','2'], ['Randota','Puzzle','4'], ['Hint','Puzzle','3'], ['SubMob','Puzzle','3'], ['Pieces','Puzzle','5'], ['Smart','Puzzle','3'], ['Win Or Lose','Puzzle','4'], ['No Ties','Puzzle','3']],
    kids: [['Snake','kids','4'], ["Let's Play",'Kids','3'], ["Let's Go","Run And Play",'5'], ['Doppy Is Tired','Help Doppy Relax','3'], ['Walk The Dog','Take Prasko For A Walk','3'], ['Play With MiMi','Have Fun With MiMi','3'], ['The Mazoura','Kids','5'], ['Witches','Hunt The Witch','3'], ['Roblox','Kids','3'], ['KitaKita','Kids','4'], ['Seba','Kids','3'], ['Shiba','Kids','4'], ['Walk The Dogs','Kids','2'], ['Mira','Kids','5'], ['Shatira','Kids','4'], ['KinderGarden','Kids','4'], ['Sisters','Kids','4'], ['Brothers','Kids','4'], ['Family Time','Kids','4']],
    strategy: [['MineSweeper','Strategy','5'], ['3DO','Strategy','4'], ['Climb The Tower','Careful Traps Everywhere!','5'], ['Munch Tansha','Strategy','3'], ['Brain Stimulator','Put The Pieces Together','4'], ['Holy Moly','Strategy','1'], ['Game Boy','Solve Mystery','3'], ['Watch Out','Traps Everywhere!','4'], ['Tick Tock','The Clock Is Clicking!','4'], ['Here','Strategy','4'], ['Around','Strategy','5'], ['Mummy','Strategy','3'], ['Suka','Strategy','4'], ['Sidney','Strategy','4'], ['Zimbabwey','Strategy','5'], ['Rant The Bank','Strategy','3'], ['Shaka','Strategy','3'], ['Loupa','Strategy','2'], ['MeYou','Strategy','1']],
    action: [['Shoot','Action','3'], ['Kill Fill','Action','3'], ['Target','Get The Target','5'], ['Clock Click','Time Is Running!','3'], ['Run Or Die','Action','4'], ['Hitman','Stealth','3'], ['Winter Is Coming','Harsh Winter On The Door','4'], ['Death Road','All Ways Leads To Death','3'], ['Kill Or Die','Survival','4'], ['Body Of Steal','Action','3'], ['Shante','Action','4'], ['Sup','Action','4'], ['Romania','Action','5'], ['Mushroom','Action','3'], ['Soda','Action','4'], ['Rat','Action','5'], ['Low And High','Action','5'], ['Kill Sherry','Action','3'], ['The Prince','Action','4'], ['King Of Sparta','Action','5']],
    multiplayer: [['Blood Wars','War Multiplayer','4'], ['Castle Of Heroes','Win The Battle Heroes','3'], ['Dark Orbit','Multiplayer','3'], ['Crazy Penguins','Kill The Penguins','4'], ['Anonymous', 'Multiplayer','4'], ['JoJo Empire','Multiplayer','4'], ['Tower Of Craze',"Don't be Tempted",'3'], ['Spill The Blood','Action','4'], ['The Empire','Fight For The Empire','3'], ['Rap','Multiplayer','4'], ['Tshinnji','Multiplayer','5'], ['Hiroshima','Multiplayer','3'], ['Nakazaki','Multiplayer','3'], ['Hit The Gym','Multiplayer','2'], ['Get Those Gains','Multiplayer','2'], ['Samurai Combat','Multiplayer','4'], ['Sandra Is Missing','Multiplayer','5'], ['Get The Prize','Multiplayer','4'],['Holes','Multiplayer','5']],
    sport: [['Kick The Ball','Sport','3'], ['FootBall','Sport','4'], ['Fifa 12','Sport','3'], ['Bowling','Hit The Pins','3'], ['Pool','Splash Sport','4'], ['Surf The Valley','Explore The Valley Surfing','3'], ['Get The Fish','Learn Best Fishing Practices','3'], ['Hockey','Sport','3'], ['DodgeBall','Sport','4'], ['Racket','Sport','5'], ['Poker','Sport','3'], ['Backgammon','Sport','5'], ['Skat','Sport','3'], ['Combat Sports','Sport','5'], ['Indoor','Sport','5'], ['Ice Hockey','Sport','4'], ['Windy','Sport','3']],
    girl: [['Cherry Blossom','Girl','3'], ['Dazy','Help Dazy Eat','3'], ['Barbie','Live Like A Princess','3'], ["Barb Can't Find Her Cat",'Find The Cat','5'], ['Zelda','Girl','4'], ['Shakira','Girl','5'], ['Sevana','Girl','4'], ['Hit The Gym','Girl','5'], ['Girly','Girl','4'], ['Semoa','Girl','4'], ['Sanari','Girl','3'], ['Tanning','Girl','2'], ['MakeUp OverLoad','Girl','5'], ['Eyelash','Girl','4'], ['Nails And Fingers','Girl','3']]
};

let gamesCount = document.querySelector('#gamesCount');
let count = 0;

//count games total
for(let i in category)
{
    count += category[i].length ;
}
gamesCount.innerHTML = count;

let selectedCategory = document.querySelectorAll('#subNavbar a');
let actionGames =  document.querySelector('#actionGamesContainer');
// let h2 = document.querySelector('footer section h2');
let h2 = document.querySelector('h2.showCategoryName');
let gamesTitleh2 = document.querySelector('#gamesTitle');

let categoryTitle = selectedCategory[0].title;
let backUpCategoryNum = category[categoryTitle].length;

function assignStarRating(categoryTitle, gameIndex, starContainer) {
            let checked = category[categoryTitle][gameIndex][2];

            for(let k = 0; k < 5 ;k++)
            {
                let star = document.createElement('span');
                starContainer.append(star);
                star.classList.add('fa', 'fa-star','unchecked');
                if(checked > 0)
                {
                    star.classList.remove('unchecked');
                    star.classList.add('checked');
                    checked--;
                }
            }
}


function createEmptyDiv() {
    let currentDiv = document.createElement('div');
    currentDiv.classList.add('emptyDiv');
    actionGames.append(currentDiv);
}

function createGameCards(gameIndex, categoryTitle) {

            let link = document.createElement('a');
            let newDiv = document.createElement('div');
            let subDiv = document.createElement('div');
            let headLine = document.createElement('h4');
            let description = document.createElement('p');
            let starHolder = document.createElement('span');

            actionGames.append(link);
            link.append(newDiv);
            newDiv.append(subDiv);
            subDiv.append(headLine);
            subDiv.append(description);
            subDiv.append(starHolder);
        
            assignStarRating(categoryTitle, gameIndex, starHolder);

            headLine.innerHTML = category[categoryTitle][gameIndex][0];
            description.innerHTML = category[categoryTitle][gameIndex][1];

            link.classList.add('divGamesLinkStyle');
            newDiv.classList.add('maindivCardsStyle');
            subDiv.classList.add('subdivCardsStyle');
            headLine.classList.add('subdivHeadLine');
            description.classList.add('subdivDescription');
            starHolder.classList.add('subdivSpan');

            newDiv.style.backgroundImage = `url('../web1Project/images/${categoryTitle}/${categoryTitle}${gameIndex+1}.jfif')`;
            link.setAttribute("href", `../web1Project/images/${categoryTitle}/${category[categoryTitle][gameIndex][0]}/${category[categoryTitle][gameIndex][0]}.html`);
            link.setAttribute("target", "_blank");

            
}

function removeGameCards(selectedCardsToRemove, NumberOfCards)
{
        for(let i = 0; i < NumberOfCards; i++)
        {
            selectedCardsToRemove[i].remove();
        }

}

let actionGamesBackground = document.querySelector('footer section img');

        for(let i = 0; i < backUpCategoryNum; i++) createGameCards(i, categoryTitle);
        createEmptyDiv();

        
        for(let i = 0 ;i < selectedCategory.length ;i++)
        {
            selectedCategory[i].addEventListener('click',(e) => {
                let categoryTitle = selectedCategory[i].title;
                let categoryNum = category[categoryTitle].length;
                // let allNewDivs = document.querySelectorAll('#actionGamesContainer div.maindivCardsStyle');
                let emptyDiv = document.querySelector('#actionGamesContainer div.emptyDiv');
                let allNewLinks = document.querySelectorAll('#actionGamesContainer a');

                h2.innerHTML = `${categoryTitle.charAt(0).toUpperCase() + categoryTitle.slice(1) } Games`;
                gamesTitleh2.append(h2);

                // removeGameCards(allNewDivs, backUpCategoryNum) ;  
                removeGameCards(allNewLinks, backUpCategoryNum) ;  
                emptyDiv.remove();  
                backUpCategoryNum = categoryNum;
                for(let i = 0; i < categoryNum; i++) createGameCards(i, categoryTitle);
                createEmptyDiv();

                let allSideNewDivs = document.querySelectorAll('#randomSideGamesContainer div.rightSideMainDivCardsStyle'); 
                removeGameCards(allSideNewDivs, 3);
                createRandomCards(categoryTitle);
                actionGamesBackground.src = `../web1Project/images/backgroundMainImages/${categoryTitle}.jpg`;


    });
}

let sideGames = document.querySelector('#randomSideGamesContainer');


function createRandomCards(categoryTitle = 'car', numberOfCards = 3) {
        let randomGameIndex, rand = [];

        for(let i = 0; i < numberOfCards ; i++)
        {
        let link = document.createElement('a');
        let newDiv = document.createElement('div');
        let subDiv = document.createElement('div');
        let starHolder = document.createElement('span');

        sideGames.append(link);
        link.append(newDiv);
        newDiv.append(subDiv);
        subDiv.append(starHolder);

        
        do randomGameIndex = Math.floor(Math.random()*(category[categoryTitle].length));      
        while(category[categoryTitle][randomGameIndex][2] < 4 || rand.includes(randomGameIndex))

        rand.push(randomGameIndex);
        assignStarRating(categoryTitle, randomGameIndex, starHolder);

        link.classList.add('divGamesLinkStyle');
        newDiv.classList.add('rightSideMainDivCardsStyle');
        subDiv.classList.add('rightSideSubSivCardsStyle');
        starHolder.classList.add('rightSideSubSivSpan');

        newDiv.style.backgroundImage = `url('../web1Project/images/${categoryTitle}/${categoryTitle}${randomGameIndex+1}.jfif')`;
        link.setAttribute("href", `../web1Project/images/${categoryTitle}/${category[categoryTitle][randomGameIndex][0]}/${category[categoryTitle][randomGameIndex][0]}.html`);
        link.setAttribute("target", "_blank");
        

        }
}

createRandomCards();


// setting links for minesweeper and snake
