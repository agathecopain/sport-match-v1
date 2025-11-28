import MessageAnswerIcon from "../icon/message-answer";
import Header from "../components/Header";
import ResultCard from "../components/Result-card";

export default function UserPage() {
  return (
    <>
      <Header />
      <div className="user-header">
        <div>
          <img src="https://placehold.co/100x100" alt="User" />
        </div>
        <div className="user-header-content">
          <h1>Cachou64</h1>
          <p>Compte créé en 2013</p>

          <button type="button">
            <span>Contacter Cachou64</span>
            <MessageAnswerIcon />
          </button>
        </div>
      </div>

      {/* Si moi */}
      <div className="user-posts">
        <h2>Mes favoris</h2>
        <div className="result-cards">
          <ResultCard />
          <ResultCard />
        </div>
      </div>

      <div className="user-posts">
        <h2>Annonces créées</h2>
        <div className="result-cards">
          <ResultCard />
          <ResultCard />
        </div>
      </div>
    </>
  );
}