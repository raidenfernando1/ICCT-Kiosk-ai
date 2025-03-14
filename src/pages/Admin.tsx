import React, { useState } from "react";
import styled from "styled-components";
import { supabaseLogin } from "../hooks/useSupabase";
import { useAuth } from "../context/useAuth";
import Navbar from "../components/Navbar";
import CMSPage from "./CMS";
import Spider from "../../public/spider.svg?react";

const Container = {
  Main: styled.main`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  Top: styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > :first-child {
      height: 100%;
      width: 40%;
    }

    > :last-child {
      width: clamp(200px, 30vh, 400px);
      height: clamp(200px, 30vh, 400px);
      object-fit: cover;
    }
  `,
};

const Login = {
  Container: styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;

    > p {
      font-size: 1.2rem;
    }

    > input {
      font-size: 1.2rem;
      border: 1px solid rgb(55, 55, 55);
      background: rgb(20, 20, 20);
      padding: 5px;
      color: inherit;
      outline: none;
      border-radius: 5px;
    }
  `,
  Buttons: styled.div`
    display: flex;
    gap: 30px;

    > button {
      width: 50%;
      font-size: 1.2rem;
      border: 1px solid rgb(55, 55, 55);
      background: rgb(20, 20, 20);
      padding: 5px;
      color: inherit;
      outline: none;
      border-radius: 5px;
      cursor: pointer;
    }
  `,
};

const Section = {
  Container: styled.main`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    padding-block: 20px;
    border-top: 1px solid rgb(55, 55, 55);

    > svg {
      animation: spin 100s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,

  Footer: styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
    border: 1px solid red;
  `,
  ContactMe: styled.div`
    margin-top: 10px;
  `,
};

const AdminPage: React.FC = () => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState<string>("");
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = loginDetails;

    try {
      const loginResult = await supabaseLogin(email, password);

      if (loginResult) {
        setIsAuthenticated(true);
        setLoginError("");
      } else {
        setLoginError("Invalid credentials");
      }
    } catch (error) {
      setLoginError("An error occurred during login");
      console.error(error);
    }
  };

  const handleReset = () => {
    setLoginDetails({ email: "", password: "" });
    setLoginError("");
  };

  if (isAuthenticated) {
    return <CMSPage />;
  }

  return (
    <Container.Main>
      <Navbar />
      <Container.Top>
        <Login.Container onSubmit={handleSubmit} autoComplete="off">
          <p>ADMIN LOGIN</p>

          {loginError && <p style={{ color: "red" }}>{loginError}</p>}

          <input
            type="text"
            placeholder="Login"
            value={loginDetails.email}
            onChange={(e) =>
              setLoginDetails((prev) => ({ ...prev, email: e.target.value }))
            }
            required
            autoComplete="off"
          />

          <input
            type="password"
            placeholder="Enter password"
            value={loginDetails.password}
            onChange={(e) =>
              setLoginDetails((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            required
            autoComplete="off"
          />

          <Login.Buttons>
            <button type="submit">Submit</button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </Login.Buttons>
        </Login.Container>

        <img src="icct-logo.png" alt="ICCT Logo" />
      </Container.Top>

      <Section.Container>
        <div>
          <p>Unauthorized access is strictly prohibited.</p>
          <p>
            Only authorized personnel are permitted to access this system.
            Activities are logged and monitored to ensure security and
            compliance.
          </p>
          <p>
            By proceeding, you acknowledge that any unauthorized attempts will
            be reported to the system administrator.
          </p>
          <br />
          <p>Need an admin account?</p>
          <p>
            Contact this email: <span>raidenfernando2@gmail.com</span>
          </p>
        </div>
      </Section.Container>
    </Container.Main>
  );
};

export default AdminPage;
