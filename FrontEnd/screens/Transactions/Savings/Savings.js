import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SavingsLogic } from './SavingsLogic';
import SavingsSummary from '../../../components/Savings/Summary/SavingsSummary';
import SavingsCircularChart from '../../../components/Graphs/Savings/CircularChart/SavingsCircularChart';
import NavBarTransaction from '../../../components/NavBarTransaction/NavBarTransaction';
import DateRangePicker from '../../../components/DateRangePicker/DateRangePicker';
import styles from './Savings.styles';

function Savings() {
    const { dateRange, setDateRange, filteredTransactions, handleResetDates, transactions } = SavingsLogic();

    return (
        <View style={styles.savingsPage}>
            <NavBarTransaction />
            <View style={styles.dateFilter}>
                <View style={styles.headDatePicker}>
                    <Text style={styles.label}>Filtro entre fechas:</Text>
                </View>
                <DateRangePicker
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    onDateRangeChange={setDateRange}
                    onReset={handleResetDates}
                />
            </View>
            <ScrollView vertical contentContainerStyle={styles.savingsData}>
                <SavingsSummary transactions={filteredTransactions} />
                <View style={styles.savingsGraphs}>

                    <View style={styles.savingsCircularChart}>
                        <SavingsCircularChart transactions={transactions} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

export default Savings;
