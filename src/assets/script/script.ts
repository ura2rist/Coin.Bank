import Authorization from './auth';
import Tools from './tools';

type ElementInPage = HTMLElement | null;

const form: ElementInPage = document.querySelector('.form-auth');
const root = document.getElementById('root') as HTMLElement;
const tools = new Tools(root);

if (form) {
  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const target = event.currentTarget as HTMLFormElement;
    const login: string = target.login.value;
    const password: string = target.password.value;

    const authorization = new Authorization(login, password, target);

    if (authorization.status) {
      tools.clearRoot();
    }
  });
}

if (localStorage.getItem('token')) {
}
