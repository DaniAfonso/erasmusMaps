var mapProp;
var map;
var markers = [];
var retraso = 1000;
var retrasoActivo = true;
/**
 * Mapa de google, con el que se trabaja todo el tiempo.
 */
function myMap() {
    // Aplicamos el zoom que corresponda por el dispositivo utilizado
    var zoom = mediaQ();
    // Propiedades del mapa, lo centrado que está, el zoom y el tipo
    mapProp = {
        center: new google.maps.LatLng(47.8310667, 15.174334),
        zoom: zoom,
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
/*
function marcarBueno(elegidos) {
    clearOverlays();

    elegidos.forEach(element => {
        var geocoder = new google.maps.Geocoder();
        var ciclo = element.ciclo;
        // Geocode devuelve la latitud y la longitud enviandole la ciudad y el pais.
        geocoder.geocode({
            address: element.ciudad + ", " + element.pais
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
            } else {
                console.log("Existe un problema con las peticiones de localizacion.");
                console.log(status);
            }
        })
    })
}
*/

/**
 * Funcion que modifica el zoom dependiendo del dispositivo
 * que lo está utilizando
 */
function mediaQ() {
    let zoom = 4;
    let query = Modernizr.mq('(min-width: 400px)');
    if (query) {
        console.log("Es mayor que ");
        zoom = 4;
    } else {
        console.log("Es menor que ")
        zoom = 6;
    }
    return zoom;
}

/*
function obtenerPosicion(sitio) {
    var geocoder = new google.maps.Geocoder();
    var nuevoSitio;
    console.log(sitio);
    geocoder.geocode({
        'address': sitio.ciudad + ', ' + sitio.pais
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            alert(results[0].geometry.location.lat() + ", " + results[0].geometry.location.lng());
            
            nuevoSitio = new movilidadLocalizacion(sitio.tipo, sitio.ciclo, sitio.pais, sitio.ciudad,
                results[0].geometry.location.lat(), results[0].geometry.location.lng());
                
        }
        console.log(results);
        console.log(status);
        console.log(nuevoSitio);
        elegidos.push(nuevoSitio);
    });
}
function obtenerPosiciones() {
    var ubicacionElegidos = [];
    
    for (let index = 0; index < elegidos.length; index++) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'address': elegidos[index].ciudad + ', ' + elegidos[index].pais
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                alert(results[0].geometry.location.lat() + ", " + results[0].geometry.location.lng());
                ubicacionElegidos.push(new movilidadLocalizacion(elegidos[index].tipo, elegidos[index].ciclo,
                    elegidos[index].pais, elegidos[index].ciudad, results[0].geometry.location.lat(), results[0].geometry.location.lng()));
            }
            console.log(results);
            console.log(status);
        });
    }
    console.log(elegidos);
    console.log(ubicacionElegidos);
    alert("lo va a enviar");
    //marcar(ubicacionElegidos);
}
function marcar() {
    var infowindow = new google.maps.InfoWindow();
    var marker, i;
    for (i = 0; i < elegidos.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(elegidos[i][4], elegidos[i][5]),
            map: map
        });
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(elegidos[i][1]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}
*/