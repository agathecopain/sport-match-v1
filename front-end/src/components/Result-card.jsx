import InlineSVG from "./InlineSvg";

export default function ResultCard({
  svg,
  title,
  sport,
  city,
  gender,
  avatar,
  author,
}) {
  return (
    <div className="result-card">
      <div className="result-card-top">
        <div className="sport-icon">
          <InlineSVG url={svg} />
        </div>
        <div className="result-card-content">
          <h3>{title}</h3>
          <p className="result-card-text">
            <i>⚽</i>
            <span>{sport}</span>
          </p>

          <p className="result-card-text">
            <span>📍</span>
            <span>{city}</span>
          </p>

          <p className="result-card-text">
            <span>👩</span>
            <span>{gender}</span>
          </p>
        </div>
      </div>
      <div className="result-card-footer">
        <div className="result-card-user">
          <img src={avatar} alt="User" />
          <span>{author}</span>
        </div>
        <div className="result-card-user-actions">
          <button type="button" href="#">
            Voir plus
          </button>
          <button type="button" href="#">
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
}
