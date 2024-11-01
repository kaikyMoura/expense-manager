import axios, { AxiosError } from "axios";
import api from "../apiConnection";
import Cookie from 'js-cookie';

export const userLogin = async (usuario: IUserLogin) => {
    try {
        const response = await api.post('/users/login', usuario)
        const token = response.data.data.token;
        if (token) {
            Cookie.set('Token', token, { path: '/', secure: true, sameSite: 'Strict' })
            return { success: true }
        }
        else {
            throw new Error('Token não recebido')
        }
    }
    catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
            console.log(axiosError.response)
            const errorDetails = axiosError.response.data.details || axiosError.response.data.message || "Credenciais invalidas";
            return { success: false, error: errorDetails };
        } else {
            return { success: false, error: "Erro de rede ou conexão" };
        }
    }
}

export const createUser = async (usuario: IUserLogin) => {
    try {
        await api.post('/users', usuario)
        return { success: true }
    }
    catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return { success: false, error: axiosError.response?.data.details };
    }
}

export const updatePassword = async (jwtToken: string | string[] | undefined, password: string) => {
    try {
        const response = await api.put('/users/change-password', password, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
        return { success: true, message: response.data.message }
    }
    catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return { success: false, error: axiosError.response?.data.details };
    }
}

export const getUser = async (): Promise<ApiResponse<IUser>> => {
    try {
        const response = await api.get('/users/auth/user')
        return {
            success: true,
            data: response.data.data
        }
    }
    catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return { success: false, error: axiosError.response?.data.details };
    }
}

export const verifyAccount = async (jwtToken: string | string[] | undefined): Promise<ApiResponse<unknown>> => {
    try {
        const response = await api.post('/users/verify-account', {}, {
            headers: {
                'Authorization': `Bearer ${jwtToken}`
            }
        })
        const token = response.data.data.token;

        if (token) {
            Cookie.set('Token', token, { path: '/', secure: true, sameSite: 'Strict' })
            return { success: true }
        }
        else {
            throw new Error('Token não recebido')
        }
    }
    catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return { success: false, error: axiosError.response?.data.details };
    }
}
export const resendEmail = async (email: String): Promise<ApiResponse<unknown>> => {
    try {
        await api.post(`/users/resend-email?email=${email}`)

        return {
            success: true
        }
    }
    catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return { success: false, error: axiosError.response?.data.details };
    }
}

export const sendResetPasswordEmail = async (email: String): Promise<ApiResponse<string>> => {
    try {
        const response = await api.post(`/users/send-resetpassword-email?email=${email}`)

        return {
            success: true,
            data: response.data.message
        }
    }
    catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        return { success: false, error: axiosError.response?.data.details };
    }
}

export const checkUserAuthentication = async (): Promise<ApiResponse<string | undefined>> => {
    try {
        const result = await api.get('/users/validate-token');

        return {
            success: true,
            data: result.data
        };
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