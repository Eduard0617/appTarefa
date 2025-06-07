import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { deleteTarefa } from './Api';
import { useNavigation, useRoute } from '@react-navigation/native';

const ExcluirTarefaScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const { tarefa } = route.params;

  const handleExcluir = async () => {
    try {
      setLoading(true);
      
      await deleteTarefa(tarefa.id);
      Alert.alert(
        'Sucesso',
        'Tarefa excluída com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Tabs')
          }
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir a tarefa. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const confirmarExclusao = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          onPress: handleExcluir,
          style: 'destructive'
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes da Tarefa</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Título:</Text>
        <Text style={styles.valor}>{tarefa.titulo}</Text>

        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.valor}>{tarefa.descricao}</Text>

        <Text style={styles.label}>Data Limite:</Text>
        <Text style={styles.valor}>{tarefa.dataLimite}</Text>

        <Text style={styles.label}>Status:</Text>
        <Text style={[                  
          styles.valor,
          styles.status,
          tarefa.concluido ? styles.concluido : styles.pendente
        ]}>
          {tarefa.concluido ? 'Concluído' : 'Pendente'}
        </Text>
      </View>

      <TouchableOpacity 
        style={styles.botaoExcluir}
        onPress={confirmarExclusao}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.textoBotao}>Excluir Tarefa</Text>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
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
  valor: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15
  },
  status: {
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start'
  },
  concluido: {
    backgroundColor: '#4CAF50',
    color: '#fff'
  },
  pendente: {
    backgroundColor: '#FFA500',
    color: '#fff'
  },
  botaoExcluir: {
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  botaoCancelar: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#0042BF'
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  textoBotaoCancelar: {
    color: '#0042BF',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

export default ExcluirTarefaScreen;
