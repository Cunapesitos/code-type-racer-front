import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import Activity from "@/config/Activity";
import { Config } from "@/config/Config";

@Component
export default class HomeComponent extends Vue {
    codeToJoin = "";
    // mounted(): void {
    // }

    create(): void {
        axios
            .get(Config.PUSHER.AUTH_ENDPOINT + 'api/room/new')
            .then(this.handleResponse)
    }

    get urlToJoin(): string {
        return window.location.origin + "/room/" + this.codeToJoin;
    }

    // eslint-disable-next-line
    handleResponse(response: any) {
        Activity.log(response.data);
        const newCode = response.data.body.code;
        this.$router.replace("/room/" + newCode);
    }

}