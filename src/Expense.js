/**
 * Represents an expense or payment done to an external entity not tracked in the app
 */
class Expense {
    constructor(id, description, amount, timestamp) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.timestamp = timestamp;  // When the expense happened
    }
}
