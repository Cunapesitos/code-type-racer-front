import { Config } from "./Config";

// eslint-disable-next-line
const log = (body: any = {}): void => {
    if (!Config.PRODUCTION) {
        // tslint:disable-next-line:no-console
        console.log(body);
    }
};

const info = (message: string): void => {
    // tslint:disable-next-line:no-console
    console.info(message);
};

const error = (message: string): void => {
    // tslint:disable-next-line:no-console
    console.error(message);
};

const activity = {
    log,
    info,
    error
}

export default activity;