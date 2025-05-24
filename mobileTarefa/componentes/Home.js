import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

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
        backgroundColor: '#F0EBC9'
    },

    titulo: {
        fontSize: 25
    }
})