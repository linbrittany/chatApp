import { Page, PageContainer, Request, Title, Button } from "../../GlobalStyles";
import { Input, Label, Wrapper, Error } from "./styles";
import { useForm } from "react-hook-form";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/UserContext";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuery, useQuery } from "../../hooks/useQuery";
import { authService } from "../../services";

const EMAIL_PATTERN = /^$|^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;

const Login = () => {
  const { register, formState: {errors}, handleSubmit} = useForm();
  const [error, setError] = useState(false);
  let auth = useAuth();
  let navigate = useNavigate();
  let query = useQuery();
  let errorStatus = getQuery(query, "code", undefined);

  useEffect(() => {
    errorStatus && auth.logout();
  }, []) 

  const onSubmit = (data) => {
    setError(false);
    authService
      .login(data.email, data.password)
      .then((result) => {
        if (result.failure) {
          setError(true)
        } else {
          auth.login(result.data)
          navigate('/')
        }
      })
  }

  return (
    <Page>
      <Navbar/>
      <PageContainer>
        <Wrapper onSubmit={handleSubmit(onSubmit)}>
          <Title>Login</Title>
          {error && <Error>Please enter valid credentials</Error>}
          {errorStatus && <Error>Please log in to access</Error>}
          <Label>Email</Label>
          <Input type="text" {...register(
                          "email",
                          {
                            required: {
                              value: true,
                              message: "This field is required"
                            },
                            pattern: {
                              value: EMAIL_PATTERN,
                              message: "Please enter a valid email address"
                            }
                          })
                      }/>
          {errors.email && <Error>{errors.email.message}</Error>}
          <Label>Password</Label>
          <Input type="password" {...register(
                          "password",
                          {
                            required: {
                              value: true,
                              message: "This field is required"
                            }
                          })
                      }/>
          {errors.password && <Error>{errors.password.message}</Error>}
          <Button>Login</Button>
          <Request>
            <p>Don't have an account yet? </p>
            <button onClick={() => navigate('/register')}>Sign up</button>
          </Request>
        </Wrapper>
      </PageContainer>
    </Page>
  );
};

Login.propTypes = {};

export default Login;