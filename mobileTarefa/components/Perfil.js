import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Button, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from './Firebase';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

const PerfilScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setName(data.name || '');
          setBio(data.bio || '');
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        await updateDoc(docRef, { name, bio });
        setUserData({ ...userData, name, bio });
        setIsEditing(false);
        Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar os dados.');
    }
  };

  const pickImageAndUpload = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true,
      });

      if (!result.canceled) {
        const base64Img = `data:image/jpg;base64,${result.assets[0].base64}`;
        // Dados para o Cloudinary
        const data = {
          file: base64Img,
          upload_preset: 'preset_publico',
          cloud_name: 'dyrjnu8aj',
        };

        const res = await fetch('https://api.cloudinary.com/v1_1/dyrjnu8aj/image/upload', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'content-type': 'application/json',
          },
        });

        const json = await res.json();

        if (json.secure_url) {
          const user = auth.currentUser;
          await updateDoc(doc(db, 'users', user.uid), {
            photoURL: json.secure_url,
          });
          // Atualiza os dados do usuário localmente
          setUserData(prev => ({ ...prev, photoURL: json.secure_url }));
          Alert.alert('Sucesso', 'Foto de perfil atualizada!');
        } else {
          Alert.alert('Erro', 'Erro ao enviar imagem. Verifique se o preset está correto.');
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Algo deu errado ao tentar fazer o upload.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBackground} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : userData ? (
        <>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Perfil do Usuário</Text>

            {userData.photoURL ? (
              <Image
                source={{ uri: userData.photoURL }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.imgPerfil}>
                <Text style={styles.imgText}>Nenhuma foto cadastrada.</Text>
              </View>
            )}
          </View>

          <Button title="Editar Foto de Perfil" onPress={pickImageAndUpload} />

          {isEditing ? (
            <>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Nome"
              />
              <TextInput
                style={styles.input}
                value={bio}
                onChangeText={setBio}
                placeholder="Bio"
              />
              <Button title="Salvar" onPress={handleSave} />
              <Button title="Cancelar" onPress={() => setIsEditing(false)} color="#888" />
            </>
          ) : (
            <>
              <Text>Nome:</Text>
              <Text style={styles.info}>{userData.name}</Text>
              
              <View style={styles.divider} />
              
              <Text>Bio:</Text>
              <Text style={styles.info}>{userData.bio}</Text>
              <Button title="Editar" onPress={() => setIsEditing(true)} />
            </>
          )}
        </>
      ) : (
        <Text>Usuário não encontrado.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff'
  },
  topBackground: {
    backgroundColor: '#0042BF',
    height: '50%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 20
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#ffffff'
  },
  info: {
    fontSize: 18,
    marginBottom: 5
  },
  input: {
    width: '100%',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    fontSize: 16,
    borderRadius: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  imgPerfil: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  imgText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666666'
  },
  divider: {
    height: 1,
    backgroundColor: 'gray',
    width: '100%',
    marginVertical: 8
  }
});

export default PerfilScreen;
