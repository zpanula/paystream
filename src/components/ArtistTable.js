import React, { useReducer } from 'react';
import { Table, Container } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import PropTypes from 'prop-types';
import _ from 'lodash';

function tableSortReducer(state, action) {
  switch (action.type) {
    case 'CHANGE_SORT':
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === 'ascending' ? 'descending' : 'ascending',
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: 'ascending',
      };
    default:
      throw new Error();
  }
}

function ArtistTable({ artists }) {
  const [state, dispatch] = useReducer(tableSortReducer, {
    column: null,
    data: artists,
    direction: null,
  });

  const { column, data, direction } = state;

  return (
    <Container style={{ marginTop: '4em', marginBottom: '4em' }}>
      <Table celled sortable striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'name' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'name' })}
            >
              Artist
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'rate' ? direction : null}
              onClick={() => dispatch({ type: 'CHANGE_SORT', column: 'rate' })}
            >
              Rate
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'streams' ? direction : null}
              onClick={() =>
                dispatch({ type: 'CHANGE_SORT', column: 'streams' })
              }
            >
              Streams
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'payout' ? direction : null}
              onClick={() =>
                dispatch({ type: 'CHANGE_SORT', column: 'payout' })
              }
            >
              Payout
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map(({ id, name, rate, streams }) => (
            <Table.Row key={id}>
              <Table.Cell width={6}>{name}</Table.Cell>
              <Table.Cell>{rate}</Table.Cell>
              <Table.Cell>{streams}</Table.Cell>
              <Table.Cell>{(rate * streams).toFixed(2)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  );
}

ArtistTable.propTypes = {
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      rate: PropTypes.number,
      streams: PropTypes.number,
      payoutCompleted: PropTypes.bool,
    })
  ).isRequired,
};

export default ArtistTable;
