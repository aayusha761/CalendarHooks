import React, {useState, useEffect} from 'react';
import {Text, Button, View} from 'react-native';
import SyncStorage from 'sync-storage';

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

function MyCalendar1() {
  useEffect(() => {
    (async () => {
      await SyncStorage.init();
    })();
  });

  const fulldate = new Date();
  const [date, setDate] = useState(fulldate.getDate());
  const [month, setMonth] = useState(fulldate.getMonth());
  const [year, setYear] = useState(fulldate.getFullYear());
  function changeMonth(n) {
    let m = month + n;
    if (m > 11) {
      m = 12 - (month + n);
      setMonth(m);
    } else {
      setMonth(m);
    }
  }
  function changeYear(n) {
    let y = year + n;
    setYear(y);
  }

  var rows = [];
  function _onPress(item) {
    if (!item.match && item !== -1) {
      setDate(item);
    }
  }

  function generateMatrix() {
    const matrix = [];
    matrix[0] = weekDays;
    const firstDay = new Date(year, month, 1).getDay();
    let maxDays = nDays[month];
    if (month === 1) {
      // February
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
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

  // useEffect(() => {
  //   generateMatrix();
  // });

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
            {year}
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
            {months[month]}
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
                    fontWeight: item === date ? 'bold' : null,
                    backgroundColor: rowIndex % 2 === 0 ? '#ddd' : '#fff',
                    borderWidth: item !== -1 ? 1 : null,
                  }}
                  onPress={() => _onPress(item)}>
                  {item !== -1 ? item : ''}
                </Text>
                <View
                  style={{
                    backgroundColor: rowIndex % 2 === 0 ? '#ddd' : '#fff',
                    flex: rowIndex !== 0 ? 1 : null,
                    borderWidth: item !== -1 ? 1 : null,
                    borderColor: item !== -1 ? '#ddd' : null,
                  }}>
                  {item !== -1 && rowIndex !== 0 ? (
                    <Button title="+" onPress={() => {}} />
                  ) : null}
                </View>
              </View>
            );
          });
          return (
            <View
              style={{
                flexDirection: 'row',
                // padding: 15,
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

export default MyCalendar1;
