import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { Modalize } from 'react-native-modalize';
import { useNavigation } from '@react-navigation/native';
import { UserDTO } from '../../../firestore/user/userDTO';
import { createDirectorAccount, loginDirector } from '../../../firestore/director/directorController';
import dedo from '../../../assets/dedo.png'; // Imagem de fundo
import logo from '../../../assets/logo.png'; // Logo a ser exibido acima da frase
import { TextInput } from 'react-native-gesture-handler';
import { login } from '../../auth/AuthProvider';

const Home = () => {
  const navigation = useNavigation();
  const directorModalRef = useRef<Modalize>(null);
  const createAccountModalRef = useRef<Modalize>(null);
  const loginModalRef = useRef<Modalize>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState('');

  const openDirectorModal = () => {
    setLoginRole('director');
    directorModalRef.current?.open();
  };

  const openCreateAccountModal = () => {
    createAccountModalRef.current?.open();
  };

  const openLoginModal = (role: string) => {
    setLoginRole(role);
    loginModalRef.current?.open();
  };

  const handleCreateAccount = async () => {
    try {
      const user: UserDTO = {
        name,
        phone,
        email,
        password,
        role: 'director',
      };
      const createdUser = await createDirectorAccount(user);
      console.log('Director account created:', createdUser);
      createAccountModalRef.current?.close();
    } catch (error) {
      console.error('Error creating director account:', error);
    }
  };

  const handleLogin = async () => {
    try {
      let loggedInUser;
      if (loginRole === 'director') {
        loggedInUser = await loginDirector(loginEmail, loginPassword);
        navigation.navigate('FeedDiretor'); // Navegar para a página FeedDiretor após o login bem-sucedido
      } else if (loginRole === 'professor') {
        loggedInUser = await login(loginEmail, loginPassword); // Usando a função de login genérica
        navigation.navigate('PainelProfessor'); // Navegar para a página PainelProfessor
      }
      loginModalRef.current?.close();
      console.log(`${loginRole} logged in:`, loggedInUser);
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Erro', 'Erro ao fazer login. Por favor, verifique suas credenciais.');
    }
  };

  const getLoginTitle = () => {
    switch (loginRole) {
      case 'director':
        return 'Bem vindo Diretor(a)';
      case 'professor':
        return 'Bem Vindo Professor(a)';
      case 'parents':
        return 'Bem Vindo Pais/Responsáveis';
      default:
        return '';
    }
  };

  const getLoginSubtitle = () => {
    switch (loginRole) {
      case 'director':
      case 'professor':
      case 'parents':
        return 'Digite seu email e senha para entrar:';
      default:
        return '';
    }
  };

  return (
    <ImageBackground source={logo} style={styles.background} imageStyle={{ opacity: 0.20 }}>
      <View style={styles.container}>
        <Image source={dedo} style={styles.logo} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={openDirectorModal}>
            <Text style={styles.buttonText}>Diretor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => openLoginModal('professor')}>
            <Text style={styles.buttonText}>Professor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => openLoginModal('parents')}>
            <Text style={styles.buttonText}>Pais/Responsáveis</Text>
          </TouchableOpacity>
        </View>

        <Modalize ref={directorModalRef} snapPoint={300}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.modalButton} onPress={openCreateAccountModal}>
              <Text style={styles.modalButtonText}>Criar conta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => openLoginModal('director')}>
              <Text style={styles.modalButtonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </Modalize>

        <Modalize ref={createAccountModalRef} snapPoint={550}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitleLeft}>Crie sua conta!</Text>
            <Text style={styles.modalSubtitle}>Precisamos de algumas informações para criar a sua conta:</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nome:</Text>
              <TextInput
                placeholder="Digite seu nome"
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Telefone:</Text>
              <TextInputMask
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) '
                }}
                placeholder="Digite seu telefone"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>E-mail:</Text>
              <TextInput
                placeholder="Digite seu email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha:</Text>
              <TextInput
                placeholder="Digite sua senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
              />
            </View>
            <Text style={styles.passwordHint}>*Crie sua senha com no mínimo 6 dígitos*</Text>
            <TouchableOpacity style={styles.modalButton} onPress={handleCreateAccount}>
              <Text style={styles.modalButtonText}>Criar Conta</Text>
            </TouchableOpacity>
          </View>
        </Modalize>

        <Modalize ref={loginModalRef} snapPoint={350}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitleLeft}>{getLoginTitle()}</Text>
            <Text style={styles.modalSubtitle}>{getLoginSubtitle()}</Text>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email:</Text>
              <TextInput
                placeholder="Digite seu email"
                value={loginEmail}
                onChangeText={setLoginEmail}
                style={styles.input}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Senha:</Text>
              <TextInput
                placeholder="Digite sua senha"
                value={loginPassword}
                onChangeText={setLoginPassword}
                secureTextEntry
                style={styles.input}
              />
            </View>
            <TouchableOpacity style={styles.modalButton} onPress={handleLogin}>
              <Text style={styles.modalButtonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </Modalize>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 30,
    position: 'absolute',
    top: 80, // Movendo a imagem mais para cima
  },
  buttonContainer: {
    marginTop: 100,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 15,
    marginBottom: 20,
    width: '80%', // Largura uniforme para todos os botões
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#1b7940',
    fontFamily: 'Montserrat', 
    fontWeight: '700',
  },
  modalContent: {
    padding: 20,
  },
  modalTitleLeft: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'left',
  },
  inputGroup: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'left', // Alinhando à esquerda
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10, // Espaço entre os inputs
},
passwordHint: {
fontSize: 12,
color: '#999',
marginBottom: 20,
textAlign: 'left',
},
modalButton: {
backgroundColor: '#28a745',
padding: 10,
marginVertical: 10,
borderRadius: 5,
},
modalButtonText: {
color:'#fff',
textAlign: 'center',
},
modalTitle: {
fontSize: 20,
fontWeight: 'bold',
marginBottom: 20,
textAlign: 'center',
},
});

export default Home;