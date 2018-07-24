import { createStore } from 'redux';
import { createWidgetReducer } from "./reduxReducer";
// coding start
export const store = createStore(createWidgetReducer, {})

store.subscribe(() => {
  //console.log(store.getState())
})
