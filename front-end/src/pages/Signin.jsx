import Header from "../components/Header";
import { useForm } from "react-hook-form";
import API from "../../api.js";

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await API.post("auth/login", data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <Header />
      <div>
        <h1>Se connecter</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email requis." })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          {/* Mot de passe */}
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Mot de passe requis." })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          <button type="submit">Se connecter</button>
        </form>

        <p>
          Vous n'avez pas de compte ? <a href="/signup">S'inscrire</a>
        </p>
      </div>
    </>
  );
}
