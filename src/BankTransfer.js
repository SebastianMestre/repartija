/**
 * Represents a bank transfer between two people
 */
class BankTransfer {
    constructor(id, fromPersonId, toPersonId, amount, timestamp) {
        this.id = id;                // Unique identifier for the bank transfer
        this.fromPersonId = fromPersonId;    // ID of the person who sent the money
        this.toPersonId = toPersonId;      // ID of the person who received the money
        this.amount = amount;            // Amount transferred (always defined)
        this.timestamp = timestamp;      // When the transfer happened
    }
}
