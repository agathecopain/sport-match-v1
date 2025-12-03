export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <a href="/">
          <span>SportsMatch</span>
        </a>
        {/* <div className="header-search">
          <input type="text" placeholder="Rechercher autour de chez moi" />
          <a className="btn" type="submit" href="/search">
            Rechercher
          </a>
        </div> */}
        <div className="auth-buttons" style={{ display: "flex", gap: "10px" }}>
          <a className="btn" href="/signin">
            Se connecter
          </a>
          <a className="btn" href="/signup">
            S'inscrire
          </a>
          <a className="post-create" href="/post-create">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e8eaed"
            >
              <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
