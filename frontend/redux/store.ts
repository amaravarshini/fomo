import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './types';

// Define your data structure
interface Data {
    _id: string;
    symbol: string;
    price: number;
    timestamp: string;
}

// Define the state shape for the data slice
interface DataState {
    data: Data[];
    error: string | null;
}

// Initial state for the data slice
const initialDataState: DataState = {
    data: [],
    error: null,
};

// Create a slice for managing data state
const dataSlice = createSlice({
    name: 'data',
    initialState: initialDataState,
    reducers: {
        updateData(state, action: PayloadAction<Data[]>) {
            state.data = action.payload;
            state.error = null;
        },
        fetchDataError(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

// Export actions and reducer
export const { updateData, fetchDataError } = dataSlice.actions;
export const dataReducer = dataSlice.reducer;

// Thunk action creator for fetching data
export const fetchData = (): ThunkAction<void, RootState, unknown, any> => async (dispatch) => {
    try {
        const response = await axios.get<Data[]>('http://localhost:5000/api/data'); // Adjust URL as needed
        dispatch(updateData(response.data));
    } catch (error) {
        dispatch(fetchDataError('Error fetching data')); // Handle error
        console.error('Error fetching data:', error);
    }
};

// Configure and export the Redux store
export const store = configureStore({
    reducer: {
        data: dataReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});
