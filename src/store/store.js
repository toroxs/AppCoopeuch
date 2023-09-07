import { configureStore } from "@reduxjs/toolkit";
import tareasReducer from "./tareasSlice";

export const store = configureStore({
    reducer: {tareas: tareasReducer}
});