var contenedor = document.getElementById("datos");
var arMaps = [];
var markers = [];

/// filtrar la lista por el tipo de movilidad ( GS GM o Profesorado)

/// Filtrar la lista y obtener los ciclos unicos

/// Utilizar la lista para escribir los checkboxes
var map = null;

var cargar = document.getElementById('Cargar');

cargar.addEventListener('click', filtrar, false);

function limpiar(){
    contenedor.innerHTML = '';
}
function filtrar() {
    contenedor.innerHTML = '';

    var tipoBusqueda = document.getElementById('tipoBusqueda');
    var tipoBusquedaValue = '';

    var tipoMovilidad = document.getElementById('tipoMovilidad');
    var tipoMovilidadValue = tipoMovilidad.value;
    var ar = []

    if (tipoBusqueda.checked) {
        tipoBusquedaValue = 'ciclo'
    } else {
        tipoBusquedaValue = 'pais'
    }
    if (tipoBusquedaValue == 'ciclo') {

        for (let i = 0; i < Erasmus.length; i++) {
            const element = Erasmus[i];
            if (element.tipo == tipoMovilidadValue) {
                if (ar.indexOf(element.ciclo) == -1) {
                    ar.push(element.ciclo);
                }
            }
        }
        for (let i = 0; i < ar.length; i++) {
            const element = ar[i];
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.className = "ciclos";
            checkbox.name = "ciclos";
            checkbox.value = element;
            var label = document.createElement('label')
            label.appendChild(document.createTextNode(element));

            contenedor.appendChild(checkbox);
            contenedor.appendChild(label);
            contenedor.appendChild(document.createElement("br"));
        }

    } else {

        for (let i = 0; i < Erasmus.length; i++) {
            const element = Erasmus[i];
            if (element.tipo == tipoMovilidadValue) {
                if (ar.indexOf(element.pais) == -1) {
                    ar.push(element.pais);
                }
            }
        }
        var select = document.createElement('select');
        select.id = 'pais';
        select.className = 'custom-select ciclos'
        contenedor.appendChild(select);
        for (let i = 0; i < ar.length; i++) {
            const element = ar[i];
            var opcion = document.createElement('option');
            opcion.value = element;
            opcion.innerText = element;
            select.appendChild(opcion);
        }
    }
    arMaps = ar;


}

var agregarMaps = document.getElementById('BuscarMaps');

agregarMaps.addEventListener('click', agregar, false);

function agregar() {
    for (let i = 0; i < markers.length; i++) {
        const element = markers[i];

        element.setMap(null);
        
    }
    var tipoBusqueda = document.getElementById('tipoBusqueda');
    var tipoBusquedaValue = '';

    var tipoMovilidad = document.getElementById('tipoMovilidad');
    var tipoMovilidadValue = tipoMovilidad.value;
    var ar = []

    if (tipoBusqueda.checked) {
        tipoBusquedaValue = 'ciclo'
    } else {
        tipoBusquedaValue = 'pais'
    }
    if (tipoBusquedaValue == 'ciclo') {
        var checked = document.querySelectorAll("input[name='ciclos']:checked");
        console.log(checked);

        for (let i = 0; i < Erasmus.length; i++) {
            const element = Erasmus[i];
            if (element.tipo == tipoMovilidadValue) {
                for (let i = 0; i < checked.length; i++) {
                    const ciclo = checked[i].value;
                    if (element.ciclo == ciclo) {
                        ar.push(element);

                    }
                }
            }

        }

    } else {
        var pais = document.getElementById('pais')
        console.log(pais.value)
        for (let i = 0; i < Erasmus.length; i++) {
            const element = Erasmus[i];
            if (element.tipo == tipoMovilidadValue && element.pais == pais.value) {
                ar.push(element);
            }

        }

    }

    for (let i = 0; i < ar.length; i++) {
        const element = ar[i];
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            "address": element.ciudad+', '+element.pais
        }, function (results) {
            console.log(element.ciudad+', '+element.pais);
            var myCenter = new google.maps.LatLng(results[0].geometry.location.lat(),results[0].geometry.location.lng());
            var marker = new google.maps.Marker({position:myCenter,
                animation:google.maps.Animation.BOUNCE});
                marker.addListener('click',mostrar);
            marker.setMap(map);
            markers.push(marker);
            
        });
    }
}

function mostrar(){
    alert('Hola');
}

function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(48.0246288, 13.2086173, 16),
        zoom: 4,
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

