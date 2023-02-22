/* import axios from "axios";

export const arcaneaApi = axios.create({
    baseURL: 'http://localhost:3000/api'
})

const makeRequest = async (method: 'get', url: string, data?: any) => {
    try {
        const response = await arcaneaApi.request({
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

export const getCards = async () => {
    return await makeRequest('get', '/cards');
}

export const getDecks = async () => {
    return  await makeRequest('get','/decks');
}

export const getDeck = async (id:number) => {
    return await makeRequest('get',`/decks/${id}`);
}
 */