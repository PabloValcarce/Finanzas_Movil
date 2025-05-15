import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const CategoryContext = createContext(null);

export const useCategories = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategories must be used within a CategoryProvider");
    }
    return context;
};

export const CategoryProvider = ({ children }) => {
    const [categoriesDefault, setCategoriesDefault] = useState([]);
    const [categoriesPerso, setCategoriesPerso] = useState([]);
    const [categoriesCombined, setCategoriesCombined] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUserId();
    }, []);

    // Obtener userId desde el token
    const fetchUserId = async () => {
        try {
            const access_token = await AsyncStorage.getItem('access_token');
            if (access_token) {
                const decoded = jwtDecode(access_token);
                setUserId(decoded.user_id);
            } else {
                setUserId(null);
            }
        } catch (error) {
            console.error("Error decoding JWT:", error);
            setUserId(null);
        }
    };



    // Cargar categorías por defecto
    const loadDefaultCategories = async () => {
        setLoading(true);
        try {
            const response = await api.get('/api/get-default-categories');  // cambiado a inglés
            setCategoriesDefault(response.data.categories);
        } catch (error) {
            console.error('Error al cargar las categorías por defecto:', error);
        } finally {
            setLoading(false);
        }
    };

    // Cargar categorías combinadas (por defecto + personalizadas)
    const loadCombinedCategories = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const response = await api.get(`/api/get-combined-categories/${userId}`);  // cambiado a inglés
            setCategoriesCombined(response.data.categories);
        } catch (error) {
            console.error('Error al cargar las categorías combinadas:', error);
        } finally {
            setLoading(false);
        }
    };

    // Cargar categorías personalizadas del usuario
    const loadPersoCategories = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const response = await api.get(`/api/get-custom-categories/${userId}`);  // cambiado a inglés
            setCategoriesPerso(response.data.categories);
        } catch (error) {
            console.error('Error al cargar las categorías personalizadas:', error);
        } finally {
            setLoading(false);
        }
    };

    // Agregar una categoría personalizada con icono
    const addCategoryPerso = async (categoryName, icono) => {
        if (!userId || !categoryName.trim()) return;
        setLoading(true);
        try {
            const response = await api.post('/api/add-custom-category', {  // cambiado a inglés
                name: categoryName,
                user_id: userId,
                icon: icono  // adaptado a inglés también
            });
            setCategoriesPerso(prevCategories => [...prevCategories, response.data]);
        } catch (error) {
            console.error('Error al agregar la categoría personalizada:', error);
        } finally {
            setLoading(false);
        }
    };

    // Eliminar una categoría personalizada
    const removeCategoryPerso = async (categoryId) => {
        if (!userId || !categoryId) return;
        setLoading(true);
        try {
            await api.post('/api/delete-custom-category', {  // cambiado a inglés
                user_id: userId,
                category_id: categoryId
            });
            setCategoriesPerso(prevCategories => prevCategories.filter(cat => cat.id !== categoryId));
        } catch (error) {
            console.error('Error al eliminar la categoría personalizada:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CategoryContext.Provider value={{
            categoriesDefault,
            categoriesPerso,
            categoriesCombined,
            loading,
            loadDefaultCategories,
            loadCombinedCategories,
            loadPersoCategories,
            addCategoryPerso,
            removeCategoryPerso,
            fetchUserId,
            userId
        }}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryContext;
