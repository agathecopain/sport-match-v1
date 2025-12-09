import Header from "../components/Header";
import { useForm } from "react-hook-form";
import API from "../../api.js";
import { useState } from "react";


export default function SignUpPage() {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await API.post("auth/register", data);
      return setMessage("Un email de vérification a été envoyé.");
    } catch (error) {
      console.log(error.message);
      return setMessage(
        "Impossible de créer votre compte. Réessayez plus tard ou contactez le support."
      );
    }
  };
  return (
    <>
      <Header />
      <div className="auth-container">
        <h1>S'inscrire</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {/* Prénom */}
          <div className="form-group">
            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              id="firstName"
              {...register("firstName", { required: "Prénom requis." })}
            />
            {errors.firstName && <span>{errors.firstName.message}</span>}
          </div>

          {/* Nom */}
          <div className="form-group">
            <label htmlFor="lastName">Nom</label>
            <input
              type="text"
              id="lastName"
              {...register("lastName", { required: "Nom requis." })}
            />
            {errors.lastName && <span>{errors.lastName.message}</span>}
          </div>

          {/* Pseudo */}
          <div className="form-group">
            <label htmlFor="username">Pseudo</label>
            <input
              type="text"
              id="username"
              {...register("username", { required: "Pseudo requis." })}
            />
            {errors.username && <span>{errors.username.message}</span>}
          </div>

          {/* Genre */}
          <div className="form-group">
            <label htmlFor="gender">Genre</label>
            <select
              id="gender"
              {...register("gender", { required: "Genre requis." })}
            >
              <option value="femme">Femme</option>
              <option value="homme">Homme</option>
              <option value="autre">Autre</option>
            </select>
            {errors.gender && <span>{errors.gender.message}</span>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email requis." })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          {/* Mot de passe */}
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Mot de passe requis." })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>

          {/* Confirmation mot de passe */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Confirmation requise.",
              })}
            />
            {errors.confirmPassword && (
              <span>{errors.confirmPassword.message}</span>
            )}
          </div>

          <button className="btn" type="submit">S'inscrire</button>
        </form>

        <p>
          Vous avez déjà un compte ? <a href="/signin">Se connecter</a>
        </p>
        {message && <span>{message}</span>}
      </div>
    </>
  );
}
