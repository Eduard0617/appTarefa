const API_URL = 'https://webapptech.site/apitarefas/api/tarefas';
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
    console.log('Tentando buscar tarefas para o usuário:', userId);
    
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId,
      },
    });

    console.log('Status da resposta:', response.status);
    console.log('Headers da resposta:', response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resposta de erro:', errorText);
      throw new Error(`Erro ao buscar tarefas: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Dados recebidos:', data);
    return data;
  } catch (error) {
    console.error('Erro completo:', error);
    Alert.alert(
      'Erro na API',
      `Detalhes do erro:\n${error.message}\n\nVerifique sua conexão com a internet e tente novamente.`
    );
    return { tarefas: [] };
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

export const fetchTarefa = async (tarefaId) => {
  try {
    const userId = await getUid();

    const response = await fetch(`${API_URL}/${tarefaId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId,
      }
    });

    console.log('Status da resposta:', response.status);

    const responseData = await response.json();
    console.log('Resposta da exibição:', responseData);
    return responseData;
  } catch (error) {
    console.error('Erro ao exibir tarefa:', error);
    throw new Error(`Falha ao exibir tarefa: ${error.message}`);
  }
};

export const deleteTarefa = async (tarefaId) => {
  try {
    const userId = await getUid();
    console.log('Tentando excluir tarefa:', tarefaId, 'do usuário:', userId);

    const response = await fetch(`${API_URL}/${tarefaId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-User-Id': userId,
      }
    });

    console.log('Status da resposta:', response.status);

    const responseData = await response.json();
    console.log('Resposta da exclusão:', responseData);
    return responseData;
  } catch (error) {
    console.error('Erro ao excluir tarefa:', error);
    throw new Error(`Falha ao excluir tarefa: ${error.message}`);
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


