import { eventBus } from "../services/eventBus-service.js";

export default {
    template: `
        <section v-if="msg" class="user-msg" :class="msg.type">
            <h3 class="msg-header">User msg <button @click="closeMsg">X</button></h3> 
            <p>{{msg.txt}}</p>
            <button><router-link to="/book">GO TO BOOKS</router-link></button>
        </section>
    `,
    data() {
        return {
            unsubscribe: null,
            msg: null
        };
    },
    created() {
        this.unsubscribe = eventBus.on('show-msg', this.showMsg)
    },
    methods: {
        showMsg(msg) {
            this.msg = msg
            setTimeout(() => {
                this.msg = null
            }, 10000)
        },
        closeMsg() {
            this.msg = null
        }
    },
    unmounted() {
        this.unsubscribe()
    },
};