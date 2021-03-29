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

const error = (message: string): void => {
    // eslint-disable-next-line
    console.error(message);
};

const activity = {
    log,
    info,
    error
}

export default activity;