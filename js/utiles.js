function deleteTreeElements(node, selfRemove) {
	while (node.hasChildNodes())
		clear(node.firstChild);
	if (selfRemove)
		node.remove();
}
function clear(node) {
	while (node.hasChildNodes())
		clear(node.firstChild);
	node.parentNode.removeChild(node);
}

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