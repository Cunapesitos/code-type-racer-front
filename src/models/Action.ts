import Player from "./Player";

export default class Action {

    constructor(
        public player: Player,
        public name: string
    ) {}
}