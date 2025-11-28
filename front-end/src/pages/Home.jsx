import HomeFeatures from "../components/Home-features";
import HomeSearch from "../components/Home-search";
import Header from "../components/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <HomeSearch />
      <HomeFeatures />
    </>
  );
}