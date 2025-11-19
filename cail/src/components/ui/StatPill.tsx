import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';

interface StatPillProps {
  value: string;
  label: string;
  color?: string;
}

export function StatPill({ value, label, color = colors.info }: StatPillProps) {
  return (
    <View style={[styles.container, { backgroundColor: color + '20' }]}> 
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 18,
    minWidth: 100,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
  },
  label: {
    color: colors.textSecondary,
    marginTop: 4,
  },
});
