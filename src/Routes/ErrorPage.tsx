import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IShow } from "../api";
import Header from "../Components/Header";
import Loading from "../Components/Loading";
import { makeImagePath } from "../utils";

export const ErrorWrapper = styled.div<{ bgPhoto: string }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgPhoto});
`;

export const ErrorContainer = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ErrorTitle = styled.h1`
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 20px;
`;

export const ErrorDesc = styled.span`
  font-size: 18px;
  text-align: center;
  display: flex;
  margin-bottom: 20px;
`;

export const ErrorButton = styled.div`
  border: 1px solid ${(props) => props.theme.white.darker};
  border-radius: 4px;
  color: ${(props) => props.theme.black.darker};
  background-color: ${(props) => props.theme.white.lighter};
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 80px;
  &:hover {
    background-color: ${(props) => props.theme.white.darker};
  }
  a {
    display: flex;
    width: 100%;
    height: 100%;
    padding: 8px 18px;
  }
`;

const ErrorCode = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 2px solid ${(props) => props.theme.red};
  padding: 7px 10px;
`;
const ErrorCodeHeader = styled.span`
  font-size: 20px;
  margin-right: 8px;
`;
const ErrorCodeStatus = styled.span`
  font-size: 20px;
  font-weight: 600;
`;

export interface IError {
  data?: string;
  internal?: boolean;
  status?: number;
  statusText?: string;
}

interface IErrorCode {
  errorCode?: string;
}

function ErrorPage(data: IErrorCode) {
  const error = useRouteError() as IError;

  const { data: errorData, isLoading: errorLoading } = useQuery<IShow>(
    ["movies", "error"],
    () => {
      return getMovies("349112");
    }
  );

  return (
    <>
      <Header />
      {errorLoading ? (
        <Loading />
      ) : (
        <ErrorWrapper bgPhoto={makeImagePath(errorData?.backdrop_path || "")}>
          <ErrorContainer>
            <ErrorTitle>Lost your Way?</ErrorTitle>
            <ErrorDesc>
              Sorry, we can't find that page. You'll find lots to explore on the
              home page.
            </ErrorDesc>

            <ErrorButton>
              <Link to="/">
                <span>Petflix Home</span>
              </Link>
            </ErrorButton>

            <ErrorCode>
              <ErrorCodeHeader>Error Code</ErrorCodeHeader>
              <ErrorCodeStatus>
                {data.errorCode || error.status}
              </ErrorCodeStatus>
            </ErrorCode>
          </ErrorContainer>
        </ErrorWrapper>
      )}
    </>
  );
}

export default ErrorPage;
