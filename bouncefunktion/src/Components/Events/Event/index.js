import React from 'react';
import { Avatar } from '@material-ui/core';
import {
  Container,
  Item,
  Inner,
  Text,
  Title,
  Top,
  Body,
  Pane,
  Subtitle,
  Icon,
  AdditionalInfo,
  DescriptionInfo,
  IconHolder,
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

Event.Top = function EventTop({ children, ...restProps }) {
  return <Top {...restProps}>{children}</Top>;
};

Event.Body = function EventBody({ children, ...restProps }) {
  return <Body {...restProps}>{children}</Body>;
};

Event.Pane = function EventPane({ children, ...restProps }) {
  return <Pane {...restProps}>{children}</Pane>;
};

Event.AdditionalInfo = function EventAdditionalInfo({
  children,
  ...restProps
}) {
  return <AdditionalInfo {...restProps}>{children}</AdditionalInfo>;
};

Event.DescriptionInfo = function EventDescriptionInfo({
  children,
  ...restProps
}) {
  return <DescriptionInfo {...restProps}>{children}</DescriptionInfo>;
};

Event.Title = function EventTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Event.Subtitle = function EventSubtitle({ children, ...restProps }) {
  return <Subtitle {...restProps}>{children}</Subtitle>;
};

Event.Text = function EventText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Event.Icon = function EventIcon({ children, ...restProps }) {
  return <Icon {...restProps}>{children}</Icon>;
};

Event.Image = function EventImage({ children, ...restProps }) {
  return <Avatar {...restProps} />;
};

Event.IconHolder = function EventIconHolder({ children, ...restProps }) {
  return <IconHolder {...restProps}>{children}</IconHolder>;
};
