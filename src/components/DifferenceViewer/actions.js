import { FETCH_FAILURE, FETCH_LOADING, FETCH_SUCCESS } from './actionTypes';

export const fetchData = async (dispatch, getData) => {
  dispatch({ type: FETCH_LOADING });
  try {
    const result = await getData();
    dispatch({ type: FETCH_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: FETCH_FAILURE });
  }
};
