import api from "../Api"

export const addExpense = async (expense: IExpense): Promise<void> => {
    try {
        await api.post('/expense/', expense)
    } catch (e) {
        console.error("Erro : ", e)
    }
}

export const getAllExpenses = async (): Promise<IExpense[]> => {
    try {
        return api.get('/expense/list').then(response => {
            return response.data.data
        })
    } catch (e) {
        console.error("Erro : ", e)
        return []
    }

}
export const getExpensesCategories = async (): Promise<Category[]> => {
    try {
        return api.get('/expense/list/categories').then(response => {
            return response.data.data
        })
    } catch (e) {
        console.error("Erro : ", e)
        return []
    }

}