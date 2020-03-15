import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';
import SyncStorage from 'sync-storage';

import t from 'tcomb-form-native';

const Form = t.form.Form;
const User = t.struct({
  todo: t.String,
  color: t.String,
  terms: t.Boolean,
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10,
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
    },
  },
};

const options = {
  fields: {
    todo: {
      error: 'Please add todo!!',
    },
    color: {
      error: 'Please add color!!',
    },
    terms: {
      label: 'Agree',
    },
  },
  stylesheet: formStyles,
};

export default class ToDo extends Component {
  handleSubmit = () => {
    const value = this._form.getValue();
    SyncStorage.set('todo', );
    console.log('value: ', value);
  };

  render() {
    return (
      <View style={styles.container}>
        <Form ref={c => (this._form = c)} type={User} options={options} />
        <Button title="Submit!" onPress={this.handleSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});
