import {createStore} from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';


export default function configureStore(){
  var localStorageState = localStorage.getItem('robotAppState2');
  var persistedState = initialState;
  if(localStorageState){
    console.log('altering persistedState');
    persistedState = JSON.parse(localStorageState);
  }

  console.log('initialState', JSON.stringify(persistedState));
  return createStore(rootReducer, persistedState);
}