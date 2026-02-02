'use client';

import { useState, useMemo } from 'react';
import gsap from 'gsap';
import { useLanguage } from '@/contexts/LanguageContext';

interface BookingFormData {
  consultationType: string;
  selectedDate: string;
  selectedTime: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

const consultationTypes = [
  { value: 'creation', label: { fr: 'Création d\'entreprise', en: 'Business Creation' }, icon: '🏢', description: { fr: 'SAS, SARL, SARLU, Association...', en: 'SAS, SARL, SARLU, Association...' } },
  { value: 'modification', label: { fr: 'Modification de société', en: 'Company Modification' }, icon: '🔄', description: { fr: 'Transfert siège, changement statuts...', en: 'HQ transfer, articles of association changes...' } },
  { value: 'dissolution', label: { fr: 'Dissolution', en: 'Dissolution' }, icon: '📋', description: { fr: 'Fermeture et liquidation', en: 'Closure and liquidation' } },
  { value: 'conseil', label: { fr: 'Conseil juridique', en: 'Legal Advice' }, icon: '⚖️', description: { fr: 'Questions légales diverses', en: 'Various legal questions' } },
  { value: 'comptable', label: { fr: 'Expertise comptable', en: 'Accounting Expertise' }, icon: '📊', description: { fr: 'Comptabilité et fiscalité', en: 'Accounting and taxation' } },
  { value: 'autre', label: { fr: 'Autre', en: 'Other' }, icon: '💬', description: { fr: 'Besoin spécifique', en: 'Specific need' } },
];

const bookingText = {
  // Step 0: Consultation Type
  consultationTitle: { fr: 'Quel type de consultation ?', en: 'What type of consultation?' },
  consultationSubtitle: { fr: 'Sélectionnez le sujet de votre rendez-vous', en: 'Select the topic of your appointment' },

  // Step 1: Date & Time
  dateTimeTitle: { fr: 'Choisissez une date et un horaire', en: 'Choose a date and time' },
  dateTimeSubtitle: { fr: 'Fuseau horaire: Afrique Centrale (WAT)', en: 'Timezone: West Africa Time (WAT)' },
  dateLabel: { fr: 'Date', en: 'Date' },
  timeLabel: { fr: 'Horaire', en: 'Time' },

  // Step 2: Contact Info
  contactTitle: { fr: 'Vos coordonnées', en: 'Your contact details' },
  contactSubtitle: { fr: 'Comment pouvons-nous vous contacter ?', en: 'How can we contact you?' },
  firstNameLabel: { fr: 'Prénom', en: 'First name' },
  lastNameLabel: { fr: 'Nom', en: 'Last name' },
  emailLabel: { fr: 'Email', en: 'Email' },
  phoneLabel: { fr: 'Téléphone', en: 'Phone' },
  messageLabel: { fr: 'Message (optionnel)', en: 'Message (optional)' },
  messagePlaceholder: { fr: 'Décrivez brièvement votre besoin...', en: 'Briefly describe your need...' },

  // Step 3: Confirmation
  confirmTitle: { fr: 'Confirmez votre rendez-vous', en: 'Confirm your appointment' },
  confirmSubtitle: { fr: 'Vérifiez les informations avant de confirmer', en: 'Review the information before confirming' },
  consultationLabel: { fr: 'Consultation', en: 'Consultation' },
  nameLabel: { fr: 'Nom', en: 'Name' },
  confirmNote: {
    fr: 'Vous recevrez un email de confirmation avec les détails du rendez-vous.',
    en: 'You will receive a confirmation email with the appointment details.',
  },

  // Success state
  successTitle: { fr: 'Rendez-vous Confirmé !', en: 'Appointment Confirmed!' },
  successEmailSent: {
    fr: 'Un email de confirmation a été envoyé à',
    en: 'A confirmation email has been sent to',
  },
  backHome: { fr: "Retour à l'accueil", en: 'Back to Home' },
  newAppointment: { fr: 'Nouveau rendez-vous', en: 'New appointment' },

  // Navigation
  back: { fr: 'Retour', en: 'Back' },
  continue: { fr: 'Continuer', en: 'Continue' },
  confirming: { fr: 'Confirmation...', en: 'Confirming...' },
  confirmButton: { fr: 'Confirmer le rendez-vous', en: 'Confirm appointment' },

  // Validation errors
  errSelectConsultation: { fr: 'Veuillez sélectionner un type de consultation', en: 'Please select a consultation type' },
  errSelectDate: { fr: 'Veuillez sélectionner une date', en: 'Please select a date' },
  errSelectTime: { fr: 'Veuillez sélectionner un horaire', en: 'Please select a time' },
  errFirstNameRequired: { fr: 'Prénom requis', en: 'First name required' },
  errLastNameRequired: { fr: 'Nom requis', en: 'Last name required' },
  errEmailRequired: { fr: 'Email requis', en: 'Email required' },
  errEmailInvalid: { fr: 'Format email invalide', en: 'Invalid email format' },
  errPhoneRequired: { fr: 'Téléphone requis', en: 'Phone required' },
};

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
];

const initialFormData: BookingFormData = {
  consultationType: '',
  selectedDate: '',
  selectedTime: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
};

export default function BookingForm() {
  const { language } = useLanguage();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Generate available dates (next 30 days, excluding Sundays)
  const availableDates = useMemo(() => {
    const dates: Date[] = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      if (date.getDay() !== 0) { // Exclude Sundays
        dates.push(date);
      }
    }
    return dates;
  }, []);

  const updateFormData = (updates: Partial<BookingFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    const clearedErrors = { ...errors };
    Object.keys(updates).forEach(key => delete clearedErrors[key]);
    setErrors(clearedErrors);
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0:
        if (!formData.consultationType) {
          newErrors.consultationType = bookingText.errSelectConsultation[language];
        }
        break;
      case 1:
        if (!formData.selectedDate) {
          newErrors.selectedDate = bookingText.errSelectDate[language];
        }
        if (!formData.selectedTime) {
          newErrors.selectedTime = bookingText.errSelectTime[language];
        }
        break;
      case 2:
        if (!formData.firstName.trim()) newErrors.firstName = bookingText.errFirstNameRequired[language];
        if (!formData.lastName.trim()) newErrors.lastName = bookingText.errLastNameRequired[language];
        if (!formData.email.trim()) {
          newErrors.email = bookingText.errEmailRequired[language];
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = bookingText.errEmailInvalid[language];
        }
        if (!formData.phone.trim()) {
          newErrors.phone = bookingText.errPhoneRequired[language];
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToStep = (newStep: number) => {
    gsap.to('.booking-step-content', {
      opacity: 0,
      y: newStep > step ? -20 : 20,
      duration: 0.2,
      onComplete: () => {
        setStep(newStep);
        gsap.fromTo(
          '.booking-step-content',
          { opacity: 0, y: newStep > step ? 20 : -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
        );
      },
    });
  };

  const nextStep = () => {
    if (validateStep()) {
      goToStep(step + 1);
    }
  };

  const prevStep = () => {
    goToStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  const formatDateValue = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  if (isSubmitted) {
    const selectedDateObj = new Date(formData.selectedDate);
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {bookingText.successTitle[language]}
        </h2>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 max-w-md mx-auto mb-8">
          <div className="text-left space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">{bookingText.dateLabel[language]}</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {formatDate(selectedDateObj)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">{bookingText.timeLabel[language]}</span>
              <span className="font-medium text-gray-900 dark:text-white">{formData.selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 dark:text-gray-400">Type</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {consultationTypes.find(t => t.value === formData.consultationType)?.label[language]}
              </span>
            </div>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {bookingText.successEmailSent[language]} <strong>{formData.email}</strong>
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            {bookingText.backHome[language]}
          </a>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFormData(initialFormData);
              setStep(0);
            }}
            className="inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            {bookingText.newAppointment[language]}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {[0, 1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 rounded-full transition-all duration-300 ${
              s <= step ? 'bg-primary-600 w-12' : 'bg-gray-200 dark:bg-gray-700 w-8'
            }`}
          />
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">
        <div className="booking-step-content">
          {/* Step 0: Consultation Type */}
          {step === 0 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                {bookingText.consultationTitle[language]}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                {bookingText.consultationSubtitle[language]}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {consultationTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => updateFormData({ consultationType: type.value })}
                    className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-[1.02] ${
                      formData.consultationType === type.value
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{type.icon}</span>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{type.label[language]}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{type.description[language]}</p>
                  </button>
                ))}
              </div>
              {errors.consultationType && (
                <p className="text-red-500 text-sm mt-4 text-center">{errors.consultationType}</p>
              )}
            </div>
          )}

          {/* Step 1: Date & Time */}
          {step === 1 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                {bookingText.dateTimeTitle[language]}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                {bookingText.dateTimeSubtitle[language]}
              </p>

              {/* Date Selection */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {bookingText.dateLabel[language]}
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-2">
                  {availableDates.slice(0, 16).map((date) => (
                    <button
                      key={formatDateValue(date)}
                      onClick={() => updateFormData({ selectedDate: formatDateValue(date) })}
                      className={`p-3 rounded-xl text-center transition-all duration-200 ${
                        formData.selectedDate === formatDateValue(date)
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                      }`}
                    >
                      <div className="text-xs uppercase opacity-75">
                        {date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'short' })}
                      </div>
                      <div className="text-lg font-bold">{date.getDate()}</div>
                      <div className="text-xs">
                        {date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { month: 'short' })}
                      </div>
                    </button>
                  ))}
                </div>
                {errors.selectedDate && (
                  <p className="text-red-500 text-sm mt-2">{errors.selectedDate}</p>
                )}
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  {bookingText.timeLabel[language]}
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => updateFormData({ selectedTime: time })}
                      className={`p-3 rounded-xl text-center font-medium transition-all duration-200 ${
                        formData.selectedTime === time
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                {errors.selectedTime && (
                  <p className="text-red-500 text-sm mt-2">{errors.selectedTime}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Contact Info */}
          {step === 2 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                {bookingText.contactTitle[language]}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                {bookingText.contactSubtitle[language]}
              </p>

              <div className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {bookingText.firstNameLabel[language]}
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateFormData({ firstName: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 transition-colors ${
                        errors.firstName ? 'border-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                      } focus:outline-none`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {bookingText.lastNameLabel[language]}
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateFormData({ lastName: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 transition-colors ${
                        errors.lastName ? 'border-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                      } focus:outline-none`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {bookingText.emailLabel[language]}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    placeholder="votre@email.com"
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                    } focus:outline-none`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {bookingText.phoneLabel[language]}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData({ phone: e.target.value })}
                    placeholder="+237 6 XX XX XX XX"
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                    } focus:outline-none`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {bookingText.messageLabel[language]}
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => updateFormData({ message: e.target.value })}
                    rows={3}
                    placeholder={bookingText.messagePlaceholder[language]}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-primary-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                {bookingText.confirmTitle[language]}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
                {bookingText.confirmSubtitle[language]}
              </p>

              <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-gray-500 dark:text-gray-400">{bookingText.consultationLabel[language]}</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {consultationTypes.find(t => t.value === formData.consultationType)?.label[language]}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-gray-500 dark:text-gray-400">{bookingText.dateLabel[language]}</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formData.selectedDate && formatDate(new Date(formData.selectedDate))}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-gray-500 dark:text-gray-400">{bookingText.timeLabel[language]}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.selectedTime} (WAT)</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-gray-500 dark:text-gray-400">{bookingText.nameLabel[language]}</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-gray-500 dark:text-gray-400">{bookingText.emailLabel[language]}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">{bookingText.phoneLabel[language]}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.phone}</span>
                </div>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-6">
                {bookingText.confirmNote[language]}
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              step === 0
                ? 'opacity-0 pointer-events-none'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {bookingText.back[language]}
          </button>

          {step === 3 ? (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  {bookingText.confirming[language]}
                </>
              ) : (
                <>
                  {bookingText.confirmButton[language]}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              {bookingText.continue[language]}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
