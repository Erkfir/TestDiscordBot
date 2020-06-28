let emotes = require("../resources/emojiCharacters");
emotes[9] = ":bomb:";
emotes["blank"] = ":blue_square:";
emotes["flag"] = ":triangular_flag_on_post:";

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

const numbers = {
    "a": 0,
    "b": 1,
    "c": 2,
    "d": 3,
    "e": 4,
    "f": 5,
    "g": 6,
    "h": 7,
    "i": 8,
    "j": 9
};

let games = {};
const numBombs = 10;
const numRows = 10;
const numCols = 10;

function displayBoard(message, display, numRows, numCols) {
    let output = "";
    let letter = 1;

    for (let i = 0; i < numRows; i++) {
        output += emotes[letters[letter]];
        letter++;

        if (letter > 10) letter = 1;

        for (let j = 0; j < numCols; j++) {
            output += emotes[display[i][j]];
        }
        output += "\n";
    }
    output += emotes["blank"] + ":regional_indicator_a::regional_indicator_b::regional_indicator_c::regional_indicator_d::regional_indicator_e::regional_indicator_f::regional_indicator_g::regional_indicator_h::regional_indicator_i::regional_indicator_j:";

    if (output.length > 2000) {
        message.channel.send("The given grid is too large :(");
        return null;
    }
    return output;
}

module.exports = {
    name: "minesweepercoop",
    aliases: ["coopms", "cms"],
    description: "It's coop minesweeper",
    cooldown: 1,
    execute(message, args) {

        if (args.length === 0) {


            let board = [];
            let display = [];

            for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
                let row = [];
                let drow = [];
                for (let colIndex = 0; colIndex < numCols; colIndex++) {
                    row.push(0);
                    drow.push("blank");
                }
                board.push(row);
                display.push(drow);
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

            let output = displayBoard(message, display, numRows, numCols);

            if (output == null) return;


            message.channel.send(output).then((sentMessage) => {
                    games[sentMessage.channel.id] = {
                        "id": sentMessage.id,
                        "board": board,
                        "display": display,
                    };
                }
            );
        } else { // Play!
            let channelId = message.channel.id;

            if (!(channelId in games)) {
                message.channel.send("There is no current running game in this channel!");
                return;
            }

            try {
                let row = numbers[args[0].toLowerCase()];
                let col = numbers[args[1].toLowerCase()];

                games[channelId].display[row][col] = games[channelId].board[row][col];
                let output = displayBoard(message, games[channelId].display, numRows, numCols);
                message.channel.send(output).then((sentMessage) => {
                        games[sentMessage.channel.id] = {
                            "id": sentMessage.id,
                            "board": games[channelId].board,
                            "display": games[channelId].display,
                        };
                    }
                );

            } catch (e) {
                console.log("Something went wrong " + e);
                message.channel.send("Something went wrong");
            }
        }
    },
};
