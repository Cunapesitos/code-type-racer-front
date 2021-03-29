import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import Activity from "@/config/Activity";

@Component
export default class HomeComponent extends Vue {
    codeToJoin = "";
    // mounted(): void {
    // }

    create(): void {
        axios
            .get('https://code-type-racer-back.herokuapp.com/api/room/new')
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