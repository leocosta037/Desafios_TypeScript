// Um desenvolvedor tentou criar um projeto que consome a base de dados de filme do TMDB para criar um organizador de filmes, mas desistiu 
// pois considerou o seu código inviável. Você consegue usar typescript para organizar esse código e a partir daí aprimorar o que foi feito?

// A ideia dessa atividade é criar um aplicativo que: 
//    - Busca filmes
//    - Apresenta uma lista com os resultados pesquisados
//    - Permite a criação de listas de filmes e a posterior adição de filmes nela

// Todas as requisições necessárias para as atividades acima já estão prontas, mas a implementação delas ficou pela metade (não vou dar tudo de graça).
// Atenção para o listener do botão login-button que devolve o sessionID do usuário
// É necessário fazer um cadastro no https://www.themoviedb.org/ e seguir a documentação do site para entender como gera uma API key https://developers.themoviedb.org/3/getting-started/introduction

var apiKey: string;
let requestToken: string;
let username: string;
let password: string;
let sessionId: string;
let listId: string;

let loginButton = document.getElementById('login-button')!;
let searchButton = document.getElementById('search-button')!;
let searchContainer = document.getElementById('search-container')!;

let search = document.getElementById('search') as HTMLInputElement;
let senha = document.getElementById('senha') as HTMLInputElement;
let login = document.getElementById('login') as HTMLInputElement;
let api_key = document.getElementById('api-key') as HTMLInputElement;

if (loginButton) {
  loginButton.addEventListener('click', async () => {
    await criarRequestToken();
    await logar();
    await criarSessao();
  })
}

if (searchButton) {
  searchButton.addEventListener('click', async () => {
    let lista = document.getElementById("lista");
    if (lista) {
      lista.outerHTML = "";
    }
    if (search !== null) {
      let query = search.value;
      let listaDeFilmes: any = await procurarFilme(query);
      let ul = document.createElement('ul');
      ul.id = "lista"
      for (const item of listaDeFilmes.results) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(item.original_title))
        ul.appendChild(li)
      }
      console.log(listaDeFilmes);
      searchContainer.appendChild(ul);
    }
  })
}

function preencherSenha() {
  if (senha !== null) {
    password = senha.value;
  }
  validateLoginButton();
}

function preencherLogin() {
  if (login !== null) {
    username = login.value;
  }
  validateLoginButton();
}

function preencherApi() {
  if (api_key !== null) {
    apiKey = api_key.value;
  }
  validateLoginButton();
}

function validateLoginButton() {
  if (password && username && apiKey) {
    loginButton.removeAttribute('disabled');
  } else {
    loginButton.setAttribute('disabled', '');;
  }
}

class HttpClient {
  static async get(url: string, method: string, body: any = '') {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }
      request.onerror = () => {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        body = JSON.stringify(body);
      }
      request.send(body);
    })
  }
}

async function procurarFilme(query: string) {
  query = encodeURI(query)
  console.log(query)
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    "GET",
  )
  return result
}

async function adicionarFilme(filmeId: string) {
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
    "GET"
  )
  console.log(result);
}

async function criarRequestToken () {
  let result: any = await HttpClient.get(
    `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    "GET"
  )
  requestToken = result.request_token
}

async function logar() {
  await HttpClient.get(
    `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    "POST",
    {
      username: `${username}`,
      password: `${password}`,
      request_token: `${requestToken}`
    }
  )
}

async function criarSessao() {
  let result: any = await HttpClient.get(
    `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    "GET"
  )
  sessionId = result.session_id;
}

async function criarLista(nomeDaLista: string, descricao: string) {
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    "POST",
    {
      name: nomeDaLista,
      description: descricao,
      language: "pt-br"
    }
  )
  console.log(result);
}

async function adicionarFilmeNaLista(filmeId: string, listaId: string) {
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    "POST",
    {
      media_id: filmeId
    }
  )
  console.log(result);
}

async function pegarLista() {
  let result = await HttpClient.get(
    `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    "GET"
  )
  console.log(result);
}

