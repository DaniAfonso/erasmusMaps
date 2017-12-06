var zoom = 4;

function mediaQ() {
    let query = Modernizr.mq('(min-width: 400px)');
    if (query) {
        console.log("Es mayor que ");
        zoom = 4;
    } else {
        console.log("Es menor que ")
        zoom = 6;
    }
}


/*
function myMap() {
    var map;
    var mapProp;
    mapProp = {
        center: new google.maps.LatLng(47.8310667, 15.174334),
        zoom: 4,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

function clearOverlays() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers.length = 0;
}
*/
function marcarBueno(elegidos) {
    /*
    markers.forEach(element => {
        element.setMap(null);
    });
*/
    mediaQ();
    let markers = [];
    // clearOverlays();

    let mapProp = {
        center: new google.maps.LatLng(47.8310667, 15.174334),
        zoom: zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    let map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    elegidos.forEach(element => {
        //Utiliza la api de google incluye el geocoder, pasandolo direccion devuelve latitud y logitud
        var geocoder = new google.maps.Geocoder();
        var string = element.ciudad + ", " + element.pais;
        var ciclo = element.ciclo;

        geocoder.geocode({
            address: string
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var myCenter = new google.maps.LatLng(
                    //Resultados asignados a myCenter
                    results[0].geometry.location.lat(),
                    results[0].geometry.location.lng()
                );
                //Nuevo marcador
                var marker = new google.maps.Marker({
                    //Posicion es myCenter
                    position: myCenter,
                    //Animacion
                    animation: google.maps.Animation.BOUNCE,
                    contentString: ciclo
                });

                //Añadir al mapa
                marker.setMap(map);

                marker.addListener("click", function () {
                    //Inforwindow para el marcador
                    var infowindow = new google.maps.InfoWindow({
                        content: ciclo
                    });
                    //Mensaje
                    infowindow.open(map, marker);
                });
                markers.push(marker);
            } else {
                //Algo mal
            }
            console.log(status);
        })
    })
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