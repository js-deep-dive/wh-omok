import React from 'react';

import { Panel, UserForm, Users } from '../components/entryPoint';

import './EntryPoint.css';

export default class EntryPoint extends React.PureComponent {
  state = {
    user: [],
    errorMessage: '',
  };

  validation = value => {
    return this.state.user.find(function(element) {
      return element === value;
    });
  };

  onComplete = value => {
    let validate = this.validation(value);
    if (validate) {
      this.setState({ errorMessage: '닉네임이 중복됩니다.' });
    } else {
      this.setState({
        user: [...this.state.user, value],
      });
    }
  };

  render() {
    const { user, errorMessage } = this.state;
    return (
      <section className="container">
        <h1>winner</h1>
        {user.length > 1 || (
          <section className="user-form-wrapper">
            <UserForm onComplete={this.onComplete} errorMessage={errorMessage} />
            <UserForm onComplete={this.onComplete} errorMessage={errorMessage} />
          </section>
        )}
        <section className="users-wrapper">
          <Users users={user} />
        </section>
        <section>
          <Panel />
        </section>
      </section>
    );
  }
}
