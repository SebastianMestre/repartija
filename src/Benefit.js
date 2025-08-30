/**
 * Represents that a person benefitted from some expense
 */
class Benefit {
    constructor(id, personId, expenseId, amount, timestamp) {
        this.id = id;                // Unique identifier for the benefit
        this.personId = personId;    // ID of the person who benefitted
        this.expenseId = expenseId;  // ID of the expense they benefitted from
        this.amount = amount;        // Amount they benefitted (can be null if not specified)
        this.timestamp = timestamp;  // When the benefit happened (for inflation tracking)
    }
}
