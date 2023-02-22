import axios from "axios";
import { Wizard } from "../core/wizard";
import { cards } from "../cards";
import { Socket } from "socket.io";

export const iimApi = axios.create({
    baseURL: 'https://hp-api-iim.azurewebsites.net'
})

const makeRequest = async (method: 'post', url: string, data?: any) => {
    try {
        const response = await iimApi.request({
            method,
            url,
            data
        })
        return response.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const postLogin = async (data: any) => {
        return await makeRequest('post', '/auth/log-in', {
            "password": data?.password,
            "name": data?.userName
        }
    )
}
