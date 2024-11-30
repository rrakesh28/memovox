import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import BackButtonWithTitle from "@/components/BackButtonWithTitle";
import NotesList from "@/components/NotesList";
import { View } from "react-native";

const WeekNotes = () => {
    const { week, month, year } = useLocalSearchParams<{ week: string, month: string, year: string }>();

    console.log(week)
    console.log(month)
    console.log(year)

    return (
        <View className="px-4">
            <BackButtonWithTitle onBackPress={() => { router.back(); }} title={`Week ${week}`} />
            <View className="mt-4">
                <NotesList weekNumber={parseInt(week)} month={parseInt(month)} year={parseInt(year)} />
            </View>
        </View>
    )
}

export default WeekNotes;