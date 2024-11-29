// Piece values and initial setup
const pieceValues = {
    king: 250,
    queen: 50,
    rook: 30,
    bishop: 20,
    knight: 15,
    pawn: 5
};

let player1 = {
    pieces: {
        king: 1,
        queen: 1,
        rooks: 2,
        bishops: 2,
        knights: 2,
        pawns: 8
    },
    score: 0,
    currentBet: 0
};

let player2 = {
    pieces: {
        king: 1,
        queen: 1,
        rooks: 2,
        bishops: 2,
        knights: 2,
        pawns: 8
    },
    score: 0,
    currentBet: 0
};

let currentPlayer = 1;
let currentQuestionAnswer = 0;
let roundCount = 0; // Add round counter

// Generate random math question
function generateMathQuestion() {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const operator = Math.random() > 0.5 ? '+' : '-';

    const questionText = `${num1} ${operator} ${num2}`;
    currentQuestionAnswer = operator === '+' ? num1 + num2 : num1 - num2;

    return questionText;
}

// Display math question
function displayMathQuestion() {
    const question = generateMathQuestion();
    document.getElementById('question').innerText = question;
}

// Update current player text
function updateCurrentPlayer() {
    const currentPlayerText = currentPlayer === 1 ? "Player 1's Turn" : "Player 2's Turn";
    document.getElementById('currentPlayer').innerText = currentPlayerText;
}

// Update scoreboard
function updateScore() {
    document.getElementById('player1Score').innerText = player1.score;
    document.getElementById('player2Score').innerText = player2.score;
}

// Generate chessboard with pieces
function generateChessboard() {
    const chessboard = document.getElementById('chessboard');
    chessboard.innerHTML = '';

    // Create 64 squares (8x8)
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            const piece = getPieceAtPosition(row, col);

            square.id = `${row}-${col}`;
            if (piece) {
                const img = document.createElement('img');
                img.src = piece.image;
                img.alt = piece.name;
                img.classList.add('piece');
                img.onclick = () => placeBet(piece);
                square.appendChild(img);
            }

            chessboard.appendChild(square);
        }
    }
}

// Get piece at a given position (for setup)
function getPieceAtPosition(row, col) {
    const pieces = [
        // Black pieces (row 0 and 1)
        { row: 0, col: 0, name: 'rook', image: 'images/black_rook.png' },
        { row: 0, col: 1, name: 'knight', image: 'images/black_knight.png' },
        { row: 0, col: 2, name: 'bishop', image: 'images/black_bishop.png' },
        { row: 0, col: 3, name: 'queen', image: 'images/black_queen.png' },
        { row: 0, col: 4, name: 'king', image: 'images/black_king.png' },
        { row: 0, col: 5, name: 'bishop', image: 'images/black_bishop.png' },
        { row: 0, col: 6, name: 'knight', image: 'images/black_knight.png' },
        { row: 0, col: 7, name: 'rook', image: 'images/black_rook.png' },
        { row: 1, col: 0, name: 'pawn', image: 'images/black_pawn.png' },
        { row: 1, col: 1, name: 'pawn', image: 'images/black_pawn.png' },
        { row: 1, col: 2, name: 'pawn', image: 'images/black_pawn.png' },
        { row: 1, col: 3, name: 'pawn', image: 'images/black_pawn.png' },
        { row: 1, col: 4, name: 'pawn', image: 'images/black_pawn.png' },
        { row: 1, col: 5, name: 'pawn', image: 'images/black_pawn.png' },
        { row: 1, col: 6, name: 'pawn', image: 'images/black_pawn.png' },
        { row: 1, col: 7, name: 'pawn', image: 'images/black_pawn.png' },

        // White pieces (row 6 and 7)
        { row: 6, col: 0, name: 'pawn', image: 'images/white_pawn.png' },
        { row: 6, col: 1, name: 'pawn', image: 'images/white_pawn.png' },
        { row: 6, col: 2, name: 'pawn', image: 'images/white_pawn.png' },
        { row: 6, col: 3, name: 'pawn', image: 'images/white_pawn.png' },
        { row: 6, col: 4, name: 'pawn', image: 'images/white_pawn.png' },
        { row: 6, col: 5, name: 'pawn', image: 'images/white_pawn.png' },
        { row: 6, col: 6, name: 'pawn', image: 'images/white_pawn.png' },
        { row: 6, col: 7, name: 'pawn', image: 'images/white_pawn.png' },
        { row: 7, col: 0, name: 'rook', image: 'images/white_rook.png' },
        { row: 7, col: 1, name: 'knight', image: 'images/white_knight.png' },
        { row: 7, col: 2, name: 'bishop', image: 'images/white_bishop.png' },
        { row: 7, col: 3, name: 'queen', image: 'images/white_queen.png' },
        { row: 7, col: 4, name: 'king', image: 'images/white_king.png' },
        { row: 7, col: 5, name: 'bishop', image: 'images/white_bishop.png' },
        { row: 7, col: 6, name: 'knight', image: 'images/white_knight.png' },
        { row: 7, col: 7, name: 'rook', image: 'images/white_rook.png' }
    ];

    return pieces.find(piece => piece.row === row && piece.col === col);
}

// Place bet when a player clicks on a piece
function placeBet(piece) {
    const player = currentPlayer === 1 ? player1 : player2;

    // Check if the player has any of the selected piece left
    if (player.pieces[piece.name] > 0) {
        player.currentBet += pieceValues[piece.name];
        player.pieces[piece.name]--;
        
        // Show a message indicating which player placed the bet on which piece
        alert(`${currentPlayer === 1 ? "Player 1" : "Player 2"} bet on the ${piece.name}`);
    } else {
        alert(`No more ${piece.name}s left to bet!`);
    }
}

// Submit the answer and handle outcome
document.getElementById('submitAnswer').addEventListener('click', () => {
    const player = currentPlayer === 1 ? player1 : player2;
    const answer = parseInt(document.getElementById('answerInput').value);

    if (answer === currentQuestionAnswer) {
        alert(`${currentPlayer === 1 ? "Player 1" : "Player 2"} answered correctly!`);
        player.score += player.currentBet;
    } else {
        alert(`${currentPlayer === 1 ? "Player 1" : "Player 2"} answered incorrectly.`);
    }

    // Increment round count
    roundCount++;

    // Check if game should end after 10 rounds
    if (roundCount >= 10) {
        alert('Game Over!');
        return;
    }

    // Switch players and generate a new math question
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateCurrentPlayer();
    displayMathQuestion();
    updateScore();
});

// Start the game
displayMathQuestion();
generateChessboard();
