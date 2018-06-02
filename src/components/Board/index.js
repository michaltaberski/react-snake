import React from 'react';
import { Flex } from 'grid-styled';
import styled from 'styled-components';
import { connect } from  'react-redux';
import { boardSpaceSelector } from 'selectors';

import Field from 'components/Field';

const BoardContainer = styled(Flex).attrs({ flexDirection: 'row', flex: 1 })`
  width: 800px;
  height: 800px;
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const Row = styled(Flex).attrs({ flexDirection: 'column', flex: 1 })`
`;

const Board = (props) => (
  <BoardContainer>
    {props.board.map((col, colIndex) => (
      <Row key={colIndex}>
        {col.map((fieldValue, rowIndex) => (
          <Field
            key={`${rowIndex}${colIndex}`}
            value={fieldValue}
          >
            x: {rowIndex}
          </Field>
        ))}
      </Row>
    ))}
  </BoardContainer>
);


const mapStateToProps = (state) => {
  return {
    board: boardSpaceSelector(state),
  };
}

const enhance = connect(mapStateToProps, {});

export default enhance(Board);
