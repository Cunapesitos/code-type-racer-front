export default class Config {

    PRODUCTION = process.env.PRODUCTION === 'true' || false;
    PUSHER = {
        ID: process.env.PUSHER_APP_ID || 'id',
        KEY: process.env.PUSHER_APP_KEY || 'key',
        SECRET: process.env.PUSHER_APP_SECRET || 'secret',
        CLUSTER: process.env.PUSHER_APP_CLUSTER || 'cluster',
        AUTH_ENDPOINT: process.env.PUSHER_APP_AUTH_ENDPOINT || 'url'
    }
}