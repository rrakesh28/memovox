import { Link } from 'expo-router';
import React from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';

interface Month {
    label: string;
    month: string;
}

interface MonthButtonProps {
    label: string;
    year: number;
    month: number;
}

interface YearSelectionProps {
    isYearSelection: boolean;
    year: number;
}

const months: Month[] = [
    { label: 'Jan Entries', month: 'January' },
    { label: 'Feb Entries', month: 'February' },
    { label: 'Mar Entries', month: 'March' },
    { label: 'Apr Entries', month: 'April' },
    { label: 'May Entries', month: 'May' },
    { label: 'Jun Entries', month: 'June' },
    { label: 'Jul Entries', month: 'July' },
    { label: 'Aug Entries', month: 'August' },
    { label: 'Sep Entries', month: 'September' },
    { label: 'Oct Entries', month: 'October' },
    { label: 'Nov Entries', month: 'November' },
    { label: 'Dec Entries', month: 'December' },
];

const MonthButton: React.FC<MonthButtonProps> = ({ label, year, month }) => (
    <Link href={`/notes/calender/${year}/${month}`} className="bg-soft-beige py-6">
        <Text className="text-center">{label}</Text>
    </Link>
);

const MonthButtonGrid: React.FC<YearSelectionProps> = ({ isYearSelection, year }) => {
    if (!isYearSelection) return null;

    return (
        <View className="flex-1 justify-center items-center p-5">
            <FlatList
                data={months}
                renderItem={({ item, index }) => (
                    <View className='w-1/2 p-2'>
                        <MonthButton
                            label={item.label}
                            year={year}
                            month={index}
                        />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                scrollEnabled={false}
            />
        </View>
    );
};

export default MonthButtonGrid;
