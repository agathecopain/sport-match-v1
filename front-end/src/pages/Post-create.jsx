import Header from "../components/Header";

export default function SignInPage() {
  return (
    <>
      <Header />
      <div>
        <h1>Créer une annonce</h1>
        <form>
          <div>
            <label htmlFor="title">Titre</label>
            <input type="text" id="title" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea id="description" />
          </div>
          <div>
            <label htmlFor="sport">Sport</label>
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
            <label htmlFor="address">Adresse</label>
            <input type="text" id="address" />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input type="date" id="date" />
          </div>
          <div>
            <label htmlFor="time">Heure</label>
            <input type="time" id="time" />
          </div>
          <div>
            <label htmlFor="with">Avec qui</label>
            <select id="with">
              <option value="male">Homme</option>
              <option value="female">Femme</option>
              <option value="both">Les deux</option>
            </select>
          </div>
          <button type="submit">Créer une annonce</button>
        </form>
      </div>
    </>
  );
}