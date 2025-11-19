import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '@/theme/colors';

interface CardProps {
  children: ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, spacing = 'md', style }: CardProps) {
  return <View style={[styles.base, styles[spacing], style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  sm: {
    padding: 12,
  },
  md: {
    padding: 16,
  },
  lg: {
    padding: 22,
  },
});
