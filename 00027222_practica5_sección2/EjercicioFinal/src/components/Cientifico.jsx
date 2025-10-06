function Cientifico({ nombre, profesion, premios, descubrimiento }) {
    return (
        <div className="cientifico-card">
            <h3>{nombre}</h3>
            <p><strong>Profesión:</strong> {profesion}</p>
            <p><strong>Premios:</strong> {premios}</p>
            <p><strong>Descubrió:</strong> {descubrimiento}</p>
        </div>
    );
}

export default Cientifico;