var listaCompleta = new Array();
var filtrados = new Array();
var elegidos = new Array();

recupearJson();

/**
 * Recupera el Json y lo mete en el array de listaCompleta.
 */
function recupearJson() {
    datos.forEach(e => {
        listaCompleta.push(new movilidad(e.tipo, e.ciclo, e.pais, e.ciudad));
    })
    crearOpciones();
}
/**
 * Aplica los filtros necesarios para mostrar los paises o check
 * que el usuario a filtrado.
 */
function crearOpciones() {
    let tipoMovilidad = document.getElementById("tipoMovilidad").value;
    let tipoRadio = document.querySelector("input[name='tipo']:checked").value;
    filtrados = new Array();
    filtrados = recuperarTipos(tipoMovilidad);
    rellenarLimpiando(tipoRadio, filtrados);
}
/**
 * Devuelve un array con los objetos movilidad 
 * despues de aplicar el filtro del tipo
 * @param {*} tipo (medio, superior, etc) tipo de movilidad
 * @return aux array con los datos filtrados
 */
function recuperarTipos(tipo) {
    let aux = [];
    listaCompleta.forEach(element => {
        if (element.tipo.includes(tipo)) {
            aux.push(element);
        }
    });
    return aux;
}
/**
 * Añade al HTML el combobox o los checkbox de las movilidades filtradas
 * @param {*} tipo tipo de movilidad
 * @param {*} filtrados array despues del primer filtro
 */
function rellenarLimpiando(tipo, filtrados) {
    let contenedor = document.getElementById("opciones");
    let contenedorSecundario = document.getElementById("contenedorSecundario");

    if (contenedorSecundario != null)
        deleteTreeElements(contenedorSecundario, true);

    contenedorSecundario = createElement("div", null, "contenedorSecundario", null, null, null, null, null, null, null);
    let filtradosUnicos = filtrar(tipo, filtrados);

    if (tipo == 0) {
        contenedorSecundario.appendChild(createElement("button", "btn btn-outline-info", "btnSeleccionar", null, "Seleccionar/Desseleccionar", "todos()", null, null, null, null));
        for (let index = 0; index < filtradosUnicos.length; index++) {
            contenedorSecundario.appendChild(crearCheck(index, filtradosUnicos[index]));
        }
        //todosMarcados = false;
        //todos();
    } else if (tipo == 1) {
        let combo = createElement("select", "custom-select", "comboPaises", null, null, null, null, null, null, null);
        for (let index = 0; index < filtradosUnicos.length; index++) {
            combo.appendChild(createElement("option", null, null, null, filtradosUnicos[index], null, filtradosUnicos[index], null, null, null));
        }
        contenedorSecundario.appendChild(combo);
    }
    contenedor.appendChild(contenedorSecundario);
    //buscarMarcados();
}
/**
 * Devuelve un array con los nombres para los check o para el combo,
 * para que el usuario pueda elegir lo que quiere ver concretamente.
 * @param {*} tipo tipo de movilidad
 * @param {*} arrayFiltrar Array del que se quiere recuperar los nombres no repetidos
 */
function filtrar(tipo, arrayFiltrar) {
    var listaAux = [];
    let tipoMovilidad;

    arrayFiltrar.forEach(e => {
        if (tipo == 0)
            tipoMovilidad = e.ciclo;
        else if (tipo == 1)
            tipoMovilidad = e.pais;
        else if (tipo == 2)
            tipoMovilidad = e.ciudad;
        if (listaAux.indexOf(tipoMovilidad) === -1)
            listaAux.push(tipoMovilidad);
    })
    return listaAux;
}
/**
 * Busca finalmente lo que el usuario marcó al final para ir y marcarlo en el mapa.
 */
function buscarMarcados() {
    let tipoRadio = document.querySelector("input[name='tipo']:checked").value;
    elegidos = new Array();
    if (tipoRadio == 0) {
        let marcados = document.querySelectorAll("input[name='ciclo']:checked");
        marcados.forEach(e => {
            let aux = e.nextElementSibling.textContent;
            filtrados.forEach(element => {
                if (element.ciclo == aux) {
                    existeLocalizacion(element);
                }
            });
        })
    } else if (tipoRadio == 1) {
        let comboPais = document.getElementById("comboPaises").value;
        filtrados.forEach(element => {
            if (element.pais == comboPais) {
                existeLocalizacion(element);
            }
        });
    }
    marcarBueno(elegidos);
}

function addSiglas(movilidadAux)
{
    let aux = new movilidad(movilidadAux.tipo, movilidadAux.ciclo, movilidadAux.pais, movilidadAux.ciudad);
    if (movilidadAux.tipo.includes("Superior")) {
       aux.ciclo = "GS: " + aux.ciclo;
    }
    else if (movilidadAux.tipo.includes("Medio")) {
        aux.ciclo = "GM: " + aux.ciclo;
     }
    else if (movilidadAux.tipo.includes("Profesorado")) {
        aux.ciclo = "Dpt: " + aux.ciclo;
     }
    return aux;
}
/**
 * Comprueba que exista ya esa localizacion, si existe, añade el ciclo a la misma localizacion,
 * en caso de que no exista, añade una nueva.
 * @param {*} propuesto Elemento propuesto para añadirlo
 */
function existeLocalizacion(propuesto) {
    var aux = addSiglas(propuesto);
    var encontrado = false;
    elegidos.forEach(element => {
        if (element.pais == propuesto.pais && element.ciudad == propuesto.ciudad) {
            element.ciclo += "<br/>" + aux.ciclo;
            encontrado = true;
        }
    });
    if (encontrado == false)
        elegidos.push(aux);
}