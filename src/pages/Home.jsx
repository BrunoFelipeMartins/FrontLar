import "./Home.css";
import Menu from "./Menu";
import background from "../assets/background.jpg"; // Imagem importada

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${background})` }}>
      <header className="header">
        <h1 className="titulo">Projeto Lar</h1>
        <div className="menu">
            <a href="/" className="menu-item">Home</a>
            <a href="/Pessoas" className="menu-item">Pessoas</a>
        </div>
      </header>
      <div className="content">
        {/* Conteúdo adicional pode ser colocado aqui */}
      </div>
    </div>
  );
}

export default Home;
