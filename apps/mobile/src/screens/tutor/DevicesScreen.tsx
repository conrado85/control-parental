import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ConnectedDevice {
  id: string;
  name: string;
  model: string;
  battery: number;
  isOnline: boolean;
  permissionsActive: number;
  totalPermissions: number;
}

export default function DevicesScreen() {
  const [devices] = useState<ConnectedDevice[]>([
    {
      id: '1',
      name: 'Celular de Nehuén',
      model: 'Motorola E6 Plus',
      battery: 78,
      isOnline: true,
      permissionsActive: 4,
      totalPermissions: 4,
    },
  ]);

  const handleLinkNewDevice = () => {
    Alert.alert(
      'Vincular Dispositivo',
      'Código de vinculación generado: 849-201\n\nIngresa este código en la aplicación instalada en el dispositivo del menor.'
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Dispositivos y Ajustes</Text>
        <Text style={styles.subtitle}>
          Administra los dispositivos vinculados a la cuenta tutora y sus permisos.
        </Text>

        {/* Botón para vincular nuevo dispositivo */}
        <TouchableOpacity style={styles.linkButton} onPress={handleLinkNewDevice}>
          <Text style={styles.linkButtonText}>➕ Vincular Nuevo Dispositivo (PIN / QR)</Text>
        </TouchableOpacity>

        {/* Lista de Dispositivos Vinculados */}
        <Text style={styles.sectionHeader}>Dispositivos Vinculados ({devices.length})</Text>

        {devices.map((dev) => (
          <View key={dev.id} style={styles.deviceCard}>
            <View style={styles.deviceHeader}>
              <View>
                <Text style={styles.deviceName}>{dev.name}</Text>
                <Text style={styles.deviceModel}>{dev.model}</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {dev.isOnline ? '🟢 En línea' : '🔴 Desconectado'}
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Batería</Text>
                <Text style={styles.detailValue}>🔋 {dev.battery}%</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Permisos</Text>
                <Text style={styles.detailValue}>
                  🛡️ {dev.permissionsActive}/{dev.totalPermissions} activos
                </Text>
              </View>
            </View>
          </View>
        ))}

        {/* Sección de Ajustes Generales */}
        <Text style={styles.sectionHeader}>Ajustes de la Cuenta</Text>

        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingText}>🔔 Notificaciones de alerta</Text>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingText}>🔒 Cambiar PIN de Tutor</Text>
            <Text style={styles.arrowText}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
    marginTop: 4,
  },
  linkButton: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  linkButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 12,
  },
  deviceCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  deviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  deviceModel: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 2,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  settingText: {
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
  },
  arrowText: {
    fontSize: 20,
    color: '#94A3B8',
  },
});