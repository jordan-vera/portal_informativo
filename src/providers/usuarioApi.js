import Global from "./urlGlobal";
const BASE_URL = Global.UrlGlobal.urlApi;

async function callApi(endpoint, options = {}) {

    options.headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    };

    const url = BASE_URL + endpoint;
    const response = await fetch(url, options);
    const data = await response.json();

    return data;
}

const apiUsuario = {
    usuarios: {

        login(usuario, clave) {
            return callApi(`/login/${usuario}/${clave}`);
        },

        findUser(idusuario) {
            return callApi(`/user/${idusuario}`);
        },

        updateUser(idusuario, usuario) {
            return callApi(`/users/${idusuario}`, {
                method: 'PUT',
                body: JSON.stringify(usuario),
            });
        },
    },
};

export default apiUsuario;