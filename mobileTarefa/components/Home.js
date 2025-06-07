import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { fetchTarefas, fetchToggleStatus, deleteTarefa } from './Api';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const tarefasData = await fetchTarefas();
      setTarefas(tarefasData.tarefas || []);
      }
      catch(error){
        setTarefas([]);
        console.error('Erro ao buscar tarefas:', error);  
      }
      finally{
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    const toggleStatus = async () => {
      const data = await fetchToggleStatus(item.id);
      if (data) {
        setTarefas((prevTarefas) =>
          prevTarefas.map((tarefa) =>
            tarefa.id === item.id ? { ...tarefa, concluido: !tarefa.concluido } : tarefa
          )
        );
      }
    };

    return (
      <TouchableOpacity onPress={() => navigation.navigate('ExibirTarefa', { tarefa: item })} style={styles.card}>
        <Text style={styles.title}>{item.titulo}</Text>
        <Text>{item.descricao.length > 100 ? item.descricao.substring(0, 100) + '...' : item.descricao}</Text>
        <Text style={[styles.badge, item.concluido ? styles.concluido : styles.pendente]}>
          {item.concluido ? 'Concluído' : 'Pendente'}
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={toggleStatus} >
            <Ionicons
              name={item.concluido ? 'close-circle-outline' : 'checkmark-circle-outline'}
              size={35}
              color={item.concluido ? "#ff0000" : "#8FBC8F"}
              style={{ marginRight: 8 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.editButton]}
            onPress={() => navigation.navigate('EditarTarefa', { tarefa: item })}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => navigation.navigate('ExcluirTarefa', { tarefa: item })}
          >
            <Text style={styles.buttonText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity >
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minhas Tarefas:</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#8FBC8F" />
      ) : tarefas.length === 0 ? (
        <Text style={styles.noTarefas}>Você ainda não possui tarefas</Text>
      ) : (
        <FlatList
          data={tarefas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0042BF'
  },
  list: {
    paddingBottom: 80,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#003699'
  },

  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginTop: 8,
    color: '#fff',
    fontWeight: 'bold',
  },

  concluido: {
    backgroundColor: '#4CAF50'
  },

  pendente: {
    backgroundColor: '#0042BF'
  },

  actions: {
    flexDirection: 'row',
    marginTop: 12
  },

  button: {
    flex: 1,
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#8FBC8F'
  },
  deleteButton: {
    backgroundColor: '#f44336'
  },
  buttonText: {
    color: '#fff', fontWeight: 'bold'
  },
  novaTarefaButton: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
  },
  novaTarefaText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  noTarefas: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16, 
    color: '#0442BF'
  },

  toggleButton: {
    backgroundColor: '#FFA500',
  },
});

export default HomeScreen;
