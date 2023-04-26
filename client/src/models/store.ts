import { EventInteface } from "src/models/events";

export interface EventsState {
  events: EventInteface[];
  info: {
    ignored: number | null;
    reported: number | null;
  };
}
