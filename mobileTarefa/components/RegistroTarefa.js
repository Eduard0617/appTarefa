import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createTarefa } from './Api';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegistroTarefaScreen = ({ navigation }) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [dataLimite, setDataLimite] = useState('');
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      const dia = selectedDate.getDate().toString().padStart(2, '0');
      const mes = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const ano = selectedDate.getFullYear();
      setDataLimite(`${dia}/${mes}/${ano}`);
    }
  };

  const handleRegister = async () => {
    const tarefaData = {
      titulo,
      descricao,
      dataLimite
    }
    try {
      await createTarefa(tarefaData);
      Alert.alert('Sucesso! 🎉', 'Tarefa cadastrada com sucesso!', [
        { text: 'OK', onPress: () => navigation.replace('Tabs') }
      ]);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível cadastrar a Tarefa. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Tarefas</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Titulo" 
        value={titulo} 
        onChangeText={setTitulo}
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="descricao" 
        value={descricao} 
        onChangeText={setDescricao}
      />

      <TouchableOpacity 
        style={styles.dateButton} 
        onPress={() => setShowPicker(true)}
      >
        <Text style={styles.dateButtonText}>
          {dataLimite || "Data Limite"}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          mode="date"
          value={new Date()}
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}

      <TouchableOpacity style={styles.botao} onPress={handleRegister}>
        <Text style={styles.textoBotao}>Criar Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  titulo: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#0042BF'
  },

  input: {
    width: '80%',
    height: 40,
    borderColor: '#0442BF',
    borderWidth: 1.5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    marginTop: 10
  },

  dateButton: {
    width: '80%',
    height: 40,
    borderColor: '#0442BF',
    borderWidth: 1.5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    marginTop: 10,
    justifyContent: 'center',
    paddingHorizontal: 10
  },

  dateButtonText: {
    color: '#666',
    fontSize: 14
  },

  botao: {
    marginTop: 20,
    backgroundColor: '#0442BF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black'
  },

  textoBotao: {
    color: '#fff',
    fontWeight: 'bold'
  },
});

export default RegistroTarefaScreen;
