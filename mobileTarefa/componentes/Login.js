import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(getCredenciais().auth, email, password);
      navigation.replace('Home');
    } catch (err) {
      setError('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert('Atenção', 'Informe seu email para recuperar a senha.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Sucesso', 'Email de recuperação enviado. Verifique sua caixa de entrada.');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível enviar o email de recuperação.');
    }
  };

    return (
        <View style={styles.tela}>
            <View style={styles.container}>
                <Text style={styles.titulo}>
                    Bem-vindo!
                </Text>
                <Text style={styles.texto}>
                    Se conecte para continuar:
                </Text>

                <TextInput 
                    style={styles.input} 
                    placeholder="Email" 
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <TextInput 
                    style={styles.input} 
                    placeholder="Senha" 
                    secureTextEntry={true} 
                    value={password}
                    onChangeText={setPassword}
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity style={styles.botao} onPress={handleLogin}>
                    <Text style={styles.textoBotao}>Entrar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={styles.link}>
                        Cadastre-se aqui
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
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
        width: '100%',
        alignItems: 'center'
    },
    textoBotao: {
        color: '#fff',
        fontWeight: 'bold'
    },
    link: {
        marginTop: 10,
        color: '#ABBFA9'
    },
    error: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center'
    }
});
