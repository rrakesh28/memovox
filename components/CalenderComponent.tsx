import { formatDate } from "@/utils/formatDate";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

interface CalendarProps {
  onDayPress?: (date: { year: number; month: number; day: number }) => void;
}

const CalendarComponent: React.FC<CalendarProps> = ({ onDayPress }) => {
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [isYearSelection, setIsYearSelection] = useState<boolean>(false);
  const [isMonthSelection, setIsMonthSelection] = useState<boolean>(false);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const shortName = (monthName: string): string => {
    const monthIndex = months.indexOf(monthName);
    if (monthIndex !== -1) {
      return shortMonths[monthIndex];
    }
    return monthName;
  };

  const daysInMonth = (year: number, month: number): number => {
    return new Date(year, month, 0).getDate();
  };

  const toggleYearSelection = (): void => {
    setIsYearSelection(!isYearSelection);
    setIsMonthSelection(false);
  };

  const toggleMonthSelection = (): void => {
    setIsMonthSelection(!isMonthSelection);
    setIsYearSelection(false);
  };

  const handleYearPress = (year: number): void => {
    setCurrentYear(year);
    setIsYearSelection(false);
  };

  const handleMonthPress = (index: number): void => {
    setCurrentMonth(index + 1); // Months are 1-indexed
    setIsMonthSelection(false);
  };

  const handleDayPress = (day: number): void => {
    if (onDayPress) {
      onDayPress({ year: currentYear, month: currentMonth, day });
    }
  };

  const renderCalendar = () => {
    const totalDays = daysInMonth(currentYear, currentMonth);
    const firstDayOfWeek = new Date(currentYear, currentMonth - 1, 1).getDay();

    const daysArray = Array.from({ length: totalDays }, (_, i) => i + 1);
    const paddingDays = Array.from({ length: firstDayOfWeek }, () => null);

    const calendarDays = [...paddingDays, ...daysArray];

    return (
      <FlatList
        data={calendarDays}
        keyExtractor={(item, index) => index.toString()}
        numColumns={7}
        renderItem={({ item }) =>
          item ? (
            <TouchableOpacity
              className="w-1/7 h-16  items-center justify-center"
              onPress={() => handleDayPress(item)}
            >
              <Text className="text-gray-800 font-bold">{item}</Text>
            </TouchableOpacity>
          ) : (
            <View className="w-1/7 h-16 " />
          )
        }
      />
    );
  };
  console.log(currentMonth);

  return (
    <View className="flex-1">
      <Text
        className="my-10 text-2xl"
        style={{ fontFamily: "ShipporiMincho_400Regular" }}
      >
        {formatDate(new Date().toISOString(), "long")}
      </Text>

      {!isYearSelection && !isMonthSelection && (
        <View className="p-1 mt-4 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={toggleMonthSelection}
            className="bg-soft-beige px-4 py-2 rounded-lg"
          >
            <Text
              className="text-xl"
              style={{ fontFamily: "ShipporiMincho_400Regular" }}
            >
              {months[currentMonth - 1]},{currentYear}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isYearSelection && (
        <View className="p-1 mt-4 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={toggleYearSelection}
            className="bg-soft-beige px-6 py-2 rounded-lg"
          >
            <Text
              className="text-xl"
              style={{ fontFamily: "ShipporiMincho_400Regular" }}
            >
              {currentYear}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isMonthSelection && (
        <View className="p-1 mt-4 flex-row justify-between items-center">
          <TouchableOpacity
            onPress={toggleYearSelection}
            className="bg-soft-beige px-6 py-2 rounded-lg"
          >
            <Text
              className="text-xl"
              style={{ fontFamily: "ShipporiMincho_400Regular" }}
            >
              {currentYear}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {isYearSelection && (
        <FlatList
          data={Array.from({ length: 30 }, (_, i) => currentYear - 15 + i)}
          keyExtractor={(item) => item.toString()}
          numColumns={4}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="w-1/4 p-3 m-1 bg-blue-100 rounded-lg items-center"
              onPress={() => handleYearPress(item)}
            >
              <Text className="text-blue-800 font-bold text-base">{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      {isMonthSelection && (
        <View className="mt-5">
          <FlatList
            data={months}
            keyExtractor={(item, index) => index.toString()}
            numColumns={4}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                className="w-1/4 h-16 mb-5 items-center justify-center "
                onPress={() => handleMonthPress(index)}
              >
                <View
                  className={`${
                    currentMonth === index + 1 ? "bg-accent-highlight" : ""
                  } h-16 w-16 items-center justify-center rounded-full`}
                >
                  <Text
                    className={`${
                      currentMonth == index + 1 ? "text-white" : ""
                    } text-base text-center`}
                  >
                    {shortName(item)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {!isYearSelection && !isMonthSelection && (
        <View className="mt-5">
          <View className="w-full flex-row">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <Text
                key={day}
                className="text-gray-800 w-1/7 text-center font-bold text-lg"
              >
                {day}
              </Text>
            ))}
          </View>
          {renderCalendar()}
        </View>
      )}
    </View>
  );
};

export default CalendarComponent;
