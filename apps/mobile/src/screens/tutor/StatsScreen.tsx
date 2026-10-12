import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList, 
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BlockAttempt {
  id: string;
  domain: string;
  category: string;
  time: string;
  date: string;
}

export default function StatsScreen() {
  const [attempts, setAttempts] = useState<BlockAttempt[]>([
    {
      id: '1',
      domain: 'casinolegalfalso.com',
      category: 'Apuesta Ilegal (LOTBA)',
      time: '14:22 hs',
      date: 'Hoy',
    },
    {
      id: '2',
      domain: 'ruletatrucha.com',
      category: 'Lista Personalizada',
      time: '11:05 hs',
      date: 'Hoy',
    },
    {
      id: '3',
      domain: 'apuestasenlinea-nooficial.net',
      category: 'Apuesta Ilegal (LOTBA)',
      time: '18:40 hs',
      date: 'Ayer',
    },
  ]);

  // BACKEND: GET /api/v1/alerts/history?device_id={id}
  // Descripción: Aquí se conectará el fetch para traer los datos reales 
  // y actualizar la lista usando 
  // setAttempts(response.data);

  // Función que renderiza cada elemento de la lista individualmente
  const renderItem = ({ item }: { item: BlockAttempt }) => (
    <View style={styles.appCard}>
      <View style={styles.appHeader}>
        <View style={styles.appInfo}>
          <Text style={styles.appIcon}>🛑</Text>
          <View>
            <Text style={styles.appName}>{item.domain}</Text>
            <Text style={styles.appCategory}>{item.category}</Text>
          </View>
        </View>
        <View style={styles.timeInfo}>
          <Text style={styles.timeText}>{item.time}</Text>
          <Text style={styles.limitText}>{item.date}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={attempts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Registro de Bloqueos</Text>
            <Text style={styles.subtitle}>
              Historial de intentos de acceso a sitios de apuestas ilegales interceptados por la VPN local.
            </Text>

            {/* Tarjeta de Resumen */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Bloqueos Totales (Esta Semana)</Text>
              <Text style={styles.summaryTime}>14</Text>
              <Text style={styles.summarySub}>0 sitios de apuestas ilegales permitidos</Text>
            </View>

            {/* Detalle del Historial */}
            <Text style={styles.sectionHeader}>Historial de Intentos Bloqueados</Text>
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 80 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1E293B' },
  subtitle: { fontSize: 14, color: '#64748B', marginBottom: 16, marginTop: 4 },
  summaryCard: { backgroundColor: '#1E293B', padding: 18, borderRadius: 12, marginBottom: 20 },
  summaryTitle: { color: '#94A3B8', fontSize: 13, fontWeight: '600', textTransform: 'uppercase' },
  summaryTime: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold', marginVertical: 4 },
  summarySub: { color: '#34C759', fontSize: 12, marginTop: 8, fontWeight: '600' },
  sectionHeader: { fontSize: 16, fontWeight: '600', color: '#334155', marginBottom: 12 },
  appCard: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  appHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  appInfo: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  appIcon: { fontSize: 22 },
  appName: { fontSize: 15, fontWeight: 'bold', color: '#0F172A' },
  appCategory: { fontSize: 12, color: '#64748B' },
  timeInfo: { alignItems: 'flex-end' },
  timeText: { fontSize: 14, fontWeight: 'bold', color: '#0F172A' },
  limitText: { fontSize: 11, color: '#64748B' },
});