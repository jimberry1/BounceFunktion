import styled from 'styled-components';

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  backgroundcolor: black;
  justify-content: space-between;
  // flex-direction: ${({ direction }) => direction};
  max-width: 1100px;
  margin: auto;
  width: 100%;
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 8px solid #222;
`;

export const Body = styled.div`
  width: 100%;
  @media (min-width: 600px) {
    padding: 25px;
  }
`;

export const Pane = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 8px;
`;

export const Icon = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  align-items: center;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 25px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const AdditionalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (min-width: 600px) {
    padding: 20px;
  }
`;

export const DescriptionInfo = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Item = styled.div`
  display: flex;
  border-bottom: 8px solid #222;
  padding: 50px 5%;
  overflow: hidden;
  text-align: center;
`;

export const Text = styled.p`
  flex: 1;
  padding: 10px;
`;

export const Title = styled.h1`
  font-size: 40px;
  flex: 1;
  text-align: center;
`;

export const Subtitle = styled.h3`
  font-size: 32px;
  text-align: center;
  border-bottom: 1px solid lightgray;
  width: 90%;
  margin: auto;
`;

export const Image = styled.img`
  max-width: 30%;
  border-radius: 100px;
  height: auto;
  border-radius: 10px;
`;

export const IconHolder = styled.div`
  display: flex;
  @media (max-width: 600px) {
    flex-direction: row;
    justify-content: center;
    padding: 10px;
  }
`;
