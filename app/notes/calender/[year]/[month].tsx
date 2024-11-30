import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { getNumberOfWeeksInMonth } from "@/utils/numberOfWeeksInMonth";
import BackButtonWithTitle from "@/components/BackButtonWithTitle";
import { getMonthName } from "@/utils/monthUtils";
import WeekAccordion from "@/components/WeekAccordian";

const MonthNotes = () => {
  const { month, year } = useLocalSearchParams<{
    month: string;
    year: string;
  }>();

  console.log(month);
  console.log(year);

  const weeksInMonth = getNumberOfWeeksInMonth(parseInt(year), parseInt(month));

  const monthName = getMonthName(parseInt(month));

  return (
    <View className="px-4">
      <BackButtonWithTitle
        onBackPress={() => {
          router.back();
        }}
        title={monthName}
      />
      <View className="mt-4">
        {Array.from({ length: weeksInMonth }, (_, index) => (
          <WeekAccordion
            key={index}
            weekNumber={index + 1}
            month={parseInt(month)}
            year={parseInt(year)}
          />
        ))}
      </View>
    </View>
  );
};

export default MonthNotes;
