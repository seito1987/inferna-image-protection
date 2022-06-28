// adds 'Xp' to the level bar, if the xp bar is full, it will go up a level and reset the xp bar
function addXp() {



    // gets the current xp level
    let currentXpLevel = document.getElementById('level-number').textContent;
    let nextXpLevel = document.getElementById('next-level-number').textContent;
    let currentXpAmount = document.getElementById('xp-number').textContent;

    let levelUpBar = document.getElementById('level-up-bar');
    // gets the current width of the level-up-bar
    let currentXp = window.getComputedStyle(levelUpBar).getPropertyValue('width');

    console.log(`current xp: ${currentXp}`);

    let xp = [];
    // need to seperate the numerical value from the string in order to add more pixels
    // loop through each character in the currentxp
    for(let i in currentXp) {
        // sorts out numbers, need the 0 exception, otherwise it is read as false
        if(parseInt(currentXp[i]) || currentXp[i] === '0') {
            // pushes to the xp array if it can be parsed as an int
            xp.push(currentXp[i]);
        }
    }

    // joins the xp array, and converts it to a number
    xp = parseInt(xp.join(''));

    // if it reaches 200px, reset it and increase the level number
    if(xp > 170) {
        // reset xp
        xp = 0;
        // sets the level number to increment by 1
        document.getElementById('level-number').textContent = parseInt(currentXpLevel) + 1;
        console.log(currentXpLevel);
        document.getElementById('next-level-number').textContent = parseInt(nextXpLevel) + 1;
        console.log(nextXpLevel);
        document.getElementById('xp-number').textContent = parseInt(currentXpAmount) + 90;
        console.log(currentXpAmount);
    } else {
        // adds 10%, or 20px to the xp bar
        xp += 20;
        document.getElementById('xp-number').textContent = parseInt(currentXpAmount) - 10;
        console.log(currentXpAmount);
    }



    // sets the level up bar width 20px, or 10%, longer
    levelUpBar.style.width = `${xp}px`


}
