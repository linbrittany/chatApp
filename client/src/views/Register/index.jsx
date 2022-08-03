import { Page, PageContainer, Request, Title } from "../../GlobalStyles";
import { Button, Input, Label, Wrapper, Error } from "./styles";
import { useForm } from "react-hook-form";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../contexts/UserContext";
import { useState } from "react";
import { userService } from "../../services/index";
import { useNavigate } from "react-router-dom";

const EMAIL_PATTERN = /^$|^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;

const Register = () => {
  const { register, formState: {errors}, handleSubmit, getValues} = useForm();
  const [error, setError] = useState(false);
  let auth = useAuth();
  let navigate = useNavigate();

  const onSubmit = (data) => {
    setError(false);
    console.log(data)
    userService.register({
      username: data.username,
      email: data.email,
      password: data.password
    }).then((result) => {
      console.log(result)
      if (result.failure) {
        setError(true)
      } else {
        auth.login(result.data) 
        navigate('/')
      }
    })
    // userService
    //   .register({
    //     username: username,
    //     email: email,
    //     password: password
    //   })
    //   .then((result) => {
    //     if (result.hasFailed()) {
    //       setError(true)
    //     } else {
    //       authService
    //         .login(email, password)
    //         .then((result) => {
    //           if (result.hasFailed()) {
    //             navigate('/')
    //           } else {
    //             auth.login(result.getData())
    //             navigate('/')
    //           }
    //         })
    //     }
    //   })
  }

  return (
    <Page>
      <Navbar/>
      <PageContainer>
        <Wrapper onSubmit={handleSubmit(onSubmit)}>
          <Title>Register</Title>
          {error && <Error>This email has already been registered</Error>}
          <Label>Username</Label>
          <Input type="text" {...register(
                          "username",
                          {
                            required: {
                              value: true,
                              message: "This field is required"
                            }
                          })
                      }/>
          {errors.username && <Error>{errors.username.message}</Error>}
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
                            },
                            minLength: {
                              value: 8,
                              message: "Password must be at least 8 characters"
                            }
                          })
                      }/>
          {errors.password && <Error>{errors.password.message}</Error>}
          <Label>Confirm Password</Label>
          <Input type="password" {...register(
                          "confirmPass",
                          {
                            required: {
                              value: true,
                              message: "This field is required"
                            },
                            validate: value => value === getValues("password") || "Passwords do not match"
                          })
                      }/>
          {errors.confirmPass && <Error>{errors.confirmPass.message}</Error>}
          <Button>Register</Button>
          <Request>
            <p>Already have an account? </p>
            <button>Login</button>
          </Request>
        </Wrapper>
      </PageContainer>
    </Page>
  );
};

Register.propTypes = {};

export default Register;