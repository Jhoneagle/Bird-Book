const initialState = 'time';

const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_SORT':
      return action.by;
    default:
      return state;
  }
};

export const updateSort = by => {
  return async dispatch => {
    dispatch({
      type: 'UPDATE_SORT',
      by,
    });
  };
};

export default sortReducer;
