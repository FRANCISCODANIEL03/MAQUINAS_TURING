class TuringMachine {
    constructor() {
        this.states = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
        this.tape = [];
        this.headPosition = 0;
        this.state = 'A';
        this.transitions = {
            'A0': ['A', '0', 'R'],
            'A1': ['B', '0', 'R'],
            'B0': ['C', '0', 'R'],
            'B1': ['B', '1', 'R'],
            'C0': ['D', '1', 'L'],
            'C1': ['C', '1', 'R'],
            'D0': ['E', '0', 'L'],
            'D1': ['D', '1', 'L'],
            'E0': ['H', '1', 'L'],
            'E1': ['F', '1', 'L'],
            'F0': ['G', '1', 'R'],
            'F1': ['F', '1', 'L'],
            'G0': ['A', '0', 'S'],
            'G1': ['A', '1', 'S'],
            'H1': ['I', '1', 'R'],
            'I0': ['@', '0', 'S'],
            'I1': ['I', '1', 'L']
        };
    }

    run(inputString) {
        this.tape = inputString.split('');
        this.headPosition = 0;
        this.state = 'A';
        const steps = [];

        while (true) {
            const currentSymbol = this.tape[this.headPosition];
            steps.push({ state: this.state, tape: [...this.tape], headPosition: this.headPosition });

            const transitionKey = this.state + currentSymbol;
            if (this.transitions[transitionKey]) {
                const [newState, newSymbol, direction] = this.transitions[transitionKey];
                this.tape[this.headPosition] = newSymbol;
                this.state = newState;

                if (direction === 'R') {
                    this.headPosition++;
                } else if (direction === 'L') {
                    this.headPosition--;
                } else if (direction === 'S') {
                    this.headPosition+=0;
                }
            } else {
                break; 
            }
        }

        return steps;
    }
}

function runTuringMachine() {
    const inputString = document.getElementById("inputString").value;
    const tm = new TuringMachine();
    const steps = tm.run(inputString);

    const stepsContainer = document.getElementById("stepsContainer");
    stepsContainer.innerHTML = ''; 

    steps.forEach((step, index) => {
        const stepTable = document.createElement('table');
        const rowTape = document.createElement('tr');
        const rowHead = document.createElement('tr');
        
        step.tape.forEach((symbol, i) => {
            const cellTape = document.createElement('td');
            cellTape.textContent = symbol;
            rowTape.appendChild(cellTape);
            
            const cellHead = document.createElement('td');
            cellHead.textContent = (i === step.headPosition) ? '^' : '';
            cellHead.className = 'head-marker';
            rowHead.appendChild(cellHead);
        });

        stepTable.appendChild(rowTape);
        stepTable.appendChild(rowHead);

        const stepDescription = document.createElement('p');
        stepDescription.textContent = `Paso ${index + 1} - Estado: ${step.state}`;

        stepsContainer.appendChild(stepDescription);
        stepsContainer.appendChild(stepTable);
    });

    document.getElementById("finalTape").textContent = steps[steps.length - 1].tape.join('');
}