// Generate an array of numbers from 1 to 90
const numbers = Array.from({ length: 90 }, (_, i) => i + 1);

// Shuffle the array randomly
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

// Generate 20 Tambola tickets with random numbers
// Generate 20 Tambola tickets with random numbers
function generateTickets() {
    const ticketCount = parseInt(document.getElementById('ticketCount').value);
    const ticketsContainer = document.getElementById('tickets');
    ticketsContainer.innerHTML = '';

    for (let i = 0; i < ticketCount; i++) {
        const ticket = generateTicket();
        const ticketElement = document.createElement('div');
        ticketElement.className = 'ticket';
        ticketElement.id = `ticket-${i}`; // Assign a unique ID to each ticket
        ticket.forEach(number => {
            const numberElement = document.createElement('div');
            numberElement.className = 'ticket-number';
            numberElement.textContent = number;

            if (calledNumbers.includes(number)) {
                numberElement.classList.add('yellow');
            }

            ticketElement.appendChild(numberElement);
        });
        ticketsContainer.appendChild(ticketElement);
    }
}


// Generate a single Tambola ticket with random numbers
function generateTicket() {
    const ticket = [];
    const shuffledNumbers = shuffle(numbers.slice());

    for (let i = 0; i < 15; i++) {
        ticket.push(shuffledNumbers[i]);
    }

    return ticket;
}

let calledNumbers = [];

// Call a random number and mark it as yellow on the board
// Call a random number and mark it as yellow on the board and ticket
// Call a random number and mark it as yellow on the board and ticket
function callNumber() {
    const board = document.getElementById('board');
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const calledNumber = numbers.splice(randomIndex, 1)[0];
    calledNumbers.push(calledNumber);

    const numberElement = document.createElement('div');
    numberElement.className = 'number yellow';
    numberElement.textContent = calledNumber;
    board.appendChild(numberElement);

    const ticketsContainer = document.getElementById('tickets');
    const ticketElements = ticketsContainer.getElementsByClassName('ticket-number');
    for (let i = 0; i < ticketElements.length; i++) {
        const ticketNumber = parseInt(ticketElements[i].textContent);
        if (ticketNumber === calledNumber) {
            ticketElements[i].classList.add('yellow');
            checkWinCondition(ticketElements[i].parentElement.id); // Check winning condition for the ticket
        }
    }
}



// Reset the game by clearing the board and called numbers
function newGame() {
    const board = document.getElementById('board');
    board.innerHTML = '';

    numbers.length = 90;
    calledNumbers = [];
}

// Initialize the board with numbers 1 to 90
window.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');

    for (let i = 1; i <= 90; i++) {
        const numberElement = document.createElement('div');
        numberElement.className = 'number';
        numberElement.textContent = i;
        board.appendChild(numberElement);
    }
});




// Check if all numbers on a ticket have been marked as yellow
function checkWinCondition(ticketId) {
    const ticketElement = document.getElementById(ticketId);
    const ticketNumbers = ticketElement.getElementsByClassName('ticket-number');
    let allMarked = true;

    for (let i = 0; i < ticketNumbers.length; i++) {
        if (!ticketNumbers[i].classList.contains('yellow')) {
            allMarked = false;
            break;
        }
    }

    if (allMarked) {
        alert('Player has won!');
    }
}
