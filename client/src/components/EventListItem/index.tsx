import React from "react";
import { useDispatch } from "react-redux";
import { getAllEvents, getEventsInfo, ignoreEvent, reportEvent } from "src/api";
import { EventInteface } from "src/models/events";
import { setEvents, setInfo } from "src/modules/events/actions";
import "./index.scss";

interface Props {
  event: EventInteface;
  index: number;
}

const EventListItem: React.FC<Props> = ({ event, index }) => {
  const dispath = useDispatch();

  const onClick = async (id: string, type: string) => {
    if (type === "ignored") {
      await ignoreEvent(id);
    } else {
      await reportEvent(id);
    }

    const events = await getAllEvents();
    const info = await getEventsInfo();
    dispath(setEvents(events));
    dispath(setInfo({ ignored: info.ignored, reported: info.reported }));
  };

  return (
    <div className="event-item__wrapper">
      <div className="event-item">{index + 1}</div>
      <div className="event-item">{event.name}</div>
      <div className="event-item">
        {new Date(event.timestamp).toLocaleString()}
      </div>
      <div className="event-item">{event.severity}</div>
      <div className="event-item">
        <button
          type="button"
          className="event-item__button"
          onClick={(e) => {
            e.stopPropagation();
            onClick(event._id, "ignored");
          }}
        >
          Ignore
        </button>
        <button
          type="button"
          className="event-item__button report"
          onClick={(e) => {
            e.stopPropagation();
            onClick(event._id, "reported");
          }}
        >
          Report
        </button>
      </div>
    </div>
  );
};

export default EventListItem;
