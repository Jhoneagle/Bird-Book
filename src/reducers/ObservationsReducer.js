const initialState = [];

const observationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_OBSERVATION':
      return state.concat(action.data);
    default:
      return state;
  }
};

export const createObservation = data => {
  return async dispatch => {
    dispatch({
      type: 'CREATE_OBSERVATION',
      data,
    });
  };
};

export default observationsReducer;
