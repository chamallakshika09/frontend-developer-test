import DataReducer from './DataReducer';

const INITIAL_STATE = {
  isLoading: false,
  isError: false,
  data: [],
};

test('returns initial state when no action is passed', () => {
  const newState = DataReducer(INITIAL_STATE, {});
  expect(newState).toBe(INITIAL_STATE);
});

test('returns loading state when received an action of type FETCH_LOADING', () => {
  const newState = DataReducer(INITIAL_STATE, { type: 'FETCH_LOADING' });
  expect(newState).toStrictEqual({ ...INITIAL_STATE, isLoading: true, isError: false });
});

test('returns success state with data when received an action of type FETCH_SUCCESS', () => {
  const data = [
    {
      id: 'e28d290a-a2f2-48c2-9001-ff43884e271b',
      timestamp: 1581618600000,
      diff: [{ field: 'name', oldValue: 'John', newValue: 'Bruce' }],
    },
    {
      id: '8bd0166f-f0c6-48fd-9fcd-a17e76eb1e92',
      timestamp: 1581705000000,
      diff: [{ field: 'name', oldValue: 'Bruce', newValue: 'Nick' }],
    },
    {
      id: '0a75a2b3-be64-4aeb-ba4c-8ddb913791ac',
      timestamp: 1581791400000,
      diff: [{ field: 'name', oldValue: 'Nick', newValue: 'Michel' }],
    },
  ];
  const newState = DataReducer(INITIAL_STATE, { type: 'FETCH_SUCCESS', payload: data });
  expect(newState).toStrictEqual({
    ...INITIAL_STATE,
    isLoading: false,
    isError: false,
    data: [...INITIAL_STATE.data, ...data],
  });
});

test('returns error state when received an action of type FETCH_FAILURE', () => {
  const newState = DataReducer(INITIAL_STATE, { type: 'FETCH_FAILURE' });
  expect(newState).toStrictEqual({ ...INITIAL_STATE, isLoading: false, isError: true });
});
