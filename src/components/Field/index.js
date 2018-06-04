import React from 'react';
import { Flex } from 'grid-styled';
import styled, { css } from 'styled-components';
import { onlyUpdateForKeys } from 'recompose';

const FieldWrapper = styled(Flex).attrs({ flex: 1 })`
  border: 1px solid rgba(0, 0, 0, 0.1);
  ${props => props.value === 'S' && css`
    background-color: green;
  `}
  ${props => props.value === 'D' && css`
    background-color: red;
  `}
  ${props => props.value === 'F' && css`
    background-color: orange;
  `}

`;

const Field = (props) => (
  <FieldWrapper value={props.value}>{props.children}</FieldWrapper>
);

export default onlyUpdateForKeys(['value'])(Field);
