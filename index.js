export function createReducer(initialState, reducerMap) {
  return (state = initialState, action) => {
    let reducer = reducerMap[action.type];

    // If action type does not match, return previous state.
    if (!reducer) return state;

    // If a single reducer is passed, it is used to handle both normal actions
    // and failed actions. You can use this form if you know a certain type of
    // action will never fail.
    //
    // Otherwise, you can specify separate reducers for next() and throw(). This
    // API is inspired by the ES6 generator interface.
    const handlerKey = action.error === true ? 'throw' : 'next';

    // If function is passed instead of map, use as reducer.
    if (isFunction(reducer)) {
      reducer.next = reducer.throw = reducer;
    }

    // Otherwise, assume an action map was passed.
    reducer = reducer[handlerKey];

    return isFunction(reducer) ? reducer(state, action.payload) : state;
  };
}
