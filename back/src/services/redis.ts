import {createClient, RedisClientType} from "redis";

const modules = {};

const scripts = {};

export type CustomRedisClient = RedisClientType<typeof modules, typeof scripts>;
export class RedisClient {
    static instance: RedisClient;
    private client: CustomRedisClient;

    constructor(client: CustomRedisClient) {
        this.client = client;
    }

    public  static async initInstance() {
        const client = await createClient({modules, scripts})
            .on('error', err => console.log('Redis Client Error', err))
            .connect();
        RedisClient.instance = new RedisClient(client);
    }



    public static getClient(): CustomRedisClient {
        if (!RedisClient.instance) {
            throw new Error('Redis client not initialized');
        }
        return RedisClient.instance.client;
    }
}