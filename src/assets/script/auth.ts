import fetchApi from './fetchApi';

export default class Authorization {
  private login: string;
  private password: string;
  public status: boolean;

  constructor(login: string, password: string, target: HTMLFormElement) {
    this.login = login.trim();
    this.password = password.trim();
    this.status = true;

    if (target.querySelector('.input_error')) {
      this.clearError(target);
    }

    this.validate(target);
  }

  private validate(target: HTMLFormElement): void {
    const loginBlock: HTMLElement = target.login;
    const passwordBlock: HTMLElement = target.password;

    this.checkSpace(this.login, [loginBlock, passwordBlock]);

    if (!this.status) return;

    this.checkLength(this.login, [loginBlock, passwordBlock]);

    if (!this.status) return;

    this.authorization(target);
  }

  private async authorization(target: HTMLFormElement) {
    try {
      const data = await fetchApi.authorization(this.login, this.password);

      if (data.error.length) throw new Error(data.error);

      localStorage.setItem('token', data.payload.token);
    } catch (error: unknown) {
      if (error instanceof Error) {
        const errorBlock: HTMLElement = document.createElement('p');

        errorBlock.classList.add('input_error');

        errorBlock.textContent = error.message;

        target?.append(errorBlock);
      }
    }
  }

  private checkSpace(text: string, blocks: HTMLElement[] | NodeList): void {
    blocks.forEach((block) => {
      const element = block as HTMLInputElement;

      if (element.value.indexOf(' ') !== -1) {
        const error: HTMLElement = document.createElement('p');

        error.classList.add('input_error');

        error.textContent = 'Пробел недопустим!';

        element.closest('.input')?.append(error);

        this.status = false;
      }
    });
  }

  private checkLength(text: string, blocks: HTMLElement[] | NodeList): void {
    blocks.forEach((block) => {
      const element = block as HTMLInputElement;

      if (element.value.length < 6) {
        const error: HTMLElement = document.createElement('p');

        error.classList.add('input_error');

        error.textContent = 'Минимальное кол-во символов 6';

        element.closest('.input')?.append(error);

        this.status = false;
      }
    });
  }

  private clearError(target: HTMLElement): void {
    const error: NodeList = target.querySelectorAll('.input_error');

    error.forEach((item) => {
      const errorBlock = item as HTMLElement;

      errorBlock.remove();
    });
  }
}
