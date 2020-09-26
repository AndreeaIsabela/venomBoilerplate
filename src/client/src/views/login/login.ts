import { Component, Vue } from 'vue-property-decorator';
import { Action, namespace } from 'vuex-class';
import ICredentials from '../../types/ICredentials';

const userModule = namespace('user');

@Component
export default class Login extends Vue {
  @userModule.Action public authenticateUser: any;
  @userModule.Action public createUser: any;

  public isLoading: boolean = false;
  public emailError = {
    message: 'Please type a valid email address.',
    status: '',
  };
  public passwordError = {
    message: 'Please type a vlid password.',
    status: '',
  };
  public checkPasswordError = {
    message: 'The password must be the same as the one above.',
    status: '',
  };
  public loginData = {
    email: '',
    password: '',
  };
  public registerData = {
    email: '',
    password: '',
    checkPassword: '',
  };

  /**
   * Class constructor.
   */
  constructor() {
    super();
  }

  public mounted(): void {
    const imgBtn = document.querySelector('.img__btn');
    const cont = document.querySelector('.cont');
    if (imgBtn && cont) {
      imgBtn.addEventListener('click', () => {
        cont.classList.toggle('s--signup');
      });
    }
  }

  /**
   * Authenticate the given user.
   *
   * @return {Promise<void>}
   */
  public async authenticate(): Promise<void> {
    if (this.checkForm('login')) {
      try {
        const credentials: ICredentials = {
          email: this.loginData.email,
          password: this.loginData.password,
        };

        await this.authenticateUser(credentials);

        this.$router.push({ name: 'home' });
      } catch (err) {
        if (err.response.status === 400) {
          this.passwordError.status = 'form-control is-invalid';
        } else if (err.response.status === 404) {
          this.emailError.status = 'form-control is-invalid';
        }
      }
    }

    this.isLoading = false;
  }

  /**
   * Registrer the given user.
   *
   * @return {Promise<void>}
   */
  public async register() {
    if (this.checkForm('register')) {
      try {
        const credentials: ICredentials = {
          email: this.loginData.email,
          password: this.loginData.password,
        };
        this.createUser(credentials);
        this.$router.push({ name: 'home' });
      } catch (err) {
        console.log(err);
      }
    }
  }

  /**
   * Check the form validity.
   *
   *   @return {boolean}
   */
  private checkForm(type: string): boolean {
    if (type === 'login') {
      return this.checkEmail(this.loginData.email) && this.checkPassword(this.loginData.password);
    }
    return this.checkEmail(this.registerData.email)
      && this.checkPassword(this.registerData.password)
      && this.checkSecondPassword();
  }

  private checkEmail(email: string): any {
    if (!email.length) {
      this.emailError.status = 'form-control is-invalid';
    } else {
      this.emailError.status = '';
    }
    return !!email.length;
  }

  private checkPassword(password: string) {
    if (password.length === 0) {
      this.passwordError.status = 'form-control is-invalid';
    } else {
      this.passwordError.status = '';
    }
    return password.length !== 0;
  }

  private checkSecondPassword(): boolean {
    if (this.registerData.password !== this.registerData.checkPassword) {
      this.checkPasswordError.status = 'form-control is-invalid';
    } else {
      this.checkPasswordError.status = '';
    }
    return this.registerData.password === this.registerData.checkPassword;
  }

  private reset(): void {
    this.registerData.email = '';
    this.registerData.password = '';
    this.registerData.checkPassword = '';
    this.loginData.email = '';
    this.loginData.password = '';
    this.emailError.status = '';
    this.passwordError.status = '';
    this.checkPasswordError.status = '';
  }
}
