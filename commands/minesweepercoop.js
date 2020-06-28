let emotes = require("../resources/emojiCharacters");
emotes[9] = ":bomb:";
emotes["blank"] = ":blue_square:";

const letters = {
    1: "a",
    2: "b",
    3: "c",
    4: "d",
    5: "e",
    6: "f",
    7: "g",
    8: "h",
    9: "i",
    10: "j"
};

module.exports = {
    name: "minesweepercoop",
    aliases: ["coopms"],
    description: "It's coop minesweeper",
    cooldown: 5,
    execute(message, args) {
        let numBombs = 10;
        let numRows = 10;
        let numCols = 10;

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
        let letter = 1;

        for (let i = 0; i < numRows; i++) {
            output += emotes[letters[letter]];
            letter++;

            if (letter > 10) letter = 1;

            for (let j = 0; j < numCols; j++) {
                output += emotes["blank"];
            }
            output += "\n";
        }
        output += emotes["blank"] + ":regional_indicator_a::regional_indicator_b::regional_indicator_c::regional_indicator_d::regional_indicator_e::regional_indicator_f::regional_indicator_g::regional_indicator_h::regional_indicator_i::regional_indicator_j:"

        if (output.length > 2000) {
            message.channel.send("The given grid is too large :(");
            return
        }

        message.channel.send(output);

    },
};
