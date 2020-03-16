import React, {Component} from 'react';
import {View, StyleSheet, Button, Text} from 'react-native';
import SyncStorage from 'sync-storage';

import t from 'tcomb-form-native';
import {connect} from 'react-redux';

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

class ToDo extends Component {
  handleSubmit = async () => {
    const value = this._form.getValue();
    // const todo1 = this.props.todo;
    this.props.todo.push([
      {
        todo: value.todo,
        color: value.color,
        date: this.props.date,
        month: this.props.month,
        year: this.props.year,
      },
    ]);
    // this.props.updateTodo({
    //   todo: value.todo,
    //   color: value.color,
    //   date: this.props.date,
    // });
    await SyncStorage.set('todo', this.props.todo);
    console.log(SyncStorage.get('todo'));
  };

  render() {
    // console.log(this.props.route.params.date);
    return (
      <View>
        <View style={styles.container}>
          <Form ref={c => (this._form = c)} type={User} options={options} />
          <Button title="Submit!" onPress={this.handleSubmit} />
          {this.props.todo.map((todo, index) => {
            return (
              <View key={index}>
                <Text>{todo}</Text>
              </View>
            );
          })}
        </View>
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

const mapStateToProps = state => {
  // console.log(state);
  return state;
};

const mapDispatchToProps = dispatch => ({
  updateTodo: () => dispatch({type: 'UPDATE_TODO'}),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ToDo);
