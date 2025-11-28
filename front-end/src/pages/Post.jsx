import InformationIcon from "../icon/information";
import LocationIcon from "../icon/location";
import Header from "../components/Header";
import PostSidebar from "../components/Post-sidebar";

export default function PostPage() {
  return (
    <>
      <Header />
      <div className="post-header">
        <div className="sport-icon">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2_68)">
              <path
                d="M30 5C16.2 5 5 16.2 5 30C5 43.8 16.2 55 30 55C43.8 55 55 43.8 55 30C55 16.2 43.8 5 30 5ZM14.025 41.95C11.5 38.625 10 34.5 10 30C10 25.5 11.5 21.375 14.025 18.05C17.65 20.775 20 25.125 20 30C20 34.875 17.65 39.225 14.025 41.95ZM30 50C25.275 50 20.925 48.35 17.5 45.6C22.075 41.925 25 36.325 25 30C25 23.675 22.075 18.075 17.5 14.4C20.925 11.65 25.275 10 30 10C34.725 10 39.075 11.65 42.5 14.4C37.925 18.075 35 23.675 35 30C35 36.325 37.925 41.925 42.5 45.6C39.075 48.35 34.725 50 30 50ZM45.975 41.95C42.35 39.225 40 34.875 40 30C40 25.125 42.35 20.775 45.975 18.05C48.5 21.375 50 25.5 50 30C50 34.5 48.5 38.625 45.975 41.95Z"
                fill="#323232"
              />
            </g>
            <defs>
              <clipPath id="clip0_2_68">
                <rect width="60" height="60" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="post-header-content">
          <h1>Match le 13/12/2025 à 15:00</h1>
          <p className="post-header-text">
            <i>⚽</i>
            <span>Football</span>
          </p>
          <p className="post-header-text">
            <i>📍</i>
            <span>Anglet</span>
          </p>
          <p className="post-header-text">
            <i>👩</i>
            <span>Femmes</span>
          </p>
        </div>
      </div>
      <div className="post-content">
        <div className="post-description">
          <div className="post-subtitle">
            <InformationIcon />
            <h2>Description</h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>

        {/* Mobile only */}
        <PostSidebar />

        <div className="post-location">
          <div className="post-subtitle">
            <LocationIcon />
            <h2>Emplacement</h2>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2894.6856067518183!2d-1.5163236731927152!3d43.48803111309695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5141001829cb75%3A0x4289d035b22372f1!2sStade%20Choisy!5e0!3m2!1sfr!2sfr!4v1764018591943!5m2!1sfr!2sfr"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Desktop only */}
      <PostSidebar />
    </>
  );
}