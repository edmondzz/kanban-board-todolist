import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    textFields: [],
    draggedItem: null,
    cardId: 0, // add cardId to the initial state with a value of 0
    targetId: null,
};


const kanbanSlice = createSlice({
    name: 'kanban',
    initialState,
    reducers: {
        setTextFields: (state, action) => {
            state.textFields = action.payload;
        },
        setDraggedItem: (state, action) => {
            state.draggedItem = action.payload;
        },
        setCardId: (state, action) => {
            state.cardId = action.payload;
        },
        setTargetId: (state, action) => {
            state.targetId = action.payload;
        },
    },
});

export const {
    setTextFields,
    setDraggedItem,
    setCardId,
    setTargetId,
} = kanbanSlice.actions;

export default kanbanSlice.reducer;