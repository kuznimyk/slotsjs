//1. Deposit some money
//2. Determint number of lines to bet
//3. Collect bet amount
//4. Spin the slot machine
//5. Check if the user won
//6. Give the user their winnings 
//7. play again 

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D:8,
};

const SYMBOL_VALUES = {
    A:5,
    B:4,
    C:3,
    D:2,
}

//despositing the money
const deposit = () => {
    while (true){
        const depositAmout = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmout);

        if (isNaN(numberDepositAmount) || numberDepositAmount <=0){
            console.log("Invalid deposit amount, try again.");
        }else{
            return numberDepositAmount
        }
    }
};
//determining number of lines to bet
const getNumberOfLines = () =>{
    while (true){
        const lines = prompt("Enter the number of lines to bet on(1-3): ");
        const numberoflines = parseFloat(lines);

        if (isNaN(numberoflines) || numberoflines <= 0 || numberoflines > 3){
            console.log("Invalid amoutn of lines, try again");
        }
        else{
            return numberoflines;
        }
    }
};

const getbets = (balance, lines) => {
    while (true){
        const bet = prompt("Enter total bet per line: ");
        const numberbet = parseFloat(bet);

        if (isNaN(numberbet) || numberbet <= 0 || numberbet > balance / lines){
            console.log("Invalid bet, try again");
        }
        else{
            return numberbet
        }
    }
}



const spin = () => {
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0; i < count ; i++){
            symbols.push(symbol);
        }
    }
    const reels = [[],[],[]];
    for (let i = 0;i<COLS;i++){
        const reelsymbols = [...symbols]
        for (let j =0; j < ROWS;j++){
            const randomIndex = Math.floor(Math.random() * reelsymbols.length)
            const selectedSymbol = reelsymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelsymbols.slice(randomIndex, 1);
        }
    }

    return reels;

};


const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++){
        rows.push([]);
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows
}

const printrows = (rows) => {
    for (const row of rows){
        let rowstring = "";
        for (const [i, symbol] of row.entries()){
            rowstring += symbol;    
            if (i != row.length - 1){
                rowstring += ' | ';
            }
        }
        console.log(rowstring);
    }
};

const getWinnings = (rows,bet,lines) =>{
    let winnings = 0;
    for (let row = 0; row  < lines;row++){
        const symbols = rows[row];
        let allsame = true;


        for (const symbol of symbols){
            if (symbol != symbols[0]){
                allsame = false;
                break;
            }
        }

        if (allsame ){
            winnings = bet*SYMBOL_VALUES[symbols[0]];
        }

    }

    return winnings;
}

const game = () =>{
    let balance = deposit();

    while (balance > 0){
        console.log("You have a balance of $" + balance)
        const numberoflines = getNumberOfLines();
        const bet = getbets(balance, numberoflines);
        balance  -= bet * numberoflines;
        const reels = spin();
        const rows = transpose(reels);
        printrows(rows);
        const winnings = getWinnings(rows, bet, numberoflines);
        balance += winnings
        console.log("You won, $" + winnings.toString());
        const playagain = prompt("Do you want to play again(y/n)?");
        if (playagain != "y"){
            break;
        }

    }
}
game();

