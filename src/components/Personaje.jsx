/* eslint-disable react/prop-types */


function Personaje({ personaje }) {
    const statusClass = personaje.status === 'Dead' ? 'text-danger' : '';
  
    return (
      <div className={`text-center p-5 ${statusClass}`}>
        <h2>Name: {personaje.name}</h2>
        <img className="img-fluid rounded" src={personaje.image} alt={personaje.name} />
        <p>Status: {personaje.status}</p>
        <p>Species: {personaje.species}</p>
        <p>Origin: {personaje.origin.name}</p>
        <p>Location: {personaje.location.name}</p>
      </div>
    );
  }
  
  export default Personaje;
  