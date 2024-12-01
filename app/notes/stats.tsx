import BackButtonWithTitle from "@/components/BackButtonWithTitle";
import {
  getDatesByMonth,
  getMostRecentDate,
  getNotesCount,
} from "@/database/notesDb";
import { calculateStreak } from "@/utils/getStreak";
import { shortMonths } from "@/utils/monthUtils";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

const Stats = () => {
  const [streak, setStreak] = useState<number>(0);
  const [journals, setJournals] = useState<number>(0);
  const [dates, setDates] = useState<number[]>([]);

  useEffect(() => {
    checkStreak();
    getCount();
    fetchDates();
  }, []);

  const getCount = async () => {
    const count = await getNotesCount();
    setJournals(count);
  };

  const checkStreak = () => {
    getMostRecentDate()
      .then((recentDate) => {
        if (recentDate) {
          const isStreakContinued = calculateStreak(recentDate);
          if (isStreakContinued) {
            setStreak((prev) => prev + 1);
          } else {
            setStreak(1);
          }
        } else {
          setStreak(0);
        }
      })
      .catch((error) => console.log(error));
  };

  const fetchDates = async () => {
    const datesResult: number[] = await getDatesByMonth(new Date().getMonth());
    setDates(datesResult);
  };

  const daysInMonth = (year: number, month: number): number => {
    return new Date(year, month, 0).getDate();
  };

  const renderCalendar = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();

    const totalDays = Array.from(
      { length: daysInMonth(year, month + 1) },
      (_, i) => i + 1
    );

    const monthName = shortMonths[month];

    return (
      <FlatList
        data={totalDays}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View className={` w-1/4 aspect-[1.2]  items-center justify-center`}>
            {dates && Array.isArray(dates) && dates.includes(item) && (
              <Feather name="check" size={24} color="black" />
            )}
            <Text className={`  text-gray-800 font-bold `}>
              {item} {monthName}
            </Text>
          </View>
        )}
      />
    );
  };

  return (
    <SafeAreaView className="px-4">
      <ScrollView>
        <BackButtonWithTitle
          title=""
          onBackPress={() => {
            router.back();
          }}
        />
        <Text
          className="text-4xl text-center mt-2"
          style={{ fontFamily: "ShipporiMincho_400Regular" }}
        >
          Insights
        </Text>
        <View className="flex flex-row mt-10">
          <View className="w-1/2 flex flex-row justify-center">
            <View className="flex flex-col items-center justify-center w-[110px] rounded-xl py-6 bg-soft-beige">
              <Text className="text-[4rem] font-bold text-accent-highlight text-center">
                {streak}
              </Text>
              <Text className="text-xl text-accent-highlight text-center">
                Streak
              </Text>
            </View>
          </View>
          <View className="w-1/2 flex flex-row justify-center">
            <View className="flex flex-col items-center justify-center w-[110px] rounded-xl py-6 bg-soft-beige">
              <Text className="text-[4rem] font-bold text-accent-highlight text-center">
                {journals}
              </Text>
              <Text className="text-xl text-accent-highlight text-center">
                Journals
              </Text>
            </View>
          </View>
        </View>
        <View className="mt-10">{renderCalendar()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stats;
