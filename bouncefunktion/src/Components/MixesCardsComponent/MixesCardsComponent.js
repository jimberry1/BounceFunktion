import MixesCard from './MixesCard/MixesCard';
import './MixesCardsComponent.css';
import { Container } from 'react-bootstrap';

const MixesCardsComponent = (props) => {
  let results = null;

  if (props.mixes) {
    results = props.mixes.map((mix) => {
      return (
        <MixesCard
          key={mix.id}
          musicLink={mix.data.musicLink}
          title={mix.data.title}
          description={mix.data.description}
          style={{ padding: '50px' }}
          theme={props.theme}
          exploreMoreLink={mix.data.exploreMoreLink}
        />
      );
    });
  }

  return (
    <Container className="mixesCardsComponent__container">{results}</Container>
  );
};

export default MixesCardsComponent;
