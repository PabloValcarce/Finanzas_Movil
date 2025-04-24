import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../../context/ThemeContext'; // Importamos el contexto de tema
import { styles } from './DateRangePicker.styles'; // Estilos dinámicos
import DateRangePickerLogic from './DateRangePickerLogic'; // Lógica del selector de fecha
import DateTimePicker from '@react-native-community/datetimepicker';

const DateRangePicker = ({ initialStartDate, initialEndDate, onDateRangeChange }) => {
  const { startDate, endDate, handleStartDateChange, handleEndDateChange, handleReset } = DateRangePickerLogic(
    initialStartDate,
    initialEndDate,
    onDateRangeChange
  );

  const { isDark } = useTheme(); // Obtener el estado del tema (oscuro o claro)
  const dynamicStyles = styles(isDark); // Aplicar estilos dinámicos

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
    <View style={dynamicStyles.datePickerContainer}>
      <View>
        <TouchableOpacity style={dynamicStyles.datePicker} onPress={showStartDate}>
          <Text style={dynamicStyles.dateText}>{startDate ? startDate.toLocaleDateString() : 'INICIO'}</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={dynamicStyles.datePicker} onPress={showEndDate}>
          <Text style={dynamicStyles.dateText}>{endDate ? endDate.toLocaleDateString() : 'FIN'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={dynamicStyles.resetButton} onPress={handleReset}>
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
