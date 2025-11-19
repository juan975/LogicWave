import { useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { InputField } from '@/components/ui/InputField';

interface RegisterCandidateFormProps {
  onSuccess: (data: any) => void;
  onBack: () => void;
  onSwitchToLogin: () => void;
}

type TabType = 'personal' | 'profesional';

export function RegisterCandidateForm({ onSuccess, onBack, onSwitchToLogin }: RegisterCandidateFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  
  // Información Personal
  const [fullName, setFullName] = useState('');
  const [cedula, setCedula] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Loja');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Información Profesional
  const [professionalSummary, setProfessionalSummary] = useState('');
  const [technicalSkills, setTechnicalSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [degree, setDegree] = useState('');
  const [softSkills, setSoftSkills] = useState('');
  const [competencies, setCompetencies] = useState<string[]>([]);
  const [newCompetency, setNewCompetency] = useState('');
  const [yearsExperience, setYearsExperience] = useState('');
  const [experienceSummary, setExperienceSummary] = useState('');

  const handleSubmit = () => {
    if (activeTab === 'personal') {
      if (!fullName || !cedula || !email || !password || !confirmPassword) {
        Alert.alert('Campos incompletos', 'Completa todos los campos requeridos.');
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Las contraseñas no coinciden.');
        return;
      }
      // Cambiar a tab profesional
      setActiveTab('profesional');
      return;
    }

    // Submit final
    onSuccess({
      id: 'candidate-2',
      name: fullName,
      email,
      progress: 0.4,
    });
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setTechnicalSkills([...technicalSkills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setTechnicalSkills(technicalSkills.filter((_, i) => i !== index));
  };

  const addCompetency = () => {
    if (newCompetency.trim()) {
      setCompetencies([...competencies, newCompetency.trim()]);
      setNewCompetency('');
    }
  };

  const removeCompetency = (index: number) => {
    setCompetencies(competencies.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      {/* Header con botón volver y logo */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="chevron-left" size={20} color="#0F8154" />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
        <View style={styles.logoSmall}>
          <Text style={styles.logoText}>CAIL</Text>
        </View>
      </View>

      {/* Card de registro */}
      <View style={styles.card}>
        {/* Header del card */}
        <View style={styles.cardHeader}>
          <View style={styles.iconCircle}>
            <View style={styles.iconDot} />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>Registrarme como Candidato</Text>
            <Text style={styles.subtitle}>
              Administración de Candidatos - Ingresar datos de candidatos
            </Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'personal' && styles.tabActive]}
            onPress={() => setActiveTab('personal')}
          >
            <Text style={[styles.tabText, activeTab === 'personal' && styles.tabTextActive]}>
              Personal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'profesional' && styles.tabActive]}
            onPress={() => setActiveTab('profesional')}
          >
            <Text style={[styles.tabText, activeTab === 'profesional' && styles.tabTextActive]}>
              Profesional
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.formScroll} showsVerticalScrollIndicator={false}>
          {activeTab === 'personal' ? (
            <View style={styles.form}>
              {/* INFORMACIÓN PERSONAL */}
              <Text style={styles.sectionTitle}>INFORMACIÓN PERSONAL</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nombre Completo *</Text>
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="Nombre y apellidos"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Cédula Ecuatoriana *</Text>
                <TextInput
                  style={styles.input}
                  value={cedula}
                  onChangeText={setCedula}
                  placeholder="0000000000"
                  keyboardType="numeric"
                  maxLength={10}
                  placeholderTextColor="#9CA3AF"
                />
                <Text style={styles.hint}>10 dígitos - Validación automática</Text>
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.flex1]}>
                  <Text style={styles.label}>Fecha de Nacimiento</Text>
                  <TextInput
                    style={styles.input}
                    value={birthDate}
                    onChangeText={setBirthDate}
                    placeholder="dd/mm/aaaa"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                <View style={[styles.inputGroup, styles.flex1]}>
                  <Text style={styles.label}>Teléfono *</Text>
                  <TextInput
                    style={styles.input}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="0999999999"
                    keyboardType="phone-pad"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email *</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="tu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* UBICACIÓN */}
              <Text style={styles.sectionTitle}>UBICACIÓN</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Dirección</Text>
                <TextInput
                  style={styles.input}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Tu dirección"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Ciudad *</Text>
                <TextInput
                  style={styles.input}
                  value={city}
                  onChangeText={setCity}
                  placeholder="Loja"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* CREAR CONTRASEÑA */}
              <Text style={styles.sectionTitle}>CREAR CONTRASEÑA</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Contraseña *</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Mínimo 6 caracteres"
                  secureTextEntry
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Confirmar Contraseña *</Text>
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Repite tu contraseña"
                  secureTextEntry
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  <Text style={styles.infoBold}>Proceso de Validación:</Text>
                  {'\n'}Tu perfil será revisado y validado por CAIL. Podrás postular a ofertas una vez validado tu perfil.
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.form}>
              {/* INFORMACIÓN PROFESIONAL */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Resumen Profesional</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={professionalSummary}
                  onChangeText={setProfessionalSummary}
                  placeholder="Describe brevemente tu perfil profesional..."
                  multiline
                  numberOfLines={4}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* HABILIDADES TÉCNICAS */}
              <Text style={styles.sectionTitle}>HABILIDADES TÉCNICAS</Text>
              <Text style={styles.sectionHint}>Tecnologías, software, herramientas que dominas</Text>
              
              <View style={styles.skillInput}>
                <TextInput
                  style={[styles.input, styles.flex1]}
                  value={newSkill}
                  onChangeText={setNewSkill}
                  placeholder="Ej: Python, Excel, AutoCAD..."
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity style={styles.addButton} onPress={addSkill}>
                  <Feather name="plus" size={20} color="#fff" />
                </TouchableOpacity>
              </View>

              <View style={styles.chipContainer}>
                {technicalSkills.map((skill, index) => (
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{skill}</Text>
                    <TouchableOpacity onPress={() => removeSkill(index)}>
                      <Feather name="x" size={16} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              {/* FORMACIÓN */}
              <Text style={styles.sectionTitle}>FORMACIÓN</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Nivel de Educación</Text>
                <TextInput
                  style={styles.input}
                  value={educationLevel}
                  onChangeText={setEducationLevel}
                  placeholder="Bachiller, Tecnólogo, Universitario, Postgrado"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Título / Carrera</Text>
                <TextInput
                  style={styles.input}
                  value={degree}
                  onChangeText={setDegree}
                  placeholder="Ej: Ingeniería en Sistemas"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* HABILIDADES BLANDAS */}
              <Text style={styles.sectionTitle}>HABILIDADES BLANDAS</Text>
              <Text style={styles.sectionHint}>Cualidades personales y sociales</Text>
              
              <View style={styles.inputGroup}>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={softSkills}
                  onChangeText={setSoftSkills}
                  placeholder="Ej: Trabajo en equipo, liderazgo, comunicación efectiva..."
                  multiline
                  numberOfLines={3}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* COMPETENCIAS */}
              <Text style={styles.sectionTitle}>COMPETENCIAS</Text>
              <Text style={styles.sectionHint}>Capacidades profesionales específicas</Text>
              
              <View style={styles.skillInput}>
                <TextInput
                  style={[styles.input, styles.flex1]}
                  value={newCompetency}
                  onChangeText={setNewCompetency}
                  placeholder="Ej: Gestión de proyectos, Negociación..."
                  placeholderTextColor="#9CA3AF"
                />
                <TouchableOpacity style={styles.addButton} onPress={addCompetency}>
                  <Feather name="plus" size={20} color="#fff" />
                </TouchableOpacity>
              </View>

              <View style={styles.chipContainer}>
                {competencies.map((comp, index) => (
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{comp}</Text>
                    <TouchableOpacity onPress={() => removeCompetency(index)}>
                      <Feather name="x" size={16} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              {/* EXPERIENCIA */}
              <Text style={styles.sectionTitle}>EXPERIENCIA</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Años de Experiencia</Text>
                <TextInput
                  style={styles.input}
                  value={yearsExperience}
                  onChangeText={setYearsExperience}
                  placeholder="Ej: 3 años, 5+ años..."
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Resumen de Experiencia</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={experienceSummary}
                  onChangeText={setExperienceSummary}
                  placeholder="Describe brevemente tu experiencia laboral..."
                  multiline
                  numberOfLines={4}
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  <Text style={styles.infoBold}>Proceso de Validación:</Text>
                  {'\n'}Tu perfil será revisado y validado por CAIL. Podrás postular a ofertas una vez validado tu perfil.
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Botón de acción */}
        <TouchableOpacity 
          onPress={handleSubmit}
          style={styles.submitButton}
        >
          <Text style={styles.submitText}>
            {activeTab === 'personal' ? 'Continuar' : 'Registrar Perfil'}
          </Text>
        </TouchableOpacity>

        {/* Link de login */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={onSwitchToLogin}>
            <Text style={styles.loginLink}>Inicia sesión aquí</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backText: {
    color: '#0F8154',
    fontSize: 16,
    fontWeight: '500',
  },
  logoSmall: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  logoText: {
    color: '#0F8154',
    fontWeight: '700',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    maxHeight: '85%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0F8154',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 16,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#1F2937',
    fontWeight: '600',
  },
  formScroll: {
    maxHeight: 400,
  },
  form: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.5,
    marginTop: 8,
    marginBottom: 4,
  },
  sectionHint: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1F2937',
    borderWidth: 0,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  hint: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  flex1: {
    flex: 1,
  },
  skillInput: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#1F2937',
    width: 44,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F3F4F6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  chipText: {
    fontSize: 13,
    color: '#374151',
  },
  infoBox: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#1E40AF',
    lineHeight: 18,
  },
  infoBold: {
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#0F8154',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  submitText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginText: {
    color: '#6B7280',
    fontSize: 13,
  },
  loginLink: {
    color: '#0F8154',
    fontSize: 13,
    fontWeight: '600',
  },
});