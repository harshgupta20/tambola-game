// Reset the game by clearing the board, called numbers, and generating new tickets
function newGame() {
    const board = document.getElementById('board');
    const ticketCount = parseInt(document.getElementById('ticketCount').value);
    const ticketsContainer = document.getElementById('tickets');

    // Clear the board
    board.innerHTML = '';

    // Reset numbers and calledNumbers
    numbers = Array.from({ length: 90 }, (_, i) => i + 1);
    calledNumbers = [];

    // Regenerate the board
    generateBoard();

    // Generate new tickets
    generateTickets(ticketCount);
}

// Initialize the board with numbers 1 to 90
function generateBoard() {
    const board = document.getElementById('board');
    for (let i = 1; i <= 90; i++) {
        const numberElement = document.createElement('div');
        numberElement.className = 'number';
        numberElement.textContent = i;
        board.appendChild(numberElement);
    }
}

// Generate the specified number of Tambola tickets with random numbers and empty boxes
function generateTickets(ticketCount) {
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

                if (ticket[row][col] !== null) {
                    boxElement.textContent = ticket[row][col];
                }

                ticketGrid.appendChild(boxElement);
            }
        }

        ticketElement.appendChild(ticketGrid);
        ticketsContainer.appendChild(ticketElement);
    }
}

// Generate a single Tambola ticket with random numbers and empty boxes
function generateTicket() {
    const ticket = Array.from({ length: 3 }, () => Array.from({ length: 9 }, () => null));
    const shuffledNumbers = shuffle(numbers.slice());

    // Add random numbers to the ticket
    for (let i = 0; i < 15; i++) {
        let row, col;
        do {
            row = Math.floor(Math.random() * 3);
            col = Math.floor(Math.random() * 9);
        } while (ticket[row][col] !== null);
        
        ticket[row][col] = shuffledNumbers[i];
    }

    return ticket;
}

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

// Check if any ticket has all non-empty numbers colored and display the winning ticket ID in a popup
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

// Shuffle the array randomly
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize the game on page load
generateBoard();
generateTickets(20);
