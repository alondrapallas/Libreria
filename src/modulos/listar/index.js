
import Handlebars from 'handlebars';

import template from './template.html';

let database;

let libros = [];

export default (_database) => {
	database = _database;
	libros = [];
	listarLibros();
}


const Filtro = () => {
	const buscar = document. getElementById('txtBuscar').value;
	const ref=database.ref('/libros')
	
	ref.orderByChild('nombre').equalTo(buscar).on("value", mostrarDatos)
	
	function mostrarDatos(datos){
		const _content = "";
		datos.forEach(function(child){
			alert("Nombre: "+ child.val().nombre + " Autor: "+ child.val().autor + " Genero: " +
			child.val().genero + " Puntuacion: " + child.val().puntuacion);
		})	

	}	
}

		
const listarLibros = () => {
	const lista = database
					.ref('/libros')
					.once("value")
					.then((datos_libros) => {
						
						datos_libros.forEach((element) => {
							const datosLibro = element.val();
							datosLibro.id = element.key;
							libros.push(datosLibro);
						});
						
						render();
					});
}

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({ libros });
	document.getElementById('btnFiltro').addEventListener("click", Filtro);
	
}