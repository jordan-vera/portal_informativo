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

const apiNoticia = {
    noticia: {

        allshow() {
            return callApi(`/noticias`);
        },

        getByTipo(tipo) {
            return callApi(`/noticia-tipo/${tipo}`);
        },

        findNoticia(idnoticia) {
            return callApi(`/noticia-id/${idnoticia}`);
        },

        create(docente) {
            return callApi(`/noticia`, {
                method: 'POST',
                body: JSON.stringify(docente),
            });
        },

        remove(id) {
            return callApi(`/noticia/${id}`, {
                method: 'DELETE',
            });
        },

        updates(idnoticia, noticia, anterior) {
            return callApi(`/noticia/${idnoticia}/${anterior}`, {
                method: 'PUT',
                body: JSON.stringify(noticia),
            });
        },
    },
};

export default apiNoticia;