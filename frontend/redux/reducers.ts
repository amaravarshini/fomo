// frontend/redux/reducers.ts

import { combineReducers } from 'redux';

interface Data {
  _id: string;
  symbol: string;
  price: number;
  timestamp: string;
}

interface DataState {
  data: Data[];
  error: string | null;
}

const initialDataState: DataState = {
  data: [],
  error: null,
};

const dataReducer = (state = initialDataState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      return { ...state, data: action.payload, error: null };
    case 'FETCH_DATA_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  data: dataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
