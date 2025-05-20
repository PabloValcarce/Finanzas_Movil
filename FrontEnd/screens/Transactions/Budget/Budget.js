import { Text, View, ScrollView } from 'react-native';
import NavBarTransaction from '../../../components/NavBarTransaction/NavBarTransaction';
import DateRangePicker from '../../../components/DateRangePicker/DateRangePicker';
import { useTheme } from '../../../context/ThemeContext';
import styles from './Budget.styles';
import { useTranslation } from 'react-i18next';
import { useBudgetLogic } from './BudgetLogic';
import { ActivityIndicator } from 'react-native';
import AddBudget from '../../../components/AddBudget/AddBudget';
import BudgetCard from '../../../components/Budget/Card/BudgetCard';


function Budget() {

    const { isDark } = useTheme();
    const dynamicStyles = styles(isDark);
    const { t } = useTranslation();
    const { categoriesCombined, loading, budgetsFiltered, dateRange, setDateRange } = useBudgetLogic();
    if (loading) {
        return (
            <View style={dynamicStyles.spentPageContent}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView style={dynamicStyles.budgetPage}>
            <NavBarTransaction />
            <View style={dynamicStyles.budgetPageContent}>
                <View style={dynamicStyles.headFilterAdd}>
                    <DateRangePicker
                        initialStartDate={dateRange.startDate}
                        initialEndDate={dateRange.endDate}
                        onDateRangeChange={(range) => setDateRange(range)}
                        isDark={isDark} />

                    <AddBudget isDark={isDark} categoriesCombined={categoriesCombined} />
                </View>
                <View style={dynamicStyles.budgetData}>
                    {budgetsFiltered.length === 0 && (
                        <Text style={dynamicStyles.NoBudgets}>{t('Budgets.NoBudgets')}</Text>
                    )}
                    {budgetsFiltered.map(budget => (
                        <BudgetCard key={budget.id} budget={budget} isDark={isDark} />
                    ))}

                </View>
            </View>
        </ScrollView>
    );
}
export default Budget;