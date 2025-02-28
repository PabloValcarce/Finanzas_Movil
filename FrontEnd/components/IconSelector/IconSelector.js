import React, { useState, useMemo } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './IconSelector.styles';

const commonIcons = [
  "dollar-sign",       // Gastos/Ingresos
  "credit-card",       // Pagos
  "wallet",            // Finanzas
  "piggy-bank",        // Ahorros
  "chart-line",        // Inversiones
  "coins",             // Efectivo
  "gift",              // Regalos
  "coffee",            // Cafés o Restaurantes
  "train",             // Transporte alternativo
  "subway",            // Metro
  "motorcycle",        // Motocicleta
  "ambulance",         // Emergencias médicas
  "medkit",            // Servicios de salud
  "stethoscope",       // Consultas médicas
  "briefcase",         // Negocios
  "industry",          // Empresas
  "building",          // Vivienda o bienes raíces
  "house-damage",      // Reparaciones en el hogar
  "wrench",            // Mantenimiento
  "shopping-bag",      // Compras generales
  "store",             // Tiendas
  "beer",              // Ocio (cerveza, bares)
  "wine-glass",        // Restaurantes o cenas
  "gamepad",           // Entretenimiento digital
  "futbol",            // Deportes
  "running",           // Ejercicio
  "bicycle",           // Gastos de ciclismo
  "umbrella",          // Seguros o imprevistos
  "tree",              // Gastos eco/amigables
  "paw"                // Mascotas
];

const IconSelector = ({ visible, onClose, onSelect }) => {
  const [search, setSearch] = useState('');

  // Filtra la lista de íconos según el texto de búsqueda
  const filteredIcons = useMemo(() => {
    return commonIcons.filter(icon =>
      icon.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Selecciona un ícono</Text>

          {/* Barra de búsqueda */}
          <TextInput
            placeholder="Buscar ícono..."
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />

          <FlatList
            data={filteredIcons}
            keyExtractor={(item) => item}
            numColumns={5}  // 👈 Esto reemplaza flexWrap: 'wrap'
            contentContainerStyle={styles.iconGrid}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => {
                  onSelect(item);  
                  onClose();
                }}
              >
                <Icon name={item} size={30} color="#144468" />
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default IconSelector;
