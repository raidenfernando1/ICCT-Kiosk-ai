import React, { useState } from "react";
import styled from "styled-components";
import { supabaseLogin } from "../hooks/useSupabase";
import { useAuth } from "../context/useAuth";

const Container = {
  Main: styled.main`
    height: 100%;
    display: flex;

    flex-direction: column;
    justify-content: space-between;
  `,
  Top: styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
};

const Login = {
  Container: styled.form`
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    > p {
      font-size: 1.2rem;
      margin-bottom: 10px;
      font-weight: bold;
    }

    > input {
      margin-bottom: 10px;
      font-size: 1.2rem;
      padding: 10px 20px;
      background: none;
      color: inherit;
      border: 1px solid var(--border-color);
      border-radius: 5px;
    }
  `,
  Buttons: styled.div`
    display: flex;
    gap: 20px;

    > button {
      width: 50%;
      padding: 10px 20px;
      border: 1px solid var(--border-color);
      border-radius: 5px;
      background: none;
      color: inherit;
      font-weight: bold;
      font-size: 1rem;
      text-align: left;
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

import { Navigate } from "react-router-dom";

const AdminPage: React.FC = () => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
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

  if (isAuthenticated) {
    return <Navigate to="/admin/cms" replace />;
  }

  return (
    <Container.Main>
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
              setLoginDetails((prev) => ({ ...prev, password: e.target.value }))
            }
            required
            autoComplete="off"
          />
          <Login.Buttons>
            <button type="submit">Submit</button>
            <button
              type="reset"
              onClick={() => setLoginDetails({ email: "", password: "" })}
            >
              Reset
            </button>
          </Login.Buttons>
        </Login.Container>
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
