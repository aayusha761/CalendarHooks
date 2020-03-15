import React, {useEffect, useState} from 'react';
import {Text, Button, View, Modal} from 'react-native';
import SyncStorage from 'sync-storage';
import {connect} from 'react-redux';
import ToDo from './ToDo';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function MyCalendar1(props) {
  useEffect(() => {
    (async () => {
      await SyncStorage.init();
    })();
  });
  const [modalVisible, setModalVisible] = useState(false);

  function setModalVisibled(visible) {
    setModalVisible(visible);
  }

  function changeMonth(n) {
    props.changeMonth(n);
  }
  function changeYear(n) {
    props.changeYear(n);
  }

  function _onPress(item) {
    if (!item.match && item !== -1) {
      props.on_Press(item);
    }
  }

  function generateMatrix() {
    const matrix = [];
    matrix[0] = weekDays;
    const firstDay = new Date(props.year, props.month, 1).getDay();
    let maxDays = nDays[props.month];
    if (props.month === 1) {
      // February
      if (
        (props.year % 4 === 0 && props.year % 100 !== 0) ||
        props.year % 400 === 0
      ) {
        maxDays += 1;
      }
    }
    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row === 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }

    return matrix;
  }

  const matrix = generateMatrix();

  return (
    <View style={{flex: 1, justifyContent: 'space-around'}}>
      <View
        style={{
          flex: 1,
          paddingTop: '10%',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Button title="<<" onPress={() => changeMonth(-1)} />
          <Button title="<" onPress={() => changeYear(-1)} />
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
            }}>
            {props.year}
          </Text>
          <Button title=">" onPress={() => changeYear(+1)} />
          <Button title=">>" onPress={() => changeMonth(+1)} />
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
            }}>
            {months[props.month]}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 4,
        }}>
        {matrix.map((row, rowIndex) => {
          const rowItems = row.map((item, colIndex) => {
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                  backgroundColor: rowIndex === 0 ? '#ddd' : '#fff',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: colIndex === 0 ? '#a00' : '#000',
                    fontWeight: item === props.date ? 'bold' : null,
                    backgroundColor: rowIndex % 2 === 0 ? '#ddd' : '#fff',
                    borderWidth: item !== -1 ? 1 : null,
                  }}
                  onPress={() => _onPress(item)}>
                  {item !== -1 ? item : ''}
                </Text>
                <View>
                  {item !== -1 && rowIndex !== 0 ? (
                    <Button
                      title="+"
                      onPress={() => {
                        setModalVisibled(true);
                      }}
                    />
                  ) : null}

                  <View>
                    <Modal
                      animationType="slide"
                      transparent={false}
                      visible={modalVisible}
                      onRequestClose={() => {
                        alert('Modal has been closed.');
                      }}>
                      <ToDo
                        date={props.date}
                        month={props.month}
                        year={props.year}
                      />
                      <Button
                        title="Hide Modal"
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}
                        style={{
                          justifyContent: 'center',
                          marginTop: 50,
                          padding: 20,
                          backgroundColor: '#ffffff',
                        }}
                      />
                    </Modal>
                  </View>
                </View>
              </View>
            );
          });
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              {rowItems}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const mapStateToProps = state => {
  // console.log(state);
  return state;
};

const mapDispatchToProps = dispatch => ({
  changeMonth: payload => dispatch({type: 'CHANGE_MONTH', payload: payload}),
  changeYear: payload => dispatch({type: 'CHANGE_YEAR', payload: payload}),
  on_Press: payload => dispatch({type: 'ON_PRESS', payload: payload}),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyCalendar1);
