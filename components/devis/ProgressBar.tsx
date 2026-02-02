'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '@/contexts/LanguageContext';
import { devisSteps } from '@/lib/devis-data';

const progressBarText = {
  stepOf: { fr: 'Étape', en: 'Step' },
  of: { fr: 'sur', en: 'of' },
};

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const { language } = useLanguage();
  const progressRef = useRef<HTMLDivElement>(null);
  const percentage = Math.round((currentStep / (totalSteps - 1)) * 100);

  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${percentage}%`,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [percentage]);

  return (
    <div className="w-full mb-8">
      {/* Progress bar */}
      <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
        <div
          ref={progressRef}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
          style={{ width: '0%' }}
        />
      </div>

      {/* Step indicators - desktop */}
      <div className="hidden md:flex justify-between">
        {devisSteps.map((step, index) => (
          <div
            key={step.id}
            className={`flex flex-col items-center transition-all duration-300 ${
              index <= currentStep ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold mb-1 transition-all duration-300 ${
                index < currentStep
                  ? 'bg-green-500 text-white'
                  : index === currentStep
                  ? 'bg-primary-600 text-white ring-4 ring-primary-200 dark:ring-primary-900'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
              }`}
            >
              {index < currentStep ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            <span className={`text-xs font-medium ${
              index <= currentStep ? 'text-gray-900 dark:text-white' : 'text-gray-400'
            }`}>
              {step.shortTitle[language]}
            </span>
          </div>
        ))}
      </div>

      {/* Step indicator - mobile */}
      <div className="md:hidden flex items-center justify-between">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          {progressBarText.stepOf[language]} {currentStep + 1} {progressBarText.of[language]} {totalSteps}
        </span>
        <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">
          {devisSteps[currentStep]?.title[language]}
        </span>
      </div>
    </div>
  );
}
