import { Page, PageContainer, Request, Title } from "../../GlobalStyles";
import { Button, Input, Label, Wrapper } from "./styles";
import { useForm } from "react-hook-form";
import Navbar from "../../components/Navbar";

const Register = () => {
  const { register, formState: {errors}, handleSubmit, getValues} = useForm();

  return (
    <Page>
      <Navbar/>
      <PageContainer>
        <Wrapper>
          <Title>Register</Title>
          <Label>Username</Label>
          <Input type="text"/>
          <Label>Email</Label>
          <Input type="text"/>
          <Label>Password</Label>
          <Input type="password"/>
          <Label>Confirm Password</Label>
          <Input type="password"/>
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