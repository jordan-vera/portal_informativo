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
        
        login(usuario, clave){
            return callApi(`/login/${usuario}/${clave}`);
        },

        /*

        create(cliente) {
            return callApi(`/clientes`, {
                method: 'POST',
                body: JSON.stringify(cliente),
            });
        },

        update(badgeId, updates) {
            return callApi(`/badges/${badgeId}`, {
                method: 'PUT',
                body: JSON.stringify(updates),
            });
        },
        // Lo hubiera llamado `delete`, pero `delete` es un keyword en JavaScript asi que no es buena idea :P
        remove(id) {
            return callApi(`/clientes/${id}`, {
                method: 'DELETE',
            });
        },
        */
    },
};

export default apiUsuario;