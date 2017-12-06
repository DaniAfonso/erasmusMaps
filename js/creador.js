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
function crearCheck(indice, nombre)
{
    let check = createElement("div", null, null, null, null, null, null, null, null, null, null);
    check.appendChild(createElement("input", null, contador, "checkbox", null, null, null, null, null, null, "ciclo"));
    check.appendChild(createElement("label", null, null, null, nombre, null, indice, null, contador, null, null));
    contador++;
    return check;
}