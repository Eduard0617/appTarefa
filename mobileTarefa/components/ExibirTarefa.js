import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchToggleStatus } from './Api';
import { Ionicons } from '@expo/vector-icons';

const ExibirTarefaScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const { tarefa } = route.params;
  const [tarefaAtual, setTarefaAtual] = useState(tarefa);

  const handleToggleStatus = async () => {
    try {
      setLoading(true);
      const data = await fetchToggleStatus(tarefaAtual.id);
      if (data) {
        setTarefaAtual(prev => ({
          ...prev,
          concluido: !prev.concluido
        }));
        Alert.alert('Sucesso', 'Status da tarefa atualizado com sucesso!');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o status da tarefa.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = () => {
    navigation.navigate('EditarTarefa', { tarefa: tarefaAtual });
  };

  const handleExcluir = () => {
    navigation.navigate('ExcluirTarefa', { tarefa: tarefaAtual });
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>{tarefaAtual.titulo}</Text>
        
        <View style={styles.secao}>
          <Text style={styles.label}>Descrição:</Text>
          <Text style={styles.valor}>{tarefaAtual.descricao}</Text>
        </View>

        <View style={styles.secao}>
          <Text style={styles.label}>Data Limite:</Text>
          <Text style={styles.valor}>
            {tarefaAtual.dataLimite.split('-').reverse().join('/')}
          </Text>
        </View>

        <View style={styles.secao}>
          <Text style={styles.label}>Status:</Text>
          <Text style={[
            styles.status,
            tarefaAtual.concluido ? styles.concluido : styles.pendente
          ]}>
            {tarefaAtual.concluido ? 'Concluído' : 'Pendente'}
          </Text>
        </View>

        <View style={styles.acoes}>
          <TouchableOpacity 
            style={[styles.botao, styles.botaoStatus]}
            onPress={handleToggleStatus}
            disabled={loading}
          >
            <Ionicons
              name={tarefaAtual.concluido ? 'close-circle-outline' : 'checkmark-circle-outline'}
              size={24}
              color="#fff"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.textoBotao}>
              {tarefaAtual.concluido ? 'Marcar como Pendente' : 'Marcar como Concluído'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.botao, styles.botaoEditar]}
            onPress={handleEditar}
            disabled={loading}
          >
            <Ionicons name="create-outline" size={24} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.textoBotao}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.botao, styles.botaoExcluir]}
            onPress={handleExcluir}
            disabled={loading}
          >
            <Ionicons name="trash-outline" size={24} color="#fff" style={{ marginRight: 8 }} />
            <Text style={styles.textoBotao}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#0042BF" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0042BF',
    marginBottom: 20,
    textAlign: 'center'
  },
  secao: {
    marginBottom: 15
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0042BF',
    marginBottom: 5
  },
  valor: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24
  },
  status: {
    fontSize: 16,
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
  acoes: {
    marginTop: 20,
    gap: 10
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10
  },
  botaoStatus: {
    backgroundColor: '#0042BF'
  },
  botaoEditar: {
    backgroundColor: '#8FBC8F'
  },
  botaoExcluir: {
    backgroundColor: '#ff4444'
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  loading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ExibirTarefaScreen;
