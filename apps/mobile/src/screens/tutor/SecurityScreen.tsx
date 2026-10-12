import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EnrichmentCard from '../../components/EnrichmentCard';

interface BlockedDomain {
  id: string;
  domain: string;
  source: 'LOTBA' | 'Personalizada';
}

export default function SecurityScreen() {

  // BACKEND: GET /api/v1/blacklist/lotba
  // Descripción: Devuelve la lista oficial actualizada de dominios de apuestas ilegales de LOTBA
  const [domains, setDomains] = useState<BlockedDomain[]>([
    // Ejemplos de dominios bloqueados
    { id: '1', domain: 'apuestasilegalesba.com', source: 'LOTBA' },
    { id: '2', domain: 'casinoilegalonline.net', source: 'LOTBA' },
    { id: '3', domain: 'ruletatrucha.com', source: 'Personalizada' },
  ]);
  const [newDomain, setNewDomain] = useState('');

  const handleAddDomain = () => {
    if (!newDomain.trim()) return;
    
    // TODO [BACKEND]: POST /api/v1/blacklist/custom
    // Descripción: Envía el nuevo dominio personalizado ingresado por el tutor al servidor. { domain: newDomain }
    
    const newItem: BlockedDomain = {
      id: Date.now().toString(),
      domain: newDomain.trim().toLowerCase(),
      source: 'Personalizada',
    };
    setDomains([...domains, newItem]);
    setNewDomain('');
  };

  const handleRemove = (id: string, source: string) => {
    if (source === 'LOTBA') {
      alert('La lista oficial de LOTBA no se puede modificar.');
      return;
    }
    // TODO [BACKEND]: DELETE /api/v1/blacklist/custom/{id}
    // Descripción: Elimina un dominio personalizado registrado en el backend.
    setDomains(domains.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Filtro de Apuestas Ilegales</Text>
        <Text style={styles.subtitle}>
          Visualiza la lista oficial de LOTBA y añade dominios adicionales a bloquear.
        </Text>
        <EnrichmentCard />

        {/* Formulario para agregar dominio personalizado */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ej: casinonuevoprohibido.com"
            value={newDomain}
            onChangeText={setNewDomain}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddDomain}>
            <Text style={styles.addButtonText}>Bloquear</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de dominios */}
        <Text style={styles.sectionHeader}>Dominios Restringidos ({domains.length})</Text>
        
        <FlatList
          data={domains}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.ruleCard}>
              <View style={styles.ruleInfo}>
                <Text style={styles.wordText}>{item.domain}</Text>
                <Text style={[styles.categoryText, item.source === 'LOTBA' ? styles.lotbaText : styles.customText]}>
                  {item.source === 'LOTBA' ? '🔒 Oficial LOTBA (Solo lectura)' : '👤 Agregado por el Tutor'}
                </Text>
              </View>
              {item.source === 'Personalizada' && (
                <TouchableOpacity
                  onPress={() => handleRemove(item.id, item.source)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FAFC', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1E293B' },
  subtitle: { fontSize: 14, color: '#64748B', marginBottom: 20, marginTop: 4 },
  inputContainer: { flexDirection: 'row', marginBottom: 24, gap: 8 },
  input: { flex: 1, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, paddingHorizontal: 12, height: 48, fontSize: 15 },
  addButton: { backgroundColor: '#2563EB', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, borderRadius: 8 },
  addButtonText: { color: '#FFFFFF', fontWeight: '600' },
  sectionHeader: { fontSize: 16, fontWeight: '600', color: '#334155', marginBottom: 12 },
  ruleCard: { backgroundColor: '#FFFFFF', padding: 14, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  ruleInfo: { flex: 1 },
  wordText: { fontSize: 15, fontWeight: '600', color: '#0F172A' },
  categoryText: { fontSize: 12, marginTop: 2, fontWeight: '500' },
  lotbaText: { color: '#007AFF' },
  customText: { color: '#64748B' },
  deleteButton: { padding: 6 },
  deleteText: { color: '#EF4444', fontWeight: 'bold', fontSize: 16 },
});