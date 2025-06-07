import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from './Firebase';

const RegistroScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Salvar nome e bio no Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name,
        bio
      });

      Alert.alert(
        'Sucesso! 🎉', 
        'Usuário cadastrado com sucesso!',
        [
          { 
            text: 'OK', 
            onPress: () => {
              // Fazer logout do usuário recém-criado
              auth.signOut();
              // Navegar para a tela de login
              navigation.replace('Login');
            }
          }
        ]
      );
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível cadastrar. Tente novamente.');
    }
  };

  return (
    <View style={styles.tela}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Cadastro</Text>
        <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Bio" value={bio} onChangeText={setBio} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={styles.botao} title="Cadastrar" onPress={handleRegister} >
          <Text style={styles.textoBotao}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  container: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    borderColor: '#0042BF',
    borderWidth: 1,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350
  },

  titulo: {
    fontSize: 25,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#0042BF'
  },

  input: {
    width: '100%',
    minHeight: 40,
    borderColor: '#0442BF',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 10
  },

  botao: {
    marginTop: 20,
    backgroundColor: '#0042BF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
});

export default RegistroScreen;
