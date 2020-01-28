const initialState = [];

const observationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_OBSERVATION':
      return state.concat(action.data);
    case 'SHORT_OBSERVATIONS':
      if (action.by === 'time') {
        state.sort(function(a, b) {
          return a.timestamp - b.timestamp;
        });
      } else if (action.by === 'name') {
        state.sort(function(a, b) {
          return a.species.localeCompare(b.species);
        });
      } else {
        state.sort(function(a, b) {
          if (a.rarity === b.rarity) {
            return 0;
          } else if (
            a.rarity === 'Common' ||
            (a.rarity === 'Rare' && b.rarity === 'Extremely rare')
          ) {
            return 1;
          } else {
            return -1;
          }
        });
      }

      return state;
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

export const shortObservations = by => {
  return async dispatch => {
    dispatch({
      type: 'SHORT_OBSERVATIONS',
      by,
    });
  };
};

export default observationsReducer;
