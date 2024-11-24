import React from 'react';
import { View, TextInput, StyleSheet, Dimensions, Text } from 'react-native';

const Notes = () => {
    const renderGridLines = () => {
        const gridHeight = 300;
        const lineHeight = 34;
        const numOfLines = Math.floor(gridHeight / lineHeight);
        let lines = [];

        for (let i = 0; i < numOfLines; i++) {
            lines.push(
                <View key={i} style={[styles.line, { top: i * lineHeight }]} />
            );
        }
        return lines;
    };

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {renderGridLines()}
                <Text style={styles.textInput}>test</Text>
                <TextInput
                    style={styles.textInput}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    grid: {
        position: 'relative',
        width: '100%',
        height: 300,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
    },
    line: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: '#ccc',
    },
    textInput: {
        position: 'absolute',
        top: 0,
        left: 0,
        textAlignVertical: 'top',
        width: '100%',
        height: '100%',
        paddingLeft: 8,
        paddingTop: 8,   // Adds space at the top
        paddingBottom: 8, // Adds space at the bottom
        fontSize: 20,
        lineHeight: 100,
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: 'transparent',
    },
});

export default Notes;
