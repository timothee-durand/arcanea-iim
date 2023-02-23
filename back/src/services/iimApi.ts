import axios from "axios";
import { Wizard } from "../core/wizard";
import { cards } from "../cards";
import { Socket } from "socket.io";

export const iimApi = axios.create({
    baseURL: 'https://hp-api-iim.azurewebsites.net'
})

const makeRequest = async (method: 'post', url: string, data?: any, headers?: any) => {
    try {
        const response = await iimApi.request({
            method,
            url,
            data, 
            headers
        })
        return response.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const postLogin = async (data: any) => {
        return await makeRequest('post', '/auth/log-in',{
            "password": data?.password,
            "name": data?.userName
        }
    )
}

export const postStart = async (game: string, userIds: string[], type: string, token: string) => {
        return await makeRequest('post', 'matches/start',
        {
            "game": game,
            "userIds": userIds,
            "type": type
        },
        {
            'Authorization': `Bearer ${token}`
        } 
    )
}

export const postEndGame = async (gameId: number, userIds: string[], userId: string, token: string) => {
    return await makeRequest('post', 'matches/end',
        {
            "gameId": gameId,
            "userIds": userIds,
            "userId": userId
        },
        {
            'Authorization': `Bearer ${token}`
        }
    )
}