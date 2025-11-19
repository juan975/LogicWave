import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { colors } from '@/theme/colors';
import { CANDIDATE_APPLICATIONS } from '@/data/mockData';

const statusTone: Record<string, { label: string; tone: 'info' | 'warning' | 'success' | 'danger' | 'neutral' }> = {
  postulado: { label: 'Postulado', tone: 'neutral' },
  revision: { label: 'En revisión', tone: 'warning' },
  entrevista: { label: 'Entrevista', tone: 'info' },
  oferta: { label: 'Oferta', tone: 'success' },
  finalizado: { label: 'Finalizado', tone: 'neutral' },
};

export function MyApplicationsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionHeader title="Mis postulaciones" subtitle="Seguimiento de estados y próximos pasos" />
      {CANDIDATE_APPLICATIONS.map((application) => (
        <Card key={application.id} style={styles.card}>
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.title}>{application.title}</Text>
              <Text style={styles.subtitle}>{application.company}</Text>
            </View>
            <StatusBadge
              label={statusTone[application.status].label}
              tone={statusTone[application.status].tone}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.rowBetween}>
            <View>
              <Text style={styles.helper}>Etapa</Text>
              <Text style={styles.value}>{application.stage}</Text>
            </View>
            <View>
              <Text style={styles.helper}>Enviado</Text>
              <Text style={styles.value}>{application.submittedAt}</Text>
            </View>
            <View>
              <Text style={styles.helper}>Prioridad</Text>
              <Text style={styles.value}>{application.priority}</Text>
            </View>
          </View>
          {!!application.notes && <Text style={styles.notes}>{application.notes}</Text>}
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
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  subtitle: {
    color: colors.textSecondary,
    marginTop: 4,
  },
  helper: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  value: {
    color: colors.textPrimary,
    fontWeight: '600',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  notes: {
    color: colors.textSecondary,
    fontStyle: 'italic',
  },
});
