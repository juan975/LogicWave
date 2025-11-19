import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';

const toneColors: Record<string, string> = {
  success: colors.success,
  warning: colors.warning,
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
    <View
      style={[
        styles.badge,
        {
          backgroundColor: toneColor + '15',
          borderColor: toneColor + '33',
        },
      ]}
    >
      <Text style={[styles.text, { color: toneColor }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: 'flex-start',
    borderWidth: 1,
  },
  text: {
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'capitalize',
  },
});
