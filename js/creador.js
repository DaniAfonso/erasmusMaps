/**
 * Crea elementos de casi cualquier tipo, si recibe variables nulas, 
 * no las agrega y si no, las añade.
 * @param {*} elemento 
 * @param {*} clase 
 * @param {*} id 
 * @param {*} tipo 
 * @param {*} texto 
 * @param {*} click 
 * @param {*} value 
 * @param {*} inputT 
 * @param {*} forId 
 * @param {*} img 
 * @param {*} name 
 */
function createElement(elemento, clase, id, tipo, texto, click, value, inputT, forId, img, name)
{
    var ele = document.createElement(elemento);

    if(clase != null)
        ele.setAttribute("class", clase);
    if(id != null)
        ele.setAttribute("id", id);
    if(tipo != null)
        ele.setAttribute("type", tipo);
    if(texto != null)
        ele.appendChild(document.createTextNode(texto));
    if(click != null)
        ele.setAttribute('onclick', click);
    if(value != null)
        ele.setAttribute("value", value);
    if(inputT != null)
    {
        var input = document.createElement("input");
        input.setAttribute("type", inputT);
        input.setAttribute("min", "1");
        ele.appendChild(input);
    }
    if(forId != null)
        ele.setAttribute("for", forId);
    if(img != null)
        ele.setAttribute("src", img);
    if(name != null)
        ele.setAttribute("name", name);

    return ele;
}


var contador = 0;
/**
 * Creador de elementos tipo CheckBox.
 * @param {*} valor 
 * @param {*} nombre 
 */
function crearCheck(valor, nombre)
{
    let check = createElement("div", null, null, null, null, null, null, null, null, null, null);
    check.appendChild(createElement("input", null, contador, "checkbox", null, null, null, null, null, null, "ciclo"));
    check.appendChild(createElement("label", null, null, null, nombre, null, valor, null, contador, null, null));
    contador++;
    return check;
}