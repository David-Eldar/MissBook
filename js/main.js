
import appHeader from "./cmps/app-header.cmp.js";
import appFooter from "./cmps/app-footer.cmp.js";
import userMsg from "./cmps/user-msg.cmp.js"
import { router } from './router.js';

const options = {
  template: `
        <section>
            
            <app-header />
            <router-view/>
            <user-msg/>
            <app-footer />
        </section>
    `,
  components: {
    appHeader,
    userMsg,
    appFooter,
  },
};

const app = Vue.createApp(options);
app.use(router)
app.mount("#app");
