import axios, { AxiosError } from "axios";
import api from "../Api";
import Cookie from 'js-cookie';

export const userLogin = async (usuario: IUserLogin) => {
    try {
        const response = await api.post('/users/login', usuario)
        const token = response.data.data.token;
        console.log(token)
        if (token) {
            Cookie.set('Token', token, { path: '/', secure: true, sameSite: 'Strict', httpOnly: true })
            return { sucess: true }
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

export const createUser = (usuario: IUserLogin): Promise<unknown> => {
    return api.post('/users', usuario)
}

export const getUser = async (): Promise<IUser> => {
    return await api.get('/users/auth/user').then(response => {
        return response.data.data
    })
        .catch((e) => {
            console.log(e)
        })
}

export const checkUserAuthentication = async (): Promise<ApiResponse<any>> => {
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
                    error: axiosError.response.data.details // Acessa a mensagem de erro correta
                };
            }
        }
    }
    return {
        error: "Erro interno no servidor"
    }
}