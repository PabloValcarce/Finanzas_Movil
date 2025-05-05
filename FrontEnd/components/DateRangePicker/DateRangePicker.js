import React, { useState, useMemo } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { styles } from './DateRangePicker.styles'; // Estilos dinámicos
import DateRangePickerLogic from './DateRangePickerLogic'; // Lógica del selector de fecha
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next'; // Para la traducción

const DateRangePicker = ({ initialStartDate, initialEndDate, onDateRangeChange,isDark }) => {
  const { startDate, endDate, handleStartDateChange, handleEndDateChange, handleReset } = DateRangePickerLogic(
    initialStartDate,
    initialEndDate,
    onDateRangeChange
  );
  const dynamicStyles = useMemo(() => styles(isDark), [isDark]); 
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const { t } = useTranslation();

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
          <Text style={dynamicStyles.dateText}>{startDate ? startDate.toLocaleDateString() : t('DateRangePicker.Begin')}</Text>
        </TouchableOpacity>
      </View>

      <View>
        <TouchableOpacity style={dynamicStyles.datePicker} onPress={showEndDate}>
          <Text style={dynamicStyles.dateText}>{endDate ? endDate.toLocaleDateString() : t('DateRangePicker.End')}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={dynamicStyles.resetButton} onPress={handleReset}>
        <FontAwesomeIcon icon={faRotateRight} size={27} style={dynamicStyles.resetButtonIcon}/>
      </TouchableOpacity>

      {/* Start Date Picker */}

      {/* This calendar doesn't have a language option; it uses the system language. */}

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
