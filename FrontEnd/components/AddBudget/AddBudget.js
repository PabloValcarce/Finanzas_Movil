import React from 'react';
import AddBudgetLogic from './AddBudgetLogic';

const AddBudget = ({ userId, isDark, categoriesCombined }) => {

    return (
        <AddBudgetLogic isDark={isDark} categoriesCombined={categoriesCombined} />
    );
    }
    
export default AddBudget;