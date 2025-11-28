export default function Header() {
    return (
      <header className="header">
        <div className="header-container">
          <a href="/">
            <span>SportsMatch</span>
          </a>
          <div>
            <input type="text" placeholder="Rechercher autour de chez moi" />
            <a type="submit" href="/search">
              Rechercher
            </a>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <a href="/signin">Se connecter</a>
            <a href="/signup">S'inscrire</a>
            <a href="/post-create">Créer une annonce</a>
          </div>
        </div>
      </header>
    );
  }