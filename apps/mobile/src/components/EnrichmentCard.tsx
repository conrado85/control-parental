import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function EnrichmentCard() {
  const [version, setVersion] = useState('v1.0.0 (LOTBA)');
  const [blockedCount, setBlockedCount] = useState(45);

  const handleSyncEnrichment = () => {
    /* 
      TODO [BACKEND]: GET /api/v1/blacklist/enrichment-status
      Sincroniza la lista enriquecida desde el servidor.
    */
    setVersion('v1.2.4 (Actualizada)');
    setBlockedCount(62);
    Alert.alert('Motor Enriquecido', 'Se han descargado nuevos dominios de apuestas ilegales de LOTBA.');
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Enriquecimiento del Motor</Text>
      <Text style={styles.text}>Versión de la Blacklist: <Text style={styles.bold}>{version}</Text></Text>
      <Text style={styles.text}>Dominios activos: <Text style={styles.bold}>{blockedCount} sitios</Text></Text>
      
      <TouchableOpacity style={styles.button} onPress={handleSyncEnrichment}>
        <Text style={styles.buttonText}>Sincronizar Motor</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 10, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 8 },
  text: { fontSize: 13, color: '#64748B', marginBottom: 4 },
  bold: { color: '#0F172A', fontWeight: '600' },
  button: { marginTop: 10, backgroundColor: '#2563EB', paddingVertical: 8, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: '600', fontSize: 13 },
});