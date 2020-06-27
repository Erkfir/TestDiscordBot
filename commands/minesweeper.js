const emotes = {
    0: ":zero:",
    1: ":one:",
    2: ":two:",
    3: ":three:",
    4: ":four:",
    5: ":five:",
    6: ":six:",
    7: ":seven:",
    8: ":eight:",
    9: ":bomb:",
};

module.exports = {
    name: 'minesweeper',
    aliases: ["ms"],
    description: 'Generate a minesweeper board. Defaults to 10x10 grid with 10 bombs. Max of 13 columns.',
    usage: '[number of bombs] [number of rows] [number of columns]',
    cooldown: 5,
    execute(message, args) {
        let numBombs = args[0];
        let numRows = args[1];
        let numCols = args[2];

        if (numBombs == null) {
            numBombs = 10;
        }

        if (numRows == null) {
            numRows = 10;
        }

        if (numCols == null || numCols > 13) {
            numCols = 10;
        }

        if (numBombs >= (numRows * numCols)) {
            message.channel.send("You need to have more bombs than available spaces!");
            return;
        }



        let board = [];

        for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
            let row = [];
            for (let colIndex = 0; colIndex < numCols; colIndex++) {
                row.push(0);
            }
            board.push(row);
        }

        let count = 0;

        while (count < numBombs) {
            let row = Math.floor(Math.random() * numRows);
            let col = Math.floor(Math.random() * numCols);

            if (board[row][col] < 9) {
                board[row][col] = 9;

                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if ((row + i) >= 0 && (row + i) < numRows && ((col + j) >= 0) && (col + j) < numCols && !(i === 0 && j === 0)) {
                            if (board[row + i][col + j] !== 9) {
                                board[row + i][col + j]++;
                            }
                        }
                    }
                }

                count++;
            }
        }

        let output = "";

        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                output += "||" + emotes[board[i][j]] + "||";
            }
            output += "\n";
        }

        if (output.length > 2000) {
            message.channel.send("The given grid is too large :(");
            return
        }

        message.channel.send(output);
    },
};
