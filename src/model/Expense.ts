import Dexie from "dexie";

class AppExpenseDatabase extends Dexie {

    expenses: Dexie.Table<IExpense, number>;

    constructor() {
        super('AppDatabase');
        this.version(1).stores({
            expenses: '++id, name, description, amount, category, date, currency, isRecurring, attachments, priority'
        });

        this.expenses = this.table('expenses');
    }
}

export const db = new AppExpenseDatabase();