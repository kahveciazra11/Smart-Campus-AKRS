// Bir rezervasyonun sahip olması gereken standart şablon
export const createReservationObject = (id, studentName, areaName, timeSlot) => {
  return {
    id: id || Date.now(),
    studentName: studentName.trim(),
    areaName: areaName,
    timeSlot: timeSlot.trim()
  };
};