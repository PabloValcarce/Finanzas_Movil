import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Dialog from 'react-native-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Configuration.styles';
import NavBarTransaction from '../../../components/NavBarTransaction/NavBarTransaction';
import useConfigurationLogic from './ConfigurationLogic';

const Configuration = () => {
  const {
    categorias,
    nuevaCategoria,
    setNuevaCategoria,
    agregarCategoria,
    eliminarCategoria,
    loading
  } = useConfigurationLogic();

  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Muestra el diálogo y guarda la categoría seleccionada
  const showConfirmationDialog = (category) => {
    setSelectedCategory(category);
    setIsDialogVisible(true);
  };

  // Confirma la eliminación de la categoría
  const handleConfirmDelete = () => {
    if (selectedCategory) {
      eliminarCategoria(selectedCategory.id);
    }
    setIsDialogVisible(false);
    setSelectedCategory(null);
  };

  return (
    <View style={styles.container}>
      <NavBarTransaction />
      <View style={styles.SettingsPage}>
        <View style={styles.CategoriesPerso}>
          <Text style={styles.title}>Categorías personalizadas</Text>
          <View style={styles.add}>
            <TextInput
              placeholder="Nueva categoría"
              value={nuevaCategoria}
              onChangeText={setNuevaCategoria}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.addCategoryButton}
              onPress={agregarCategoria}
            >
              <Icon name="plus" size={20} color="#144468" />
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            <ScrollView>
              {categorias?.map((item) => (
                <View key={item.id.toString()} style={styles.categoryItem}>
                  <Text style={styles.categoryText}>{item.nombre}</Text>
                  <TouchableOpacity
                    style={styles.deleteIcon}
                    onPress={() => showConfirmationDialog(item)}
                  >
                    <Icon name="trash" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>

      {/* Diálogo de confirmación */}
      <Dialog.Container visible={isDialogVisible}>
        <Dialog.Title>Confirmar eliminación</Dialog.Title>
        <Dialog.Description>
          ¿Estás seguro de que deseas eliminar la categoría{" "}
          <Text style={{ fontWeight: 'bold' }}>
            {selectedCategory ? selectedCategory.nombre : ''}
          </Text>{" "}
          ?
        </Dialog.Description>
        <Dialog.Button label="Cancelar" onPress={() => setIsDialogVisible(false)} />
        <Dialog.Button label="Eliminar" onPress={handleConfirmDelete} />
      </Dialog.Container>
    </View>
  );
};

export default Configuration;
