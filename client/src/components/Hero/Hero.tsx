import styled from "styled-components";
import { Container } from "react-bootstrap";

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
  width: 32.5rem;
`;

const Heading = styled.h1`
  font-size: 5rem;
`

export default function Hero() {
  return <HeroComponent>
    <Container>
      <HeaderContainer>
        <Heading>
          Feed your mine with the best
        </Heading>
      </HeaderContainer>
    </Container>
  </HeroComponent>;
}
