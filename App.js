import React, {Component} from 'react';
import MyCalendar1 from './component/MyCalendar';
import {createStore} from 'redux';
import store from './reducers/rootReducer';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import ToDo from './component/ToDo';
import TasksShow from './component/TasksShow';

export default class App extends Component {
  render() {
    const storeRedux = createStore(store);
    const Stack = createStackNavigator();
    return (
      <Provider store={storeRedux}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="MyCalendar" component={MyCalendar1} />
            <Stack.Screen name="ToDo" component={ToDo} />
            <Stack.Screen name="TasksShow" component={TasksShow} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
