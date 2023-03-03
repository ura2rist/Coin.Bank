class FetchApi {
  private url: string = 'http://localhost:3000';

  authorization(login: string, password: string) {
    interface IAuth {
      login: string;
      password: string;
    }

    const data: IAuth = { login: login, password: password };

    return fetch(this.url + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  }
}

const fetchApi = new FetchApi();

export default fetchApi;
