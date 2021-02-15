import { createStore, combineReducers } from 'redux';
import AlcoReducer from './reducer';

const rootReducer = combineReducers({
    AlcoReducer
});

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;