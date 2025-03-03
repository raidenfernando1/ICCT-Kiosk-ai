import React from "react";
import styled from "styled-components";

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
  Divider: styled.div`
    padding-top: 1px;
    margin-block: 10px;
    width: 100%;
    background-color: rgb(55, 55, 55);
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
  `,
  InputFields: styled.input`
    font-size: 1.2rem;
    border: 1px solid rgb(55, 55, 55);
    background: rgb(20, 20, 20);
    padding: 5px;
    color: inherit;
    outline: none;
    border-radius: 5px;
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
  TechUsed: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
};

const AdminPage = () => {
  const Input: React.FC<{
    placeholder: string;
    type: "password" | "text";
  }> = ({ placeholder, type }) => {
    return <LoginContainer.InputFields type={type} placeholder={placeholder} />;
  };

  return (
    <MainContainer.Container>
      <MainContainer.TopContent>
        <LoginContainer.Container>
          <p>ADMIN LOGIN</p>
          <Input type="text" placeholder="Login" />
          <Input type="password" placeholder="Enter password" />
          <LoginContainer.ButtonWrapper>
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
          </LoginContainer.ButtonWrapper>
        </LoginContainer.Container>
        <img src="icct-logo.png" />
      </MainContainer.TopContent>
      {/* Footer */}
      <SectionContainer.Container>
        <SectionContainer.Content>
          <p>Unauthorized access is strictly prohibited.</p>
          <p>
            Only authorized personnel are permitted to access this system.
            Activities is logged and monitored to ensure security and
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
  );
};

export default AdminPage;
