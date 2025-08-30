/**
 * Represents money being moved between accounts
 */
class Transfer {
    constructor(fromAccountId, toAccountId, amount, timestamp, description) {
        this.fromAccountId = fromAccountId;  // ID of the source account
        this.toAccountId = toAccountId;      // ID of the destination account
        this.amount = amount;                // Amount transferred (always defined)
        this.timestamp = timestamp;          // When the transfer happened
        this.description = description;      // Description of the transfer
    }
}
