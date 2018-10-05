import React from 'react';

import { Panel } from '../components/entryPoint';

import './EntryPoint.css';

export default class EntryPoint extends React.PureComponent {
  render() {
    return (
      <section className="container">
        <h1>winner</h1>
        <Panel />
      </section>
    );
  }
}
