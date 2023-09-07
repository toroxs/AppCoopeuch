import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTareas = createAsyncThunk('tareas/getTareas', async () => {
    const url = 'http://localhost:8080/tarea';
    const response = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    console.log(response.data);
    return await response.data;
});

export const addTarea = createAsyncThunk('tareas/addTarea', async (newTarea) => {
    const url = 'http://localhost:8080/save';
    const response = await axios.post(url, newTarea, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.data;
});

export const editTarea = createAsyncThunk('tareas/editTarea', async ({ id, updates }) => {
    const url = `http://localhost:8080/update/${id}`;
    const response = await axios.put(url, updates, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.data;
});

export const deleteTarea = createAsyncThunk('tareas/deleteTarea', async (id) => {
    const url = `http://localhost:8080/delete/${id}`;
    await axios.delete(url);
    return id;
});

const tareasSlice = createSlice({
    name: "tareas",
    initialState: {
        items: [],
        status: "idle"
    },
    reducers: {
        agregarTarea: () => { },
    },
    extraReducers: (builder) => {
        builder.addCase(getTareas.pending, (state) => {
            state.status = 'Loading...';
        })
            .addCase(getTareas.rejected, (state, action) => {
                state.status = 'Failed';
                console.log('Failed:', action.error);
            })
            .addCase(getTareas.fulfilled, (state, action) => {
                state.status = 'OK';
                state.items = action.payload
            })
            .addCase(deleteTarea.fulfilled, (state, action) => {
                const index = state.items.findIndex((tarea) => tarea.id === action.payload);
                if (index !== -1) {
                    state.items.splice(index, 1);
                }
            })
            .addCase(addTarea.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(editTarea.fulfilled, (state, action) => {
                const index = state.items.findIndex((tarea) => tarea.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
    }
});

export const { agregarTarea } = tareasSlice.actions;
export default tareasSlice.reducer; 