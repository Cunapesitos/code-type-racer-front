import { Component, Vue } from "vue-property-decorator";
import Pusher, { Channel } from "pusher-js";
import { Config } from "@/config/Config";
import Activity from "@/config/Activity";

@Component
export default class RoomComponent extends Vue {
    // @Prop() private code = this.$route.params.code;
    code = this.$route.params.code;
    channel!: Channel;
    connected = false;

    mounted(): void {
        Activity.log(Config);

        Pusher.logToConsole = !Config.PRODUCTION;
        const pusher = new Pusher(Config.PUSHER.KEY, {
            authEndpoint: Config.PUSHER.AUTH_ENDPOINT,
            cluster: Config.PUSHER.CLUSTER
        });
        this.channel = pusher.subscribe(`private-${this.code}`);
        this.channel.bind('my-event', this.handleConnection);
        this.channel.bind('pusher:subscription_succeeded', this.stablishedConnection);
    }

    get test(): string {
        return `The code is: ${this.code}`;
    }

    handleConnection(): void {
        this.connected = true;
    }

    stablishedConnection(): void {
        this.connected = true;
    }

    act(): void {
        Activity.log("OK");
    }

    get roomUrl(): string {
        return window.location.origin + "/room/" + this.code;
    }

}