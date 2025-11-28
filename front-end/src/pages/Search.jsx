import { useState } from "react";
import Header from "../components/Header";
import ResultCard from "../components/Result-card";

export default function SearchPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <Header />
      <h1>Recherche</h1>
      <div>
        <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span>Filtrer</span>
        </button>
        <div className={`filter-menu ${isMenuOpen ? "open" : ""}`}>
          <div className="filter-menu-header">
            <h2>Filtres</h2>{" "}
            <button type="button" onClick={() => setIsMenuOpen(false)}>
              x
            </button>
          </div>

          <div className="input-container">
            <div>
              <label htmlFor="address">
                <span>Mon adresse</span>
              </label>
              <input
                id="address"
                type="text"
                placeholder="Entrez votre adresse"
              />
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

            <div>
              <label htmlFor="with">
                <span>Avec qui</span>
              </label>
              <select id="with">
                <option value="male">Homme</option>
                <option value="female">Femme</option>
                <option value="both">Les deux</option>
              </select>
            </div>
          </div>

          {/* Mobile only */}
          <button type="submit">
            <span>Rechercher</span>
          </button>
        </div>

        {/* Mobile only */}
        <div className="active-filters">
          <button type="button">
            <span>Anglet</span> x
          </button>
          <button type="button">
            <span>Football</span> x
          </button>
          <button type="button">
            <span>Femme</span> x
          </button>
        </div>
      </div>

      <div className="search-results">
        <ResultCard />
        <ResultCard />
        <ResultCard />
      </div>
    </>
  );
}