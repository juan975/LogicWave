import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';

interface ProgressBarProps {
  progress: number; // 0 - 1
  label?: string;
}

export function ProgressBar({ progress, label }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.min(1, Math.max(0, progress)) * 100}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 13,
    marginBottom: 6,
    color: colors.textSecondary,
  },
  track: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.candidate,
  },
});
