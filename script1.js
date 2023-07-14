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

// Generate 20 Tambola tickets with random numbers and empty boxes
function generateTickets() {
    const ticketCount = parseInt(document.getElementById('ticketCount').value);
    const ticketsContainer = document.getElementById('tickets');
    ticketsContainer.innerHTML = '';

    for (let i = 0; i < ticketCount; i++) {
        const ticket = generateTicket();
        const ticketElement = document.createElement('div');
        ticketElement.className = 'ticket';
        ticketElement.id = `ticket-${i + 1}`; // Assign a unique ID to each ticket

        const ticketNumberElement = document.createElement('div');
        ticketNumberElement.className = 'ticket-number ticket-id';
        ticketNumberElement.textContent = `Ticket ${i + 1}`;
        ticketElement.appendChild(ticketNumberElement);

        const ticketGrid = document.createElement('div');
        ticketGrid.className = 'ticket-grid';

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 9; col++) {
                const boxElement = document.createElement('div');
                boxElement.className = 'ticket-box';

                if (ticket[row * 9 + col] !== null) {
                    boxElement.textContent = ticket[row * 9 + col];
                }

                ticketGrid.appendChild(boxElement);
            }
        }

        ticketElement.appendChild(ticketGrid);
        ticketsContainer.appendChild(ticketElement);
    }
}

// Generate a single Tambola ticket with random numbers and empty boxes
// Generate a single Tambola ticket with random numbers and empty boxes
function generateTicket() {
    const ticket = Array.from({ length: 27 }, () => null);
    const shuffledNumbers = shuffle(numbers.slice());

    // Add random numbers to the ticket
    for (let i = 0; i < 15; i++) {
        const emptyIndex = Math.floor(Math.random() * 27);
        if (ticket[emptyIndex] === null) {
            ticket[emptyIndex] = shuffledNumbers[i];
        } else {
            i--; // Retry if the index already has a number
        }
    }

    return ticket;
}

let calledNumbers = [];

// Call a random number and mark it as yellow on the board and ticket
// Call a random number and mark it as yellow on the board and ticket
function callNumber() {
    const board = document.getElementById('board');
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const calledNumber = numbers.splice(randomIndex, 1)[0];
    calledNumbers.push(calledNumber);

    const numberElements = board.getElementsByClassName('number');
    for (let i = 0; i < numberElements.length; i++) {
        if (numberElements[i].textContent === calledNumber.toString()) {
            numberElements[i].classList.add('yellow');
            break;
        }
    }

    const ticketsContainer = document.getElementById('tickets');
    const ticketElements = ticketsContainer.getElementsByClassName('ticket-box');
    for (let i = 0; i < ticketElements.length; i++) {
        const ticketNumber = parseInt(ticketElements[i].textContent);
        if (ticketNumber === calledNumber) {
            ticketElements[i].classList.add('yellow');
        }
    }

    checkWinCondition();
}



// Reset the game by clearing the board and called numbers
function newGame() {
    const board = document.getElementById('board');
    board.innerHTML = '';

    numbers.length = 90;
    calledNumbers = [];
}

// Check if any ticket has all numbers colored and display the winning ticket ID in a popup
function checkWinCondition() {
    const ticketsContainer = document.getElementById('tickets');
    const ticketElements = ticketsContainer.getElementsByClassName('ticket');
    
    for (let i = 0; i < ticketElements.length; i++) {
        const ticketBoxes = ticketElements[i].getElementsByClassName('ticket-box');
        let allColored = true;

        for (let j = 0; j < ticketBoxes.length; j++) {
            if (ticketBoxes[j].textContent !== "" && !ticketBoxes[j].classList.contains('yellow')) {
                allColored = false;
                break;
            }
        }

        if (allColored) {
            const ticketId = ticketElements[i].id;
            alert(`Ticket ${ticketId} has won!`);
        }
    }
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
