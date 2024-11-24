import CalendarComponent from "@/components/CalenderComponent";
import Fontisto from "@expo/vector-icons/Fontisto";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

const Calender = () => {
  return (
    <View className="flex-1 px-4">
      <View className="mt-5 flex flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <MaterialIcons name="arrow-back-ios" size={18} color="black" />
        </TouchableOpacity>
      </View>
      <CalendarComponent onDayPress={(date) => console.log(date)} />
    </View>
  );
};

export default Calender;
