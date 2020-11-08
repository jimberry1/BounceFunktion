import styled from 'styled-components';

export const Inner = styled.div`
  display: flex;
  align-items: center;
  backgroundcolor: black;
  justify-content: space-between;
  flex-direction: ${({ direction }) => direction};
  max-width: 1100px;
  margin: auto;
  width: 100%;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const Container = styled.div``;

export const Item = styled.div`
  display: flex;
  border-bottom: 8px solid #222;
  padding: 50px 5%;
  overflow: hidden;
`;

export const Text = styled.p`
  color: blue;
`;

export const Image = styled.img`
  max-width: 30%;
  border-radius: 100px;
  height: auto;
  border-radius: 10px;
`;
