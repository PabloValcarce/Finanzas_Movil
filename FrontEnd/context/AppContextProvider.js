import { TransactionProvider } from './TransactionContext';
import { CategoryProvider } from './CategoryContext'; 
import { ThemeProvider } from './ThemeContext';  // Importa el ThemeProvider, no ThemeContext

const AppContextProvider = ({ children }) => {
  return (
    <ThemeProvider> 
      <CategoryProvider>
        <TransactionProvider>
          {children}
        </TransactionProvider>
      </CategoryProvider>
    </ThemeProvider>
  );
};

export default AppContextProvider;
