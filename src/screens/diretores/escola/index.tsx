import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, Image, ScrollView } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Icon, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { SchoolDTO } from '../../../../firestore/school/SchoolDTO';
import { addSchool, deleteSchool, getSchools } from '../../../../firestore/school/schoolController';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EscolaDiretor = () => {
  const [schools, setSchools] = useState<SchoolDTO[]>([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [inepCode, setInepCode] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const modalizeRef = useRef<Modalize>(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    const fetchedSchools = await getSchools();
    setSchools(fetchedSchools);
  };

  const handleAddSchool = async () => {
    const newSchool: SchoolDTO = {
      name,
      address,
      inepCode,
      thumbnailUrl,
    };
    await addSchool(newSchool);
    fetchSchools();
    modalizeRef.current?.close();
    clearForm();
  };

  const handleDeleteSchool = async (schoolId: string) => {
    await deleteSchool(schoolId);
    fetchSchools();
  };

  const clearForm = () => {
    setName('');
    setAddress('');
    setInepCode('');
    setThumbnailUrl('');
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setThumbnailUrl(result.assets[0].uri);
    }
  };

  const handleRemoveImage = () => {
    Alert.alert(
      'Remover Imagem',
      'Deseja realmente remover a imagem?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', onPress: () => setThumbnailUrl('') },
      ],
      { cancelable: true }
    );
  };

  const renderSchool = (school: SchoolDTO) => (
    <TouchableOpacity
      key={school.id}
      style={styles.schoolContainer}
      onPress={() => {
        Alert.alert(
          'Excluir Escola',
          'Deseja excluir a escola?',
          [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Excluir', onPress: () => handleDeleteSchool(school.id!) },
          ],
          { cancelable: true }
        );
      }}
    >
      <Image source={{ uri: school.thumbnailUrl }} style={styles.schoolThumbnail} />
      <Text style={styles.schoolName}>{school.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" type="material" color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Escola Diretor</Text>
          <TouchableOpacity onPress={() => modalizeRef.current?.open()}>
            <Icon name="add" type="material" color="#fff" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {schools.map(renderSchool)}
        </ScrollView>

        <Modalize ref={modalizeRef} snapPoint={400}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Olá, adicione aqui a sua escola:</Text>
            <TextInput
              placeholder="Nome da Escola"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
            <TextInput
              placeholder="Endereço da Escola"
              value={address}
              onChangeText={setAddress}
              style={styles.input}
            />
            <TextInput
              placeholder="Código INEP da Escola"
              value={inepCode}
              onChangeText={setInepCode}
              style={styles.input}
            />
            {!thumbnailUrl && (
              <Button title="Escolher Imagem" onPress={handlePickImage} buttonStyle={[styles.button, { marginBottom: 20, marginTop: 10, backgroundColor: '#28a745' }]} />
            )}
            {thumbnailUrl ? (
              <View style={styles.imageContainer}>
                <Image source={{ uri: thumbnailUrl }} style={styles.thumbnailPreview} />
                <TouchableOpacity onPress={handleRemoveImage} style={styles.removeImageButton}>
                  <Text style={styles.removeImageText}>X</Text>
                </TouchableOpacity>
              </View>
            ) : null}
            <Button title="Adicionar Escola" onPress={handleAddSchool} buttonStyle={[styles.button, { backgroundColor: '#28a745' }]} />
          </View>
        </Modalize>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollContainer: {
    padding: 10,
  },
  schoolContainer: {
    backgroundColor: '#1b7940',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  schoolThumbnail: {
    width: '100%',
    height: 150,
  },
  schoolName: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  modalContent: {
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  button: {
    borderRadius: 10,
    marginRight: 10,
  },
  removeImageButton: {
    padding: 10,
    borderRadius: 20,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  removeImageText: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
  },
  thumbnailPreview: {
    width: '50%',
    height: 70, // Tamanho menor para a imagem
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default EscolaDiretor;