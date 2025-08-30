// UI rendering functions for the SVG-based expense tracker interface

function renderPeople() {
    const mainSvg = document.getElementById('main-svg');
    if (!mainSvg) return;
    
    const personArray = Array.from(persons.values());
    const rectHeight = 60;
    const rectWidth = 150;
    const margin = 20;
    const leftColumnX = 50; // Left column for people
    
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
        
        // Create text
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', leftColumnX + rectWidth / 2);
        text.setAttribute('y', y + rectHeight / 2 + 5);
        text.setAttribute('class', 'person-text');
        text.textContent = person.name;
        
        mainSvg.appendChild(rect);
        mainSvg.appendChild(text);
    });
}

function renderExpenses() {
    const mainSvg = document.getElementById('main-svg');
    if (!mainSvg) return;
    
    const expenseArray = Array.from(expenses.values());
    const rectHeight = 60;
    const rectWidth = 150;
    const margin = 20;
    const rightColumnX = 400; // Right column for expenses
    
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
        
        // Create text
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', rightColumnX + rectWidth / 2);
        text.setAttribute('y', y + rectHeight / 2 + 5);
        text.setAttribute('class', 'expense-text');
        text.textContent = `${expense.description}\n$${expense.amount}`;
        
        mainSvg.appendChild(rect);
        mainSvg.appendChild(text);
    });
}

function renderUI() {
    const mainSvg = document.getElementById('main-svg');
    if (!mainSvg) return;
    
    // Clear existing content
    mainSvg.innerHTML = '';
    
    // Render people and expenses
    renderPeople();
    renderExpenses();
    
    // Add visual connections between people and expenses
    renderBenefits();
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
        
        // Calculate positions for the connection line
        const personX = 50 + 150; // Right edge of person rectangle
        const personY = getPersonY(person.id) + 30; // Center of person rectangle
        const expenseX = 400; // Left edge of expense rectangle
        const expenseY = getExpenseY(expense.id) + 30; // Center of expense rectangle
        
        // Create connection line
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', expenseX);
        line.setAttribute('y1', expenseY);
        line.setAttribute('x2', personX);
        line.setAttribute('y2', personY);
        line.setAttribute('stroke', '#666');
        line.setAttribute('stroke-width', 2);
        line.setAttribute('opacity', '0.6');
        
        // Add the line to the SVG
        mainSvg.appendChild(line);
        
        // Add arrowhead pointing from expense to person
        const arrowLength = 10;
        const arrowAngle = Math.atan2(personY - expenseY, personX - expenseX);
        
        // Calculate arrowhead points
        const arrowX1 = personX - arrowLength * Math.cos(arrowAngle - Math.PI/6);
        const arrowY1 = personY - arrowLength * Math.sin(arrowAngle - Math.PI/6);
        const arrowX2 = personX - arrowLength * Math.cos(arrowAngle + Math.PI/6);
        const arrowY2 = personY - arrowLength * Math.sin(arrowAngle + Math.PI/6);
        
        // Create arrowhead
        const arrowhead = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        arrowhead.setAttribute('points', `${personX},${personY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`);
        arrowhead.setAttribute('fill', '#666');
        arrowhead.setAttribute('opacity', '0.6');
        
        mainSvg.appendChild(arrowhead);
        
        // Add benefit amount label on the line
        const midX = (personX + expenseX) / 2;
        const midY = (personY + expenseY) / 2;
        
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', midX);
        label.setAttribute('y', midY - 5);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('font-size', '12');
        label.setAttribute('fill', '#333');
        label.setAttribute('font-weight', 'bold');
        label.textContent = `$${benefit.amount}`;
        
        // Add white background for better readability
        const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        background.setAttribute('x', midX - 20);
        background.setAttribute('y', midY - 15);
        background.setAttribute('width', 40);
        background.setAttribute('height', 20);
        background.setAttribute('fill', 'white');
        background.setAttribute('opacity', '0.9');
        background.setAttribute('rx', '3');
        
        mainSvg.appendChild(background);
        mainSvg.appendChild(label);
    });
}

// Helper functions to get Y positions
function getPersonY(personId) {
    const personArray = Array.from(persons.values());
    const index = personArray.findIndex(p => p.id === personId);
    if (index === -1) return 0;
    
    const rectHeight = 60;
    const margin = 20;
    return margin + index * (rectHeight + margin);
}

function getExpenseY(expenseId) {
    const expenseArray = Array.from(expenses.values());
    const index = expenseArray.findIndex(e => e.id === expenseId);
    if (index === -1) return 0;
    
    const rectHeight = 60;
    const margin = 20;
    return margin + index * (rectHeight + margin);
}

// Initialize UI when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for other scripts to load and create data
    setTimeout(renderUI, 100);
});
