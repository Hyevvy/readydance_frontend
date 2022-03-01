import { DiGithub } from "react-icons/di";
import { useNavigate } from "react-router-dom";
import MyFooter from "../components/MyFooter";
import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import { useContext } from "react";
import { LoginDispatchContext } from "../App";
import { LoginContext } from "../App";
import { useRef, useState } from "react";
import { POST } from "../shared/Request";

const btnStyle = {
  width: "160px",
  margin: "0 auto",
};

const SignIn = () => {
  const navigate = useNavigate();

  const login = useContext(LoginContext);
  const { r_login } = useContext(LoginDispatchContext);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const idRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = () => {
    if (id.length < 1) {
      idRef.current.focus();
      return;
    }
    if (password.length < 1) {
      passwordRef.current.focus();
      return;
    }

    POST("/api/user/Login", {
      USR_ID: id,
      USR_PASS: password,
      LOGIN_TYPE: "L",
    }).then((result) => {
      console.log(result);
      window.localStorage.setItem(
        "A_TOKEN",
        JSON.stringify(result.data.data.aToken)
      );
      window.localStorage.setItem(
        "R_TOKEN",
        JSON.stringify(result.data.data.rToken)
      );
      r_login(login);
      navigate("/", { replace: true });
    });
  };
  return (
    <div className="SignIn">
      <MyHeader />

      <section className="SignIn__innerSection">
        <h2>로그인</h2>
        <input
          value={id}
          ref={idRef}
          placeholder="아이디"
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="password"
          value={password}
          ref={passwordRef}
          placeholder="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
        />
        <MyButton
          text={"로그인 하기"}
          style={btnStyle}
          onClick={handleSubmit}
        />

        <div className="SignIn__toSignUp">
          <h5>아직 계정이 없으신가요? </h5>
          <MyButton
            style={{ marginLeft: "10px" }}
            text="계정 만들기 >"
            onClick={() => {
              navigate("/signup");
            }}
          />
        </div>
      </section>

      <MyFooter />
    </div>
  );
};
export default SignIn;
