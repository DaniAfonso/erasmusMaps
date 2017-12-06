/**
 * Elimina un nodo con todos sus hijos
 * @param {*} node Nodo que se desea vaciar por completo
 * @param {*} selfRemove Si se quiere eliminar al nodo enviado o no
 */
function deleteTreeElements(node, selfRemove) {
	while (node.hasChildNodes())
		clear(node.firstChild);
	if (selfRemove)
		node.remove();
}
/**
 * Elimina nodos de forma recursiva
 * @param {*} node Nodo a eliminar
 */
function clear(node) {
	while (node.hasChildNodes())
		clear(node.firstChild);
	node.parentNode.removeChild(node);
}

/**
 * Marca o desmarca todos los check cada vez que se pulse
 */
function todos()
{
    let marcados = document.querySelectorAll("input[name='ciclo']");
    if(todosMarcados)
        todosMarcados = false;
    else
        todosMarcados = true;

    marcados.forEach(element => {
        element.checked = todosMarcados;
    });
}