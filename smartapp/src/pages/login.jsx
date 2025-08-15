import loginImg from "../assets/login.png";
import logoImg from "../assets/logo.png";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const {
    input,
    handleInputChange,
    handleSignIn,
    handleSignup,
    handleFacebookLogin,
  } = useLogin();

  return (
    <div className="container">
      {/* Login Panel */}
      <div className="login-panel">
        <div
          className="app-header"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <img src={logoImg} alt="SmartChat Logo" style={{ height: "80px" }} />
          <span
            style={{ fontSize: "2rem", fontWeight: "bold", color: "#2a2a2a" }}
          >
            SmartChat
          </span>
        </div>
        <form className="login-form">
          <input
            type="email"
            name="username"
            value={input.username}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          <div className="d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-primary btn-login"
              onClick={handleSignIn}
            >
              Sign in
            </button>
            <button
              type="button"
              className="btn btn-outline-primary btn-login"
              onClick={handleSignup}
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="login-extra">
          <a href="#">Forgot password?</a>
        </div>
        {/* Divider with center text "or" */}
        <div className="d-flex align-items-center">
          <hr className="flex-grow-1" />
          <span className="px-3 text-muted" style={{ fontWeight: 500 }}>
            or
          </span>
          <hr className="flex-grow-1" />
        </div>
        <div className="login-social">
          <button
            type="button"
            className="btn btn-primary btn-facebook"
            onClick={handleFacebookLogin}
          >
            <span className="fab fa-facebook mr-3" />
            Log in with Facebook
          </button>
        </div>
      </div>
      {/* Illustration Panel */}
      <div className="illustration-panel">
        {/* Use an SVG/PNG or image that fits the illustrated people/devices style */}
        <img src={loginImg} alt="People Digital Illustration" />
      </div>
    </div>
  );
};

export default Login;
