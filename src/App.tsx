import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './store/store';
import Routing from './routing/Routing';

import './App.css';

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routing />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
