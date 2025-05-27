import {React, useState} from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Button } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth } from './Firebase';

export default function CadastroUsuario({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleRegister = async () => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
    
          Alert.alert('Sucesso! 🎉', 'Usuário cadastrado com sucesso!', [
            { text: 'OK', onPress: () => navigation.replace('Home') }
          ]);
        } catch (err) {
          Alert.alert('Erro', 'Não foi possível cadastrar. Tente novamente.');
        }
      };

    return (
        <View style={styles.tela}>
            <View style={styles.container}>
                <Text style={styles.titulo}>
                    Informe seus dados:
                </Text>
                <TextInput style={styles.input} placeholder="nome" value={name} onChangeText={setName}/>

                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail}/>

                <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} value={password} onChangeText={setPassword}/>

                <Button style={styles.botao} title="Cadastrar" onPress={handleRegister} />

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
