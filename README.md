# create-reducer-map

A tiny utility to create reducer maps for Redux.

```javascript
import createReducer from 'create-reducer-map';

const initialState = {};

export default createReducer(initialState, {
  SOME_ACTION: (state, payload) => state,
  ANOTHER_ACTION: {
    next: (state, payload) => state,
    throw: (state, payload) => state, // Get's hit when `{ error: true }` is specified in the action
  },
});

```
