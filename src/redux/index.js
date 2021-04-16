import { combineReducers } from 'redux';
import storeApiKey from "./storeApiKey.reducer";
import storeSignMethod from "./storeSignMethod.reducer";

export default combineReducers({
  storeApiKey,
  storeSignMethod
});

