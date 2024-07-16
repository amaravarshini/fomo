// frontend/pages/index.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/store';
import type { RootState, AppDispatch } from '../redux/types'; // Import RootState and AppDispatch from types.ts

const StockTable = () => {
    const dispatch: AppDispatch = useDispatch();
    const data = useSelector((state: RootState) => state.data.data);

    useEffect(() => {
        // Fetch initial data and start polling
        dispatch(fetchData());
        const interval = setInterval(() => {
            dispatch(fetchData()); // Dispatch the thunk action creator
        }, 10000); // Polling interval (every 10 seconds)

        return () => clearInterval(interval);
    }, [dispatch]);

    return (
        <div>
            <h1>Real-Time Stock Data</h1>
            <table>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((entry) => (
                        <tr key={entry._id}>
                            <td>{entry.symbol}</td>
                            <td>{entry.price}</td>
                            <td>{new Date(entry.timestamp).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StockTable;
