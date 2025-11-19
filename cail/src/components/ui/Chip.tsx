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
  const content = (
    <View
      style={[
        styles.container,
        active && { backgroundColor: color ?? colors.candidate + '26', borderColor: color ?? colors.candidate },
      ]}
    >
      {icon}
      <Text style={[styles.label, active && { color: color ?? colors.candidate }]}>{label}</Text>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => pressed && { opacity: 0.7 }}>
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
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 24,
    gap: 6,
    backgroundColor: '#fff',
  },
  label: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
});
