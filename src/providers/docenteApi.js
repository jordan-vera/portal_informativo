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

        findDocente(iddocente) {
            return callApi(`/docente-id/${iddocente}`);
        },

        remove(id) {
            return callApi(`/docente/${id}`, {
                method: 'DELETE',
            });
        },

        updates(iddocente, docente, anterior) {
            return callApi(`/docente/${iddocente}/${anterior}`, {
                method: 'PUT',
                body: JSON.stringify(docente),
            });
        },

    },
};

export default apiDocente;