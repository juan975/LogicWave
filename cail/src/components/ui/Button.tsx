import { ReactNode } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, StyleProp, ViewStyle } from 'react-native';
import { colors } from '@/theme/colors';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonTone = 'candidate' | 'employer' | 'neutral';

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  tone?: ButtonTone;
  style?: StyleProp<ViewStyle>;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  loading,
  disabled,
  fullWidth,
  tone = 'candidate',
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const toneTokens = toneStyles[tone];
  const containerStyles = [
    styles.base,
    variant === 'primary' && { backgroundColor: toneTokens.main },
    variant === 'secondary' && {
      backgroundColor: toneTokens.surface,
      borderColor: toneTokens.main,
      borderWidth: 1,
    },
    variant === 'ghost' && {
      backgroundColor: 'transparent',
      borderColor: tone === 'neutral' ? colors.border : toneTokens.main,
      borderWidth: 1,
    },
    fullWidth && styles.fullWidth,
    isDisabled && styles.disabled,
    style,
  ];
  const textColor =
    variant === 'primary'
      ? toneTokens.contrast
      : tone === 'neutral'
      ? colors.textPrimary
      : toneTokens.main;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={isDisabled}
      style={containerStyles}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.content}>
          {icon}
          <Text style={[styles.label, { color: textColor }]}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const toneStyles: Record<ButtonTone, { main: string; surface: string; contrast: string }> = {
  candidate: {
    main: colors.candidate,
    surface: colors.candidateSurface,
    contrast: '#FFFFFF',
  },
  employer: {
    main: colors.employer,
    surface: colors.employerSurface,
    contrast: '#FFFFFF',
  },
  neutral: {
    main: colors.textPrimary,
    surface: colors.surfaceMuted,
    contrast: '#FFFFFF',
  },
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
