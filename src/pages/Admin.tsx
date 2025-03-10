import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { supabaseLogin } from "../hooks/useSupabase";
import { useAuth } from "../context/useAuth";
import Navbar from "../components/Navbar";
import CMSPage from "./CMS";

const MainContainer = {
  Container: styled.main`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,
  TopContent: styled.div`
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

const LoginContainer = {
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
  ButtonWrapper: styled.div`
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

const SectionContainer = {
  Container: styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    padding-block: 20px;
    border-top: 1px solid rgb(55, 55, 55);
  `,
  Content: styled.div``,
  Footer: styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30px;
  `,
  ContactMe: styled.div``,
};

// Main Component
const AdminPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginError, setLoginError] = useState<string>("");
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      setLoginError(""); // Clear any previous error
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const loginResult = await supabaseLogin(email, password);

      if (loginResult) {
        setIsAuthenticated(true);
      } else {
        setLoginError("Invalid credentials");
      }
    } catch (error) {
      setLoginError("An error occurred during login");
      console.error(error);
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setLoginError("");
  };

  if (isAuthenticated) {
    return <CMSPage />;
  }

  return (
    <>
      <Navbar />
      <MainContainer.Container>
        <MainContainer.TopContent>
          <LoginContainer.Container onSubmit={handleSubmit}>
            <p>ADMIN LOGIN</p>

            {loginError && <p style={{ color: "red" }}>{loginError}</p>}

            <input
              type="text"
              placeholder="Login"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <LoginContainer.ButtonWrapper>
              <button type="submit">Submit</button>
              <button type="button" onClick={handleReset}>
                Reset
              </button>
            </LoginContainer.ButtonWrapper>
          </LoginContainer.Container>

          <img src="icct-logo.png" alt="ICCT Logo" />
        </MainContainer.TopContent>

        <SectionContainer.Container>
          <SectionContainer.Content>
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
          </SectionContainer.Content>

          <SectionContainer.Footer>
            <SectionContainer.ContactMe>
              <p>Need an admin account?</p>
              <p>
                Contact this email: <span>raidenfernando2@gmail.com</span>
              </p>
            </SectionContainer.ContactMe>
          </SectionContainer.Footer>
        </SectionContainer.Container>
      </MainContainer.Container>
    </>
  );
};

export default AdminPage;
