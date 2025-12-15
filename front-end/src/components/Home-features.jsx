import { useEffect, useState } from "react";
import API from "../../api";
import ResultCard from "./Result-card";

export default function HomeFeatures() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function fetchLatestposts() {
      try {
        const now = new Date();
        const res = await API.get("/post/");
        const latestPosts = res.data
          .filter((p) => new Date(p.createdAt) <= now)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(latestPosts);
      } catch (error) {
        setPosts([]);
      }
    }
    fetchLatestposts();
  }, []);

  return (
    <div className="home-features">
      <h2>SportsMatch, c'est quoi ?</h2>
      <div className="home-features-container">
        <p>Trouver des personnes avec qui faire du sport autour de chez soi</p>
        <img src="/hero-img.png" alt="SportsMatch" />
      </div>
      <h2>Annonces récentes</h2>

      <div className="home-features-posts">
        {posts.map((p) => (
          <ResultCard
            key={p._id}
            svg={p.sport.iconeUrl}
            title={p.title}
            sport={p.sport.name}
            city={p.location.city}
            gender={p.gender}
          />
        ))}
        {/* <div className="home-features-sports-item">
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
        <div className="home-features-sports-item">
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
        </div>{" "}
        <div className="home-features-sports-item">
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
        </div>{" "}
        <div className="home-features-sports-item">
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
        </div>{" "}
        <div className="home-features-sports-item">
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
        </div>{" "}
        <div className="home-features-sports-item">
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
        </div> */}
      </div>
    </div>
  );
}
