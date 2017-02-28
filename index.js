function isFunction(fn) {
  return typeof fn === 'function';
}

function createReducer(initialState, reducerMap) {
  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    var reducer = reducerMap[action.type];

    // If action type does not match, return previous state.
    if (!reducer) return state;

    // If a single reducer is passed, it is used to handle both normal actions
    // and failed actions. You can use this form if you know a certain type of
    // action will never fail.
    //
    // Otherwise, you can specify separate reducers for next() and throw(). This
    // API is inspired by the ES6 generator interface.
    var handlerKey = action.error === true ? 'throw' : 'next';

    // If function is passed instead of map, use as reducer.
    if (isFunction(reducer)) reducer.next = reducer.throw = reducer;

    // Otherwise, assume an action map was passed.
    reducer = reducer[handlerKey];

    // If the reducer turns out to be something else than a function, return the
    // current state.
    if (!isFunction(reducer)) return state;

    // Else return the reducer, optionally with meta data.
    return action.meta ?
      reducer(state, action.payload, action.meta) : reducer(state, action.payload);
  };
}

module.exports = createReducer;
