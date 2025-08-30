/**
 * Represents a payment made by a person to an external entity not tracked in the app
 */
class Payment {
    constructor(id, personId, expenseId, amount, timestamp) {
        this.id = id;                // Unique identifier for the payment
        this.personId = personId;    // ID of the person who paid
        this.expenseId = expenseId;  // ID of the expense they paid for
        this.amount = amount;        // Amount they paid (can be null if not specified)
        this.timestamp = timestamp;  // When the payment happened (for inflation tracking)
    }
}
