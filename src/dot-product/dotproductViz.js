// Matrix dimensions
const MA = 5; // Rows in Matrix A
const NA = 3; // Columns in Matrix A
const MB = 3; // Rows in Matrix B
const NB = 4; // Columns in Matrix B

// Ensure that the number of columns in A equals the number of rows in B
if (NA !== MB) {
    alert("Number of columns in Matrix A must equal the number of rows in Matrix B for dot product.");
}

// Global variables to store matrix cells
let matrixA = [];
let matrixB = [];
let resultMatrix = [];

// Function to create a matrix with cube-like cells
function createMatrix(M, N, matrixName) {
    const matrixDiv = document.createElement('div');
    matrixDiv.classList.add('matrix');

    const title = document.createElement('h3');
    title.textContent = `Matrix ${matrixName} (${M}x${N})`;
    matrixDiv.appendChild(title);

    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.style.gridTemplateColumns = `repeat(${N}, 60px)`;
    matrixDiv.appendChild(grid);

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');

            const front = document.createElement('div');
            front.classList.add('front');
            front.textContent = matrixName === 'Result' ? '0' : '0'; // Initialize with '0' or any default

            const back = document.createElement('div');
            back.classList.add('back');
            back.textContent = matrixName === 'Result' ? '0' : '0';

            cellDiv.appendChild(front);
            cellDiv.appendChild(back);
            grid.appendChild(cellDiv);

            // Store references to cells
            if (matrixName === 'A') {
                if (!matrixA[i]) matrixA[i] = [];
                matrixA[i][j] = front;
            } else if (matrixName === 'B') {
                if (!matrixB[i]) matrixB[i] = [];
                matrixB[i][j] = front;
            } else if (matrixName === 'Result') {
                if (!resultMatrix[i]) resultMatrix[i] = [];
                resultMatrix[i][j] = front;
            }
        }
    }

    return matrixDiv;
}

// Function to create the result matrix
function createResultMatrix(M, N) {
    return createMatrix(M, N, 'Result');
}

// Async function to perform dot product with visualization
async function dotProduct() {
    // Disable the button to prevent multiple clicks
    const button = document.getElementById('calculate-button');
    button.disabled = true;

    const resultContainer = document.getElementById('result');
    resultContainer.textContent = '';
    // reset the result matrix
    for (let i = 0; i < MA; i++) {
        for (let j = 0; j < NB; j++) {
            resultMatrix[i][j].textContent = '0';
        }
    }
    for (let i = 0; i < MA; i++) { // Iterate over rows of A
        for (let j = 0; j < NB; j++) { // Iterate over columns of B
            let sum = 0;
            for (let k = 0; k < NA; k++) { // Iterate over columns of A / rows of B
                const cellA = matrixA[i][k];
                const cellB = matrixB[k][j];

                // Highlight the current cells
                cellA.parentElement.classList.add('highlight-front'); // Highlight Matrix A cell
                cellB.parentElement.classList.add('highlight-front'); // Highlight Matrix B cell
                resultMatrix[i][j].parentElement.classList.add('highlight-front'); // Highlight Result cell
                // Wait for 1 second
                await new Promise(r => setTimeout(r, 500));

                // Get numeric values from the cells (assuming they contain numbers)
                const valA = parseFloat(cellA.textContent) || 0;
                const valB = parseFloat(cellB.textContent) || 0;
                var product = valA * valB;
                sum += product;
                console.log(`A[${i}][${k}] * B[${k}][${j}] = ${valA} × ${valB} = ${product}`);
                console.log(`Current sum for C[${i}][${j}] = ${sum}`);
                // Update the result cell
                resultMatrix[i][j].textContent = sum;
                // Unhighlight the cells
                cellA.parentElement.classList.remove('highlight-front');
                cellB.parentElement.classList.remove('highlight-front');
                resultMatrix[i][j].parentElement.classList.remove('highlight-front');
        }
    }

    resultContainer.textContent = 'Dot Product Calculation Completed!';
    button.disabled = false;
}
}

// Function to initialize the matrices and append them to the DOM
function initialize() {
    const container = document.getElementById('matrices-container');

    // Create Matrix A
    const matrixADiv = createMatrix(MA, NA, 'A');
    container.appendChild(matrixADiv);

    // Create Matrix B
    const matrixBDiv = createMatrix(MB, NB, 'B');
    container.appendChild(matrixBDiv);

    // Create Result Matrix
    const resultDiv = createResultMatrix(MA, NB);
    container.appendChild(resultDiv);

    // Set default values for Matrix A and B (optional)
    setDefaultValues();

    // Attach event listener to the button
    const button = document.getElementById('calculate-button');
    button.addEventListener('click', async () => {
        await dotProduct();
    }
    );
}

// Function to set default values for matrices (for demonstration)
function setDefaultValues() {
  

    // Example values for Matrix B
   
    for (let i = 0; i < MA; i++) {
        for (let j = 0; j < NA; j++) {
            matrixA[i][j].textContent = Math.floor(Math.random() * 10);
        }
    }

    for (let i = 0; i < MB; i++) {
        for (let j = 0; j < NB; j++) {
            matrixB[i][j].textContent = Math.floor(Math.random() * 10);
        }
    }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initialize);
