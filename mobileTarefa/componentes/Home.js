import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Home () {
    return (
    <View style={styles.tela}>
        <Text style={styles.titulo}>
            bgg
        </Text>
    </View>
    )
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: '#F0EBC9',
        padding: 20
    },

    titulo: {
        fontSize: 25
    }
})