import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

interface BackButtonWithTitleProps {
    title: string;
    onBackPress: () => void;
    iconSize?: number;
}

const BackButtonWithTitle: React.FC<BackButtonWithTitleProps> = ({
    title,
    onBackPress,
    iconSize = 18,
}) => {
    return (
        <View className="mt-5 flex flex-row justify-between items-center">
            <TouchableOpacity onPress={onBackPress}>
                <MaterialIcons name="arrow-back-ios" size={iconSize} color="black" />
            </TouchableOpacity>
            <Text
                className="text-4xl"
                style={{ fontFamily: "ShipporiMincho_400Regular" }}
            >
                {title}
            </Text>
            <View></View>
        </View>
    );
};
export default BackButtonWithTitle;