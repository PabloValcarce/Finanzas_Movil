import { TransactionProvider } from './TransactionContext';
import { CategoryProvider } from './CategoryContext';
import { ThemeProvider } from './ThemeContext';
import { BudgetProvider } from './BudgetContext';
import { I18nextProvider } from 'react-i18next';
import i18n from '../assets/language/i18n';

const AppContextProvider = ({ children }) => {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <BudgetProvider>
          <CategoryProvider>
            <TransactionProvider>
              {children}
            </TransactionProvider>
          </CategoryProvider>
        </BudgetProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default AppContextProvider;
