import { Component, Vue } from "vue-property-decorator";
import Pusher, { Channel } from "pusher-js";
import Config from "@/config/Config";

@Component
export default class RoomComponent extends Vue {
    // @Prop() private code = this.$route.params.code;
    code = this.$route.params.code;
    channel!: Channel;
    connected = false;
    config = new Config();

    mounted(): void {
        console.log(this.config.PUSHER.ID);
        
        const pusher = new Pusher(this.config.PUSHER.ID, {
            authEndpoint: this.config.PUSHER.AUTH_ENDPOINT,
            cluster: this.config.PUSHER.CLUSTER
        });
        this.channel = pusher.subscribe(`private-${this.code}`);
        this.channel.bind('my-event', this.handleConnection);
        this.channel.bind('pusher:subscription_succeeded', this.stablishConnection);
    }

    get test(): string {
        return `The code is: ${this.code}`;
    }

    handleConnection(): void {
        this.connected = true;  
    }

    stablishConnection(): void {
        this.connected = true;
    }

}