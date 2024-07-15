import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { User } from 'firebase/auth';
import { Modalize } from 'react-native-modalize';
import { useNavigation } from '@react-navigation/native'; // Importa a navegação
import { auth } from '../../../../config/firebase';

const { width: viewportWidth } = Dimensions.get('window');

const FeedDiretor = () => {
  const [user, setUser] = useState<User | null>(null);
  const flatListRef = useRef<FlatList<any>>(null);
  const modalizeRef = useRef<Modalize>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation(); // Use the navigation hook

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }

    const interval = setInterval(() => {
      if (flatListRef.current) {
        let nextIndex = currentIndex + 1;
        if (nextIndex >= banners.length) {
          nextIndex = 0;
        }
        flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
        setCurrentIndex(nextIndex);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleBannerPress = (panel: string) => {
    if (panel === 'Professores') {
      navigation.navigate('ProfessorDiretor');
    } else {
      (panel === 'Alunos') ;{
        navigation.navigate('AlunosDiretor');
    }}
  };

  const handleButtonPress = (button: string) => {
    Alert.alert(button, `Você clicou em ${button}.`);
  };

  const handleProfileButtonPress = () => {
    modalizeRef.current?.open();
  };

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        Alert.alert('Você saiu da conta.');
        navigation.navigate('Main'); // Navega para a tela de login
      })
      .catch(error => {
        Alert.alert('Erro ao sair da conta:', error.message);
      });
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.bannerButton} onPress={() => handleBannerPress(item.panel)}>
      <Icon name={item.icon} type="material" size={40} color="#28a745" />
      <Text style={styles.bannerText}>{item.title}</Text>
      <Text style={styles.bannerSubText}>{item.subtitle}</Text>
    </TouchableOpacity>
  );

  const banners = [
    {
      panel: 'Professores',
      title: 'Professores',
      subtitle: 'Acesse o painel de professores',
      icon: 'school',
    },
    {
      panel: 'Alunos',
      title: 'Alunos',
      subtitle: 'Acesse o painel de alunos',
      icon: 'people',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Olá Diretor, {user ? user.displayName?.split(' ')[0] : ''} </Text>
        <Text style={styles.subGreeting}>Esse é o seu painel de diretor.</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={banners}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.carouselContentContainer}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      />
      <View style={styles.buttonGrid}>
        <TouchableOpacity style={styles.gridButton} onPress={() => navigation.navigate('EscolaDiretor')}>
          <Icon name="school" type="material" color="#28a745" />
          <Text style={styles.gridButtonText}>Minha Escola</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton} onPress={() => navigation.navigate('AnosTurmasDiretor')}>
          <Icon name="class" type="material" color="#28a745" />
          <Text style={styles.gridButtonText}>Anos e Turmas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton} onPress={() => navigation.navigate('Avisos')}>
          <Icon name="announcement" type="material" color="#28a745" />
          <Text style={styles.gridButtonText}>Avisos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton} onPress={() => navigation.navigate('Cronograma')}>
          <Icon name="event" type="material" color="#28a745" />
          <Text style={styles.gridButtonText}>Calendário</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton} onPress={() => navigation.navigate('Reuniao')}>
          <Icon name="meeting-room" type="material" color="#28a745" />
          <Text style={styles.gridButtonText}>Reuniões</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.gridButton} onPress={() => navigation.navigate('Ponto')}>
          <Icon name="access-time" type="material" color="#28a745" />
          <Text style={styles.gridButtonText}>Ponto</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Suporte')}>
          <Icon name="phone" type="material" color="#28a745" />
          <Text style={styles.footerButtonText}>Precisa de ajuda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleProfileButtonPress}>
          <Icon name="person" type="material" color="#28a745" />
          <Text style={styles.footerButtonText}>Perfil</Text>
        </TouchableOpacity>
      </View>
      <Modalize ref={modalizeRef} snapPoint={250}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.modalButton} onPress={handleSignOut}>
            <Text style={styles.modalButtonText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    backgroundColor: '#28a745',
    padding: 20,
    paddingTop: 60, // Adicionado para mais espaço no topo
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5, // Adicionado para espaço entre linhas de texto
  },
  subGreeting: {
    fontSize: 16,
    color: '#fff',
  },
  carouselContentContainer: {
    paddingHorizontal: 5,
    marginBottom: 20, // Adicionado para espaçamento abaixo do carrossel
    height: 150, // Altura do carrossel
  },
  bannerButton: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: viewportWidth * 0.8, // Ajustado para um tamanho menor
    marginHorizontal: 35, // Espaçamento horizontal entre os banners
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
    marginTop: 10,
  },
  bannerSubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 95, // Ajustado para espaçamento antes do footer
  },
  gridButton: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '40%',
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  gridButtonText: {
    marginTop: 10,
    fontSize: 14,
    color: '#28a745',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
},
    footerButton: {
    alignItems: 'center',
    },
    footerButtonText: {
    marginTop: 5,
    fontSize: 12,
    color: '#28a745',
    textAlign: 'center',
    },
    modalContent: {
    padding: 20,
    },
    modalButton: {
    backgroundColor: '#28a745',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    },
    modalButtonText: {
    color: '#fff',
    textAlign: 'center',
    },
    });

export default FeedDiretor;