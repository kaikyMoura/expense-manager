import axios, { AxiosError } from "axios"
import api from "../apiConnection"

export const addExpense = async (expense: IExpense): Promise<unknown> => {
    try {
        await api.post('/expense/create', expense)
        return {
            success: true,
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                return {
                    success: false,
                    error: axiosError.response.data.details
                };
            }
        }
    }
}

export const deleteExpense = async (id: string | undefined): Promise<ApiResponse<any>> => {
    try {
        const response = await api.delete(`/expense?id=${id}`)
        return {
            success: true,
            data: response.data.message
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                return {
                    success: false,
                    error: axiosError.response.data.details
                };
            }
        }
    }
    return {
          error: "Erro interno no servidor"
    }
}

export const getAllExpenses = async () => {
    try {
        const response = await api.get('/expense/list')
        return {
            success: true,
            data: response.data.data
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                return {
                    success: false,
                    error: axiosError.response.data.details
                };
            }
        }
    }
    return {
        error: "Erro interno no servidor"
    }
}
export const getExpensesCategories = async (): Promise<ApiResponse<Category[]>> => {
    try {
        const response = await api.get('/expense/list/categories')
        return {
            success: true,
            data: response.data.data
        }
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<ErrorResponse>;
            if (axiosError.response) {
                return {
                    success: false,
                    error: axiosError.response.data.details
                };
            }
        }
    }
    return {
        error: "Erro interno no servidor"
    }
}