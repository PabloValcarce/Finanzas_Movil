import { useState, useEffect } from 'react';
import { useCategories } from '../../../context/CategoryContext';  // Importa el contexto

const useConfigurationLogic = () => {
    const {
        categoriesPerso,
        loading,
        loadPersonalizedCategories,
        addPersonalizedCategory,
        removePersonalizedCategory
    } = useCategories();  

    const [nuevaCategoria, setNuevaCategoria] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('smile');

    useEffect(() => {
        loadPersonalizedCategories();  
    }, []);  
    const agregarCategoria = async () => {
        if (!nuevaCategoria.trim()) return;  
        try {
            await addPersonalizedCategory(nuevaCategoria, selectedIcon);
            await loadPersonalizedCategories();  
    
            // Solo resetear después de que todo se haya completado
            setNuevaCategoria('');
            setSelectedIcon('smile');
        } catch (error) {
            console.error('Error al agregar categoría:', error);
        }
    };
    

    const eliminarCategoria = async(categoriaId) => {
        await removePersonalizedCategory(categoriaId);  
        loadPersonalizedCategories();
    };

    return {
        categorias: categoriesPerso,  // Usamos las categorías desde el contexto
        nuevaCategoria,
        setNuevaCategoria,
        setSelectedIcon,
        selectedIcon,
        agregarCategoria,
        eliminarCategoria,
        loading  // Usamos el estado de carga desde el contexto
    };
};

export default useConfigurationLogic;
