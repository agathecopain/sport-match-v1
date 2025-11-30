import React from "react";

export default function EmailResendVerifPage() {
  function EmailResendVerifForm() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
      try {
        await API.post("/resend-verification", data);
      } catch (error) {
        console.log(error.message);
      }
    };
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <button type="submit">Renvoyer le lien</button>
        </div>
      </form>
    </>
  );
}
