import { EventInteface, InfoInteface } from "./models/events";

export const getAllEvents = async (): Promise<EventInteface[]> => {
  const response = await fetch(`${process.env.REACT_APP_API}/events`);

  return response.json();
};

export const getEventsInfo = async (): Promise<InfoInteface> => {
  const response = await fetch(`${process.env.REACT_APP_API}/info`);

  return response.json();
};

export const createNewEvent = async (
  name: string,
  severity: string
): Promise<EventInteface[]> => {
  const newEvent = {
    name,
    severity,
    timestamp: new Date().toString(),
  };
  const response = await fetch(`${process.env.REACT_APP_API}/events`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newEvent),
  });

  return response.json();
};

export const ignoreEvent = async (id: string): Promise<InfoInteface> => {
  const response = await fetch(`${process.env.REACT_APP_API}/events/ignore`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id }),
  });

  return response.json();
};

export const reportEvent = async (id: string): Promise<InfoInteface> => {
  const response = await fetch(`${process.env.REACT_APP_API}/events/report`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ id }),
  });

  return response.json();
};
