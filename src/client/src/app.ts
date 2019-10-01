import { Component, Vue } from 'vue-property-decorator';
import Navbar from './components/navbar/Navbar.vue';
import { Action, namespace } from 'vuex-class';

const userModule = namespace('user');

@Component({
  components: {
    Navbar,
  },
})
export default class App extends Vue {
  @userModule.Getter public isLoggedIn: any;
  /**
   * Class constructor.
   */
  constructor() {
    super();
  }
}
