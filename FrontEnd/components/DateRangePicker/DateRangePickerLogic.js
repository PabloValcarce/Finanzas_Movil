import { useState } from 'react';

const DateRangePickerLogic = (initialStartDate, initialEndDate, onDateRangeChange) => {
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const normalizeDate = (date, endOfDay = false) => {
    if (date) {
      const normalizedDate = new Date(date);
      normalizedDate.setHours(endOfDay ? 23 : 0, endOfDay ? 59 : 0, endOfDay ? 59 : 0, endOfDay ? 999 : 0);
      return normalizedDate;
    }
    return null;
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onDateRangeChange({
      startDate: normalizeDate(date),
      endDate: normalizeDate(endDate, true),
    });
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDateRangeChange({
      startDate: normalizeDate(startDate),
      endDate: normalizeDate(date, true),
    });
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    onDateRangeChange({
      startDate: null,
      endDate: null,
    });
  };

  return {
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
    handleReset,
  };
};

export default DateRangePickerLogic;
