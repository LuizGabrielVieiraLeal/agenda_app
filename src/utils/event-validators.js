import { today } from "@quasar/quasar-ui-qcalendar/src";

const dateIsValid = (selectedDate) => {
  const currentDate = today();
  return selectedDate >= currentDate;
};

const timeIsValid = (selectedDate, selectedTime) => {
  if (selectedDate === today())
    return `${selectedTime}:00` >= new Date().toLocaleTimeString();
  return true;
};

const finalTimeIsValid = (selectedTime, selectedFinalTime) => {
  if (selectedTime && selectedFinalTime)
    return selectedTime < selectedFinalTime;
  return true;
};

export { dateIsValid, timeIsValid, finalTimeIsValid };
