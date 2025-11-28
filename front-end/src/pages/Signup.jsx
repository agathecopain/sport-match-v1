import Header from "../components/Header";

export default function SignUpPage() {
  return (
    <>
      <Header />
      <div>
        <h1>S'inscrire</h1>
        <form>
          <div>
            <label htmlFor="username">Nom d'utilisateur</label>
            <input type="text" id="username" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input type="password" id="password" />
          </div>
          <div>
            <label htmlFor="password-confirm">Confirmer le mot de passe</label>
            <input type="password" id="password-confirm" />
          </div>
        </form>
        <button type="submit">S'inscrire</button>
        <p>
          Vous avez déjà un compte ? <a href="/signin">Se connecter</a>
        </p>
      </div>
    </>
  );
}