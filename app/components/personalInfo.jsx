import { Feather } from '@expo/vector-icons';
import React, { useState, useMemo } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
    Modal,
    Pressable,
} from 'react-native';
// Import the common navigation bar
import CommonNavBar from './navbar';

// Import DateTimePicker for both platforms
import DateTimePicker from '@react-native-community/datetimepicker';

const GENDER_OPTIONS = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
  { label: 'Prefer not to say', value: 'Prefer not to say' },
];

// List of all fields that count towards profile completion
const PROFILE_FIELDS = [
  'fullName',
  'dateOfBirth',
  'gender',
  'contactNumber',
  'emailId',
  'permanentAddress',
  'localStayDetails',
  'fatherGuardianName',
  'fatherGuardianContact',
  'aadharNumber',
  'passportNumber',
  'emergencyContact1Name',
  'emergencyContact1Relationship',
  'emergencyContact1Number',
  'emergencyContact2Name',
  'emergencyContact2Relationship',
  'emergencyContact2Number',
  'bloodGroup',
  'allergies',
  'currentMedications',
  'chronicConditions',
  'medicalInsurance',
];

const PersonalInfo = ({ navigation }) => {
  // Use empty values and descriptive placeholders for all fields
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    emailId: '',
    permanentAddress: '',
    localStayDetails: '',
    fatherGuardianName: '',
    fatherGuardianContact: '',
    aadharNumber: '',
    passportNumber: '',
    emergencyContact1Name: '',
    emergencyContact1Relationship: '',
    emergencyContact1Number: '',
    emergencyContact2Name: '',
    emergencyContact2Relationship: '',
    emergencyContact2Number: '',
    bloodGroup: '',
    allergies: '',
    currentMedications: '',
    chronicConditions: '',
    medicalInsurance: '',
  });

  // State for Date Picker
  const [showDatePicker, setShowDatePicker] = useState(false);

  // State for Gender Dropdown
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);

  // Helper to format date as DD/MM/YYYY
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveChanges = () => {
    // Handle save logic here
    console.log('Saving changes:', formData);
  };

  // Calculate profile completion percentage
  const profileCompletion = useMemo(() => {
    let filled = 0;
    PROFILE_FIELDS.forEach(field => {
      // For date, check if it's a valid date string
      if (field === 'dateOfBirth') {
        if (formData[field] && !isNaN(new Date(formData[field]).getTime())) {
          filled += 1;
        }
      } else if (formData[field] && String(formData[field]).trim() !== '') {
        filled += 1;
      }
    });
    return Math.round((filled / PROFILE_FIELDS.length) * 100);
  }, [formData]);

  const renderInputField = (label, value, field, multiline = false, placeholder = '') => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={[styles.textInput, multiline && styles.multilineInput]}
        value={value}
        onChangeText={(text) => handleInputChange(field, text)}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        multiline={multiline}
        numberOfLines={multiline ? 3 : 1}
      />
    </View>
  );

  // Modified renderDropdownField to allow custom dropdown for gender
  const renderDropdownField = (label, value, field, placeholder = '') => {
    if (field === 'gender') {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{label}</Text>
          <Pressable
            style={styles.dropdownContainer}
            onPress={() => setShowGenderDropdown(true)}
          >
            <Text
              style={[
                styles.dropdownInput,
                { color: value ? '#FFFFFF' : '#6B7280' }
              ]}
            >
              {value || placeholder}
            </Text>
            <Feather name="chevron-down" size={20} color="#9CA3AF" />
          </Pressable>
          {/* Gender Dropdown Modal */}
          <Modal
            visible={showGenderDropdown}
            transparent
            animationType="fade"
            onRequestClose={() => setShowGenderDropdown(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setShowGenderDropdown(false)}
            >
              <View style={styles.genderDropdownModal}>
                {GENDER_OPTIONS.map(option => (
                  <TouchableOpacity
                    key={option.value}
                    style={styles.genderOption}
                    onPress={() => {
                      handleInputChange('gender', option.value);
                      setShowGenderDropdown(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.genderOptionText,
                        formData.gender === option.value && { color: '#14B8A6', fontWeight: 'bold' }
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Pressable>
          </Modal>
        </View>
      );
    }
    // Default dropdown field (not used for gender)
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <View style={styles.dropdownContainer}>
          <TextInput
            style={styles.dropdownInput}
            value={value}
            onChangeText={(text) => handleInputChange(field, text)}
            placeholder={placeholder}
            placeholderTextColor="#6B7280"
          />
          <Feather name="chevron-down" size={20} color="#9CA3AF" />
        </View>
      </View>
    );
  };

  // Updated renderDateField to make calendar button work and take input from it
  const renderDateField = (label, value, field, placeholder = '') => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.dateContainer}>
        <TextInput
          style={styles.dateInput}
          value={value}
          onChangeText={(text) => handleInputChange(field, text)}
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          editable={false} // Make input non-editable, use picker
        />
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Feather name="calendar" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
      {/* Date Picker Modal for iOS, inline for Android */}
      {showDatePicker && (
        Platform.OS === 'ios' ? (
          <Modal
            transparent={true}
            animationType="slide"
            visible={showDatePicker}
            onRequestClose={() => setShowDatePicker(false)}
          >
            <View style={{
              flex: 1,
              justifyContent: 'flex-end',
              backgroundColor: 'rgba(0,0,0,0.3)'
            }}>
              <View style={{
                backgroundColor: 'rgb(6, 8, 24)',
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                padding: 16
              }}>
                <DateTimePicker
                  value={formData[field] ? new Date(formData[field]) : new Date()}
                  mode="date"
                  display="spinner"
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    if (selectedDate) {
                      handleInputChange(field, selectedDate.toISOString());
                    }
                  }}
                  style={{ backgroundColor: 'rgb(6, 8, 24)' }}
                />
                <TouchableOpacity
                  style={{
                    marginTop: 12,
                    alignSelf: 'flex-end',
                    backgroundColor: '#14B8A6',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 8
                  }}
                  onPress={() => setShowDatePicker(false)}
                >
                  <Text style={{ color: '#fff', fontWeight: '600' }}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ) : (
          <DateTimePicker
            value={formData[field] ? new Date(formData[field]) : new Date()}
            mode="date"
            display="default"
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                handleInputChange(field, selectedDate.toISOString());
              }
            }}
          />
        )
      )}
    </View>
  );

  const renderAuthenticateField = (label, value, field, placeholder = '') => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.authenticateContainer}>
        <TextInput
          style={styles.authenticateInput}
          value={value}
          onChangeText={(text) => handleInputChange(field, text)}
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
        />
        <TouchableOpacity style={styles.authenticateButton}>
          <Text style={styles.authenticateButtonText}>Authenticate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderFileUpload = () => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Photo (passport-size/selfie)</Text>
      <TouchableOpacity style={styles.fileUploadContainer}>
        <Feather name="camera" size={32} color="#14B8A6" />
        <Text style={styles.uploadText}>Upload a file or drag and drop</Text>
        <Text style={styles.uploadSubtext}>PNG, JPG, GIF up to 10MB</Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmergencyContact = (number, nameField, relationshipField, contactField) => (
    <View style={styles.emergencyContactContainer}>
      <Text style={styles.emergencyContactTitle}>Emergency Contact {number}:</Text>
      {renderInputField('Name', formData[nameField], nameField, false, 'Enter name')}
      {renderInputField('Relationship', formData[relationshipField], relationshipField, false, 'Enter relationship')}
      {renderInputField('Contact Number', formData[contactField], contactField, false, 'Enter contact number')}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personal Information</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>Profile Completion</Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${profileCompletion}%` }
            ]}
          />
        </View>
        <Text style={styles.progressPercentText}>{profileCompletion}%</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Basic Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          {renderInputField('Full Name', formData.fullName, 'fullName', false, 'Enter your full name')}
          {renderDateField('Date of Birth', formatDate(formData.dateOfBirth), 'dateOfBirth', 'DD/MM/YYYY')}
          {renderDropdownField('Gender', formData.gender, 'gender', 'Select gender')}
          {renderInputField('Contact Number', formData.contactNumber, 'contactNumber', false, 'Enter your contact number')}
          {renderInputField('Email ID', formData.emailId, 'emailId', false, 'Enter your email address')}
          {renderInputField('Permanent Address', formData.permanentAddress, 'permanentAddress', true, 'Enter your permanent address')}
          {renderInputField('Local Stay Details (hotel/hostel name, address, phone)', formData.localStayDetails, 'localStayDetails', true, 'Enter local stay details')}
        </View>

        {/* Identity & Verification Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Identity & Verification</Text>
          {renderInputField('Father/Guardian Name', formData.fatherGuardianName, 'fatherGuardianName', false, 'Enter father/guardian name')}
          {renderInputField('Father/Guardian Contact Number', formData.fatherGuardianContact, 'fatherGuardianContact', false, 'Enter contact number')}
          {renderAuthenticateField('Aadhar Number', formData.aadharNumber, 'aadharNumber', 'Enter Aadhar number')}
          {renderInputField('Passport Number & Nationality (for foreign tourists)', formData.passportNumber, 'passportNumber', false, 'Enter passport number & nationality')}
          {renderFileUpload()}
        </View>

        {/* Emergency & Medical Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency & Medical</Text>
          {renderEmergencyContact(1, 'emergencyContact1Name', 'emergencyContact1Relationship', 'emergencyContact1Number')}
          {renderEmergencyContact(2, 'emergencyContact2Name', 'emergencyContact2Relationship', 'emergencyContact2Number')}
          {renderInputField('Blood Group', formData.bloodGroup, 'bloodGroup', false, 'Enter blood group')}
          {renderInputField('Allergies (food, medicine, insect, etc.)', formData.allergies, 'allergies', true, 'List any allergies')}
          {renderInputField('Current Medications', formData.currentMedications, 'currentMedications', true, 'List current medications')}
          {renderInputField('Chronic Conditions (e.g., diabetes, epilepsy, asthma)', formData.chronicConditions, 'chronicConditions', true, 'List chronic conditions')}
          {renderInputField('Medical Insurance Provider & Policy Number', formData.medicalInsurance, 'medicalInsurance', false, 'Enter insurance provider & policy number')}
        </View>

        {/* Save Changes Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
       {/* Common Navigation Bar */}
       {/* <CommonNavBar navigation={navigation} activeTab="ID" /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1F2937',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#1F2937',
  },
  progressLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 15,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#374151',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '65%', // default, will be overridden inline
    backgroundColor: '#14B8A6',
    borderRadius: 4,
  },
  progressPercentText: {
    color: '#14B8A6',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFF',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  dropdownInput: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
    color: '#ffffff',
  },
  authenticateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#4B5563',
  },
  authenticateInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  authenticateButton: {
    backgroundColor: '#4B5563',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginLeft: 12,
  },
  authenticateButtonText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '500',
  },
  fileUploadContainer: {
    backgroundColor: '#374151',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4B5563',
    borderStyle: 'dashed',
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  uploadText: {
    color: '#14B8A6',
    fontSize: 14,
    marginTop: 12,
  },
  uploadSubtext: {
    color: '#6B7280',
    fontSize: 12,
    marginTop: 4,
  },
  emergencyContactContainer: {
    marginBottom: 24,
  },
  emergencyContactTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  // Removed bottomNavigation, navItem, navLabel, activeNavLabel styles
  saveButton: {
    backgroundColor: '#14B8A6',
    marginHorizontal: 20,
    marginVertical: 32,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Gender dropdown modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderDropdownModal: {
    backgroundColor: '#23263a',
    borderRadius: 12,
    paddingVertical: 8,
    minWidth: 220,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  genderOption: {
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  genderOptionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default PersonalInfo;
