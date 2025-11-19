import { forwardRef } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '@/theme/colors';

interface InputFieldProps extends TextInputProps {
  label: string;
  helperText?: string;
}

export const InputField = forwardRef<TextInput, InputFieldProps>(
  ({ label, helperText, multiline, style, ...rest }, ref) => {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={ref}
          style={[styles.input, multiline && styles.multiline, style]}
          placeholderTextColor={colors.muted}
          multiline={multiline}
          {...rest}
        />
        {helperText && <Text style={styles.helper}>{helperText}</Text>}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textPrimary,
    backgroundColor: '#fff',
  },
  helper: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 4,
  },
  multiline: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
});
