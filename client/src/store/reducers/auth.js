import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/helpers';

const initialState = {
  token: null,
  userId: null,
  name: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
};

// Authform has submitted, trigger loading spinner
const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
// Update state to reflect successful authentication
const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    error: null,
    loading: false
  });
};
// Update state with error message returned from server
const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null, name: null });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    // case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
    default:
      return state;
  }
};

export default reducer;
