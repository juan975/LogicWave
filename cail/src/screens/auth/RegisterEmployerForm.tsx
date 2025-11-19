import { useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, TextInput, Modal, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface RegisterEmployerFormProps {
  onSuccess: (data: any) => void;
  onBack: () => void;
  onSwitchToLogin: () => void;
}

// Base de datos simulada de empresas
const empresasDB = [
  {
    nombre: 'CAFRILOSA',
    cargo: 'Gerente de Recursos Humanos',
    contacto: 'María José Espinoza',
    telefono: '07-2570145',
    correo: 'rrhh@cafrilosa.com.ec'
  },
  {
    nombre: 'CLIPP',
    cargo: 'Coordinador de Talento Humano',
    contacto: 'Carlos Mendoza',
    telefono: '07-2581234',
    correo: 'talento@clipp.com.ec'
  },
  {
    nombre: 'CORPORACIÓN DE FERIAS DE LOJA',
    cargo: 'Jefe de Recursos Humanos',
    contacto: 'Ana Gabriela Torres',
    telefono: '07-2573890',
    correo: 'rrhh@feriasloja.com.ec'
  },
  {
    nombre: 'CREVIGO',
    cargo: 'Director de Talento',
    contacto: 'Roberto Sánchez',
    telefono: '07-2569087',
    correo: 'direccion@crevigo.com.ec'
  },
  {
    nombre: 'DECORTEJA',
    cargo: 'Gerente General',
    contacto: 'Patricia Luna',
    telefono: '07-2554321',
    correo: 'gerencia@decorteja.com.ec'
  },
  {
    nombre: 'DELAROMA S.A',
    cargo: 'Jefe de Personal',
    contacto: 'Miguel Ángel Ríos',
    telefono: '07-2567890',
    correo: 'personal@delaroma.com.ec'
  },
  {
    nombre: 'ECOLAC',
    cargo: 'Coordinadora de RRHH',
    contacto: 'Laura Jiménez',
    telefono: '07-2578901',
    correo: 'rrhh@ecolac.com.ec'
  },
  {
    nombre: 'EDILOJA',
    cargo: 'Gerente de Recursos Humanos',
    contacto: 'Fernando Castillo',
    telefono: '07-2589012',
    correo: 'recursos@ediloja.com.ec'
  },
  {
    nombre: 'GOACEN',
    cargo: 'Jefa de Talento Humano',
    contacto: 'Sofía Márquez',
    telefono: '07-2590123',
    correo: 'talento@goacen.com.ec'
  },
  {
    nombre: 'HOSPITAL Y CLÍNICA SAN AGUSTÍN',
    cargo: 'Director de Recursos Humanos',
    contacto: 'Dr. Luis Peña',
    telefono: '07-2601234',
    correo: 'rrhh@sanagustin.med.ec'
  },
  {
    nombre: 'ILE',
    cargo: 'Gerente de Personal',
    contacto: 'Andrea Vásquez',
    telefono: '07-2612345',
    correo: 'personal@ile.com.ec'
  },
  {
    nombre: 'ILELSA',
    cargo: 'Coordinador de RRHH',
    contacto: 'Jorge Morales',
    telefono: '07-2623456',
    correo: 'rrhh@ilelsa.com.ec'
  },
  {
    nombre: 'IMPORTADORA MINASUR',
    cargo: 'Jefe de Recursos Humanos',
    contacto: 'Diana Carrión',
    telefono: '07-2634567',
    correo: 'recursos@minasur.com.ec'
  },
  {
    nombre: 'INDERA',
    cargo: 'Gerente de Talento',
    contacto: 'Ricardo Ochoa',
    telefono: '07-2645678',
    correo: 'talento@indera.com.ec'
  },
  {
    nombre: 'INDULOJA',
    cargo: 'Directora de RRHH',
    contacto: 'Gabriela Ontaneda',
    telefono: '07-2656789',
    correo: 'rrhh@induloja.com.ec'
  },
  {
    nombre: 'LOJAGAS',
    cargo: 'Jefe de Personal',
    contacto: 'Manuel Rodríguez',
    telefono: '07-2667890',
    correo: 'personal@lojagas.com.ec'
  },
  {
    nombre: 'MALCA',
    cargo: 'Gerente de Recursos Humanos',
    contacto: 'Verónica Salinas',
    telefono: '07-2678901',
    correo: 'rrhh@malca.com.ec'
  },
  {
    nombre: 'OXIWEST',
    cargo: 'Coordinador de Talento Humano',
    contacto: 'Pablo Herrera',
    telefono: '07-2689012',
    correo: 'talento@oxiwest.com.ec'
  }
];

export function RegisterEmployerForm({ onSuccess, onBack, onSwitchToLogin }: RegisterEmployerFormProps) {
  const [empresaNombre, setEmpresaNombre] = useState('');
  const [cargo, setCargo] = useState('');
  const [contacto, setContacto] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState('');

  // Filtrar empresas según lo que el usuario escribe
  const empresasFiltradas = empresasDB.filter(empresa =>
    empresa.nombre.toLowerCase().includes(empresaNombre.toLowerCase())
  );

  const seleccionarEmpresa = (empresa: typeof empresasDB[0]) => {
    setEmpresaNombre(empresa.nombre);
    setCargo(empresa.cargo);
    setContacto(empresa.contacto);
    setTelefono(empresa.telefono);
    setCorreo(empresa.correo);
    setShowDropdown(false);
    setEmpresaSeleccionada(empresa.nombre);
  };

  const handleSubmit = () => {
    if (!empresaNombre || !cargo || !contacto || !telefono || !correo) {
      Alert.alert('Campos incompletos', 'Completa todos los campos del formulario.');
      return;
    }

    // Mostrar modal de éxito
    setShowSuccessModal(true);
    
    // Después de 2 segundos, redirigir
    setTimeout(() => {
      setShowSuccessModal(false);
      onSuccess({
        id: 'employer-2',
        company: empresaNombre,
        contactName: contacto,
        email: correo,
        needsPasswordChange: true,
        isEmailVerified: false,
      });
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Header con botón volver y logo */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Feather name="chevron-left" size={20} color="#fff" />
          <Text style={styles.backText}>Volver</Text>
        </TouchableOpacity>
        <View style={styles.logoSmall}>
          <Text style={styles.logoText}>CAIL</Text>
        </View>
      </View>

      {/* Card de registro */}
      <View style={styles.card}>
        {/* Icono de empresa */}
        <View style={styles.iconCircle}>
          <Feather name="briefcase" size={32} color="#F59E0B" />
        </View>

        {/* Título */}
        <Text style={styles.title}>Registro de Empresa</Text>
        <Text style={styles.subtitle}>Gestión de Recursos Humanos</Text>

        {/* Formulario */}
        <View style={styles.form}>
          {/* Nombre de empresa con dropdown */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre de empresa *</Text>
            <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
              <View style={styles.dropdownInput}>
                <TextInput
                  style={styles.input}
                  value={empresaNombre}
                  onChangeText={(text) => {
                    setEmpresaNombre(text);
                    setShowDropdown(true);
                  }}
                  placeholder="Selecciona o busca una empresa..."
                  placeholderTextColor="#9CA3AF"
                />
                <Feather name="chevron-down" size={20} color="#6B7280" />
              </View>
            </TouchableOpacity>
            <Text style={styles.hint}>Selecciona de la lista o escribe para buscar</Text>

            {/* Dropdown de opciones */}
            {showDropdown && empresasFiltradas.length > 0 && (
              <View style={styles.dropdown}>
                <ScrollView style={styles.dropdownScroll} nestedScrollEnabled>
                  {empresasFiltradas.map((empresa, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() => seleccionarEmpresa(empresa)}
                    >
                      <Text style={styles.dropdownItemText}>{empresa.nombre}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Cargo responsable */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cargo responsable *</Text>
            <TextInput
              style={styles.input}
              value={cargo}
              onChangeText={setCargo}
              placeholder="Ej: Gerente de Recursos Humanos"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Nombre del contacto */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre del contacto *</Text>
            <TextInput
              style={styles.input}
              value={contacto}
              onChangeText={setContacto}
              placeholder="Nombre completo del responsable"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Teléfono */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Teléfono *</Text>
            <TextInput
              style={styles.input}
              value={telefono}
              onChangeText={setTelefono}
              placeholder="Ej: 07-XXXXXXX"
              keyboardType="phone-pad"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Correo electrónico */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo electrónico *</Text>
            <TextInput
              style={styles.input}
              value={correo}
              onChangeText={setCorreo}
              placeholder="correo@empresa.com.ec"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          {/* Botón Registrar */}
          <TouchableOpacity 
            onPress={handleSubmit}
            style={styles.submitButton}
          >
            <Text style={styles.submitText}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de éxito */}
      <Modal
        visible={showSuccessModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.modalClose}
              onPress={() => setShowSuccessModal(false)}
            >
              <Feather name="x" size={20} color="#6B7280" />
            </TouchableOpacity>
            
            <View style={styles.successIcon}>
              <Feather name="check" size={40} color="#fff" />
            </View>
            
            <Text style={styles.modalTitle}>¡Registro Exitoso!</Text>
            
            <View style={styles.successBadge}>
              <Feather name="check-square" size={16} color="#059669" />
              <Text style={styles.successText}>Empresa registrada con éxito</Text>
            </View>
            
            <Text style={styles.modalEmpresa}>{empresaSeleccionada}</Text>
            
            <Text style={styles.modalRedirect}>Redirigiendo al panel de empleador...</Text>
          </View>
        </View>
      </Modal>
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
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backText: {
    color: '#fff',
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
    padding: 24,
    alignItems: 'center',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 24,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 16,
    position: 'relative',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  dropdownInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingRight: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1F2937',
  },
  hint: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 4,
  },
  dropdown: {
    position: 'absolute',
    top: 72,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
  },
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownItemText: {
    fontSize: 14,
    color: '#1F2937',
  },
  submitButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    position: 'relative',
  },
  modalClose: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#D1FAE5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    marginBottom: 12,
  },
  successText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#059669',
  },
  modalEmpresa: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  modalRedirect: {
    fontSize: 12,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
});