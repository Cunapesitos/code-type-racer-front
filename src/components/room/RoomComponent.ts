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
    user: Player = new Player("1", "Player-");
    hoverUsername = false;
    editUsername = false;
    roomExists = true;

    mounted(): void {
        Activity.log(Config);
        this.roomConnection = RoomConnection.getInstance();
        this.roomConnection.setOnConnectionStablished(this.stablishedConnection);
        this.roomConnection.setOnPlayerConnected(this.playerConnected);
        this.roomConnection.setOnRoomNotExist(this.roomNotExist);
        this.roomConnection.setOnPlayerJoined(this.addPlayer);
        this.roomConnection.setOnPlayerLeft(this.removePlayer);
        this.roomConnection.connect(this.code);
    }

    // eslint-disable-next-line
    stablishedConnection(members: any): void {
        Activity.log(members.me);
        this.user.username = members.me.info.username;
        members.each((member: any) => {
            this.players.push(new Player(member.id, member.info.username));
            Activity.log(member.info.username);
        });
        this.connected = true;
        this.roomExists = true;
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

    // eslint-disable-next-line
    addPlayer(member: any): void {
        this.players.push(new Player(member.id, member.info.username));
        Activity.log("new member: " + member.info.username);
    }

    // eslint-disable-next-line
    removePlayer(member: any): void {
        const playerToRemove: Player = new Player(member.id, member.info.username);
        Activity.log("Player found: " + playerToRemove);
        const index = 0;
        for (const i in this.players) {
            Activity.log(i);
            if (this.players[i].id == playerToRemove.id) {
                //index = i;
            }
        }
        Activity.log("Index found: " + index);
        if (index > -1) {
            this.players.splice(index, 1);
        }
        Activity.log("old member: " + member.info.username);
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