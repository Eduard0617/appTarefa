import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { updateTarefa } from './Api';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditarTarefaScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const { tarefa } = route.params;

  const [titulo, setTitulo] = useState(tarefa.titulo);
  const [descricao, setDescricao] = useState(tarefa.descricao);
  const [formatedData, setFormatedData] = useState(tarefa.dataLimite.split('-').reverse().join('/'));
  const [dataLimite, setDataLimite] = useState(tarefa.dataLimite);
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      const dia = selectedDate.getDate().toString().padStart(2, '0');
      const mes = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const ano = selectedDate.getFullYear();
      setDataLimite(`${ano}/${mes}/${dia}`);
      setFormatedData(`${dia}/${mes}/${ano}`);
    }
  };

  const handleUpdate = async () => {
    if (!titulo.trim() || !descricao.trim() || !dataLimite.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      setLoading(true);
      const updatedData = {
        titulo,
        descricao,
        dataLimite
      };

      await updateTarefa(tarefa.id, updatedData);
      Alert.alert(
        'Sucesso',
        'Tarefa atualizada com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar Tarefa</Text>
      
      <View style={styles.form}>
        <Text style={styles.label}>Título:</Text>
        <TextInput
          style={styles.input}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Digite o título"
        />

        <Text style={styles.label}>Descrição:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Digite a descrição"
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Data Limite:</Text>
        <TouchableOpacity 
          style={styles.dateButton} 
          onPress={() => setShowPicker(true)}
        >
          <Text style={styles.dateButtonText}>
            {formatedData || "Selecione a data"}
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

        <TouchableOpacity 
          style={styles.botao}
          onPress={handleUpdate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textoBotao}>Atualizar Tarefa</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoCancelar}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0042BF',
    marginBottom: 20,
    textAlign: 'center'
  },
  form: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0042BF',
    marginTop: 10,
    marginBottom: 5
  },
  input: {
    width: '100%',
    minHeight: 40,
    borderColor: '#0042BF',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 10
  },
  dateButton: {
    width: '100%',
    height: 40,
    borderColor: '#0042BF',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  dateButtonText: {
    color: '#333',
    fontSize: 16
  },
  botao: {
    marginTop: 20,
    backgroundColor: '#0442BF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
  },
  botaoCancelar: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0042BF'
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textoBotaoCancelar: {
    color: '#0042BF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default EditarTarefaScreen;
