import React from 'react';

import './entryPoint.css';

export class Panel extends React.PureComponent {
  state = {
    board: null,
    occupiedCell: null,
    turn: 'black',
  };

  onCellClick = (cell, cellIndex) => {
    if (cell.occupied) {
      return;
    }
    this.setState(prevState => ({
      ...prevState,
      occupiedCell: cellIndex,
      board: [
        ...prevState.board.slice(0, cellIndex),
        { occupied: prevState.turn === 'black' ? 'black' : 'white' },
        ...prevState.board.slice(cellIndex + 1),
      ],
      turn: prevState.turn === 'white' ? 'black' : 'white',
    }));
  };

  componentDidMount() {
    this.setState(() => ({
      board: Array(this.props.size * this.props.size).fill({ occupied: null }),
    }));
  }

  render() {
    const { board } = this.state;
    const { size } = this.props;

    return (
      <div>
        {board &&
          Array(size)
            .fill(null)
            .map((x, row) => {
              return (
                <div key={row} className="panel-row">
                  {Array(size)
                    .fill(null)
                    .map((x, column) => {
                      const cellIndex = row * size + column;
                      const cell = this.state.board[cellIndex];
                      return (
                        <Cell
                          key={`${row}-${column}`}
                          cell={cell}
                          cellIndex={cellIndex}
                          onCellClick={this.onCellClick}
                        />
                      );
                    })}
                </div>
              );
            })}
      </div>
    );
  }
}

Panel.defaultProps = {
  count: 5,
  size: 8,
};

class Cell extends React.PureComponent {
  handleCellClick = () => {
    const { cell, cellIndex } = this.props;
    this.props.onCellClick(cell, cellIndex);
  };

  render() {
    const { cell } = this.props;

    return (
      <div className="square" onClick={this.handleCellClick}>
        {cell.occupied && <Stone color={cell.occupied} />}
      </div>
    );
  }
}

function Stone({ color }) {
  return <div className={color} />;
}
