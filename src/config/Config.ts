export const Config = {

    PRODUCTION: process.env.VUE_APP_PRODUCTION === 'true' || false,
    PUSHER: {
        ID: process.env.VUE_APP_PUSHER_APP_ID || 'id not exist',
        KEY: process.env.VUE_APP_PUSHER_APP_KEY || 'key not exist',
        SECRET: process.env.VUE_APP_PUSHER_APP_SECRET || 'secret not exist',
        CLUSTER: process.env.VUE_APP_PUSHER_APP_CLUSTER || 'cluster not exist',
        AUTH_ENDPOINT: process.env.VUE_APP_PUSHER_APP_AUTH_ENDPOINT || 'ur not existl'
    }
}