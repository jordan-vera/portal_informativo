const UrlGlobal = {
    urlApi: "http://localhost/portal_informatico_utc/public/api",
    urlArchivos: "http://localhost/archivosPortal/"
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function fechaActual() {
    var date = new Date();
    var anio = date.getFullYear();
    var mes = +date.getMonth() + 1;
    var dia = date.getDate();

    if (mes < 10) {
        if (dia < 10) {
            return anio + '-0' + mes + '-0' + dia;
        } else {
            return anio + '-0' + mes + '-' + dia;
        }
    } else {
        if (dia < 10) {
            return anio + '-' + mes + '-0' + dia;
        } else {
            return anio + '-' + mes + '-' + dia;
        }
    }
}

function horaActual() {
    var date = new Date();
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}

export default { UrlGlobal, uuidv4, fechaActual, horaActual };