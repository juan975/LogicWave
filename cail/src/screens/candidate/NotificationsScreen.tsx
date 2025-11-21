import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { colors } from '@/theme/colors';
import { NOTIFICATION_ITEMS, NOTIFICATION_PREFERENCES } from '@/data/mockData';
import { useResponsiveLayout } from '@/hooks/useResponsive';

export function NotificationsScreen() {
  const { contentWidth, horizontalGutter } = useResponsiveLayout();
  const [preferences, setPreferences] = useState(NOTIFICATION_PREFERENCES);
  const [tab, setTab] = useState<'feed' | 'settings'>('feed');

  const togglePreference = (id: string) => {
    setPreferences((prev) => prev.map((pref) => (pref.id === id ? { ...pref, enabled: !pref.enabled } : pref)));
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={[styles.stack, { paddingHorizontal: horizontalGutter, maxWidth: contentWidth, alignSelf: 'center' }]}>
        <View style={[styles.tabBar, styles.surfaceCard]}>
          <TabButton label="Notificaciones" active={tab === 'feed'} onPress={() => setTab('feed')} />
          <TabButton label="Configuración" active={tab === 'settings'} onPress={() => setTab('settings')} />
        </View>

        {tab === 'feed' ? (
          <View style={styles.stack}>
            <SectionHeader title="Resumen" subtitle="Últimas actualizaciones" accentColor={colors.candidate} />
            {NOTIFICATION_ITEMS.map((item) => (
              <View key={item.id} style={[styles.surfaceCard, styles.notificationCard]}>
                <View style={styles.notificationHeader}>
                  <View style={styles.iconBadge}>
                    <Text style={styles.iconBadgeText}>{item.title.charAt(0)}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.notificationTitle}>{item.title}</Text>
                    <Text style={styles.notificationDescription}>{item.description}</Text>
                    <View style={styles.notificationMeta}>
                      <Text style={styles.notificationDate}>{item.date}</Text>
                      <View style={[styles.categoryPill, { backgroundColor: getCategoryColor(item.category) + '20' }]}>
                        <Text style={[styles.categoryText, { color: getCategoryColor(item.category) }]}>
                          {item.category}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={[styles.surfaceCard, styles.preferencesCard]}>
            <SectionHeader title="Preferencias" subtitle="Activa los canales que prefieras" accentColor={colors.candidate} />
            {preferences.map((pref) => (
              <View key={pref.id} style={styles.preferenceRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.preferenceLabel}>{pref.label}</Text>
                  <Text style={styles.preferenceDescription}>{pref.description}</Text>
                </View>
                <Switch
                  trackColor={{ false: '#CBD5F5', true: '#A7F3D0' }}
                  thumbColor={pref.enabled ? colors.candidate : '#fff'}
                  value={pref.enabled}
                  onValueChange={() => togglePreference(pref.id)}
                />
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

function TabButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.tabButton, active && styles.tabButtonActive]}>
      <Text style={[styles.tabButtonText, active && styles.tabButtonTextActive]} numberOfLines={1} adjustsFontSizeToFit>
        {label}
      </Text>
    </Pressable>
  );
}

function getCategoryColor(category?: string) {
  switch (category) {
    case 'Proceso':
      return colors.info;
    case 'Sugerencia':
      return colors.candidate;
    case 'Alerta':
      return colors.danger;
    default:
      return colors.muted;
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    paddingVertical: 16,
    paddingBottom: 140,
  },
  stack: {
    gap: 14,
    width: '100%',
  },
  surfaceCard: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
    padding: 14,
  },
  centerEyebrow: {
    textTransform: 'uppercase',
    color: colors.muted,
    fontSize: 12,
    letterSpacing: 1,
  },
  centerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  centerSubtitle: {
    color: colors.textSecondary,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 16,
    padding: 4,
    gap: 6,
    width: '100%',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    minHeight: 44,
    paddingHorizontal: 12,
    minWidth: 120,
    borderRadius: 14,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: colors.surfaceMuted,
  },
  tabButtonText: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
  tabButtonTextActive: {
    color: colors.candidateDark,
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
    padding: 16,
  },
  preferencesCard: {
    gap: 12,
  },
  notificationHeader: {
    flexDirection: 'row',
    gap: 12,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBadgeText: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  notificationTitle: {
    fontWeight: '700',
    fontSize: 16,
  },
  notificationDescription: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  notificationMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  notificationDate: {
    color: colors.textSecondary,
  },
  categoryPill: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
