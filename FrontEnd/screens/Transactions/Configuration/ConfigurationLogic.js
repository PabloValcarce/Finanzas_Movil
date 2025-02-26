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

    useEffect(() => {
        loadPersonalizedCategories();  
    }, []);  

    const agregarCategoria = async () => {
        if (!nuevaCategoria.trim()) return;  
        await addPersonalizedCategory(nuevaCategoria);
        setNuevaCategoria('');
        loadPersonalizedCategories();
    };

    const eliminarCategoria = async(categoriaId) => {
        await removePersonalizedCategory(categoriaId);  
        loadPersonalizedCategories();
    };

    return {
        categorias: categoriesPerso,  // Usamos las categorías desde el contexto
        nuevaCategoria,
        setNuevaCategoria,
        agregarCategoria,
        eliminarCategoria,
        loading  // Usamos el estado de carga desde el contexto
    };
};

export default useConfigurationLogic;
