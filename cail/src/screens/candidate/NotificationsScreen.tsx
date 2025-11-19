import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { colors } from '@/theme/colors';
import { NOTIFICATION_ITEMS, NOTIFICATION_PREFERENCES } from '@/data/mockData';

export function NotificationsScreen() {
  const [preferences, setPreferences] = useState(NOTIFICATION_PREFERENCES);

  const togglePreference = (id: string) => {
    setPreferences((prev) => prev.map((pref) => (pref.id === id ? { ...pref, enabled: !pref.enabled } : pref)));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <SectionHeader title="Alertas inteligentes" subtitle="Activa los canales que prefieras" />
        {preferences.map((pref) => (
          <View key={pref.id} style={styles.preferenceRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.preferenceLabel}>{pref.label}</Text>
              <Text style={styles.preferenceDescription}>{pref.description}</Text>
            </View>
            <Switch
              trackColor={{ false: '#CBD5F5', true: '#A7F3D0' }}
              thumbColor={pref.enabled ? '#00994C' : '#fff'}
              value={pref.enabled}
              onValueChange={() => togglePreference(pref.id)}
            />
          </View>
        ))}
      </Card>

      <SectionHeader title="Últimas notificaciones" />
      {NOTIFICATION_ITEMS.map((item) => (
        <Card key={item.id} style={styles.notificationCard}>
          <View style={styles.notificationHeader}>
            <Text style={styles.notificationTitle}>{item.title}</Text>
            <Text style={styles.notificationDate}>{item.date}</Text>
          </View>
          <Text style={styles.notificationDescription}>{item.description}</Text>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
    paddingBottom: 120,
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  preferenceLabel: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  preferenceDescription: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  notificationCard: {
    gap: 8,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationTitle: {
    fontWeight: '600',
    fontSize: 16,
  },
  notificationDate: {
    color: colors.textSecondary,
  },
  notificationDescription: {
    color: colors.textSecondary,
  },
});
