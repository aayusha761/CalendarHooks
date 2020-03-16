let fulldate = new Date();
const initState = {
  fulldate: new Date(),
  date: fulldate.getDate(),
  month: fulldate.getMonth(),
  year: fulldate.getFullYear(),
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CHANGE_MONTH':
      let m = state.month + action.payload;
      let temp;
      if (m > 11) {
        temp = 12 - m;
      } else {
        temp = m;
      }
      return {
        ...state,
        month: temp,
      };

    case 'CHANGE_YEAR':
      let y = state.year + action.payload;
      return {
        ...state,
        year: y,
      };
    case 'ON_PRESS':
      return {
        ...state,
        date: action.payload,
      };
    case 'UPDATE_TODO':
      let temp1 = [];
      temp1 = temp1.concat(state.todo);
      return {
        ...state,
        todo: temp1,
      };
    default:
      return state;
  }
};

export default rootReducer;
