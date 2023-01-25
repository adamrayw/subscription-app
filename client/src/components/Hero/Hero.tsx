import styled from "styled-components";
import { Container, Stack } from "react-bootstrap";
import ModalComponent from "../Modal/Modal";

const HeroComponent = styled.header`
  padding: 5rem 0;
  height: 60vh;
  background-image: url("https://images.unsplash.com/photo-1672862817339-51ef2610a5d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1209&q=80");
  background-size: cover;
  background-position: center;
`;

const HeaderContainer = styled.div`
  background-color: rgb(5 , 148, 112);
  padding: 3rem;
  color: white;
  width: 26.5rem;
`;

const Heading = styled.h1`
  font-size: 3rem;
`

const SubHeading = styled.h3`
  font-size: 1.5rem;
  margin: 1rem 0;
  font-weight: 400;
`

export default function Hero() {
  return <HeroComponent>
    <Container>
      <HeaderContainer>
        <Heading>
          Feed your mind with the best
        </Heading>
        <SubHeading>
          Grow, learn, and become more successful by reading some of the top article by highly reputable individuals
        </SubHeading>
        <Stack direction="horizontal" gap={3}>
          <ModalComponent text="Login" variant="primary" isSignUpFlow={false} />
          <ModalComponent text="Signup" variant="secondary" isSignUpFlow={true}/>
        </Stack>
      </HeaderContainer>
    </Container>
  </HeroComponent>;
}
