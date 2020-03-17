import {
  ScrollView,
  Text,
  View,
  Modal,
  TextInput,
  Button,
  Picker,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import React, {useState} from 'react';
import {connect} from 'react-redux';

const Todo = Props => {
  const n = Props.navigation;
  const [taskName, setTaskName] = useState('');
  const [taskHour, setTaskHour] = useState('');
  const [taskMin, setTaskMin] = useState('');
  const [taskMeridiem, setTaskMeridiem] = useState('');
  const [taskColor, setTaskColor] = useState('');
  const task = Props.tasksAvail;
  console.log(task, Props.tasksAvail, task.map(t => t));
  const [modal, setModal] = useState(false);
  console.log(Props);
  const handleSubmit = async () => {
    if (!taskName || !taskHour || !taskMin || !taskMeridiem) {
      alert('Enter Details...');
      return;
    }
    await Props.ADDTASK([
      {
        name: taskName,
        time: taskHour + ' : ' + taskMin + '  ' + taskMeridiem,
        dated: Props.date,
        month: Props.month,
        year: Props.year,
        colour: taskColor,
      },
    ]);
    await AsyncStorage.setItem(
      'availTasks',
      JSON.stringify({gettasks: Props.tasksAvail}),
      (err, res) => console.log('error', err, res),
    );
    n.goBack();
  };
  const getT = () => {
    const hour = [<Picker.Item label="HOUR" key={0} value="" />];
    const min = [<Picker.Item label="MIN" key={0} value="" />];
    for (let i = 0; i < 12; i++) {
      hour.push(
        <Picker.Item
          label={i + 1 < 10 ? '0' + (i + 1) : '' + (i + 1)}
          key={i + 1}
          value={i + 1 < 10 ? '0' + (i + 1) : '' + (i + 1)}
        />,
      );
    }
    for (let i = 0; i < 60; i++) {
      min.push(
        <Picker.Item
          label={i < 10 ? '0' + i : '' + i}
          key={i + 1}
          value={i < 10 ? '0' + i : '' + i}
        />,
      );
    }
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Picker
          selectedValue={taskHour}
          onValueChange={hr => setTaskHour(hr)}
          style={{width: 110}}>
          {hour}
        </Picker>
        <Picker
          selectedValue={taskMin}
          onValueChange={m => setTaskMin(m)}
          style={{width: 100}}>
          {min}
        </Picker>
        <Picker
          selectedValue={taskMeridiem}
          onValueChange={mer => setTaskMeridiem(mer)}
          style={{width: 120}}>
          <Picker.Item label="AM/PM" value="" />
          <Picker.Item label="AM" value="AM" />
          <Picker.Item label="PM" value="PM" />
        </Picker>
      </View>
    );
  };
  const addTask = () => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'pink',
          justifyContent: 'space-around',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 10,
            margin: 10,
          }}>
          <TextInput
            style={{height: 40, margin: 10}}
            onChangeText={text => setTaskName(text)}
            placeholder="TASK"
            value={taskName}
          />
          {getT()}
          <Picker
            selectedValue={taskColor}
            onValueChange={color => setTaskColor(color)}>
            <Picker.Item label="COLOUR" value="" />
            <Picker.Item label="RED" value="red" />
            <Picker.Item label="GREEN" value="green" />
            <Picker.Item label="BLUE" value="blue" />
            <Picker.Item label="ORANGE" value="orange" />
            <Picker.Item label="BLACK" value="black" />
          </Picker>
          <Button onPress={() => handleSubmit()} title="Submit" />
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1, padding: 20, justifyContent: 'space-between'}}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modal}
        onRequestClose={() => {
          alert('Modal has been closed.');
          n.goBack();
        }}>
        {addTask()}
        <Button
          title="Hide Modal"
          onPress={() => {
            setModal(!modal);
          }}
        />
      </Modal>
      <View style={{flex: 1, marginBottom: 10}}>
        <Text style={{textAlign: 'center', fontSize: 30, color: 'grey'}}>
          {Props.date + ' - ' + (Props.month + 1) + ' - ' + Props.year}
        </Text>
      </View>
      <View style={{flex: 1, marginTop: 10}}>
        <Text
          style={{textAlign: 'center', fontSize: 20}}
          onPress={() => setModal(true)}>
          Add New Task
        </Text>
      </View>
    </View>
  );
};
const mapStateToProps = state => {
  return {
    tasksAvail: state.tasksAvail,
    date: state.date,
    month: state.month,
    year: state.year,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    ADDTASK: val => dispatch({type: 'ADDTASK', payload: val}),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Todo);
