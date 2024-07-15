// routes/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import FeedDiretor from '../screens/diretores/feed diretores';
import EscolaDiretor from '../screens/diretores/escola';
import AnosTurmasDiretor from '../screens/diretores/AnosTurmas';
import Professores from '../screens/diretores/Professores';
import AdicionarProfessor from '../screens/diretores/addProfessor';
import PainelProfessor from '../screens/professores/feed';
import AlunosDiretor from '../screens/diretores/alunoDiretor';
import AdicionarAluno from '../screens/diretores/addAluno';
import DetalhesAluno from '../screens/diretores/detalhesAluno';
import Avisos from '../screens/diretores/AvisosDiretor';
import Reuniao from '../screens/diretores/reuniao';
import Ponto from '../screens/diretores/Ponto';
import Cronograma from '../screens/diretores/croonograma';
import alunoturma from '../screens/diretores/turmasAlunos';
import DetalhesProfessor from '../screens/diretores/detalhesProfessor';
import Suporte from '../screens/diretores/suportes';
import Presenca from '../screens/diretores/presenca';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={Home}
        options={{ headerShown: false }} 
      />

    <Stack.Screen
            name="FeedDiretor"
            component={FeedDiretor}
            options={{ headerShown: false }} 
          />

    <Stack.Screen
                name="EscolaDiretor"
                component={EscolaDiretor}
                options={{ headerShown: false }} 
              />

    <Stack.Screen
                    name="AnosTurmasDiretor"
                    component={AnosTurmasDiretor}
                    options={{ headerShown: false }} 
                  />

      <Stack.Screen
                    name="ProfessorDiretor"
                    component={Professores}
                    options={{ headerShown: false }} 
                  />

      <Stack.Screen
                    name="AdicionarProfessor"
                    component={AdicionarProfessor}
                    options={{ headerShown: false }} 
                  />
      
      <Stack.Screen
                    name="AlunosDiretor"
                    component={AlunosDiretor}
                    options={{ headerShown: false }} 
                  />

      <Stack.Screen
                    name="AdicionarAluno"
                    component={AdicionarAluno}
                    options={{ headerShown: false }} 
                  />

<Stack.Screen
                    name="DetalhesAluno"
                    component={DetalhesAluno}
                    options={{ headerShown: false }} 
                  />

<Stack.Screen
                    name="Avisos"
                    component={Avisos}
                    options={{ headerShown: false }} 
                  />

<Stack.Screen
                    name="Reuniao"
                    component={Reuniao}
                    options={{ headerShown: false }} 
                  />

<Stack.Screen
                    name="Ponto"
                    component={Ponto}
                    options={{ headerShown: false }} 
                  />

<Stack.Screen
                    name="PainelProfessor"
                    component={PainelProfessor}
                    options={{ headerShown: false }} 
                  />

<Stack.Screen
                    name="Cronograma"
                    component={Cronograma}
                    options={{ headerShown: false }} 
                  />

<Stack.Screen
                    name="alunoturma"
                    component={alunoturma}
                    options={{ headerShown: false }} 
                  />

<Stack.Screen
                    name="DetalhesProfessor"
                    component={DetalhesProfessor}
                    options={{ headerShown: false }} 
                  />

<Stack.Screen
                    name="Suporte"
                    component={Suporte}
                    options={{ headerShown: false }} 
                  />

<Stack.Screen
                    name="Presenca"
                    component={Presenca}
                    options={{ headerShown: false }} 
                  />

    </Stack.Navigator>
  );
};

export default AppNavigator;