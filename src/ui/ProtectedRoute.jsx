import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/hooks/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-gray-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuth } = useUser();

  // 2. If there is No authenticated user => redirect to login page
  useEffect(() => {
    if (!isAuth && !isLoading) navigate("/login");
  }, [isAuth, isLoading, navigate]);

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is a logged in user => render the app
  if (isAuth) return children;
}

export default ProtectedRoute;
