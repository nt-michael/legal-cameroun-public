'use client';

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearchParams } from 'next/navigation';

interface BookingFormData {
  consultationType: string;
  selectedDate: string;
  selectedTime: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  slotStartTime: string; // ISO 8601 UTC
  timezone: string;
}

const consultationTypes = [
  { value: 'creation_entreprise', label: { fr: 'Création d\'entreprise', en: 'Business Creation' }, icon: '🏢', description: { fr: 'SAS, SARL, SARLU, Association...', en: 'SAS, SARL, SARLU, Association...' } },
  { value: 'modification_entreprise', label: { fr: 'Modification de société', en: 'Company Modification' }, icon: '🔄', description: { fr: 'Transfert siège, changement statuts...', en: 'HQ transfer, articles of association changes...' } },
  { value: 'dissolution_entreprise', label: { fr: 'Dissolution', en: 'Dissolution' }, icon: '📋', description: { fr: 'Fermeture et liquidation', en: 'Closure and liquidation' } },
  { value: 'conseil_juridique', label: { fr: 'Conseil juridique', en: 'Legal Advice' }, icon: '⚖️', description: { fr: 'Questions légales diverses', en: 'Various legal questions' } },
  { value: 'expertise_comptable', label: { fr: 'Expertise comptable', en: 'Accounting Expertise' }, icon: '📊', description: { fr: 'Comptabilité et fiscalité', en: 'Accounting and taxation' } },
  { value: 'autre', label: { fr: 'Autre', en: 'Other' }, icon: '💬', description: { fr: 'Besoin spécifique', en: 'Specific need' } },
];

const bookingText: Record<string, any> = {
  // Step 0: Consultation Type
  consultationTitle: { fr: 'Quel type de consultation ?', en: 'What type of consultation?' },
  consultationSubtitle: { fr: 'Sélectionnez le sujet de votre rendez-vous', en: 'Select the topic of your appointment' },

  // Step 1: Date & Time
  dateTimeTitle: { fr: 'Choisissez une date et un horaire', en: 'Choose a date and time' },
  dateTimeSubtitle: { fr: 'Fuseau horaire: Afrique Centrale (WAT)', en: 'Timezone: West Africa Time (WAT)' },
  dateLabel: { fr: 'Date', en: 'Date' },
  timeLabel: { fr: 'Horaire', en: 'Time' },
  noSlots: { fr: 'Aucun créneau disponible', en: 'No slots available' },
  loadingSlots: { fr: 'Chargement des disponibilités...', en: 'Loading availability...' },

  // Step 2: Contact Info
  contactTitle: { fr: 'Vos coordonnées', en: 'Your contact details' },
  contactSubtitle: { fr: 'Comment pouvons-nous vous contacter ?', en: 'How can we contact you?' },
  firstNameLabel: { fr: 'Prénom', en: 'First name' },
  lastNameLabel: { fr: 'Nom', en: 'Last name' },
  emailLabel: { fr: 'Email', en: 'Email' },
  emailPlaceholder: { fr: 'votre@email.com', en: 'your@email.com' },
  phoneLabel: { fr: 'Téléphone', en: 'Phone' },
  messageLabel: { fr: 'Message (optionnel)', en: 'Message (optional)' },
  messagePlaceholder: { fr: 'Décrivez brièvement votre besoin...', en: 'Briefly describe your need...' },

  // Step 3: Confirmation
  confirmTitle: { fr: 'Confirmez votre rendez-vous', en: 'Confirm your appointment' },
  confirmSubtitle: { fr: 'Vérifiez les informations avant de confirmer', en: 'Review the information before confirming' },
  consultationLabel: { fr: 'Consultation', en: 'Consultation' },
  nameLabel: { fr: 'Nom', en: 'Name' },
  confirmNote: {
    fr: 'Vous serez redirigé vers le paiement pour finaliser la réservation (50,000 FCFA).',
    en: 'You will be redirected to payment to finalize the booking (50,000 FCFA).',
  },

  // Success state (Not used directly here as we redirect, but kept if needed for return page)
  successTitle: { fr: 'Redirection en cours...', en: 'Redirecting...' },
  
  // Navigation
  back: { fr: 'Retour', en: 'Back' },
  continue: { fr: 'Continuer', en: 'Continue' },
  confirming: { fr: 'Traitement...', en: 'Processing...' },
  confirmButton: { fr: 'Payer et Confirmer', en: 'Pay and Confirm' },

  // Validation errors
  errSelectConsultation: { fr: 'Veuillez sélectionner un type de consultation', en: 'Please select a consultation type' },
  errSelectDate: { fr: 'Veuillez sélectionner une date', en: 'Please select a date' },
  errSelectTime: { fr: 'Veuillez sélectionner un horaire', en: 'Please select a time' },
  errFirstNameRequired: { fr: 'Prénom requis', en: 'First name required' },
  errLastNameRequired: { fr: 'Nom requis', en: 'Last name required' },
  errEmailRequired: { fr: 'Email requis', en: 'Email required' },
  errEmailInvalid: { fr: 'Format email invalide', en: 'Invalid email format' },
  errPhoneRequired: { fr: 'Téléphone requis', en: 'Phone required' },
  errGeneral: { fr: 'Une erreur est survenue', en: 'An error occurred' },
};

const initialFormData: BookingFormData = {
  consultationType: '',
  selectedDate: '',
  selectedTime: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  slotStartTime: '',
  timezone: '',
};

export default function BookingForm() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Availability State
  const [availableSlots, setAvailableSlots] = useState<any[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [dateMap, setDateMap] = useState<Record<string, Array<{ display: string, value: string }>>>({}); // date -> [{ display, value (iso) }]

  // Check for success param
  useEffect(() => {
    // Capture User Timezone
    try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setFormData(prev => ({ ...prev, timezone: tz }));
    } catch (e) {
        console.error('Failed to get timezone', e);
    }
    
    if (searchParams && searchParams.get('success') === 'true') {
      setShowSuccessModal(true);
      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  }, [searchParams]);

  // Fetch Availability when entering Step 1
  useEffect(() => {
    if (step === 1 && Object.keys(dateMap).length === 0) {
      setIsLoadingSlots(true);
      const today = new Date();
      const nextMonth = new Date();
      nextMonth.setDate(today.getDate() + 30);
      
      const start = today.toISOString().split('T')[0];
      const end = nextMonth.toISOString().split('T')[0];

      fetch(`/api/availability?startDate=${start}&endDate=${end}`)
        .then(res => res.json())
        .then(data => {
          if (data.collection) {
            const map: Record<string, Array<{ display: string, value: string }>> = {};
            data.collection.forEach((slot: any) => {
               // Calendly returns start_time in UTC usually or with offset
               const dateObj = new Date(slot.start_time);
               const dateKey = dateObj.toISOString().split('T')[0];
               
               // Use browser local time for display matching the "UTC+1" requirement if user has that,
               // OR simply display what the time means in THEIR timezone.
               // The user said: "if time was display in gmt+1, use gmt+1 when selecting".
               // This implies we preserve the exact moment.
               // By storing the ISO string (value), we preserve the exact moment.
               const timeStr = dateObj.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
               
               if (!map[dateKey]) map[dateKey] = [];
               map[dateKey].push({
                   display: timeStr,
                   value: slot.start_time // Original ISO string
               });
            });
            setDateMap(map);
          }
        })
        .catch(err => console.error(err))
        .finally(() => setIsLoadingSlots(false));
    }
  }, [step]);

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
    setErrors({}); // Clear previous errors

    try {
      const res = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      if (data.payment_url) {
        // Redirect to Notch Pay
        window.location.href = data.payment_url;
      } else {
        throw new Error('No payment URL returned');
      }

    } catch (error: any) {
      console.error('Booking Error:', error);
      setErrors({ general: error.message || bookingText.errGeneral[language] });
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };
  
  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return {
        weekday: date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'short' }),
        day: date.getDate(),
        month: date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { month: 'short' })
    };
  };

  const availableDatesList = Object.keys(dateMap).sort();

  return (
    <div className="max-w-2xl mx-auto relative">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-sm text-center transform transition-all scale-100 animate-slide-up">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 dark:text-green-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {language === 'fr' ? 'Paiement Réussi !' : 'Payment Successful!'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {language === 'fr' 
                ? 'Votre rendez-vous a été confirmé. Vous recevrez un email de confirmation.' 
                : 'Your appointment has been confirmed. You will receive a confirmation email.'}
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              {language === 'fr' ? 'Fermer' : 'Close'}
            </button>
          </div>
        </div>
      )}

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
                
                {isLoadingSlots ? (
                    <div className="text-center py-4 text-gray-500">{bookingText.loadingSlots[language]}</div>
                ) : availableDatesList.length === 0 ? (
                    <div className="text-center py-4 text-gray-500">{bookingText.noSlots[language]}</div>
                ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto pr-2">
                    {availableDatesList.map((dateStr) => {
                        const { weekday, day, month } = formatDateShort(dateStr);
                        return (
                            <button
                            key={dateStr}
                                onClick={() => updateFormData({ selectedDate: dateStr, selectedTime: '', slotStartTime: '' })}
                                className={`p-3 rounded-xl text-center transition-all duration-200 ${
                                    formData.selectedDate === dateStr
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                            }`}
                            >
                            <div className="text-xs uppercase opacity-75">{weekday}</div>
                            <div className="text-lg font-bold">{day}</div>
                            <div className="text-xs">{month}</div>
                            </button>
                        );
                    })}
                    </div>
                )}
                
                {errors.selectedDate && (
                  <p className="text-red-500 text-sm mt-2">{errors.selectedDate}</p>
                )}
              </div>

              {/* Time Selection */}
              {formData.selectedDate && dateMap[formData.selectedDate] && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {bookingText.timeLabel[language]}
                    </label>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                    {dateMap[formData.selectedDate].map((item, index) => (
                        <button
                        key={index}
                        onClick={() => updateFormData({ selectedTime: item.display, slotStartTime: item.value })}
                        className={`p-3 rounded-xl text-center font-medium transition-all duration-200 ${
                            formData.selectedTime === item.display
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-primary-100 dark:hover:bg-primary-900/30'
                        }`}
                        >
                        {item.display}
                        </button>
                    ))}
                    </div>
                    {errors.selectedTime && (
                    <p className="text-red-500 text-sm mt-2">{errors.selectedTime}</p>
                    )}
                </div>
              )}
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
                    placeholder={bookingText.emailPlaceholder[language]}
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
                    {formData.selectedDate && formatDate(formData.selectedDate)}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-600">
                  <span className="text-gray-500 dark:text-gray-400">{bookingText.timeLabel[language]}</span>
                  <span className="font-medium text-gray-900 dark:text-white">{formData.selectedTime}</span>
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

              {errors.general && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg text-center text-sm">
                    {errors.general}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={prevStep}
            disabled={step === 0 || isSubmitting}
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
