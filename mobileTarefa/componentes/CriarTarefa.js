import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, StatusBar } from "react-native";

export default function Perfil() {
    return (
        <View style={styles.tela}>
            <Text style={styles.alinha}>
                tarefas
            </Text>
            <TouchableOpacity>
                <Text style={styles.link} onPress={() => navigation.navigate('Cadastro')}>
                    cadastra-se aqui
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: '#F0EBC9',
        padding: 20
    },
})