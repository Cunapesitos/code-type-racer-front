import { Component, Vue } from "vue-property-decorator";
import { Config } from "@/config/Config";
import Activity from "@/config/Activity";
import RoomConnection from "@/connections/RoomConnection";
import Player from "@/models/Player";

@Component
export default class RoomComponent extends Vue {
    // @Prop() private code = this.$route.params.code;
    code = this.$route.params.code;
    connected = false;
    roomConnection!: RoomConnection;
    players: Array<Player> = [];
    user: Player = new Player(1, "Player-");
    hoverUsername = false;
    editUsername = false;
    roomExists = true;

    mounted(): void {
        Activity.log(Config);
        this.roomConnection = RoomConnection.getInstance();
        this.roomConnection.setOnConnectionStablished(this.stablishedConnection);
        this.roomConnection.setOnPlayerConnected(this.playerConnected);
        this.roomConnection.setOnRoomNotExist(this.roomNotExist);
        this.roomConnection.connect(this.code);
    }

    // eslint-disable-next-line
    stablishedConnection(): void {
        this.connected = true;
        this.roomExists = true;
        this.players.push(this.user);
    }

    playerConnected(player: Player): void {
        alert("OK");
        Activity.log(player);
        this.players.push(player);
    }

    act(): void {
        Activity.log("OK");
    }

    get roomUrl(): string {
        return window.location.origin + "/room/" + this.code;
    }

    addPlayer(): void {
        const p = new Player(this.players.length + 1, "daasdffdsdfdfssafd");
        this.players.push(p);
    }

    changeUsername(): void {
        this.editUsername = true;
    }

    saveUsername(): void {
        this.editUsername = false;
    }

    roomNotExist(): void {
        this.roomExists = false;
    }

}