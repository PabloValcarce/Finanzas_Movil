import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { styles } from './DateRangePicker.styles';
import DateRangePickerLogic from './DateRangePickerLogic'; // Importamos la lógica
import DateTimePicker from '@react-native-community/datetimepicker';

const DateRangePicker = ({ initialStartDate, initialEndDate, onDateRangeChange }) => {
  const { startDate, endDate, handleStartDateChange, handleEndDateChange, handleReset } = DateRangePickerLogic(
    initialStartDate,
    initialEndDate,
    onDateRangeChange
  );

  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Funciones para mostrar y ocultar el DatePicker
  const showStartDate = () => setShowStartDatePicker(true);
  const hideStartDate = () => setShowStartDatePicker(false);
  const showEndDate = () => setShowEndDatePicker(true);
  const hideEndDate = () => setShowEndDatePicker(false);

  // Manejo del cambio de fecha
  const handleStartDateChangePicker = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    hideStartDate();
    handleStartDateChange(currentDate);
  };

  const handleEndDateChangePicker = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    hideEndDate();
    handleEndDateChange(currentDate);
  };

  return (
    <View style={styles.datePickerContainer}>
      <View>
        <TouchableOpacity style={styles.datePicker} onPress={showStartDate}>
          <Text>{startDate ? startDate.toLocaleDateString() : 'INICIO'}</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={styles.datePicker} onPress={showEndDate}>
          <Text>{endDate ? endDate.toLocaleDateString() : 'FIN'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <FontAwesomeIcon icon={faRotateRight} size={27} />
      </TouchableOpacity>

      {/* Start Date Picker */}
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={handleStartDateChangePicker}
        />
      )}

      {/* End Date Picker */}
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={handleEndDateChangePicker}
        />
      )}
    </View>
  );
};

export default DateRangePicker;
