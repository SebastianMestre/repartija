/**
 * Represents a bank account
 */
class Account {
    constructor(id, name, updatedAt) {
        this.id = id;
        this.name = name;           // Display name of the account
        this.updatedAt = updatedAt; // When the account was last updated (timestamp)
        this.balance = 0;           // How much money is in the account, in ARS
    }
}
