import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Platform,
  StatusBar,
  Switch,
} from 'react-native';

interface KeywordRule {
  id: string;
  word: string;
  category: string;
  active: boolean;
}

export default function SecurityScreen() {
  const [keywords, setKeywords] = useState<KeywordRule[]>([
    { id: '1', word: 'apuestas', category: 'Juegos de Azar', active: true },
    { id: '2', word: 'drogas', category: 'Sustancias', active: true },
    { id: '3', word: 'violencia', category: 'Conducta Sensible', active: true },
  ]);
  const [newWord, setNewWord] = useState('');

  const handleAddKeyword = () => {
    if (!newWord.trim()) return;
    const newItem: KeywordRule = {
      id: Date.now().toString(),
      word: newWord.trim().toLowerCase(),
      category: 'Personalizada',
      active: true,
    };
    setKeywords([...keywords, newItem]);
    setNewWord('');
  };

  const toggleSwitch = (id: string) => {
    setKeywords(
      keywords.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setKeywords(keywords.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Reglas de Contenido</Text>
        <Text style={styles.subtitle}>
          Gestiona el filtro de palabras clave y detección de texto sensible.
        </Text>

        {/* Formulario para agregar palabra */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nueva palabra a bloquear..."
            value={newWord}
            onChangeText={setNewWord}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddKeyword}>
            <Text style={styles.addButtonText}>Agregar</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de palabras clave */}
        <Text style={styles.sectionHeader}>Palabras monitoreadas ({keywords.length})</Text>
        
        <FlatList
          data={keywords}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.ruleCard}>
              <View style={styles.ruleInfo}>
                <Text style={styles.wordText}>"{item.word}"</Text>
                <Text style={styles.categoryText}>{item.category}</Text>
              </View>
              <View style={styles.actions}>
                <Switch
                  value={item.active}
                  onValueChange={() => toggleSwitch(item.id)}
                />
                <TouchableOpacity
                  onPress={() => handleRemove(item.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
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
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    fontSize: 15,
  },
  addButton: {
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 12,
  },
  ruleCard: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  ruleInfo: {
    flex: 1,
  },
  wordText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  categoryText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deleteButton: {
    padding: 6,
  },
  deleteText: {
    color: '#EF4444',
    fontWeight: 'bold',
    fontSize: 16,
  },
});