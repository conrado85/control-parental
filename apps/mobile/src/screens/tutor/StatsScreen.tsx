import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

interface AppUsage {
  id: string;
  name: string;
  icon: string;
  category: string;
  timeSpent: string; // ej: "1h 20m"
  minutesSpent: number; // para calcular la barra de progreso
  limitMinutes: number; // límite asignado
}

export default function StatsScreen() {
  const [appsUsage] = useState<AppUsage[]>([
    {
      id: '1',
      name: 'TikTok',
      icon: '🎵',
      category: 'Redes Sociales',
      timeSpent: '1h 15m',
      minutesSpent: 75,
      limitMinutes: 60,
    },
    {
      id: '2',
      name: 'Instagram',
      icon: '📸',
      category: 'Redes Sociales',
      timeSpent: '50m',
      minutesSpent: 50,
      limitMinutes: 90,
    },
    {
      id: '3',
      name: 'YouTube',
      icon: '▶️',
      category: 'Entretenimiento',
      timeSpent: '30m',
      minutesSpent: 30,
      limitMinutes: 60,
    },
    {
      id: '4',
      name: 'Roblox',
      icon: '🎮',
      category: 'Juegos',
      timeSpent: '10m',
      minutesSpent: 10,
      limitMinutes: 45,
    },
  ]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Uso y Tiempos</Text>
        <Text style={styles.subtitle}>
          Monitorea el tiempo en pantalla por aplicación y gestiona sus límites diarios.
        </Text>

        {/* Tarjeta de Resumen Semanal / Diario */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Tiempo Total Hoy</Text>
          <Text style={styles.summaryTime}>2h 45m</Text>
          <View style={styles.globalBarBackground}>
            <View style={[styles.globalBarFill, { width: '68%' }]} />
          </View>
          <Text style={styles.summarySub}>68% del límite diario alcanzado (4h total)</Text>
        </View>

        {/* Detalle por Aplicación */}
        <Text style={styles.sectionHeader}>Tiempo por Aplicación</Text>

        {appsUsage.map((app) => {
          const percentage = Math.min(
            Math.round((app.minutesSpent / app.limitMinutes) * 100),
            100
          );
          const isExceeded = app.minutesSpent >= app.limitMinutes;

          return (
            <View key={app.id} style={styles.appCard}>
              <View style={styles.appHeader}>
                <View style={styles.appInfo}>
                  <Text style={styles.appIcon}>{app.icon}</Text>
                  <View>
                    <Text style={styles.appName}>{app.name}</Text>
                    <Text style={styles.appCategory}>{app.category}</Text>
                  </View>
                </View>

                <View style={styles.timeInfo}>
                  <Text style={[styles.timeText, isExceeded && styles.exceededText]}>
                    {app.timeSpent}
                  </Text>
                  <Text style={styles.limitText}>Límite: {app.limitMinutes}m</Text>
                </View>
              </View>

              {/* Barra de progreso de la app */}
              <View style={styles.progressBarBackground}>
                <View
                  style={[
                    styles.progressBarFill,
                    {
                      width: `${percentage}%`,
                      backgroundColor: isExceeded ? '#EF4444' : '#2563EB',
                    },
                  ]}
                />
              </View>
            </View>
          );
        })}
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
    paddingBottom: 80, // Margen suficiente para la barra inferior
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
  summaryCard: {
    backgroundColor: '#1E293B',
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
  },
  summaryTitle: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  summaryTime: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  globalBarBackground: {
    height: 8,
    backgroundColor: '#334155',
    borderRadius: 4,
    marginTop: 8,
    overflow: 'hidden',
  },
  globalBarFill: {
    height: '100%',
    backgroundColor: '#3B82F6',
    borderRadius: 4,
  },
  summarySub: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 8,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 12,
  },
  appCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  appInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  appIcon: {
    fontSize: 24,
  },
  appName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  appCategory: {
    fontSize: 12,
    color: '#64748B',
  },
  timeInfo: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  exceededText: {
    color: '#EF4444',
  },
  limitText: {
    fontSize: 11,
    color: '#64748B',
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
});