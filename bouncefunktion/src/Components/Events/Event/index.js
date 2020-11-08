import React from 'react';
import {
  Container,
  Item,
  Inner,
  Text,
  //   Pane,
  //   Title,
  //   SubTitle,
  Image,
} from './styles/Event';

export default function Event({ children, ...restProps }) {
  return (
    <Item {...restProps}>
      <Inner>{children}</Inner>
    </Item>
  );
}

Event.Container = function EventContainer({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
};

Event.Text = function EventText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Event.Image = function EventImage({ children, ...restProps }) {
  return <Image {...restProps} />;
};
