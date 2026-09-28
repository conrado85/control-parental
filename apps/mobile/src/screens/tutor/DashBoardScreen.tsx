/** UI del DashboardScreen */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

// Importación de interfaces desde la carpeta types
import { AlertItem, DeviceInfo } from '../../types/dashboard';

export default function DashboardScreen(): React.JSX.Element {
  const [isDevicePaused, setIsDevicePaused] = useState<boolean>(false);

  const [device] = useState<DeviceInfo>({
    id: 'dev_12345',
    name: 'Motorola E6 Plus (Nehuén)',
    isOnline: true,
    batteryLevel: 78,
    lastSync: 'Hace 2 min',
  });

  const [alerts] = useState<AlertItem[]>([
    {
      id: '1',
      severity: 'high',
      app: 'Instagram',
      message: 'Coincidencia con filtro de Ciberbullying/Acoso',
      time: 'Hace 15m',
      timestamp: Date.now() - 15 * 60 * 1000,
    },
    {
      id: '2',
      severity: 'medium',
      app: 'TikTok',
      message: 'Límite de tiempo alcanzado (1h 00m)',
      time: 'Hace 2h',
      timestamp: Date.now() - 2 * 60 * 60 * 1000,
    },
  ]);

  const handleTogglePauseDevice = (value: boolean): void => {
    setIsDevicePaused(value);
    const action = value ? 'pausado' : 'desbloqueado';
    Alert.alert(
      'Control Remoto',
      `El dispositivo del menor ha sido ${action} en tiempo real.`
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Estado del Dispositivo */}
        <View style={styles.deviceCard}>
          <Text style={styles.deviceName}>📱 {device.name}</Text>
          <Text style={styles.deviceStatus}>
            {device.isOnline ? '🟢 En línea' : '🔴 Desconectado'}  🔋 {device.batteryLevel}%
          </Text>
        </View>

        {/* Control Remoto Rápido */}
        <View style={styles.quickActionCard}>
          <View style={styles.actionRow}>
            <Text style={styles.actionText}>Pausar uso del dispositivo</Text>
            <Switch
              value={isDevicePaused}
              onValueChange={handleTogglePauseDevice}
              trackColor={{ false: '#767577', true: '#FF3B30' }}
            />
          </View>
        </View>

        {/* Alertas Recientes */}
        <Text style={styles.sectionTitle}>🚨 Alertas Recientes</Text>
        {alerts.map((item: AlertItem) => (
          <View
            key={item.id}
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
                {item.severity === 'high' ? 'ALTA' : 'MEDIA'}
              </Text>
              <Text style={styles.alertTime}>{item.time}</Text>
            </View>
            <Text style={styles.alertApp}>App: {item.app}</Text>
            <Text style={styles.alertMsg}>{item.message}</Text>
          </View>
        ))}

        {/* Resumen de Uso */}
        <Text style={styles.sectionTitle}>📊 Resumen de Uso Hoy</Text>
        <View style={styles.statsCard}>
          <Text style={styles.statsTime}>2 horas 45 minutos</Text>
          <Text style={styles.statsSubtitle}>Límite diario global: 3 horas</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24, // Margen final suficiente antes de la barra inferior
  },
  deviceCard: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  deviceName: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  deviceStatus: { color: '#E5E5EA', fontSize: 13, marginTop: 4 },
  quickActionCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionText: { fontSize: 16, fontWeight: '600', color: '#1C1C1E' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 10,
  },
  alertCard: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
  },
  borderHigh: { borderLeftColor: '#FF3B30' },
  borderMedium: { borderLeftColor: '#FF9500' },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  badge: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  bgHigh: { backgroundColor: '#FF3B30' },
  bgMedium: { backgroundColor: '#FF9500' },
  alertTime: { fontSize: 12, color: '#8E8E93' },
  alertApp: { fontSize: 14, fontWeight: 'bold', color: '#1C1C1E' },
  alertMsg: { fontSize: 13, color: '#3A3A3C', marginTop: 2 },
  statsCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 12 },
  statsTime: { fontSize: 22, fontWeight: 'bold', color: '#007AFF' },
  statsSubtitle: { fontSize: 13, color: '#8E8E93', marginTop: 4 },
});