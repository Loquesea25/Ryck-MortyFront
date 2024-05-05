/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useEffect, useState, useRef } from "react";
import Personaje from "./Personaje";

function Paginado(props) {
  const topRef = useRef(null);

  useEffect(() => {
    if (topRef.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [props.pagina]);

  return (
    <header ref={topRef} className="d-flex justify-content-between">
      <div>
        <button onClick={() => props.setPagina(props.pagina - 1)} disabled={props.pagina === 1}>
          Anterior
        </button>
      </div>
      <div>
        <p>Página: {props.pagina}</p>
      </div>
      <div>
        <button onClick={() => props.setPagina(props.pagina + 1)}>
          Siguiente
        </button>
      </div>
    </header>
  );
}

function ListaDEPersonajes() {
  const [personajes, setPersonajes] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    async function getAPI() {
      const consultaBackend = await fetch(
        `https://rickandmortyapi.com/api/character?page=${pagina}`
      );
      const consultaBackendJson = await consultaBackend.json();
      setPersonajes(consultaBackendJson.results);
    }

    getAPI();
  }, [pagina]);

  const handleBusqueda = (e) => {
    setBusqueda(e.target.value);
  };

  const personajesFiltrados = personajes.filter(personaje => {
    return personaje.name.toLowerCase().includes(busqueda.toLowerCase());
  });

  return (
    <div className="container" >
      <Paginado pagina={pagina} setPagina={setPagina}></Paginado>
      <input
        type="search"
        className="form-control input-busqueda" // Aquí asignamos tu clase de estilos
        placeholder="Buscar personaje"
        value={busqueda}
        onChange={handleBusqueda}
        aria-label="Buscar personaje"
        aria-describedby="search-addon"
      />
      

      <div className="row">
        {personajesFiltrados.map((personaje) => {
          return (
            <div className="col-md-4" key={personaje.id}>
              <Personaje personaje={personaje} />
            </div>
          );
        })}
      </div>
      <Paginado pagina={pagina} setPagina={setPagina}></Paginado>
    </div>
  );
}

export default ListaDEPersonajes;
