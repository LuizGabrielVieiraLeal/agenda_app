import useApi from "src/composables/useApi";

export default function calendarService() {
  const { create, list, update, destroy } = useApi("events");

  return { create, list, update, destroy };
}
