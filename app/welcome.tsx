import { Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Welcome = () => {

    const navigateUser = async () => {
        await AsyncStorage.setItem("intro_completed", "true");
        router.replace("/user");
    }

    return (
        <ImageBackground style={styles.background} source={require("../assets/images/bg.png")}>
            <SafeAreaView style={styles.container}>
                <View style={styles.headingContainer}>
                    <Text style={styles.heading}>Keep your</Text>
                    <Text style={styles.heading}>Mind Clear With</Text>
                    <View style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", justifyContent: "center" }}>
                        <Image style={styles.noteIcon} source={require("../assets/images/note_icon.png")} />
                        <Text style={styles.heading}>MemoVox</Text>
                    </View>
                </View>
                <View style={styles.introContainer}>
                    <View style={styles.introInnerContainer}>
                        <ImageBackground source={require("../assets/images/calender.png")} style={{ width: "100%", height: "100%", overflow: "hidden", borderRadius: 30, }}>
                            <Text style={{ width: "100%", fontSize: 16, fontWeight: "500", color: "#7B7B7A", position: "absolute", bottom: 60, textAlign: "center" }}>Develop the habit of
                                daily journaling</Text>
                            <View style={{ width: 250, position: "absolute", bottom: 30, display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                    <TouchableOpacity disabled={true} style={{ opacity: 0.5 }}>
                                        <Icon name="arrowleft" size={20} color="#000" />
                                    </TouchableOpacity>
                                    <Text>1/3</Text>
                                    <TouchableOpacity>
                                        <Icon name="arrowright" size={20} color="#000" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
                <Link href="/user" asChild>
                    <Pressable onPress={navigateUser} style={styles.button}>
                        <Text style={{ fontSize: 26, textAlign: "center", fontWeight: "bold" }}>Try it now</Text>
                    </Pressable>
                </Link>

            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        height: "100%",
        width: "100%"
    },
    container: {
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        paddingVertical: 40,
    },
    headingContainer: {
        width: "auto",
        marginTop: 50,
    },
    heading: {
        fontSize: 43,
        fontWeight: 900,
        textAlign: "center",
        fontFamily: "SpaceMono",
    },
    noteIcon: {
        width: 50,
        height: 50,
        objectFit: "contain",
        position: "relative",
    },
    introContainer: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    introInnerContainer: {
        height: 330,
        width: 250,
    },
    button: {
        backgroundColor: '#EBEBEA',
        borderColor: "#DEDFDB",
        borderRadius: 30,
        paddingVertical: 12,
    }
});

export default Welcome;