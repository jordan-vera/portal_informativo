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

const apiVideo = {
    video: {

        allshow() {
            return callApi(`/videos`);
        },

        create(video) {
            return callApi(`/video`, {
                method: 'POST',
                body: JSON.stringify(video),
            });
        },

        remove(id) {
            return callApi(`/video/${id}`, {
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

export default apiVideo;