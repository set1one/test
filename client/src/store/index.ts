import { eventsReducer } from "../modules/events/reducer";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  events: eventsReducer,
});

export const store = configureStore({ reducer: rootReducer });
