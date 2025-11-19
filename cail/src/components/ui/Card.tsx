import { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { colors } from '@/theme/colors';

type CardTone = 'default' | 'candidate' | 'employer' | 'accent';

interface CardProps {
  children: ReactNode;
  spacing?: 'sm' | 'md' | 'lg';
  tone?: CardTone;
  style?: StyleProp<ViewStyle>;
}

const toneStyles: Record<Exclude<CardTone, 'default'>, ViewStyle> = {
  candidate: {
    borderColor: colors.candidate + '33',
    backgroundColor: colors.candidateSurface,
  },
  employer: {
    borderColor: colors.employer + '33',
    backgroundColor: colors.employerSurface,
  },
  accent: {
    borderColor: colors.accent + '33',
    backgroundColor: colors.surfaceMuted,
  },
};

export function Card({ children, spacing = 'md', tone = 'default', style }: CardProps) {
  const toneStyle = tone !== 'default' ? toneStyles[tone] : undefined;
  return <View style={[styles.base, styles[spacing], toneStyle, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sm: {
    padding: 12,
  },
  md: {
    padding: 18,
  },
  lg: {
    padding: 26,
  },
});
