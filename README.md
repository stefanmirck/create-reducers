# create-reducer-map

A tiny utility to create reducer maps for Redux that follows the priciples of
[Flux Standard Action (FSA)][fsa] and will enable you to handle errors as a first class
concept. No need to define separate action types like `SOME_ACTION_SUCCESS` and
`SOME_ACTION_ERROR`, but instead use FSA actions to represent errors is a simple
and straightforward manner.

## Example

```javascript
import createReducer from 'create-reducer-map';
import { SOME_ACTION, ANOTHER_ACTION } from 'path/to/actionHandlers';

const initialState = {};

export default createReducer(initialState, {
  [SOME_ACTION]: {
    // Handles a basic FSA action.
    next: (state, payload) => state,
    // Handles an FSA action that represents an error.
    throw: (state, payload) => state,
  },
  // Handles any FSA action.
  [ANOTHER_ACTION]: (state, payload) => state
});

// Basic FSA action
{
  type: SOME_ACTION,
  payload: {
    text: 'Do something...'
  }
}

// FSA action representing an error
{
  type: SOME_ACTION,
  payload: new Error(),
  error: true
}
```

[fsa]: https://github.com/acdlite/flux-standard-action
