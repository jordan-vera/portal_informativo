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

const apiDocente = {
    docente: {

        allshow() {
            return callApi(`/docentes`);
        },

        create(docente) {
            return callApi(`/docente`, {
                method: 'POST',
                body: JSON.stringify(docente),
            });
        },

        remove(id) {
            return callApi(`/docente/${id}`, {
                method: 'DELETE',
            });
        },

        /*
        update(badgeId, updates) {
            return callApi(`/badges/${badgeId}`, {
                method: 'PUT',
                body: JSON.stringify(updates),
            });
        },
        // Lo hubiera llamado `delete`, pero `delete` es un keyword en JavaScript asi que no es buena idea :P
        
        */
    },
};

export default apiDocente;