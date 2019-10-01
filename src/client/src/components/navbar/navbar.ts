import { Component, Vue } from 'vue-property-decorator';
import { Action, namespace } from 'vuex-class';

const userModule = namespace('user');

@Component
export default class Navbar extends Vue {
    @userModule.Action public destroySession: any;
    /**
     * Class constructor.
     */
    constructor() {
        super();
    }

    public async logOut() {
        await this.destroySession();
        this.$router.push({name: 'login'});
    }
}
