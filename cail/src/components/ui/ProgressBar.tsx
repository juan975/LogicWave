import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/theme/colors';

interface ProgressBarProps {
  progress: number; // 0 - 1
  label?: string;
}

export function ProgressBar({ progress, label }: ProgressBarProps) {
  const width = `${Math.min(1, Math.max(0, progress)) * 100}%`;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.track}>
        <LinearGradient
          colors={[colors.accent, colors.candidate]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.fill, { width }]}
        />
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
    fontWeight: '600',
  },
  track: {
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.surfaceMuted,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
  },
});
