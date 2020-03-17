import {connect} from 'react-redux';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';

const TasksShow = props => {
  const task = props.tasksAvail;

  return (
    <View>
      <ScrollView>
        {task.map((t, index) => {
          if (
            t.dated === props.date &&
            t.month === props.month &&
            t.year === props.year
          ) {
            return (
              <View
                style={{
                  marginTop: 10,
                  height: 30,
                  backgroundColor: t.colour,
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                }}
                key={index}>
                <Text style={{fontSize: 20, color: 'white'}}>{t.name}</Text>
                <Text style={{fontSize: 20, color: 'white'}}>{t.time}</Text>
              </View>
            );
          }
        })}
      </ScrollView>
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
export default connect(mapStateToProps)(TasksShow);
