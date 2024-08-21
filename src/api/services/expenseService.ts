import { db } from "@/model/Expense"

export const addExpense = async (expense: IExpense): Promise<void> => {
    try {
        db.open()
        console.log(await db.expenses.add(expense))
    } catch (e) {
        console.error("Erro : ", e)
    }
}

export const getAllExpenses = async (): Promise<IExpense[]> => {
    try {
        db.open()
        const expenses = await db.expenses.toArray();
        return expenses;
    } catch (e) {
        console.error("Erro : ", e)
        return []
    }

}