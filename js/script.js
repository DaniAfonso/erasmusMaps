var listaCompleta = new Array();
var filtrados = new Array();
var elegidos = new Array();
var todosMarcados = false;
recupearJson();

function recupearJson() {
    for (let index = 0; index < datos.length; index++) {
        listaCompleta.push(new movilidad(datos[index].tipo, datos[index].ciclo, datos[index].pais, datos[index].ciudad));
    }
    crearOpciones();
}

function crearOpciones() {
    let tipoMovilidad = document.getElementById("tipoMovilidad").value;
    let tipoRadio = document.querySelector("input[name='tipo']:checked").value;
    filtrados = new Array();
    filtrados = recuperarTipos(tipoMovilidad);
    rellenarLimpiando(tipoRadio, filtrados);
}

function recuperarTipos(tipo) {
    var aux = [];
    for (let index = 0; index < listaCompleta.length; index++) {
        if (listaCompleta[index].tipo.includes(tipo))
            aux.push(listaCompleta[index]);
    }
    return aux;
}

function rellenarLimpiando(tipo, filtrados) {
    let contenedor = document.getElementById("opciones");
    var contenedorCheck = document.getElementById("check");
    var contenedorCombo = document.getElementById("combo");

    if (contenedorCheck != null)
        deleteTreeElements(contenedorCheck, true);
    if (contenedorCombo != null)
        deleteTreeElements(contenedorCombo, true);

    if (tipo == 0) {
        contenedorCheck = createElement("div", null, "check", null, null, null, null, null, null, null);
        contenedorCheck.appendChild(createElement("button", "btn btn-outline-info", "btnSeleccionar", null, "Seleccionar/Desseleccionar", "todos()", null, null, null, null));

        let filtradosUnicos = filtrar(tipo, filtrados);
        for (let index = 0; index < filtradosUnicos.length; index++) {
            contenedorCheck.appendChild(crearCheck(index, filtradosUnicos[index]));
        }
        contenedor.appendChild(contenedorCheck);
        todosMarcados = false;
        todos();
    } else if (tipo == 1) {
        contenedorCombo = createElement("div", null, "combo", null, null, null, null, null, null, null);
        let filtradosUnicos = filtrar(tipo, filtrados);

        let combo = createElement("select", "custom-select", "comboPaises", null, null, null, null, null, null, null);
        for (let index = 0; index < filtradosUnicos.length; index++) {
            combo.appendChild(createElement("option", null, null, null, filtradosUnicos[index], null, filtradosUnicos[index], null, null, null));
        }
        contenedorCombo.appendChild(combo);
        contenedor.appendChild(contenedorCombo);
    }
    buscarMarcados();
}

function filtrar(tipo, arrayFiltrar) {
    var listaAux = [];

    if (tipo == 0) {
        for (let index = 0; index < arrayFiltrar.length; index++) {
            let ciclo = arrayFiltrar[index].ciclo;
            if (listaAux.indexOf(ciclo) === -1)
                listaAux.push(ciclo);
        }
    } else if (tipo == 1) {
        for (let index = 0; index < arrayFiltrar.length; index++) {
            let pais = arrayFiltrar[index].pais;
            if (listaAux.indexOf(pais) === -1)
                listaAux.push(pais);
        }
    } else if (tipo == 2) {
        for (let index = 0; index < arrayFiltrar.length; index++) {
            let ciudad = arrayFiltrar[index].ciudad;
            if (listaAux.indexOf(ciudad) === -1)
                listaAux.push(ciudad);
        }
    }
    return listaAux;
}

function buscarMarcados() {
    let tipoRadio = document.querySelector("input[name='tipo']:checked").value;
    elegidos = new Array();
    if (tipoRadio == 0) {
        let marcados = document.querySelectorAll("input[name='ciclo']:checked");
        for (let index = 0; index < marcados.length; index++) {
            let aux = marcados[index].nextElementSibling.textContent;
            filtrados.forEach(element => {
                if (element.ciclo == aux) {
                    existeLocalizacion(element);
                }
            });
        }
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

function existeLocalizacion(propuesto) {
    var encontrado = false;
    elegidos.forEach(element => {
        if (element.pais == propuesto.pais && element.ciudad == propuesto.ciudad) {
            element.ciclo += "<br/>" + propuesto.ciclo;
            encontrado = true;
        }
    });
    if (encontrado == false)
        elegidos.push(new movilidad(propuesto.tipo, propuesto.ciclo, propuesto.pais, propuesto.ciudad));
}
