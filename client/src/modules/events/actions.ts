import { InfoInteface } from "./../../models/events";
import { EventInteface } from "src/models/events";
import { createAction } from "@reduxjs/toolkit";

export const setEvents = createAction<EventInteface[]>("events/SET_EVENTS");
export const setInfo = createAction<InfoInteface>("events/SET_INFO");
