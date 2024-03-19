import {createStore} from 'redux'
import { reducer } from './actions';

// Create the Redux store
const store = createStore(reducer);

export default store;