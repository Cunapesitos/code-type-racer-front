import { Config } from "./Config";

const log = (body: any = {}) => {
    if (!Config.PRODUCTION) {
        console.log(body);
    }
};

const info = (message: string) => {
    // tslint:disable-next-line:no-console
    console.info(message);
};

const error = (message: string) => {
    // tslint:disable-next-line:no-console
    console.error(message);
};

const activity = {
    log,
    info,
    error
}

export default activity;