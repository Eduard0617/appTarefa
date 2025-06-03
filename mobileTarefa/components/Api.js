const API_URL = 'http://10.0.2.2:8000/api/tarefas';
import { Alert } from 'react-native';
import { auth } from './Firebase';

const getUid = () => {
  const user = auth.currentUser;
  if (user) return user.uid;
  throw new Error('Usuário não autenticado');
};

export const fetchTarefas = async () => {
  try {
    const userId = await getUid();
    const response = await fetch(API_URL, {
      headers: {
        method: 'POST',
        'X-User-Id': userId,
      },
    });

    if (!response.ok) throw new Error('Erro ao buscar tarefas');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error.message);
    Alert.alert('Erro', `Não foi possível buscar as tarefas: ${error.message}`);
  }
};

export const createTarefa = async (tarefaData) => {
  try {

    const userId = await getUid();
    const data = tarefaData.dataLimite;
    const ano = data.substring(6,10);
    const mes = data.substring(3,5);
    const dia = data.substring(0,2);
    const formatedData = ano + "-" + mes + "-" + dia;
    tarefaData.dataLimite = formatedData;
    console.log(tarefaData)
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId,
      },
      body: JSON.stringify(tarefaData),
    });

    if (response.status === 201 || response.status === 204) {
      Alert.alert('Sucesso!', 'Tarefa cadastrada com sucesso!');
      return {};
    }

    const textResponse = await response.text();
    let responseData;

    try {
      responseData = JSON.parse(textResponse);
    } catch {
      console.warn('Resposta não é um JSON válido.');
      responseData = null;
    }

    throw new Error(responseData?.message || 'Erro desconhecido na API');
  } catch (error) {
    console.error('Erro ao cadastrar tarefa:', error.message);
    Alert.alert('Erro ao cadastrar', `Detalhes: ${error.message}`);
    return null;
  }
};

export const deleteTarefa = async (tarefaId, setTarefas) => {
  try {
    const userId = await getUid();
    const response = await fetch(`${API_URL}/${tarefaId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId,
      },
      body: JSON.stringify({ userId }),
    });

    const textResponse = await response.text();
    let responseData;

    try {
      responseData = JSON.parse(textResponse);
    } catch {
      console.warn('Resposta não é um JSON válido.');
      responseData = null;
    }

    if (response.ok && responseData?.success) {
      Alert.alert('Sucesso!', responseData.message);
      setTarefas((prev) => prev.filter((t) => t.id !== tarefaId));
    } else {
      throw new Error(responseData?.message || 'Erro ao excluir a tarefa');
    }
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error.message);
    Alert.alert('Erro ao excluir', `Detalhes: ${error.message}`);
  }
};

export const updateTarefa = async (tarefaId, updatedData) => {
  try {
    const userId = await getUid();
    const response = await fetch(`${API_URL}/${tarefaId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId,
      },
      body: JSON.stringify({ ...updatedData, userId }),
    });

    if (response.ok) {
      Alert.alert('Sucesso!', 'Tarefa atualizada com sucesso!');
      return {};
    } else {
      const textResponse = await response.text();
      let responseData;

      try {
        responseData = JSON.parse(textResponse);
      } catch {
        console.warn('Resposta não é um JSON válido.');
        responseData = null;
      }

      throw new Error(responseData?.message || 'Erro ao atualizar a tarefa');
    }
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error.message);
    Alert.alert('Erro ao atualizar', `Detalhes: ${error.message}`);
  }
}

export const fetchToggleStatus = async (id) => {
  try {
    const userId = await getUid();
    const response = await fetch(`${API_URL}/${id}/toggle`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error('Erro ao alternar status: ', await response.text());
    }
  } catch (error) {
    console.error('Erro de rede ao alternar status:', error);
  }
};


