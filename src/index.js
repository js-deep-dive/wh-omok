import React from 'react';
import ReactDOM from 'react-dom';

import EntryPoint from './containers/EntryPoint';
import * as serviceWorker from './serviceWorker';

import './index.css';

ReactDOM.render(<EntryPoint />, document.getElementById('root'));

serviceWorker.unregister();
