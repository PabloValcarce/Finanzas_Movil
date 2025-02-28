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
    const [categories, setCategories] = useState([]);
    const [categoriesDefault, setCategoriesDefault] = useState([]);
    const [categoriesPerso, setCategoriesPerso] = useState([]);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUserId();
    }, []);
    
    // Obtener userId desde el token
    const fetchUserId = async () => {
        try {
            const access_token = await AsyncStorage.getItem('access_token');
            console.log(access_token); 
            if (access_token) {
                const decoded = jwtDecode(access_token);
                setUserId(decoded.user_id);
                console.log("User ID:", decoded.user_id);
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
            const response = await api.get('/api/get-categorias-default');
            setCategoriesDefault(response.data.categorias);
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
            const response = await api.get(`/api/get-categorias-combinadas/${userId}`);
            setCategories(response.data.categorias); 
        } catch (error) {
            console.error('Error al cargar las categorías combinadas:', error);
        } finally {
            setLoading(false);
        }
    };

    // Cargar categorías personalizadas del usuario
    const loadPersonalizedCategories = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const response = await api.get(`/api/get-categorias-personalizadas/${userId}`);
            setCategoriesPerso(response.data.categorias); 
        } catch (error) {
            console.error('Error al cargar las categorías personalizadas:', error);
        } finally {
            setLoading(false);
        }
    };

    // Agregar una categoría personalizada con icono
    const addPersonalizedCategory = async (categoryName, icono) => {
        if (!userId || !categoryName.trim()) return;
        setLoading(true);
        try {
            const response = await api.post('/api/add-categoria-personalizada', {
                nombre: categoryName,
                user_id: userId,
                icono: icono  // Asegúrate de enviar el icono
            });
            setCategories(prevCategories => [...prevCategories, response.data]);
        } catch (error) {
            console.error('Error al agregar la categoría personalizada:', error);
        } finally {
            setLoading(false);
        }
    };

    // Eliminar una categoría personalizada
    const removePersonalizedCategory = async (categoryId) => {
        if (!userId || !categoryId) return;
        setLoading(true);
        try {
            await api.post('/api/eliminar-categoria-personalizada', {
                user_id: userId,
                categoria_id: categoryId
            });
            setCategories(prevCategories => prevCategories.filter(cat => cat.id !== categoryId));
        } catch (error) {
            console.error('Error al eliminar la categoría personalizada:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <CategoryContext.Provider value={{
            categories,
            categoriesDefault,
            categoriesPerso,
            loading,
            loadDefaultCategories,
            loadCombinedCategories,
            loadPersonalizedCategories,
            addPersonalizedCategory,
            removePersonalizedCategory,
            fetchUserId,
            userId
        }}>
            {children}
        </CategoryContext.Provider>
    );
};

export default CategoryContext;
