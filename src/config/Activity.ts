import { Config } from "./Config";

// eslint-disable-next-line
const log = (body: any = {}): void => {
    if (!Config.PRODUCTION) {
        // eslint-disable-next-line
        console.log(body);
    }
};

const info = (message: string): void => {
    // eslint-disable-next-line
    console.info(message);
};

// eslint-disable-next-line
const error = (error: any): void => {
    // eslint-disable-next-line
    console.error(error.msg);
    console.error(error);
};

const activity = {
    log,
    info,
    error
}

export default activity;