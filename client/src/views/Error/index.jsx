import Navbar from "../../components/Navbar";
import { Button, Page, PageContainer } from "../../GlobalStyles";
import errorLogo from "../../assets/images/error.png"
import { useNavigate } from "react-router-dom";
import { STATUS } from "../../assets/constants";
import { getQuery, useQuery } from "../../hooks/useQuery";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Image = styled.img`
  width: 20%;
  margin-bottom: 1em;
`;

const Title = styled.h1`
  color: var(--primary);
  font-weight: bolder;
  margin-top: 30px;
  font-size: var(--fontExtraLarge);
`;

const Error = () => {
  const [loading, setLoading] = useState(true);
    let navigate = useNavigate();
    let query = useQuery();
    let errorStatus = getQuery(query, "code", STATUS.PAGE_NOT_FOUND);

    useEffect(() => {
        if (errorStatus === STATUS.PAGE_NOT_FOUND) navigate('/404');
        setLoading(false);
    }, []);

  return (
    <Page>
      <Navbar/>
      <PageContainer>
        {!loading && <>
          <Title>Error {errorStatus}</Title>
          <Image src={errorLogo} alt="404 logo"/>
          <Button onClick={() => navigate('/')}>Back to home</Button>
        </>}
      </PageContainer>
    </Page>
  )
}

export default Error;