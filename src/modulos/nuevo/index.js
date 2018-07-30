

import Handlebars from 'handlebars';
import { guid } from '../../utils';

import template from './template.html';

let mensaje = '';

let database;

export default (_database) => {
  database = _database;
  render();
};

const crearNuevoLibro = (e) => {

  e.preventDefault();

  const libro = {
    id: guid(),
    nombre: document.getElementById('nombre').value,
	autor: document.getElementById('autor').value,
    genero: document.getElementById('genero').value,
    puntuacion: document.getElementById('puntuacion').value,
  };
console.log(libro);
database.ref(`libros/${libro.id}`).set({
    nombre: libro.nombre,
	autor: libro.autor,
    genero: libro.genero,
    puntuacion: libro.puntuacion,
  })
  .then(() => {
    mensaje = 'Libro creado correctamente!';
    render();
  });

  return false;
};

const render = () => {
	const t = Handlebars.compile(template);
	document.getElementById('main').innerHTML = t({mensaje});
	document.getElementById('boton-nuevo').onclick = crearNuevoLibro;
}