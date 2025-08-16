import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseAuth, database } from "../services/SupabaseService";
import { useDispatch } from "react-redux";
import { setAuth } from "../store/authslice";
import Swal from "sweetalert2";
import $ from "jquery";
const useLogin = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ username: "", password: "" });
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    $("#overlay").show(); // Show loader
    supabaseAuth
      .signin(input.username, input.password)
      .then(({ user }) => {
        database
          .get("waba_accounts", { status: "active" })
          .then((data) => {
            dispatch(
              setAuth({
                user: user.email,
                waba_id: data[0]?.waba_id || "",
                app_id: data[0]?.app_id || "",
                app_secret: data[0]?.app_secret || "",
                access_token: data[0]?.access_token || "",
                verify_token: data[0]?.verify_token || "",
              })
            );
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: error.message,
              icon: "error",
            });
          });
        $("#overlay").hide();
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
        console.error("Login error:", error.message);
        $("#overlay").hide();
      });
  };

  const handleSignup = () => {
    $("#overlay").show(); // Show loader
    supabaseAuth
      .signup(input.username, input.password)
      .then(({ data }) => {
        $("#overlay").hide();
        Swal.fire({
          title: "Success!",
          text: `You are signed up successfully. Please verify your account via the ${data} email sent to you and then sign in.`,
          icon: "Success",
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
        console.error("Login error:", error.message);
        $("#overlay").hide();
      });
  };

  const handleInputChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFacebookLogin = () => {
    $("#overlay").show();
    supabaseAuth
      .signinWithFacebook()
      .then(({ data }) => {
        console.log("Login successful:", data);
        $("#overlay").hide();
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
        console.error("Login error:", error.message);
        $("#overlay").hide();
      });
  };

  const handleSignOut = () => {
    $("#overlay").show();
    supabaseAuth.signout();
    $("#overlay").hide();
    dispatch(setAuth({}));
    navigate("/", { replace: true });
  };

  return {
    input,
    handleInputChange,
    handleSignIn,
    handleSignup,
    handleFacebookLogin,
    handleSignOut,
  };
};
export default useLogin;
