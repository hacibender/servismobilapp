import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import AdminBottomNavBar from './AdminBottomNavBar';

const AdminStatsScreen = () => {
  const [activeTab, setActiveTab] = useState('raporlar');
  const [activeComplaintTab, setActiveComplaintTab] = useState('veli');

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
  const reportParentData = [
    {
      id: 1,
      rota: {
        okul: 'Levent College',
        servis: '1A Sabah Servisi',
        plaka: '34 ABC 32',
        tarih: '12.07.2024',
        sikayet: 'Sabah servisim geç geldi'
      },
      school: 'Levent College'
    },
    {
      id: 2,
      rota: {
        okul: 'Levent College',
        servis: '1A Sabah Servisi',
        plaka: '34 ABC 32',
        tarih: '13.07.2024',
        sikayet: 'Servis sürücüsü arabayı çok hızlı kullanıyor.'
      },
      school: 'Levent College'
    },
    {
      id: 3,
      rota: {
        okul: 'Levent College',
        servis: '1A Sabah Servisi',
        plaka: '34 ABC 32',
        tarih: '14.07.2024',
        sikayet: 'Sürücü öğrencimi çok bekletti'
      },
      school: 'Levent College'
    },
  ];
  const reportDriverData = [
    {
      id: 1,
      rota: {
        okul: 'Levent College',
        servis: '1A Sabah Servisi',
        plaka: '34 ABC 32',
        tarih: '12.07.2024',
        sikayet: 'Öğrenci "Geliyorum" bildiriminde bulunmasına rağmen gelmedi'
      },
      school: 'Levent College'
    },
    {
      id: 2,
      rota: {
        okul: 'Levent College',
        servis: '1A Sabah Servisi',
        plaka: '34 ABC 32',
        tarih: '13.07.2024',
        sikayet: 'Öğrenci araç içinde güvenliği tehdit edecek hareketlerde bulunuyor'
      },
      school: 'Levent College'
    },
    {
      id: 3,
      rota: {
        okul: 'Levent College',
        servis: '1A Sabah Servisi',
        plaka: '34 ABC 32',
        tarih: '14.07.2024',
        sikayet: 'Veli sürekli olarak gelip gelmeyeceğine dair butonlara tıklamıyor'
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

  const renderReportItem = ({ item }) => {
    const { rota } = item;

    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Text style={styles.itemSchoolText}>{rota.okul}</Text>
        <Text style={styles.itemFirstText}>{rota.servis} {rota.plaka}</Text>
        <Text style={styles.itemText}>{rota.tarih}</Text>
        <Text style={styles.itemText}>Şikayet: {rota.sikayet}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerText}>Raporlar ve Şikayet</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'raporlar' && styles.activeTabButton]}
            onPress={() => setActiveTab('raporlar')}
          >
            <Text style={styles.tabButtonText}>Raporlar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'sikayetler' && styles.activeTabButton]}
            onPress={() => setActiveTab('sikayetler')}
          >
            <Text style={styles.tabButtonText}>Şikayetler</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'raporlar' && (
          <View style={styles.contentContainer}>
            <FlatList
              data={routeData}
              renderItem={renderRouteItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        )}

        {activeTab === 'sikayetler' && (
          <View style={styles.contentContainer}>
            <View style={styles.subButtonContainer}>
              <TouchableOpacity
                style={[styles.tabReportButton, activeComplaintTab === 'veli' && styles.activeComplaintTabButton]}
                onPress={() => setActiveComplaintTab('veli')}
              >
                <Text style={styles.tabButtonText}>Veli/Öğrenci</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabReportButton, activeComplaintTab === 'surucu' && styles.activeComplaintTabButton]}
                onPress={() => setActiveComplaintTab('surucu')}
              >
                <Text style={styles.tabButtonText}>Sürücü</Text>
              </TouchableOpacity>
            </View>

            {activeComplaintTab === 'veli' && (
              <FlatList
                data={reportParentData}
                renderItem={renderReportItem}
                keyExtractor={(item) => item.id.toString()}
              />
            )}

            {activeComplaintTab === 'surucu' && (
              <FlatList
                data={reportDriverData}
                renderItem={renderReportItem}
                keyExtractor={(item) => item.id.toString()}
              />
            )}
          </View>
        )}
      </ScrollView>

      <AdminBottomNavBar />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  subButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  tabButton: {
    paddingVertical: 15,
    paddingHorizontal: 60, // Buton genişliğini artırdım
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  tabReportButton: {
    paddingVertical: 15,
    paddingHorizontal: 40, // Buton genişliğini ayarladım
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  activeTabButton: {
    backgroundColor: '#ff6347',
  },
  activeComplaintTabButton: {
    backgroundColor: '#ff6347',
  },
  tabButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
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
});

export default AdminStatsScreen;
