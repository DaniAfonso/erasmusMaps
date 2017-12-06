var mapProp;
var map;
var limites;
var markers = [];
var retraso = 1000;
var retrasoActivo = true;
/**
 * Mapa de google, con el que se trabaja todo el tiempo.
 */
function myMap() {
    // Aplicamos el zoom que corresponda por el dispositivo utilizado
    var ajustes = mediaQ();
    // Propiedades del mapa, lo centrado que está, el zoom y el tipo
    mapProp = {
        center: new google.maps.LatLng(ajustes[1], ajustes[2]),
        zoom: ajustes[0],
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

}
/**
 * Elimina todos los objetos markers en el mapa.
 */
function clearOverlays() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;
}

/**
 * Crea un mapa con los marcadores de las ciudades con los ciclos elegidos.
 * @param {*} elegidos Array con los ciclos elegidos a mostrar
 */
function marcarBueno(elegidos) {
    clearOverlays();
    limites = new google.maps.LatLngBounds();
    contador = 0;
    for (var t = 0; t < elegidos.length; t++) {
        setTimeout(function () {
            geolocalizar(elegidos[t]);
        }, retraso * t);
    }

}
var contador = 0;

function geolocalizar() {
    var geocoder = new google.maps.Geocoder();
    var ciclo = elegidos[contador].ciclo;
    // Geocode devuelve la latitud y la longitud enviandole la ciudad y el pais.
    geocoder.geocode({
        address: elegidos[contador].ciudad + ", " + elegidos[contador].pais
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            // Posicion para colocar la marca.
            var posicionMarca = new google.maps.LatLng(
                results[0].geometry.location.lat(),
                results[0].geometry.location.lng()
            );
            // Marca que asignaremos al mapa.
            var marca = new google.maps.Marker({
                position: posicionMarca,
                animation: google.maps.Animation.BOUNCE,
                contentString: ciclo
            });
            // Agrega el listener para que al hacer click muestre el mensaje
            marca.addListener("click",
                function () {
                    // Ventana con la informacion
                    var infowindow = new google.maps.InfoWindow({
                        content: ciclo
                    });
                    // Asignado al map y marca
                    infowindow.open(map, marca);
                });
            // Agrega la marca al mapa
            marca.setMap(map);
            markers.push(marca);
            limites.extend(marca.position);
            map.fitBounds(limites);
        } else {
            console.log("Existe un problema con las peticiones de localizacion.");
            console.log(status);
        }
    })
    contador++;
}

function delay() {
    let botonDelay = document.getElementById("delay");
    if (retrasoActivo) {
        retrasoActivo = false;
        retraso = 0;
        botonDelay.textContent = "Activar"
    } else {
        retrasoActivo = true;
        retraso = 1000;
        botonDelay.textContent = "Desactivar"
    }
}

/**
 * Funcion que modifica el zoom dependiendo del dispositivo
 * que lo está utilizando
 */
function mediaQ() {
    var ajustes = [4, 47.8310667, 15.174334];
    if (Modernizr.mq('all and (max-width: 400px)')) {
        ajustes[0] = 3;
        ajustes[1] = 49.869000;
        ajustes[2] = 16.558000;
        document.getElementById("googleMap").style = "height:400px"
    } else if (Modernizr.mq('all and (max-width: 800px)')) {
        ajustes[0] = 4;
        document.getElementById("googleMap").style = "height:700px"
    }else {
        ajustes[0] = 4;
        document.getElementById("googleMap").style = "height:800px"
    }
    return ajustes;
}