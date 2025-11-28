export default function HomeSearch() {
    return (
      <div className="home-hero">
        <h1>Trouvez un sport autour de chez moi</h1>
        <div className="input-container">
          <div>
            <label htmlFor="address">
              <span>Mon adresse</span>
            </label>
            <input id="address" type="text" placeholder="Entrez votre adresse" />
          </div>
          <div>
            <label htmlFor="sport">
              <span>Mon sport</span>
            </label>
            <select id="sport">
              <option value="football">Football</option>
              <option value="basketball">Basketball</option>
              <option value="tennis">Tennis</option>
              <option value="paddle">Paddle</option>
              <option value="running">Running</option>
              <option value="cycling">Cycling</option>
            </select>
          </div>
        </div>
        <a href="/search">Rechercher</a>
      </div>
    );
  }