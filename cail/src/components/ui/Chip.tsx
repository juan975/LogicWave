import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '@/theme/colors';

interface ChipProps {
  label: string;
  icon?: ReactNode;
  active?: boolean;
  onPress?: () => void;
  color?: string;
}

export function Chip({ label, icon, onPress, active, color }: ChipProps) {
  const accentColor = color ?? colors.accent;
  const content = (
    <View
      style={[
        styles.container,
        active && {
          backgroundColor: accentColor + '18',
          borderColor: accentColor,
          shadowColor: accentColor,
          shadowOpacity: 0.12,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
        },
      ]}
    >
      {icon}
      <Text style={[styles.label, active && { color: accentColor }]}>{label}</Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => (pressed ? styles.pressed : undefined)}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 28,
    gap: 6,
    backgroundColor: colors.surface,
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.8,
  },
});
