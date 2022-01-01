import { useReducer, useCallback } from 'react';
import { loadingStates, loadingActions } from '../models/httpLoading';

function httpReducer(state, action) {
  if (action.type === loadingActions.send) {
    return {
      data: null,
      error: null,
      status: loadingStates.pending,
    };
  }

  if (action.type === loadingActions.success) {
    return {
      data: action.responseData,
      error: null,
      status: loadingStates.completed,
    };
  }

  if (action.type === loadingActions.error) {
    return {
      data: null,
      error: action.errorMessage,
      status: loadingStates.completed,
    };
  }

  return state;
}

function useHttp(requestFunction, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? loadingStates.pending : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData) {
      dispatch({ type: loadingActions.send });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: loadingActions.success, responseData });
      } catch (error) {
        dispatch({
          type: loadingActions.error,
          errorMessage: error?.message || 'Something went wrong!',
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
