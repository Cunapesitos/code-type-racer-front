import Pusher, { Channel } from "pusher-js";
import { Config } from "@/config/Config";
import Activity from "@/config/Activity";
import Player from "@/models/Player";
import axios from "axios";

export default class RoomConnection {
    private static connection: RoomConnection;
    private pusher!: Pusher;
    private code!: string;
    private channel!: Channel;
    private onPlayerConnected!: (player: Player) => void;
    // eslint-disable-next-line
    private onConnectionStablished!: () => void;
    private onRoomNotExist!: () => void;

    private constructor() {
        this.code = "";
    }

    public static getInstance(): RoomConnection {
        if (!RoomConnection.connection) {
            RoomConnection.connection = new RoomConnection();
        }
        return RoomConnection.connection;
    }

    public async connect(code: string): Promise<void> {
        try {
            await axios
                .get(Config.PUSHER.AUTH_ENDPOINT + 'api/room/exists/' + code);
        } catch (err) {
            Activity.log("NOt exists ");
            this.onRoomNotExist();
        }
        Pusher.logToConsole = !Config.PRODUCTION;
        this.pusher = new Pusher(Config.PUSHER.KEY, {
            authEndpoint: Config.PUSHER.AUTH_ENDPOINT + 'api/room/auth',
            cluster: Config.PUSHER.CLUSTER
        });
        this.channel = this.pusher.subscribe(`private-${code}`);
        this.channel.bind('player-connected', this.handlePlayerConnected);
        this.channel.bind('pusher:subscription_succeeded', this.onConnectionStablished);
    }

    // eslint-disable-next-line
    private handlePlayerConnected(data: any): void {
        Activity.log(data);
        if (data.body.player) {
            this.onPlayerConnected(data.body.player);
        } else {
            Activity.error("Player not recognized:");
            Activity.error(data);
        }
    }

    // eslint-disable-next-line
    private handleOnConnectionStablished(): void {
        // Activity.log(data);
        this.onConnectionStablished();
    }

    // eslint-disable-next-line
    public setOnConnectionStablished(action: () => void): void {
        this.onConnectionStablished = action;
    }

    public setOnPlayerConnected(action: (player: Player) => void): void {
        this.onPlayerConnected = action;
    }

    public setOnRoomNotExist(action: () => void): void {
        this.onRoomNotExist = action;
    }
}