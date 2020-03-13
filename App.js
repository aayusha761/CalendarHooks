import React, {Component} from 'react';
import MyCalendar1 from './component/MyCalendar';
import {createStore} from 'redux';
import store from './reducers/rootReducer';
import {Provider} from 'react-redux';

export default class App extends Component {
  render() {
    const storeRedux = createStore(store);
    return (
      <Provider store={storeRedux}>
        <MyCalendar1 />
      </Provider>
    );
  }
}
