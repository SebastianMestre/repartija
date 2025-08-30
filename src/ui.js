// UI rendering functions for the SVG-based expense tracker interface


function renderUI() {
    const mainSvg = document.getElementById('main-svg');
    if (!mainSvg) return;


    const leftColumnX = 50; // Left column for people
    const rightColumnX = 400; // Right column for expenses

    const rectHeight = 60;
    const rectWidth = 150;
    const margin = 20;
    const arrowOffset = 7;


    // Clear existing content
    mainSvg.innerHTML = '';

    // Render people and expenses
    renderPeople();
    renderExpenses();

    // Add visual connections between people and expenses
    renderBenefits();
    renderPayments();
    renderBankTransfers();

    function renderPeople() {
        const mainSvg = document.getElementById('main-svg');
        if (!mainSvg) return;

        const personArray = Array.from(persons.values());

        personArray.forEach((person, index) => {
            const y = margin + index * (rectHeight + margin);

            // Create rectangle
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', leftColumnX);
            rect.setAttribute('y', y);
            rect.setAttribute('width', rectWidth);
            rect.setAttribute('height', rectHeight);
            rect.setAttribute('rx', 8);
            rect.setAttribute('class', 'person-rect');
            rect.setAttribute('data-person-id', person.id);

            // Add drag event listeners for person
            rect.addEventListener('mousedown', (e) => startDrag(e, 'person', person.id));

            // Create text
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', leftColumnX + rectWidth / 2);
            text.setAttribute('y', y + rectHeight / 2 + 5);
            text.setAttribute('class', 'person-text');
            text.textContent = person.name;

            mainSvg.appendChild(rect);
            mainSvg.appendChild(text);
        });

        // Add plus button below all persons
        const plusButtonY = margin + personArray.length * (rectHeight + margin);

        // Create plus button background
        const plusButton = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        plusButton.setAttribute('x', leftColumnX + rectWidth / 2 - 15);
        plusButton.setAttribute('y', plusButtonY);
        plusButton.setAttribute('width', 30);
        plusButton.setAttribute('height', 30);
        plusButton.setAttribute('rx', 15);
        plusButton.setAttribute('fill', '#4CAF50');
        plusButton.setAttribute('stroke', '#2E7D32');
        plusButton.setAttribute('stroke-width', 2);
        plusButton.setAttribute('cursor', 'pointer');
        plusButton.setAttribute('class', 'plus-button');

        // Create plus sign
        const plusSign = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        plusSign.setAttribute('x', leftColumnX + rectWidth / 2);
        plusSign.setAttribute('y', plusButtonY + 20);
        plusSign.setAttribute('text-anchor', 'middle');
        plusSign.setAttribute('font-size', '20');
        plusSign.setAttribute('font-weight', 'bold');
        plusSign.setAttribute('fill', 'white');
        plusSign.setAttribute('pointer-events', 'none');
        plusSign.textContent = '+';

        // Add click event to plus button
        plusButton.addEventListener('click', addNewPerson);

        mainSvg.appendChild(plusButton);
        mainSvg.appendChild(plusSign);
    }

    function renderExpenses() {
        const mainSvg = document.getElementById('main-svg');
        if (!mainSvg) return;

        const expenseArray = Array.from(expenses.values());


        expenseArray.forEach((expense, index) => {
            const y = margin + index * (rectHeight + margin);

            // Create rectangle
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
            rect.setAttribute('x', rightColumnX);
            rect.setAttribute('y', y);
            rect.setAttribute('width', rectWidth);
            rect.setAttribute('height', rectHeight);
            rect.setAttribute('rx', 8);
            rect.setAttribute('class', 'expense-rect');
            rect.setAttribute('data-expense-id', expense.id);

            // Add drag event listeners for expense
            rect.addEventListener('mousedown', (e) => startDrag(e, 'expense', expense.id));

            // Create text
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', rightColumnX + rectWidth / 2);
            text.setAttribute('y', y + rectHeight / 2 + 5);
            text.setAttribute('class', 'expense-text');
            text.textContent = `${expense.description}\n$${expense.amount}`;

            mainSvg.appendChild(rect);
            mainSvg.appendChild(text);
        });

        // Add plus button below all expenses
        const plusButtonY = margin + expenseArray.length * (rectHeight + margin);

        // Create plus button background
        const plusButton = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        plusButton.setAttribute('x', rightColumnX + rectWidth / 2 - 15);
        plusButton.setAttribute('y', plusButtonY);
        plusButton.setAttribute('width', 30);
        plusButton.setAttribute('height', 30);
        plusButton.setAttribute('rx', 15);
        plusButton.setAttribute('fill', '#FF9800');
        plusButton.setAttribute('stroke', '#E65100');
        plusButton.setAttribute('stroke-width', 2);
        plusButton.setAttribute('cursor', 'pointer');
        plusButton.setAttribute('class', 'expense-plus-button');

        // Create plus sign
        const plusSign = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        plusSign.setAttribute('x', rightColumnX + rectWidth / 2);
        plusSign.setAttribute('y', plusButtonY + 20);
        plusSign.setAttribute('text-anchor', 'middle');
        plusSign.setAttribute('font-size', '20');
        plusSign.setAttribute('font-weight', 'bold');
        plusSign.setAttribute('fill', 'white');
        plusSign.setAttribute('pointer-events', 'none');
        plusSign.textContent = '+';

        // Add click event to plus button
        plusButton.addEventListener('click', addNewExpense);

        mainSvg.appendChild(plusButton);
        mainSvg.appendChild(plusSign);
    }


    function renderBenefits() {
        const mainSvg = document.getElementById('main-svg');
        if (!mainSvg) return;

        // Get all benefits
        const benefitArray = Array.from(benefits.values());

        benefitArray.forEach(benefit => {
            const person = persons.get(benefit.personId);
            const expense = expenses.get(benefit.expenseId);

            if (!person || !expense) return;

            // Calculate positions for the connection line (offset downward for benefits)
            const personX = leftColumnX + rectWidth; // Right edge of person rectangle
            const personY = getPersonY(benefit.personId) + rectHeight / 2; // Center of person rectangle
            const expenseX = rightColumnX; // Left edge of expense rectangle
            const expenseY = getExpenseY(benefit.expenseId) + rectHeight / 2; // Center of expense rectangle, offset downward

            // Draw arrow from expense to person (benefit flow)
            drawArrow(mainSvg, expenseX, expenseY - arrowOffset, personX, personY - arrowOffset, '#666', benefit.amount);
        });
    }

    function renderPayments() {
        const mainSvg = document.getElementById('main-svg');
        if (!mainSvg) return;

        // Get all payments
        const paymentArray = Array.from(payments.values());

        paymentArray.forEach(payment => {
            const person = persons.get(payment.personId);
            const expense = expenses.get(payment.expenseId);

            if (!person || !expense) return;

            // Calculate positions for the connection line (offset upward for payments)
            const personX = leftColumnX + rectWidth; // Right edge of person rectangle
            const personY = getPersonY(payment.personId) + rectHeight / 2; // Center of person rectangle
            const expenseX = rightColumnX; // Left edge of expense rectangle
            const expenseY = getExpenseY(payment.expenseId) + rectHeight / 2; // Center of expense rectangle, offset upward

            // Draw arrow from person to expense (payment flow)
            drawArrow(mainSvg, personX, personY + arrowOffset, expenseX, expenseY + arrowOffset, '#4CAF50', payment.amount);
        });
    }

    function renderBankTransfers() {
        const mainSvg = document.getElementById('main-svg');
        if (!mainSvg) return;

        // Get all bank transfers
        const bankTransferArray = Array.from(bankTransfers.values());

        bankTransferArray.forEach(bankTransfer => {
            const fromPerson = persons.get(bankTransfer.fromPersonId);
            const toPerson = persons.get(bankTransfer.toPersonId);

            if (!fromPerson || !toPerson) return;

            // Calculate positions for the connection line between persons
            const fromPersonX = leftColumnX + rectWidth / 2; // Center of from person rectangle
            const fromPersonY = getPersonY(bankTransfer.fromPersonId) + rectHeight / 2; // Center of from person rectangle
            const toPersonX = leftColumnX + rectWidth / 2; // Center of to person rectangle
            const toPersonY = getPersonY(bankTransfer.toPersonId) + rectHeight / 2; // Center of to person rectangle

            // Draw arrow from one person to another (bank transfer flow)
            drawArrow(mainSvg, fromPersonX, fromPersonY, toPersonX, toPersonY, '#2196F3', bankTransfer.amount);
        });
    }

    // Helper function to draw an arrow with label
    function drawArrow(svg, fromX, fromY, toX, toY, color, amount) {
        // Create connection line
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', fromX);
        line.setAttribute('y1', fromY);
        line.setAttribute('x2', toX);
        line.setAttribute('y2', toY);
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-width', 2);
        line.setAttribute('opacity', '0.6');

        // Add the line to the SVG
        svg.appendChild(line);

        // Add arrowhead
        const arrowLength = 10;
        const arrowAngle = Math.atan2(toY - fromY, toX - fromX);

        // Calculate arrowhead points
        const arrowX1 = toX - arrowLength * Math.cos(arrowAngle - Math.PI/6);
        const arrowY1 = toY - arrowLength * Math.sin(arrowAngle - Math.PI/6);
        const arrowX2 = toX - arrowLength * Math.cos(arrowAngle + Math.PI/6);
        const arrowY2 = toY - arrowLength * Math.sin(arrowAngle + Math.PI/6);

        // Create arrowhead
        const arrowhead = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        arrowhead.setAttribute('points', `${toX},${toY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`);
        arrowhead.setAttribute('fill', color);
        arrowhead.setAttribute('opacity', '0.6');

        svg.appendChild(arrowhead);

        // Add amount label on the line
        const midX = (fromX + toX) / 2;
        const midY = (fromY + toY) / 2;

        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', midX);
        label.setAttribute('y', midY - 5);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('font-size', '12');
        label.setAttribute('font-weight', 'bold');

        // Set label color based on the arrow color
        if (color === '#4CAF50') { // Green for payments
            label.setAttribute('fill', '#2E7D32');
        } else { // Gray for benefits
            label.setAttribute('fill', '#333');
        }

        label.textContent = `$${amount}`;

        // Add white background for better readability
        const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        background.setAttribute('x', midX - 20);
        background.setAttribute('y', midY - 15);
        background.setAttribute('width', 40);
        background.setAttribute('height', 20);
        background.setAttribute('fill', 'white');
        background.setAttribute('opacity', '0.9');
        background.setAttribute('rx', '3');

        svg.appendChild(background);
        svg.appendChild(label);
    }

    // Helper functions to get Y positions
    function getPersonY(personId) {
        const personArray = Array.from(persons.values());
        const index = personArray.findIndex(p => p.id === personId);
        if (index === -1) return 0;

        const margin = 20;
        return margin + index * (rectHeight + margin);
    }

    function getExpenseY(expenseId) {
        const expenseArray = Array.from(expenses.values());
        const index = expenseArray.findIndex(e => e.id === expenseId);
        if (index === -1) return 0;

        const margin = 20;
        return margin + index * (rectHeight + margin);
    }

    // Drag and drop functionality
    let isDragging = false;
    let dragSource = null; // Object with { type, id } fields
    let dragLine = null;

    function startDrag(e, sourceType, sourceId) {
        isDragging = true;
        dragSource = { type: sourceType, id: sourceId };

        // Create visual feedback line
        const mainSvg = document.getElementById('main-svg');
        dragLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        dragLine.setAttribute('stroke', '#999');
        dragLine.setAttribute('stroke-width', 2);
        dragLine.setAttribute('stroke-dasharray', '5,5');
        dragLine.setAttribute('opacity', '0.8');

        const rect = e.target;
        const rectBox = rect.getBoundingClientRect();
        const svgBox = mainSvg.getBoundingClientRect();

        const startX = rectBox.left - svgBox.left + rectBox.width / 2;
        const startY = rectBox.top - svgBox.top + rectBox.height / 2;

        dragLine.setAttribute('x1', startX);
        dragLine.setAttribute('y1', startY);
        dragLine.setAttribute('x2', startX);
        dragLine.setAttribute('y2', startY);

        mainSvg.appendChild(dragLine);

        // Add mouse move and up listeners
        document.addEventListener('mousemove', onDragMove);
        document.addEventListener('mouseup', onDragEnd);

        e.preventDefault();
    }

    function onDragMove(e) {
        if (!isDragging || !dragLine) return;

        const mainSvg = document.getElementById('main-svg');
        const svgBox = mainSvg.getBoundingClientRect();

        const currentX = e.clientX - svgBox.left;
        const currentY = e.clientY - svgBox.top;

        // Update the end point of the drag line
        const startX = parseFloat(dragLine.getAttribute('x1'));
        const startY = parseFloat(dragLine.getAttribute('y1'));

        dragLine.setAttribute('x2', currentX);
        dragLine.setAttribute('y2', currentY);
    }

    function onDragEnd(e) {
        if (!isDragging) return;

        // Find what we're dropping on
        const target = findDropTarget(e);

        // Only prevent drop if both type AND id match (same item)
        if (target && target.type && !(target.type === dragSource.type && target.id === dragSource.id)) {
            handleDrop(dragSource.type, dragSource.id, target.type, target.id);
        }

        // Clean up
        if (dragLine) {
            dragLine.remove();
            dragLine = null;
        }

        isDragging = false;
        dragSource = null;

        // Remove event listeners
        document.removeEventListener('mousemove', onDragMove);
        document.removeEventListener('mouseup', onDragEnd);
    }

    function findDropTarget(e) {
        const mainSvg = document.getElementById('main-svg');
        const svgBox = mainSvg.getBoundingClientRect();
        const mouseX = e.clientX - svgBox.left;
        const mouseY = e.clientY - svgBox.top;

        // Check if mouse is over a person rectangle
        const personRects = mainSvg.querySelectorAll('.person-rect');
        for (const rect of personRects) {
            const rectBox = rect.getBoundingClientRect();
            const svgRectBox = {
                left: rectBox.left - svgBox.left,
                top: rectBox.top - svgBox.top,
                right: rectBox.right - svgBox.left,
                bottom: rectBox.bottom - svgBox.top
            };

            if (mouseX >= svgRectBox.left && mouseX <= svgRectBox.right &&
                mouseY >= svgRectBox.top && mouseY <= svgRectBox.bottom) {
                return { type: 'person', id: parseInt(rect.getAttribute('data-person-id')) };
            }
        }

        // Check if mouse is over an expense rectangle
        const expenseRects = mainSvg.querySelectorAll('.expense-rect');
        for (const rect of expenseRects) {
            const rectBox = rect.getBoundingClientRect();
            const svgRectBox = {
                left: rectBox.left - svgBox.left,
                top: rectBox.top - svgBox.top,
                right: rectBox.right - svgBox.left,
                bottom: rectBox.bottom - svgBox.top
            };

            if (mouseX >= svgRectBox.left && mouseX <= svgRectBox.right &&
                mouseY >= svgRectBox.top && mouseY <= svgRectBox.bottom) {
                return { type: 'expense', id: parseInt(rect.getAttribute('data-expense-id')) };
            }
        }

        return null;
    }

    function handleDrop(sourceType, sourceId, targetType, targetId) {
        if (sourceType === 'person' && targetType === 'expense') {
            // Create payment: person -> expense
            const amount = prompt('Enter payment amount:');
            if (amount && !isNaN(parseFloat(amount))) {
                createPayment(sourceId, targetId, parseFloat(amount), Date.now());
                renderUI();
            }
        } else if (sourceType === 'expense' && targetType === 'person') {
            // Create benefit: expense -> person
            const amount = prompt('Enter benefit amount:');
            if (amount && !isNaN(parseFloat(amount))) {
                createBenefit(targetId, sourceId, parseFloat(amount), Date.now());
                renderUI();
            }
        } else if (sourceType === 'person' && targetType === 'person') {
            // Create bank transfer: person -> person
            const amount = prompt('Enter transfer amount:');
            if (amount && !isNaN(parseFloat(amount))) {
                createBankTransfer(sourceId, targetId, parseFloat(amount), Date.now());
                renderUI();
            }
        }
    }

    // Function to add a new person
    function addNewPerson() {
        const personName = prompt('Enter the name of the new person:');
        if (personName && personName.trim()) {
            // Create the new person using the existing createPerson function
            createPerson(personName.trim());
            // Re-render the UI to show the new person
            renderUI();
        }
    }

    // Function to add a new expense
    function addNewExpense() {
        const expenseDescription = prompt('Enter the description of the new expense:');
        if (expenseDescription && expenseDescription.trim()) {
            const expenseAmount = prompt('Enter the amount of the expense:');
            if (expenseAmount && !isNaN(parseFloat(expenseAmount))) {
                // Create the new expense using the existing createExpense function
                createExpense(expenseDescription.trim(), parseFloat(expenseAmount));
                // Re-render the UI to show the new expense
                renderUI();
            } else {
                alert('Please enter a valid amount (e.g., 100 or 100.50)');
            }
        }
    }
}


// Initialize UI when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other scripts to load and create data
    setTimeout(renderUI, 100);

    // Add simulation button event listener
    const simulateBtn = document.getElementById('simulate-btn');
    if (simulateBtn) {
        simulateBtn.addEventListener('click', () => {
            console.log('Running simulation...');
            simulate(Date.now());
            console.log('Simulation complete!');
        });
    }
});
