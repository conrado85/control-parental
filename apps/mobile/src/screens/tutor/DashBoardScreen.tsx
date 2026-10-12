import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList, 
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AlertItem, DeviceInfo } from '../../types/dashboard';

export default function DashboardScreen(): React.JSX.Element {
  const [device, setDevice] = useState<DeviceInfo>({
    id: 'dev_12345',
    name: 'Motorola E6 Plus (Menor)',
    isOnline: true,
    batteryLevel: 78,
    lastSync: 'Hace 2 min',
  });

  const [alerts, setAlerts] = useState<AlertItem[]>([
    {
      id: '1',
      severity: 'high',
      app: 'Navegador Web',
      message: 'Intento de acceso bloqueado: casinolegalfalso.com (Sitio ilegal LOTBA)',
      time: 'Hace 15m',
      timestamp: Date.now() - 15 * 60 * 1000,
    },
    {
      id: '2',
      severity: 'medium',
      app: 'Sistema',
      message: 'Intento de bypass detectado en Ajustes',
      time: 'Hace 2h',
      timestamp: Date.now() - 2 * 60 * 60 * 1000,
    },
  ]);

  // BACKEND: GET /api/v1/dashboard/summary
  // Descripción: Obtiene el estado del dispositivo, métricas de la VPN y alertas recientes.
  // Uso futuro con el Backend
  // setDevice(response.data);
  // setAlerts(response.data.alerts);

  // Renderizador individual para cada alerta de la FlatList
  const renderAlertItem = ({ item }: { item: AlertItem }) => (
    <View
      style={[
        styles.alertCard,
        item.severity === 'high' ? styles.borderHigh : styles.borderMedium,
      ]}
    >
      <View style={styles.alertHeader}>
        <Text
          style={[
            styles.badge,
            item.severity === 'high' ? styles.bgHigh : styles.bgMedium,
          ]}
        >
          {item.severity === 'high' ? 'BLOQUEADO' : 'ADVERTENCIA'}
        </Text>
        <Text style={styles.alertTime}>{item.time}</Text>
      </View>
      <Text style={styles.alertApp}>Origen: {item.app}</Text>
      <Text style={styles.alertMsg}>{item.message}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={alerts}
        keyExtractor={(item) => item.id}
        renderItem={renderAlertItem}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Estado del Dispositivo Protegido */}
            <View style={styles.deviceCard}>
              <Text style={styles.deviceName}>📱 {device.name}</Text>
              <Text style={styles.deviceStatus}>
                {device.isOnline ? '🟢 Protegido y en línea' : '🔴 Desconectado'}  🔋 {device.batteryLevel}%
              </Text>
            </View>

            {/* Estado del Motor de VPN y LOTBA */}
            <View style={styles.quickActionCard}>
              <Text style={styles.actionTitle}>🛡️ Estado del Bloqueo de Apuestas</Text>
              <Text style={styles.actionText}>VPN Local y Filtro LOTBA: Activos</Text>
            </View>

            {/* Alertas de Apuestas Recientes */}
            <Text style={styles.sectionTitle}>🚨 Alertas de Apuestas Ilegales</Text>
          </>
        }
        ListFooterComponent={
          <>
            {/* Resumen de Bloqueos */}
            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>📊 Resumen de Protección</Text>
            <View style={styles.statsCard}>
              <Text style={styles.statsTime}>14 dominios</Text>
              <Text style={styles.statsSubtitle}>Bloqueados automáticamente hoy por el motor LOTBA</Text>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 24 },
  deviceCard: { backgroundColor: '#007AFF', padding: 16, borderRadius: 12, marginBottom: 12 },
  deviceName: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  deviceStatus: { color: '#E5E5EA', fontSize: 13, marginTop: 4 },
  quickActionCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 20 },
  actionTitle: { fontSize: 15, fontWeight: 'bold', color: '#1C1C1E', marginBottom: 4 },
  actionText: { fontSize: 14, color: '#34C759', fontWeight: '600' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1C1C1E', marginBottom: 10 },
  alertCard: { backgroundColor: '#FFF', padding: 14, borderRadius: 10, marginBottom: 10, borderLeftWidth: 5 },
  borderHigh: { borderLeftColor: '#FF3B30' },
  borderMedium: { borderLeftColor: '#FF9500' },
  alertHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  badge: { color: '#FFF', fontSize: 10, fontWeight: 'bold', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  bgHigh: { backgroundColor: '#FF3B30' },
  bgMedium: { backgroundColor: '#FF9500' },
  alertTime: { fontSize: 12, color: '#8E8E93' },
  alertApp: { fontSize: 14, fontWeight: 'bold', color: '#1C1C1E' },
  alertMsg: { fontSize: 13, color: '#3A3A3C', marginTop: 2 },
  statsCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 12 },
  statsTime: { fontSize: 22, fontWeight: 'bold', color: '#007AFF' },
  statsSubtitle: { fontSize: 13, color: '#8E8E93', marginTop: 4 },
});