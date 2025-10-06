import './App.css';
import Cientifico from './components/Cientifico';

function App() {
    const cientificos = [
        {
            nombre: 'Maria Skłodowska-Curie',
            profesion: 'física y química',
            premios: '4 (Premio Nobel de Física, Premio Nobel de Química, Medalla Davy, Medalla Matteucci)',
            descubrimiento: 'polonio (elemento químico)'
        },
        {
            nombre: 'Katsuko Saruhashi',
            profesion: 'geoquímica',
            premios: '2 (Premio Miyake de geoquímica, Premio Tanaka)',
            descubrimiento: 'un método para medir el dióxido de carbono en el agua de mar'
        }
    ];

    return (
        <div className="App">
            <header className="app-header">
                <h1>Científicos Notables</h1>
            </header>
            <main className="cientificos-grid">
                {cientificos.map((cientifico, index) => (
                    <Cientifico
                        key={index}
                        nombre={cientifico.nombre}
                        profesion={cientifico.profesion}
                        premios={cientifico.premios}
                        descubrimiento={cientifico.descubrimiento}
                    />
                ))}
            </main>
        </div>
    );
}

export default App;