import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import NotesList from "./NotesList";

const WeekAccordion = ({ weekNumber, month, year }: { weekNumber: number, month: number, year: number }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <View className="mb-4">
            <TouchableOpacity
                onPress={toggleAccordion}
                className="flex flex-row justify-between bg-soft-beige p-4"
            >
                <Text className="text-lg font-semibold">Week {weekNumber}</Text>
                <MaterialIcons
                    name={isOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                    size={24}
                    color="black"
                    className="inline-block"
                />
            </TouchableOpacity>
            {isOpen && (
                <View className="">
                    <NotesList weekNumber={weekNumber} month={month} year={year} />
                </View>
            )}
        </View>
    );
};

export default WeekAccordion;
