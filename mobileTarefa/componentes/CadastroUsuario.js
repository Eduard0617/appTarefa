import React from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function Home({ navigation }) {
    return (
        <View style={styles.tela}>
            <View style={styles.container}>
                <Text style={styles.titulo}>
                    Informe seus dados:
                </Text>
                <TextInput style={styles.input} placeholder="nome" />

                <TextInput style={styles.input} placeholder="Email" />

                <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} />

                <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Tabs')}>
                    <Text style={styles.textoBotao}>Cadastrar</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F0EBC9'
    },

    container: {
        backgroundColor: '#F0ECE0',
        padding: 20,
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
        alignItems: 'center',
        width: '100%',
        maxWidth: 350
    },

    texto: {
        fontSize: 15,
    },

    titulo: {
        fontSize: 25,
        marginBottom: 10,
        fontWeight: 'bold'
    },

    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginTop: 10
    },

    botao: {
        marginTop: 20,
        backgroundColor: '#8FBC8F',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },

    textoBotao: {
        color: '#fff',
        fontWeight: 'bold'
    },

    link: {
        marginTop: 10,
        color: '#ABBFA9'
    }
});
