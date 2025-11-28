import Header from "../components/Header";

export default function SignInPage() {
  return (
    <>
      <Header />
      <div>
        <h1>Se connecter</h1>
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" />
          </div>
        </form>
        <button type="submit">Se connecter</button>
        <p>
          Vous n'avez pas de compte ? <a href="/signup">S'inscrire</a>
        </p>
      </div>
    </>
  );
}