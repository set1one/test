import { setEvents, setInfo } from "./actions";
import { EventsState } from "../../models/store";
import { createReducer } from "@reduxjs/toolkit";

export const initialState: EventsState = {
  events: [],
  info: {
    ignored: null,
    reported: null,
  },
};

export const eventsReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(setEvents, (state, { payload }) => {
      state.events = payload;
    })
    .addCase(setInfo, (state, { payload }) => {
      state.info = payload;
    })
);
