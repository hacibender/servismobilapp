import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList, Modal, TextInput } from 'react-native';
import DriverBottomNavBar from './DriverBottomNavbar';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DriverStatsScreen = () => {

  const sikayetEt = () => {
  };

  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  }

  const routeData = [
    {
      id: 1,
      rota: {
        okul: 'Levent College',
        servis: '1A Sabah Servisi',
        plaka: '34 ABC 32',
        zaman: '06:10 - 07:50',
        tarih: '12.07.2024',
        durum: 'Başarılı'
      },
      school: 'Levent College'
    },
    {
      id: 2,
      rota: {
        okul: 'Levent College',
        servis: '1A Sabah Servisi',
        plaka: '34 ABC 32',
        zaman: '06:10 - 07:50',
        tarih: '13.07.2024',
        durum: 'Başarılı'
      },
      school: 'Levent College'
    },
    {
      id: 3,
      rota: {
        okul: 'Levent College',
        servis: '1A Sabah Servisi',
        plaka: '34 ABC 32',
        zaman: '06:10 - 07:50',
        tarih: '14.07.2024',
        durum: 'Başarısız'
      },
      school: 'Levent College'
    },
  ];

  const renderRouteItem = ({ item }) => {
    const { rota } = item;

    const durumStyle = rota.durum === 'Başarılı' ? styles.successText : styles.failText;

    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={styles.itemSchoolText}>{rota.okul}</Text>
        <Text style={styles.itemFirstText}>{rota.servis} {rota.plaka}</Text>
        <Text style={styles.itemText}>{rota.zaman} {rota.tarih}</Text>
        <Text style={[styles.itemText, durumStyle]}>{rota.durum}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerText}>Raporlar ve Şikayet</Text>
        <FlatList
          data={routeData}
          renderItem={renderRouteItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
      <View style={styles.gelmiyorum}>
        <TouchableOpacity style={styles.complainButton} onPress={openModal}>
          <Icon name="sms-failed" size={20} color="#fff" />
        </TouchableOpacity>
        <Modal
          animationType='slide'
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Icon name="markunread-mailbox" size={50} color="#D32F2F" style={styles.icon} />
              <Text style={styles.modalTitle}>Şikayetiniz Nedir?</Text>
              <Text style={styles.modalText}>Sadece Okul Yönetimi Tarafından Görünecektir</Text>
              <TextInput
                style={styles.input}
                placeholder="Şikayetinizi Yazabilirsiniz"
                multiline={true}
                numberOfLines={4}>
              </TextInput>
              <View style={styles.popupButtonArea}>
                <TouchableOpacity style={styles.popupButton} onPress={closeModal}>
                  <Text style={styles.popupButtonText}>Gönder</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <DriverBottomNavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    paddingBottom: 80, // Buton ve Navbar için yer bırakmak amacıyla padding ekledim
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  itemSchoolText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemFirstText: {
    fontSize: 16,
    color: '#333',
  },
  itemText: {
    fontSize: 14,
    color: '#666',
  },
  successText: {
    color: 'green',
  },
  failText: {
    color: 'red',
  },
  complainButton: {
    position: 'absolute',
    bottom: 40, // Navbar'a daha yakın olacak şekilde ayarlandı
    right: 20,
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  complainButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  gelmiyorum: {
    width: '100%'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  popupButtonArea: {
    width: '100%',
    alignItems: 'center',
  },
  popupButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  popupButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DriverStatsScreen;
