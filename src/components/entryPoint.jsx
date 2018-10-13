import React from 'react';
import PropTypes from 'prop-types';

import './entryPoint.css';

export class Panel extends React.PureComponent {
  state = {
    board: null,
    occupiedCell: null,
    turn: 'black',
  };

  static propTypes = {
    count: PropTypes.number,
    size: PropTypes.number,
  };

  static defaultProps = {
    count: 5,
    size: 8,
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

const Cell = ({ cell, cellIndex, onCellClick }) => (
  <div
    className="square"
    onClick={() => {
      onCellClick(cell, cellIndex);
    }}>
    {cell.occupied && <Stone color={cell.occupied} />}
  </div>
);

function Stone({ color }) {
  return <div className={color} />;
}
export class UserForm extends React.PureComponent {
  state = {
    nick: '',
    disabled: true,
  };

  static propTypes = {
    onComplete: PropTypes.func,
    errorMessage: PropTypes.string,
  };

  static defaultProps = {
    color: 'black',
  };

  onNameChange = e => {
    this.setState({ nick: e.currentTarget.value });
    if (this.state.nick) {
      this.setState({ disabled: false });
    }
  };

  addUser = () => {
    this.props.onComplete(this.state.nick);
  };

  render() {
    const { errorMessage } = this.props;
    const { disabled } = this.state;

    return (
      <div className="user-form">
        <div className="form-wrapper">
          <label>닉네임</label>
          <input type="text" placeholder="닉네임을 입력해주세요" onChange={this.onNameChange} />
        </div>
        <div className="form-wrapper">
          <button
            className={`${disabled ? 'disabled' : ''} btn btn-confirm`}
            onClick={this.addUser}
            disabled={disabled}>
            입력 완료
          </button>
        </div>
        {errorMessage && (
          <div className="form-wrapper">
            <p className="error-message">{errorMessage}</p>
          </div>
        )}
      </div>
    );
  }
}

export const Users = ({ users }) => {
  return (
    <>
      {users.map((nick, index) => {
        return (
          <div className="user-wrapper" key={index}>
            <Stone color={index === 0 ? 'black' : 'white'} />
            <label>{nick} 님</label>
          </div>
        );
      })}
    </>
  );
};
