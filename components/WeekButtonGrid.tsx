import { getNumberOfWeeksInMonth } from "@/utils/numberOfWeeksInMonth";
import { Link } from "expo-router";
import React from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";

interface Props {
  currentYear: number;
  currentMonth: number;
}

const WeekButtonGrid: React.FC<Props> = ({ currentYear, currentMonth }) => {
  const weeksInMonth = getNumberOfWeeksInMonth(currentYear, currentMonth);

  const weekButtons = [];
  for (let i = 1; i <= weeksInMonth; i++) {
    weekButtons.push(
      <Link
        href={`/notes/calender/${currentYear}/${currentMonth}/${i}`}
        key={i}
        className="bg-soft-beige py-4 mx-2"
      >
        <Text className="text-center">Week {i} entires</Text>
      </Link>
    );
  }

  return (
    <View className="flex-1 justify-center items-center p-5">
      <View className="flex-row flex-wrap justify-between w-full">
        {weekButtons.map((button, index) => (
          <View className="w-1/2 mb-4" key={index}>
            {button}
          </View>
        ))}
      </View>
    </View>
  );
};

export default WeekButtonGrid;
