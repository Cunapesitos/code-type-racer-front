import Pusher, { Channel } from "pusher-js";
import { Config } from "@/config/Config";
import Activity from "@/config/Activity";
import Player from "@/models/Player";
import Action from "@/models/Action";
import axios from "axios";

export default class RoomConnection {
    private static connection: RoomConnection;
    private pusher!: Pusher;
    private code!: string;
    private channel!: Channel;
    private onPlayerAction!: (action: Action) => void;
    // eslint-disable-next-line
    private onConnectionStablished!: (members: any) => void;
    // eslint-disable-next-line
    private onRoomNotJoined!: (error: any) => void;
    // eslint-disable-next-line
    private onPlayerJoined!: (member: any) => void;
    // eslint-disable-next-line
    private onPlayerLeft!: (member: any) => void;

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
            const res = await axios.get(
                Config.PUSHER.AUTH_ENDPOINT + 'api/room/' + code
            );
            this.code = code;
            Activity.log(res);
        } catch (err) {
            Activity.log("ERROR");
            Activity.log(err.response.data);
            this.onRoomNotJoined(err.response.data);
            return;
        }
        Pusher.logToConsole = !Config.PRODUCTION;
        this.pusher = new Pusher(Config.PUSHER.KEY, {
            authEndpoint: Config.PUSHER.AUTH_ENDPOINT + 'api/room/auth/' + code,
            cluster: Config.PUSHER.CLUSTER
        });
        this.channel = this.pusher.subscribe(`presence-${code}`);
        // eslint-disable-next-line
        this.channel.bind('pusher:subscription_error', (data: any) => {
            Activity.log(data)
        });
        this.channel.bind('pusher:subscription_succeeded', this.onConnectionStablished);
        this.channel.bind('pusher:member_removed', this.onPlayerLeft);
        this.channel.bind('pusher:member_added', this.onPlayerJoined);
        this.channel.bind('client-player-action', this.onPlayerAction);
    }

    // eslint-disable-next-line
    private handlePlayerConnected(data: any): void {
        Activity.log(data);
        if (data.body.player) {
            this.onPlayerAction(data.body.player);
        } else {
            Activity.error("Player not recognized:");
            Activity.error(data);
        }
    }

    // eslint-disable-next-line
    private handleOnConnectionStablished(members: any): void {
        //Activity.log(members);
        //this.onConnectionStablished;
    }

    // eslint-disable-next-line
    public setOnConnectionStablished(action: (members: any) => void): void {
        this.onConnectionStablished = action;
    }

    public setOnPlayerAction(action: (action: Action) => void): void {
        this.onPlayerAction = action;
    }

    // eslint-disable-next-line
    public setOnRoomNotJoined(action: (error: any) => void): void {
        this.onRoomNotJoined = action;
    }

    // eslint-disable-next-line
    public setOnPlayerJoined(action: (member: any) => void): void {
        this.onPlayerJoined = action;
    }

    // eslint-disable-next-line
    public setOnPlayerLeft(action: (member: any) => void): void {
        this.onPlayerLeft = action;
    }

    public sendAction(action: Action): boolean {
        const sent = this.channel.trigger("client-player-action", action);
        return sent;
    }

    public async changeUsername(player: Player): Promise<void> {
        try {
            const res = await axios.post(
                Config.PUSHER.AUTH_ENDPOINT + `api/room/${this.code}/change-username`,
                { roomCode: this.code, user: player }
            );
            Activity.log(res);
        } catch (err) {
            Activity.log("ERROR");
            Activity.log(err.response.data);
        }
    }
}
