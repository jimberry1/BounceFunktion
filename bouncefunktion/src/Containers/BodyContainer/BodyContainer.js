import React, { useState } from 'react';
import jumboData from './data.json';
import Jumbotron from '../../Components/BodyRowInfoDisplay/index';
import { Redirect } from 'react-router';

const BodyContainer = () => {
  const [redirectLink, setRedirectLink] = useState('');
  let redirect = null;

  if (redirectLink) {
    redirect = <Redirect to={redirectLink} />;
  }

  return (
    <Jumbotron.Container>
      {redirect}
      {jumboData.map((item) => (
        <Jumbotron
          key={item.id}
          direction={item.direction}
          onClick={() => setRedirectLink(item.redirectLink)}
        >
          <Jumbotron.Pane>
            <Jumbotron.Title>{item.title}</Jumbotron.Title>
            <Jumbotron.SubTitle>{item.subTitle}</Jumbotron.SubTitle>
          </Jumbotron.Pane>
          <Jumbotron.Pane>
            <Jumbotron.Image src={item.image} alt={item.alt} />
          </Jumbotron.Pane>
        </Jumbotron>
      ))}
    </Jumbotron.Container>
  );
};

export default BodyContainer;
