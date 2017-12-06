/**
 * Objeto tipo movilidad, contiene todos sus atributos
 * @param {*} tipo 
 * @param {*} ciclo 
 * @param {*} pais 
 * @param {*} ciudad 
 */
function movilidad(tipo, ciclo, pais, ciudad)
{
    this.tipo = tipo;
    this.ciclo = ciclo;
    this.pais = pais;
    this.ciudad = ciudad;
}

/**
 * Objeto movilidad con todos sus atributos pero con latitud y longitud
 * @param {*} tipo 
 * @param {*} ciclo 
 * @param {*} pais 
 * @param {*} ciudad 
 * @param {*} latitud 
 * @param {*} longitud 
 */
function movilidadLocalizacion(tipo, ciclo, pais, ciudad, latitud, longitud)
{
    this.tipo = tipo;
    this.ciclo = ciclo;
    this.pais = pais;
    this.ciudad = ciudad;
    this.latitud = latitud;
    this.longitud = longitud;
}