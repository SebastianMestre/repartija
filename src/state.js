
const persons = new Map();
const expenses = new Map();
const benefits = new Map();
const payments = new Map();
const bankTransfers = new Map();

function createPerson(name) {
    const id = persons.size;
    const person = new Person(id, name);
    persons.set(person.id, person);
    return person;
}

function createExpense(description, amount) {
    const id = expenses.size;
    const expense = new Expense(id, description, amount);
    expenses.set(expense.id, expense);
    return expense;
}

function createBenefit(fromExpenseId, toPersonId, amount, timestamp) {
    if (amount === null) {
        throw new Error('Benefit amount cannot be null');
    }
    const id = benefits.size;
    const benefit = new Benefit(id, fromExpenseId, toPersonId, amount, timestamp);
    benefits.set(benefit.id, benefit);
    return benefit;
}

function createPayment(fromPersonId, toExpenseId, amount, timestamp) {
    if (amount === null) {
        throw new Error('Payment amount cannot be null');
    }
    const id = payments.size;
    const payment = new Payment(id, fromPersonId, toExpenseId, amount, timestamp);
    payments.set(payment.id, payment);
    return payment;
}

function createBankTransfer(fromPersonId, toPersonId, amount, timestamp) {
    if (amount === null) {
        throw new Error('Bank transfer amount cannot be null');
    }
    const id = bankTransfers.size;
    const bankTransfer = new BankTransfer(id, fromPersonId, toPersonId, amount, timestamp);
    bankTransfers.set(bankTransfer.id, bankTransfer);
    return bankTransfer;
}
