import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';

const toneColors: Record<string, string> = {
  success: colors.success,
  warning: colors.employer,
  info: colors.info,
  danger: colors.danger,
  neutral: colors.muted,
};

interface StatusBadgeProps {
  label: string;
  tone?: keyof typeof toneColors;
}

export function StatusBadge({ label, tone = 'info' }: StatusBadgeProps) {
  const toneColor = toneColors[tone] ?? colors.info;
  return (
    <View style={[styles.badge, { backgroundColor: toneColor + '20' }]}> 
      <Text style={[styles.text, { color: toneColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '600',
    fontSize: 12,
  },
});
