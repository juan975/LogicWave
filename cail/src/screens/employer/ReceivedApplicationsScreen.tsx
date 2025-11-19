import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { EMPLOYER_APPLICATIONS } from '@/data/mockData';
import { colors } from '@/theme/colors';

const toneByStatus: Record<string, 'info' | 'warning' | 'danger' | 'success' | 'neutral'> = {
  nuevo: 'info',
  entrevista: 'warning',
  descartado: 'danger',
  contratado: 'success',
};

export function ReceivedApplicationsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionHeader title="Postulaciones" subtitle="Prioriza candidatos con mejor afinidad" />
      {EMPLOYER_APPLICATIONS.map((app) => (
        <Card key={app.id} style={styles.card}>
          <View style={styles.header}>
            <View>
              <Text style={styles.name}>{app.candidateName}</Text>
              <Text style={styles.position}>{app.position}</Text>
            </View>
            <StatusBadge label={app.status} tone={toneByStatus[app.status] ?? 'neutral'} />
          </View>
          <View style={styles.row}>
            <View>
              <Text style={styles.helper}>Experiencia</Text>
              <Text style={styles.value}>{app.experienceYears} años</Text>
            </View>
            <View>
              <Text style={styles.helper}>Afinidad</Text>
              <Text style={styles.value}>{app.matchScore}%</Text>
            </View>
            <View>
              <Text style={styles.helper}>Canal</Text>
              <Text style={styles.value}>{app.channel}</Text>
            </View>
          </View>
          {app.notes && <Text style={styles.notes}>{app.notes}</Text>}
          <View style={styles.actions}>
            <Button
              label="Agendar"
              variant="ghost"
              onPress={() => Alert.alert('Agenda una entrevista', `Coordina con ${app.candidateName}.`)}
              tone="employer"
            />
            <Button
              label="Ver CV"
              variant="ghost"
              onPress={() => Alert.alert('CV del candidato', 'Integra aquí el visor de CV.')}
              tone="employer"
            />
          </View>
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
  card: {
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  position: {
    color: colors.textSecondary,
    marginTop: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  helper: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  value: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  notes: {
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
});
