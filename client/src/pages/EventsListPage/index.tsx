import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllEvents, getEventsInfo } from "src/api";
import EventListItem from "src/components/EventListItem";
import AddNewEventModal from "src/components/modals/AddNewEvent";
import { eventsTableItem } from "src/constants/events";
import { EventInteface } from "src/models/events";
import { setEvents, setInfo } from "src/modules/events/actions";
import { useAppSelector } from "src/store/hooks";
import "./index.scss";
import cn from "classnames";

const EventsListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [actualEvents, setActualEvents] = useState<EventInteface[] | []>([]);
  const [activeSortValue, setActiveSortValue] = useState<string>("");

  const events = useAppSelector((state) => state.events.events);
  const info = useAppSelector((state) => state.events.info);

  const dispath = useDispatch();

  useEffect(() => {
    (async () => {
      const events = await getAllEvents();
      const info = await getEventsInfo();
      dispath(setEvents(events));
      dispath(setInfo({ ignored: info.ignored, reported: info.reported }));
    })();
  }, []);

  useEffect(() => {
    setActualEvents(events);
  }, [events]);

  const sortByValue = (value: string) => {
    (value === "timestamp" || value === "name") && setActiveSortValue(value);
    switch (value) {
      case "timestamp": {
        const sortedEvents = events
          .slice()
          .sort((a: EventInteface, b: EventInteface) => {
            return (
              new Date(a.timestamp).valueOf() - new Date(a.timestamp).valueOf()
            );
          });
        setActualEvents(sortedEvents);
        break;
      }
      case "name": {
        const sortedEvents = events.slice().sort((a: any, b: any) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        });
        setActualEvents(sortedEvents);
        break;
      }
    }
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="events">
      {info && (
        <div className="events-info">
          <div className="events-info__row">
            <h3 className="events-info__item">Ignored:</h3>
            {info.ignored}
          </div>
          <div className="events-info__row">
            <h3 className="events-info__item">Reported: </h3>
            {info.reported}
          </div>
        </div>
      )}

      <h1 className="events__title">Your events</h1>

      <div className="events-table">
        <ul className="events-table__top">
          {eventsTableItem.map((item, index) => (
            <li
              className={cn("events-table__top-item", {
                "events-table__top-item--active":
                  item.value === activeSortValue,
              })}
              key={index}
              onClick={() => sortByValue(item.value)}
            >
              {item.title}
            </li>
          ))}
        </ul>
        {actualEvents.length ? (
          actualEvents.map((item, index) => (
            <EventListItem event={item} key={index} index={index} />
          ))
        ) : (
          <div className="empty">
            <h3 className="empty__title">You haven't any events</h3>
          </div>
        )}
      </div>

      <button
        type="button"
        className="events-table__button"
        onClick={() => setIsModalOpen(true)}
      >
        Add new event
      </button>

      {isModalOpen && <AddNewEventModal onClose={onClose} />}
    </div>
  );
};

export default EventsListPage;
