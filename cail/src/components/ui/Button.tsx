import { ReactNode } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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

const LAYOUT_PROPS = new Set<keyof ViewStyle>([
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'marginHorizontal',
  'marginVertical',
  'alignSelf',
  'alignItems',
  'justifyContent',
  'flex',
  'flexGrow',
]);

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
  const [layoutStyle, visualStyle] = splitStyles(style);
  const shouldUseGradient = variant === 'primary' && tone !== 'neutral';
  const textColor =
    variant === 'primary'
      ? toneTokens.contrast
      : tone === 'neutral'
      ? colors.textPrimary
      : toneTokens.main;

  const variantStyles = getVariantStyles(variant, toneTokens, tone);
  const content = (
    <View style={styles.content}>
      {icon}
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </View>
  );

  const inner = shouldUseGradient ? (
    <LinearGradient
      colors={toneTokens.gradient}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={[styles.inner, styles.primaryInner, visualStyle]}
    >
      {loading ? <ActivityIndicator color={toneTokens.contrast} /> : content}
    </LinearGradient>
  ) : (
    <View style={[styles.inner, variantStyles, visualStyle]}>
      {loading ? <ActivityIndicator color={textColor} /> : content}
    </View>
  );

  const radiusStyle =
    typeof (visualStyle as ViewStyle)?.borderRadius === 'number'
      ? { borderRadius: (visualStyle as ViewStyle).borderRadius }
      : undefined;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.touchable,
        fullWidth && styles.fullWidth,
        layoutStyle,
        radiusStyle,
        variant === 'primary' && tone !== 'neutral' && styles.shadowed,
        isDisabled && styles.disabled,
      ]}
    >
      {inner}
    </TouchableOpacity>
  );
}

function splitStyles(style?: StyleProp<ViewStyle>): [ViewStyle, ViewStyle] {
  const flattened = StyleSheet.flatten(style) ?? {};
  const layout: ViewStyle = {};
  const visual: ViewStyle = {};

  Object.entries(flattened).forEach(([key, value]) => {
    if (value === undefined) return;
    if (LAYOUT_PROPS.has(key as keyof ViewStyle)) {
      layout[key as keyof ViewStyle] = value as never;
    } else {
      visual[key as keyof ViewStyle] = value as never;
    }
  });

  return [layout, visual];
}

function getVariantStyles(variant: ButtonVariant, toneTokens: ToneTokens, tone: ButtonTone): ViewStyle {
  switch (variant) {
    case 'secondary':
      return {
        backgroundColor: tone === 'neutral' ? colors.surfaceMuted : toneTokens.surface,
        borderColor: tone === 'neutral' ? colors.border : toneTokens.main,
        borderWidth: 1,
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        borderColor: tone === 'neutral' ? colors.border : toneTokens.main,
        borderWidth: 1,
      };
    default:
      return {
        backgroundColor: toneTokens.main,
      };
  }
}

type ToneTokens = {
  main: string;
  surface: string;
  contrast: string;
  gradient: [string, string];
};

const toneStyles: Record<ButtonTone, ToneTokens> = {
  candidate: {
    main: colors.candidate,
    surface: colors.candidateSurface,
    contrast: '#FFFFFF',
    gradient: ['#16A968', '#1EC890'],
  },
  employer: {
    main: colors.employer,
    surface: colors.employerSurface,
    contrast: '#FFFFFF',
    gradient: ['#F07F2D', '#F4B25D'],
  },
  neutral: {
    main: colors.textPrimary,
    surface: colors.surfaceMuted,
    contrast: '#FFFFFF',
    gradient: [colors.textPrimary, colors.textPrimary],
  },
};

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 18,
  },
  inner: {
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  primaryInner: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.6,
  },
  fullWidth: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  shadowed: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
});
