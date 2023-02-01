import { Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Card } from "react-bootstrap";

const CardsContainer = styled.div`
  display: flex;
  height: 75vh;
  align-items: center;
  justify-content: center;
`;

const CardHeader = styled.div`
  height: 30rem;
  background-color: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceText = styled.p`
  font-size: 3rem;
  color: #212529;
  text-shadow: 0.1rem 0.1rem 1rem rgba(0, 0, 0, 0.05);
`;

function ArticlePlans() {
  const [prices, setPrices] = useState<any[]>([]);

  const fetchPlans = async () => {
    const { data: response } = await axios.get(
      "http://localhost:8080/subs/prices"
    );

    setPrices(response.data);
  };

  const createSession = async (priceId: string) => {
    const { data: response } = await axios.post(
      "http://localhost:8080/subs/session",
      {
        priceId,
      }
    );

    window.location.href = response.url;
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <Container>
      <CardsContainer>
        {prices.map((price: any) => {
          return (
            <Card
              style={{ width: "18rem", height: "25rem", marginRight: "2rem" }}
            >
              <CardHeader>
                <PriceText>${price.unit_amount / 100}</PriceText>
              </CardHeader>
              <Card.Body>
                <Card.Title>{price.nickname}</Card.Title>
                <Button onClick={() => createSession(price.id)}>Buy Now</Button>
              </Card.Body>
            </Card>
          );
        })}
      </CardsContainer>
    </Container>
  );
}

export default ArticlePlans;
