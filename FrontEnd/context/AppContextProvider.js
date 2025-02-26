import { TransactionProvider } from './TransactionContext';
import { CategoryProvider } from './CategoryContext';

const AppContextProvider = ({ children }) => {

  return (
    <CategoryProvider> 
      <TransactionProvider>
        {children}
      </TransactionProvider>
    </CategoryProvider>
  );
};

export default AppContextProvider;
