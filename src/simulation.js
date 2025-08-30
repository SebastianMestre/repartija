/* Dummy data to test the simulation

const lucas = createPerson('Lucas');
const sebas = createPerson('Sebas');
const tomas = createPerson('Tomas');

const asado = createExpense('Asado', 9000);

const today = Date.now();
const oneDay = 1000 * 60 * 60 * 24;

createBenefit(sebas.id, asado.id, 3000, today - 10 * oneDay);
createBenefit(lucas.id, asado.id, 3000, today - 10 * oneDay);
createBenefit(tomas.id, asado.id, 3000, today - 10 * oneDay);

createPayment(sebas.id, asado.id, 8000, today - 10 * oneDay);
createPayment(lucas.id, asado.id, 1000, today - 10 * oneDay);

createBankTransfer(tomas.id, sebas.id, 3000, today - 5 * oneDay);

simulate(today);

/* */

function simulate(timestampNow) {

    const accounts = new Map();

    function createAccount(name) {
        const id = accounts.size;
        const account = new Account(id, name);
        accounts.set(id, account);
        return account;
    }
    
    const personAccounts = new Map();
    for (const person of persons.values()) {
        personAccounts.set(person.id, createAccount(`${person.name}`));
    }
    
    const expenseAccounts = new Map();
    for (const expense of expenses.values()) {
        expenseAccounts.set(expense.id, createAccount(`[${expense.description}]`));
    }

    const arsInflation = createAccount('[ARS Inflation]');

    // specifically exclude ARS Inflation account
    const realAccounts = [...personAccounts.values(), ...expenseAccounts.values()];

    const transfers = [];

    let events = [];
    for (const benefit of benefits.values()) {
        events.push({
            eventType: 'benefit',
            timestamp: benefit.timestamp,
            expense: expenses.get(benefit.expenseId),
            person: persons.get(benefit.personId),
            amount: benefit.amount
        });
    }
    for (const payment of payments.values()) {
        events.push({
            eventType: 'payment',
            timestamp: payment.timestamp,
            person: persons.get(payment.personId),
            expense: expenses.get(payment.expenseId),
            amount: payment.amount
        });
    }
    for (const bankTransfer of bankTransfers.values()) {
        events.push({
            eventType: 'bank-transfer',
            timestamp: bankTransfer.timestamp,
            fromPerson: persons.get(bankTransfer.fromPersonId),
            toPerson: persons.get(bankTransfer.toPersonId),
            amount: bankTransfer.amount
        });
    }
    events.push({
        eventType: 'end-simulation',
        timestamp: timestampNow,
    });
    events.sort((a, b) => a.timestamp - b.timestamp);


    function getInflationBetween(prevTimestamp, timestamp) {
        if (prevTimestamp > timestamp) {
            throw new Error(`Previous timestamp is greater than current timestamp`);
        }
        const day1 = Math.floor(prevTimestamp / oneDay);
        const day2 = Math.floor(timestamp / oneDay);
        if (day1 === day2) {
            throw new Error(`Same day, no inflation`);
        }
        const inflationRate = 1.35; // TODO: use inflation rate reported by INDEC
        const days = day2 - day1;
        return Math.pow(1 + inflationRate, days / 365) - 1;
    }

    function addTransfer(fromAccountId, toAccountId, amount, timestamp, description, mayBeNegative = false) {
        if (!mayBeNegative && amount < 0) {
            throw new Error(`Unexpected negative transfer from ${fromAccountId} to ${toAccountId} of ${amount} at ${timestamp} (${description})`);
        }
        transfers.push(new Transfer(fromAccountId, toAccountId, amount, timestamp, description));
        accounts.get(fromAccountId).balance -= amount;
        accounts.get(toAccountId).balance += amount;
    }

    function simulateInflation(timestamp, account) {
        const prevTimestamp = account.updatedAt;
        account.updatedAt = timestamp;
        if (account.balance === 0) {
            return;
        }
        const day1 = Math.floor(prevTimestamp / oneDay);
        const day2 = Math.floor(timestamp / oneDay);
        if (day1 === day2) {
            return;
        }
        const inflationRate = getInflationBetween(prevTimestamp, timestamp);
        const balance = accounts.get(account.id).balance;
        const delta = balance * inflationRate;
        addTransfer(arsInflation.id, account.id, delta, timestamp, `Inflation from ${formatTimestamp(prevTimestamp)} to ${formatTimestamp(timestamp)}, ${(inflationRate * 100).toFixed(2)}%`, true);
    }
    
    for (const event of events) {
        const timestamp = event.timestamp;
        if (event.eventType === 'end-simulation') {
            for (const account of realAccounts) {
                simulateInflation(timestamp, account);
            }
            break;
        }
        if (event.eventType === 'benefit') {
            simulateInflation(timestamp, personAccounts.get(event.person.id));
            simulateInflation(timestamp, expenseAccounts.get(event.expense.id));
            addTransfer(expenseAccounts.get(event.expense.id).id, personAccounts.get(event.person.id).id, event.amount, timestamp, 'Expense benefit');
        }
        if (event.eventType === 'payment') {
            simulateInflation(timestamp, personAccounts.get(event.person.id));
            simulateInflation(timestamp, expenseAccounts.get(event.expense.id));
            addTransfer(personAccounts.get(event.person.id).id, expenseAccounts.get(event.expense.id).id, event.amount, timestamp, 'Expense payment');
        }
        if (event.eventType === 'bank-transfer') {
            simulateInflation(timestamp, personAccounts.get(event.fromPerson.id));
            simulateInflation(timestamp, personAccounts.get(event.toPerson.id));
            addTransfer(personAccounts.get(event.fromPerson.id).id, personAccounts.get(event.toPerson.id).id, event.amount, timestamp, 'Money transfer');
        }
    }

    


    console.log("Transfers:");
    for (const transfer of transfers) {
        console.log(`${accounts.get(transfer.fromAccountId).name} -> ${accounts.get(transfer.toAccountId).name}: ARS ${transfer.amount.toFixed(2)}        \t(${transfer.description})`);
    }
    
    console.log("Balances:");
    for (const account of accounts.values()) {
        console.log(`${account.name}: ARS ${account.balance.toFixed(2)}`);
    }


    {
        function addDirectedTransfer(fromAccountId, toAccountId, amount, timestamp, description) {
            if (amount === 0) return;
            if (amount > 0) {
                addTransfer(fromAccountId, toAccountId, amount, timestamp, description);
            } else {
                addTransfer(toAccountId, fromAccountId, -amount, timestamp, description);
            }
        }

        // In the end, the balances of the person accounts should be 0
        let aaa = Array.from(personAccounts.values());
        aaa.sort((a, b) => Math.abs(a.balance) - Math.abs(b.balance));
        
        let plan = [];
        for (let i = 1; i < aaa.length; i++) {
            const amount = aaa[i-1].balance;
            console.log(`${aaa[i-1].name} -> ${aaa[i].name}: ARS ${amount.toFixed(2)}`);
            if (amount === 0) continue;
            // we arbitrarily remove the balance from person i-1 by moving it to person i
            addDirectedTransfer(aaa[i-1].id, aaa[i].id, amount, timestampNow, `Fixing imbalance from ${aaa[i-1].name}`);

        }
    }


    console.log("Transfers (with imbalance-fixing):");
    for (const transfer of transfers) {
        console.log(`${accounts.get(transfer.fromAccountId).name} -> ${accounts.get(transfer.toAccountId).name}: ARS ${transfer.amount.toFixed(2)}        \t(${transfer.description})`);
    }
    
    console.log("Balances (after fixing imbalances, so should be 0):");
    for (const account of accounts.values()) {
        console.log(`${account.name}: ARS ${account.balance.toFixed(2)}`);
    }
}

function formatTimestamp(timestamp) {
    return new Date(timestamp).toISOString().split('T')[0];
}