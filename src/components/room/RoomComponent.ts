import { Component, Vue } from "vue-property-decorator";
import { Config } from "@/config/Config";
import Activity from "@/config/Activity";
import RoomConnection from "@/connections/RoomConnection";
import Player from "@/models/Player";
import Action from "@/models/Action";
import axios from "axios";

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
    joined = true;
    roomMessageState = "";
    oldUserName = "";

    mounted(): void {
        Activity.log(Config);
        this.roomConnection = RoomConnection.getInstance();
        this.roomConnection.setOnConnectionStablished(this.stablishedConnection);
        this.roomConnection.setOnPlayerAction(this.playerAction);
        this.roomConnection.setOnRoomNotJoined(this.roomNotJoined);
        this.roomConnection.setOnPlayerJoined(this.addPlayer);
        this.roomConnection.setOnPlayerLeft(this.removePlayer);
        this.roomConnection.connect(this.code);
    }

    // eslint-disable-next-line
    stablishedConnection(members: any): void {
        Activity.log("This is my new data:");
        Activity.log(members.me);
        this.user.username = members.me.info.username;
        this.user.id = members.me.id;
        Activity.log("All users");
        // eslint-disable-next-line
        members.each((member: any) => {
            this.players.push(new Player(member.id, member.info.username));
            Activity.log(member);
        });
        this.connected = true;
        this.joined = true;
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
        let index = 0;
        for (const i in this.players) {
            Activity.log(i);
            if (this.players[i].id == playerToRemove.id) {
                index = + i;
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
        this.oldUserName = this.user.username;
    }

    saveUsername(): void {
        this.editUsername = false;
        const changed = this.roomConnection.changeUsername(this.user);
        /*
        if(changed){
            Activity.log("Sending action with:");
            Activity.log(this.user);
            this.sendAction(new Action(this.user, "username-changed"));
        }else{
            Activity.log("Error changing username");
        }
        */
    }

    // eslint-disable-next-line
    roomNotJoined(error: any): void {
        this.joined = false;
        this.roomMessageState = error.message;
    }

    sendTestAction(): void {
        this.sendAction(new Action(this.user, "test"));
    }

    sendAction(action: Action): void {
        this.roomConnection.sendAction(action);
    }

    playerAction(action: Action): void {
        Activity.log("New action:");
        Activity.log(action);
        const playerPos: number = this.getPlayerPosById(action.player.id);
        Activity.log("Player found:");
        Activity.log(this.players[playerPos]);
        switch (action.name) {
            case "username-changed":
                Activity.log("Changing username");
                this.players[playerPos].username = action.player.username;
                break;
            case "username-testing":
                break;
            default:
                alert("from: " + action.player.username + "; " + action.name);
                break;
        }
    }

    private getPlayerPosById(id: string): number {
        Activity.log("Searching player with id:" + id);
        for (const i in this.players) {
            Activity.log(this.players[i].username);
            if (this.players[i].id === id) {
                return +i;
            }
        }
        return -1;
    }

}