'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import gsap from 'gsap';
import { useLanguage } from '@/contexts/LanguageContext';
import ProgressBar from './ProgressBar';
import {
  DevisFormData,
  initialDevisFormData,
  devisSteps,
  companyTypes,
  timelineOptions,
  cities,
  additionalServicesOptions,
  validateEmail,
  validatePhone,
  getMinCapital,
  requiresCapital,
} from '@/lib/devis-data';

const STORAGE_KEY = 'legal-cameroun-devis';

const devisText = {
  // Success state
  successTitle: { fr: 'Demande Envoyée !', en: 'Request Sent!' },
  successMessage: {
    fr: 'Merci pour votre demande. Notre équipe vous contactera sous 48h pour discuter de votre projet.',
    en: 'Thank you for your request. Our team will contact you within 48 hours to discuss your project.',
  },
  bookNow: { fr: 'Prendre RDV Maintenant', en: 'Book Appointment Now' },
  newRequest: { fr: 'Nouvelle Demande', en: 'New Request' },

  // Step 0: Welcome
  welcomeTitle: { fr: 'Obtenez Votre Devis Gratuit', en: 'Get Your Free Quote' },
  welcomeSubtitle: {
    fr: 'Répondez à quelques questions pour recevoir un devis personnalisé sous 48h.',
    en: 'Answer a few questions to receive a personalized quote within 48 hours.',
  },
  welcomeConfidential: {
    fr: 'Vos informations sont confidentielles et sécurisées.',
    en: 'Your information is confidential and secure.',
  },
  free: { fr: 'Gratuit', en: 'Free' },
  noCommitment: { fr: 'Sans engagement', en: 'No commitment' },

  // Step 1: Activity
  projectTitle: { fr: 'Quel est votre projet ?', en: 'What is your project?' },
  projectSubtitle: {
    fr: 'Dites-nous si vous lancez une nouvelle activité ou modifiez une structure existante.',
    en: 'Tell us if you are starting a new business or modifying an existing structure.',
  },
  newCreation: { fr: 'Nouvelle Création', en: 'New Creation' },
  newCreationDesc: { fr: 'Je lance une nouvelle entreprise', en: 'I am starting a new business' },
  modification: { fr: 'Modification', en: 'Modification' },
  modificationDesc: { fr: 'Je modifie une structure existante', en: 'I am modifying an existing structure' },

  // Step 2: Status & Delay
  statusTitle: { fr: 'Statut Juridique & Délai', en: 'Legal Status & Timeline' },
  statusSubtitle: {
    fr: 'Choisissez la forme juridique et le délai souhaité.',
    en: 'Choose the legal form and desired timeline.',
  },
  legalFormLabel: { fr: 'Forme juridique souhaitée', en: 'Desired legal form' },
  timelineLabel: { fr: 'Délai souhaité', en: 'Desired timeline' },

  // Step 3: Details
  detailsTitle: { fr: 'Détails de la Société', en: 'Company Details' },
  detailsSubtitle: {
    fr: "Décrivez l'activité et le capital de votre société.",
    en: 'Describe your company\'s business activity and capital.',
  },
  businessObjectLabel: { fr: 'Objet social (activité principale)', en: 'Business purpose (main activity)' },
  businessObjectPlaceholder: {
    fr: 'Ex: Commerce général, import-export, conseil en management...',
    en: 'E.g.: General trade, import-export, management consulting...',
  },
  capitalLabel: { fr: 'Capital social (XAF)', en: 'Share capital (XAF)' },
  minimumLabel: { fr: 'Minimum', en: 'Minimum' },

  // Step 4: Team
  teamTitle: { fr: 'Équipe Administrant', en: 'Administrative Team' },
  teamSubtitle: {
    fr: 'Informations sur le principal administrateur et les associés.',
    en: 'Information about the main administrator and partners.',
  },
  managerFirstNameLabel: { fr: 'Prénom du principal administrateur', en: 'Main administrator first name' },
  managerLastNameLabel: { fr: 'Nom du principal administrateur', en: 'Main administrator last name' },
  associatesCountLabel: { fr: "Nombre d'associés", en: 'Number of partners' },
  nonAssociateManagersLabel: {
    fr: 'Y a-t-il des administrateurs non-associés ?',
    en: 'Are there non-partner managers?',
  },
  yes: { fr: 'Oui', en: 'Yes' },
  no: { fr: 'Non', en: 'No' },

  // Step 5: Logistics
  hqTitle: { fr: 'Siège Social', en: 'Headquarters' },
  hqSubtitle: {
    fr: 'Où sera domiciliée votre société ?',
    en: 'Where will your company be domiciled?',
  },
  cityLabel: { fr: 'Ville', en: 'City' },
  addressLabel: { fr: 'Adresse complète', en: 'Full address' },
  addressPlaceholder: { fr: 'Ex: Rue de la Liberté, Bonanjo', en: 'E.g.: Rue de la Liberté, Bonanjo' },
  domiciliationHint: {
    fr: "Besoin d'une domiciliation ? Cochez l'option à l'étape suivante.",
    en: 'Need a business domiciliation? Check the option in the next step.',
  },

  // Step 6: Additional Services
  servicesTitle: { fr: 'Services Additionnels', en: 'Additional Services' },
  servicesSubtitle: {
    fr: 'Souhaitez-vous des services complémentaires ? (optionnel)',
    en: 'Would you like additional services? (optional)',
  },

  // Step 7: Contact
  contactTitle: { fr: 'Vos Coordonnées', en: 'Your Contact Details' },
  contactSubtitle: {
    fr: 'Comment pouvons-nous vous contacter ?',
    en: 'How can we contact you?',
  },
  emailLabel: { fr: 'Email', en: 'Email' },
  phoneLabel: { fr: 'Téléphone', en: 'Phone' },
  additionalInfoLabel: {
    fr: 'Informations complémentaires (optionnel)',
    en: 'Additional information (optional)',
  },
  additionalInfoPlaceholder: {
    fr: 'Questions, précisions, contraintes particulières...',
    en: 'Questions, details, special requirements...',
  },

  // Step 8: Summary
  summaryTitle: { fr: 'Récapitulatif', en: 'Summary' },
  summarySubtitle: {
    fr: 'Vérifiez vos informations avant de soumettre.',
    en: 'Review your information before submitting.',
  },
  summaryProjectType: { fr: 'Type de projet', en: 'Project type' },
  summaryNewCreation: { fr: 'Nouvelle création', en: 'New creation' },
  summaryModification: { fr: 'Modification', en: 'Modification' },
  summaryLegalForm: { fr: 'Forme juridique', en: 'Legal form' },
  summaryTimeline: { fr: 'Délai souhaité', en: 'Desired timeline' },
  summaryBusinessObject: { fr: 'Objet social', en: 'Business purpose' },
  summaryCapital: { fr: 'Capital', en: 'Capital' },
  summaryManager: { fr: 'Gérant', en: 'Manager' },
  summaryAssociates: { fr: "Nombre d'associés", en: 'Number of partners' },
  summaryHQ: { fr: 'Siège social', en: 'Headquarters' },
  summaryAdditionalServices: { fr: 'Services additionnels', en: 'Additional services' },

  // Navigation
  previous: { fr: 'Précédent', en: 'Previous' },
  next: { fr: 'Suivant', en: 'Next' },
  start: { fr: 'Commencer', en: 'Start' },
  submitting: { fr: 'Envoi en cours...', en: 'Sending...' },
  submit: { fr: 'Envoyer ma demande', en: 'Submit my request' },

  // Validation errors
  errSelectOption: { fr: 'Veuillez sélectionner une option', en: 'Please select an option' },
  errSelectLegalForm: { fr: 'Veuillez choisir un statut juridique', en: 'Please choose a legal form' },
  errDescribeBusiness: { fr: "Décrivez l'objet de votre société", en: 'Describe your company\'s business purpose' },
  errMinCapital: {
    fr: (type: string, amount: string) => `Le capital minimum pour une ${type} est de ${amount} XAF`,
    en: (type: string, amount: string) => `The minimum capital for a ${type} is ${amount} XAF`,
  },
  errFirstNameRequired: { fr: 'Prénom requis', en: 'First name required' },
  errLastNameRequired: { fr: 'Nom requis', en: 'Last name required' },
  errAddressRequired: { fr: 'Adresse requise', en: 'Address required' },
  errEmailRequired: { fr: 'Email requis', en: 'Email required' },
  errEmailInvalid: { fr: 'Format email invalide', en: 'Invalid email format' },
  errPhoneRequired: { fr: 'Téléphone requis', en: 'Phone required' },
  errPhoneInvalid: {
    fr: 'Format téléphone invalide (ex: 6 XX XX XX XX)',
    en: 'Invalid phone format (e.g.: 6 XX XX XX XX)',
  },
};

export default function DevisWizard() {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<DevisFormData>(initialDevisFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  // Load from URL params and localStorage
  useEffect(() => {
    const type = searchParams.get('type');
    const plan = searchParams.get('plan');

    // Try to load from localStorage
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch {
        // Invalid JSON, ignore
      }
    }

    // Override with URL params
    if (type) {
      setFormData(prev => ({ ...prev, companyType: type }));
    }
    if (plan) {
      const timelineMap: Record<string, string> = {
        starter: '2-weeks',
        standard: '1-week',
        premium: '48h',
      };
      setFormData(prev => ({ ...prev, timeline: timelineMap[plan] || '1-week' }));
    }
  }, [searchParams]);

  // Auto-save to localStorage
  useEffect(() => {
    if (formData !== initialDevisFormData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  const updateFormData = useCallback((updates: Partial<DevisFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // Clear errors for updated fields
    const clearedErrors = { ...errors };
    Object.keys(updates).forEach(key => {
      delete clearedErrors[key];
    });
    setErrors(clearedErrors);
  }, [errors]);

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};

    switch (currentStep) {
      case 1: // Activity
        if (formData.isNewBusiness === null) {
          newErrors.isNewBusiness = devisText.errSelectOption[language];
        }
        break;
      case 2: // Status & Delay
        if (!formData.companyType) {
          newErrors.companyType = devisText.errSelectLegalForm[language];
        }
        break;
      case 3: // Details
        if (!formData.businessObject.trim()) {
          newErrors.businessObject = devisText.errDescribeBusiness[language];
        }
        if (requiresCapital(formData.companyType)) {
          const minCapital = getMinCapital(formData.companyType);
          if (formData.capital < minCapital) {
            newErrors.capital = devisText.errMinCapital[language](
              formData.companyType.toUpperCase(),
              minCapital.toLocaleString('fr-FR')
            );
          }
        }
        break;
      case 4: // Team
        if (!formData.managerFirstName.trim()) {
          newErrors.managerFirstName = devisText.errFirstNameRequired[language];
        }
        if (!formData.managerLastName.trim()) {
          newErrors.managerLastName = devisText.errLastNameRequired[language];
        }
        break;
      case 5: // Logistics
        if (!formData.headquarters.trim()) {
          newErrors.headquarters = devisText.errAddressRequired[language];
        }
        break;
      case 7: // Contact
        if (!formData.email.trim()) {
          newErrors.email = devisText.errEmailRequired[language];
        } else if (!validateEmail(formData.email)) {
          newErrors.email = devisText.errEmailInvalid[language];
        }
        if (!formData.phone.trim()) {
          newErrors.phone = devisText.errPhoneRequired[language];
        } else if (!validatePhone(formData.phone)) {
          newErrors.phone = devisText.errPhoneInvalid[language];
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goToStep = (step: number) => {
    if (step < 0 || step >= devisSteps.length) return;

    setDirection(step > currentStep ? 'next' : 'prev');

    // Animate out
    gsap.to('.step-content', {
      opacity: 0,
      x: step > currentStep ? -30 : 30,
      duration: 0.2,
      onComplete: () => {
        setCurrentStep(step);
        // Animate in
        gsap.fromTo(
          '.step-content',
          { opacity: 0, x: step > currentStep ? 30 : -30 },
          { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
        );
      },
    });
  };

  const nextStep = () => {
    if (validateStep()) {
      goToStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    goToStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.removeItem(STORAGE_KEY);
        setIsSubmitted(true);
      } else if (data.errors) {
        setErrors(data.errors);
        setSubmitError(
          language === 'fr'
            ? 'Veuillez corriger les erreurs dans le formulaire.'
            : 'Please fix the errors in the form.'
        );
      } else {
        setSubmitError(
          data.message ||
            (language === 'fr'
              ? "Une erreur est survenue. Veuillez réessayer."
              : 'An error occurred. Please try again.')
        );
      }
    } catch {
      setSubmitError(
        language === 'fr'
          ? 'Erreur de connexion. Veuillez vérifier votre connexion internet.'
          : 'Connection error. Please check your internet connection.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData(initialDevisFormData);
    setCurrentStep(0);
    setIsSubmitted(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Render success state
  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {devisText.successTitle[language]}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            {devisText.successMessage[language]}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/prendre-un-rendez-vous"
              className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              {devisText.bookNow[language]}
            </a>
            <button
              onClick={resetForm}
              className="inline-flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {devisText.newRequest[language]}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <ProgressBar currentStep={currentStep} totalSteps={devisSteps.length} />

      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12">
        <div className="step-content">
          {/* Step 0: Welcome */}
          {currentStep === 0 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {devisText.welcomeTitle[language]}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2 max-w-md mx-auto">
                {devisText.welcomeSubtitle[language]}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                {devisText.welcomeConfidential[language]}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {devisText.free[language]}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {devisText.noCommitment[language]}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  ~5 min
                </span>
              </div>
            </div>
          )}

          {/* Step 1: Activity */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {devisText.projectTitle[language]}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {devisText.projectSubtitle[language]}
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => updateFormData({ isNewBusiness: true })}
                  className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                    formData.isNewBusiness === true
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                  }`}
                >
                  <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{devisText.newCreation[language]}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{devisText.newCreationDesc[language]}</p>
                </button>

                <button
                  onClick={() => updateFormData({ isNewBusiness: false })}
                  className={`p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                    formData.isNewBusiness === false
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                  }`}
                >
                  <div className="w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{devisText.modification[language]}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{devisText.modificationDesc[language]}</p>
                </button>
              </div>
              {errors.isNewBusiness && (
                <p className="text-red-500 text-sm mt-2">{errors.isNewBusiness}</p>
              )}
            </div>
          )}

          {/* Step 2: Status & Delay */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {devisText.statusTitle[language]}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {devisText.statusSubtitle[language]}
              </p>

              <div className="space-y-6">
                {/* Company Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {devisText.legalFormLabel[language]}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {companyTypes.map(type => (
                      <button
                        key={type.value}
                        onClick={() => updateFormData({ companyType: type.value })}
                        className={`p-4 rounded-xl border-2 text-center transition-all duration-300 ${
                          formData.companyType === type.value
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                        }`}
                      >
                        <span className="font-semibold text-gray-900 dark:text-white">{type.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.companyType && (
                    <p className="text-red-500 text-sm mt-2">{errors.companyType}</p>
                  )}
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {devisText.timelineLabel[language]}
                  </label>
                  <div className="space-y-3">
                    {timelineOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => updateFormData({ timeline: option.value })}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 flex items-center justify-between ${
                          formData.timeline === option.value
                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                        }`}
                      >
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-white">{option.label[language]}</span>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{option.description[language]}</p>
                        </div>
                        {option.premium && (
                          <span className="px-2 py-1 bg-secondary-500 text-white text-xs font-semibold rounded-full">
                            Premium
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Company Details */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {devisText.detailsTitle[language]}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {devisText.detailsSubtitle[language]}
              </p>

              <div className="space-y-6">
                {/* Business Object */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {devisText.businessObjectLabel[language]}
                  </label>
                  <textarea
                    value={formData.businessObject}
                    onChange={(e) => updateFormData({ businessObject: e.target.value })}
                    placeholder={devisText.businessObjectPlaceholder[language]}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 transition-colors ${
                      errors.businessObject
                        ? 'border-red-500'
                        : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                    } focus:outline-none`}
                  />
                  {errors.businessObject && (
                    <p className="text-red-500 text-sm mt-1">{errors.businessObject}</p>
                  )}
                </div>

                {/* Capital */}
                {requiresCapital(formData.companyType) && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {devisText.capitalLabel[language]}
                    </label>
                    <input
                      type="number"
                      value={formData.capital}
                      onChange={(e) => updateFormData({ capital: parseInt(e.target.value) || 0 })}
                      min={getMinCapital(formData.companyType)}
                      step={100000}
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 transition-colors ${
                        errors.capital
                          ? 'border-red-500'
                          : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                      } focus:outline-none`}
                    />
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {devisText.minimumLabel[language]}: {getMinCapital(formData.companyType).toLocaleString('fr-FR')} XAF
                    </p>
                    {errors.capital && (
                      <p className="text-red-500 text-sm mt-1">{errors.capital}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Team */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {devisText.teamTitle[language]}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {devisText.teamSubtitle[language]}
              </p>

              <div className="space-y-6">
                {/* Manager Info */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {devisText.managerFirstNameLabel[language]}
                    </label>
                    <input
                      type="text"
                      value={formData.managerFirstName}
                      onChange={(e) => updateFormData({ managerFirstName: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 transition-colors ${
                        errors.managerFirstName
                          ? 'border-red-500'
                          : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                      } focus:outline-none`}
                    />
                    {errors.managerFirstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.managerFirstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {devisText.managerLastNameLabel[language]}
                    </label>
                    <input
                      type="text"
                      value={formData.managerLastName}
                      onChange={(e) => updateFormData({ managerLastName: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 transition-colors ${
                        errors.managerLastName
                          ? 'border-red-500'
                          : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                      } focus:outline-none`}
                    />
                    {errors.managerLastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.managerLastName}</p>
                    )}
                  </div>
                </div>

                {/* Associates Count */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {devisText.associatesCountLabel[language]}
                  </label>
                  <input
                    type="number"
                    value={formData.associatesCount}
                    onChange={(e) => updateFormData({ associatesCount: parseInt(e.target.value) || 1 })}
                    min={1}
                    max={100}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-primary-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Non-Associate Managers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    {devisText.nonAssociateManagersLabel[language]}
                  </label>
                  <div className="flex gap-4">
                    <button
                      onClick={() => updateFormData({ hasNonAssociateManagers: true })}
                      className={`px-6 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
                        formData.hasNonAssociateManagers === true
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                      }`}
                    >
                      {devisText.yes[language]}
                    </button>
                    <button
                      onClick={() => updateFormData({ hasNonAssociateManagers: false, nonAssociateManagers: [] })}
                      className={`px-6 py-3 rounded-xl border-2 font-medium transition-all duration-300 ${
                        formData.hasNonAssociateManagers === false
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                      }`}
                    >
                      {devisText.no[language]}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Logistics */}
          {currentStep === 5 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {devisText.hqTitle[language]}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {devisText.hqSubtitle[language]}
              </p>

              <div className="space-y-6">
                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {devisText.cityLabel[language]}
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => updateFormData({ city: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-primary-500 focus:outline-none transition-colors"
                  >
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {devisText.addressLabel[language]}
                  </label>
                  <input
                    type="text"
                    value={formData.headquarters}
                    onChange={(e) => updateFormData({ headquarters: e.target.value })}
                    placeholder={devisText.addressPlaceholder[language]}
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 transition-colors ${
                      errors.headquarters
                        ? 'border-red-500'
                        : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                    } focus:outline-none`}
                  />
                  {errors.headquarters && (
                    <p className="text-red-500 text-sm mt-1">{errors.headquarters}</p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {devisText.domiciliationHint[language]}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Additional Services */}
          {currentStep === 6 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {devisText.servicesTitle[language]}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {devisText.servicesSubtitle[language]}
              </p>

              <div className="space-y-4">
                {additionalServicesOptions.map(service => (
                  <button
                    key={service.value}
                    onClick={() => {
                      const current = formData.additionalServices;
                      const updated = current.includes(service.value)
                        ? current.filter(s => s !== service.value)
                        : [...current, service.value];
                      updateFormData({ additionalServices: updated });
                    }}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 flex items-center gap-4 ${
                      formData.additionalServices.includes(service.value)
                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${
                      formData.additionalServices.includes(service.value)
                        ? 'border-primary-500 bg-primary-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {formData.additionalServices.includes(service.value) && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{service.label[language]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 7: Contact */}
          {currentStep === 7 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {devisText.contactTitle[language]}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {devisText.contactSubtitle[language]}
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {devisText.emailLabel[language]}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData({ email: e.target.value })}
                    placeholder="votre@email.com"
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 transition-colors ${
                      errors.email
                        ? 'border-red-500'
                        : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                    } focus:outline-none`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {devisText.phoneLabel[language]}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData({ phone: e.target.value })}
                    placeholder="6 XX XX XX XX"
                    className={`w-full px-4 py-3 rounded-xl border-2 bg-white dark:bg-gray-900 transition-colors ${
                      errors.phone
                        ? 'border-red-500'
                        : 'border-gray-200 dark:border-gray-700 focus:border-primary-500'
                    } focus:outline-none`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {devisText.additionalInfoLabel[language]}
                  </label>
                  <textarea
                    value={formData.additionalInfo}
                    onChange={(e) => updateFormData({ additionalInfo: e.target.value })}
                    placeholder={devisText.additionalInfoPlaceholder[language]}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:border-primary-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 8: Summary */}
          {currentStep === 8 && (
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {devisText.summaryTitle[language]}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {devisText.summarySubtitle[language]}
              </p>

              <div className="space-y-4">
                <SummaryItem label={devisText.summaryProjectType[language]} value={formData.isNewBusiness ? devisText.summaryNewCreation[language] : devisText.summaryModification[language]} />
                <SummaryItem label={devisText.summaryLegalForm[language]} value={companyTypes.find(t => t.value === formData.companyType)?.label || '-'} />
                <SummaryItem label={devisText.summaryTimeline[language]} value={timelineOptions.find(t => t.value === formData.timeline)?.label[language] || '-'} />
                <SummaryItem label={devisText.summaryBusinessObject[language]} value={formData.businessObject || '-'} />
                {requiresCapital(formData.companyType) && (
                  <SummaryItem label={devisText.summaryCapital[language]} value={`${formData.capital.toLocaleString('fr-FR')} XAF`} />
                )}
                <SummaryItem label={devisText.summaryManager[language]} value={`${formData.managerFirstName} ${formData.managerLastName}`.trim() || '-'} />
                <SummaryItem label={devisText.summaryAssociates[language]} value={formData.associatesCount.toString()} />
                <SummaryItem label={devisText.summaryHQ[language]} value={`${formData.headquarters}, ${formData.city}`} />
                {formData.additionalServices.length > 0 && (
                  <SummaryItem
                    label={devisText.summaryAdditionalServices[language]}
                    value={formData.additionalServices.map(s =>
                      additionalServicesOptions.find(o => o.value === s)?.label[language]
                    ).join(', ')}
                  />
                )}
                <SummaryItem label={devisText.emailLabel[language]} value={formData.email} />
                <SummaryItem label={devisText.phoneLabel[language]} value={formData.phone} />
              </div>
            </div>
          )}
        </div>

        {/* Submit Error */}
        {submitError && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-sm">
            {submitError}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              currentStep === 0
                ? 'opacity-0 pointer-events-none'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {devisText.previous[language]}
          </button>

          {currentStep === devisSteps.length - 1 ? (
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
                  {devisText.submitting[language]}
                </>
              ) : (
                <>
                  {devisText.submit[language]}
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
              {currentStep === 0 ? devisText.start[language] : devisText.next[language]}
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

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start py-3 border-b border-gray-100 dark:border-gray-700">
      <span className="text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-gray-900 dark:text-white font-medium text-right max-w-[60%]">{value}</span>
    </div>
  );
}
