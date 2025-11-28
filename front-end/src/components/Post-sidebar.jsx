import MessageAnswerIcon from "../icon/message-answer";
import BookmarkIcon from "../icon/bookmark";

export default function PostSidebar() {
  return (
    <div className="post-sidebar">
      <div className="user-card">
        <img src="https://placehold.co/60x60" alt="User" />
        <div className="user-card-content">
          <span>Cachou64</span>
          <p>Inscite depuis 2013</p>
          <a href="#">Voir le profil</a>
        </div>
      </div>

      <button type="button">
        <span>Contacter Cachou64</span>
        <MessageAnswerIcon />
      </button>

      <button type="button">
        <span>Ajouter aux favoris</span>
        <BookmarkIcon />
      </button>
    </div>
  );
}