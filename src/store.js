import { configureStore } from '@reduxjs/toolkit';
import kanbanReducer from './todo/createSlice';

export default configureStore({
    reducer: {
        kanban: kanbanReducer,
    },
});