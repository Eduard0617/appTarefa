import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './componentes/Login';
import HomeScreen from './componentes/Home';
import CadastroScreen from './componentes/CadastroUsuario';
import PerfilScreen from './componentes/Perfil';
import CriarTarefaScreen from './componentes/CriarTarefa';
import Tabs from './componentes/Tabs';
import SplashScreen from './componentes/SplashScreen';
import './componentes/Firebase'; // Importa a configuração do Firebase

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="SplashScreen" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Cadastro" 
          component={CadastroScreen} 
          options={{ 
            title: 'Cadastro',
            headerStyle: {
              backgroundColor: '#F0EBC9',
            },
            headerTintColor: '#8FBC8F',
          }} 
        />
        <Stack.Screen 
          name="Tabs" 
          component={Tabs} 
          options={{ 
            headerShown: false,
            headerLeft: () => null 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}