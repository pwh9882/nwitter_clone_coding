import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "FirebaseApp";
import React, { useState } from "react";

const Auth = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const onChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };
  const [newAcount, setNewAcount] = useState(true);
  const [error, setError] = useState();
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const onChange = (event) => {
  //     console.log(event.target.name);
  //     const {
  //       target: { name, value },
  //     } = event;
  //     if (name === "email") setEmail(value);
  //     else if (name === "password") setPassword(value);
  //   };
  const onSubmit = async (event) => {
    // console.log(11);
    event.preventDefault();
    let data;
    try {
      if (newAcount) {
        data = await createUserWithEmailAndPassword(
          authService,
          form.email,
          form.password
        );
      } else {
        data = await signInWithEmailAndPassword(
          authService,
          form.email,
          form.password
        );
      }
      //   console.log(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  const toggleAcount = () => {
    setNewAcount((prev) => !prev);
  };
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    console.log(name);
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    }
    if (name === "github") {
      provider = new GithubAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };

  return (
    <div>
      <h1>AUTH</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          name="email"
          type={"email"}
          placeholder={"email"}
          value={form.email}
          required
        />
        <input
          onChange={onChange}
          name="password"
          type={"password"}
          placeholder={"password"}
          value={form.password}
          required
        />
        <input
          type={"submit"}
          value={newAcount ? "Create Account" : "Sign in"}
        />
        <span>{error}</span>
      </form>
      <span onClick={toggleAcount}>
        {newAcount ? "Create Account" : "Sign in"}
      </span>

      <div>
        <button onClick={onSocialClick} name="google">
          Continue with Google
        </button>
        <button onClick={onSocialClick} name="github">
          Continue with Github
        </button>
      </div>
    </div>
  );
};
export default Auth;
