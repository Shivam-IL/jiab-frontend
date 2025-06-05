"use client";

import React, { useState, useEffect } from "react";
import Joyride, { Step, CallBackProps, STATUS, EVENTS, ACTIONS } from "react-joyride";

interface CustomJoyrideProps {
  steps: Step[];
  run: boolean;
  onComplete: () => void;
  onSkip: () => void;
  showProgress?: boolean;
  showSkipButton?: boolean;
  spotlightClicks?: boolean;
}

const CustomJoyride: React.FC<CustomJoyrideProps> = ({
  steps,
  run,
  onComplete,
  onSkip,
  showProgress = false,
  showSkipButton = false,
  spotlightClicks = false,
}) => {
  const [stepIndex, setStepIndex] = useState(0);

  // Reset step index when tour is restarted
  useEffect(() => {
    if (!run) {
      setStepIndex(0);
    }
  }, [run]);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, index, action } = data;

    // Handle tour completion
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      if (status === STATUS.FINISHED) {
        onComplete();
      } else {
        onSkip();
      }
      setStepIndex(0);
      return;
    }

    // Handle step changes
    if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);
      
      // Check if we've reached the end
      if (nextStepIndex >= steps.length) {
        onComplete();
        setStepIndex(0);
      } else {
        setStepIndex(nextStepIndex);
      }
    }
  };

  // Custom styles for yellow circular background with no buttons
  const customStyles = {
    options: {
      zIndex: 10000,
      primaryColor: '#FFE200',
      backgroundColor: '#FFE200',
      textColor: '#000000',
      overlayColor: 'rgba(0, 0, 0, 0.6)',
      arrowColor: '#FFE200',
      beaconSize: 0, // Hide beacon
      spotlightShadow: '0 0 15px rgba(255, 226, 0, 0.8)',
    },
    overlay: {
      cursor: 'pointer',
    },
    tooltip: {
      backgroundColor: '#FFE200',
      borderRadius: '50%', // Make it circular
      border: 'none',
      fontSize: '16px',
      fontFamily: 'inherit',
      padding: '40px',
      width: '300px',
      height: '300px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center' as const,
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      position: 'relative' as const,
    },
    tooltipContainer: {
      textAlign: 'center' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    },
    tooltipTitle: {
      color: '#000000',
      fontSize: '18px',
      fontWeight: '700',
      marginBottom: '12px',
      lineHeight: '1.4',
    },
    tooltipContent: {
      color: '#000000',
      fontSize: '14px',
      lineHeight: '1.5',
      marginBottom: '0',
    },
    // Hide all buttons
    buttonNext: {
      display: 'none',
    },
    buttonBack: {
      display: 'none',
    },
    buttonSkip: {
      display: 'none',
    },
    buttonClose: {
      display: 'none',
    },
    spotlight: {
      borderRadius: '12px',
    },
  };

  // Custom locale for button text
  const locale = {
    back: 'Back',
    close: '×',
    last: 'Finish',
    next: 'Next',
    open: 'Open the dialog',
    skip: 'Skip tour',
  };

  return (
    <>
      <Joyride
        callback={handleJoyrideCallback}
        continuous={false}
        run={run}
        stepIndex={stepIndex}
        steps={steps}
        hideCloseButton={true}
        scrollToFirstStep={true}
        showProgress={showProgress}
        showSkipButton={showSkipButton}
        spotlightClicks={spotlightClicks}
        disableOverlayClose={false}
        disableScrolling={false}
        styles={customStyles}
        locale={locale}
        floaterProps={{
          disableAnimation: false,
          placement: 'bottom',
        }}
      />
      
      {/* Custom CSS for circular tooltip styling */}
      <style jsx global>{`
        /* Hide all buttons completely */
        .react-joyride__tooltip button {
          display: none !important;
        }
        
        /* Ensure circular tooltip maintains shape and fixed bottom placement */
        .react-joyride__tooltip {
          border-radius: 50% !important;
          width: 300px !important;
          height: 300px !important;
          animation: fadeInScale 0.3s ease-out;
        }
        
        /* Force tooltip to always appear at bottom */
        .react-joyride__floater {
          position: fixed !important;
          bottom: 20px !important;
          left: 50% !important;
          transform: translateX(-50%) !important;
        }
        
        /* Center content in circular tooltip */
        .react-joyride__tooltip__content {
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          height: 100% !important;
          text-align: center !important;
          padding: 0 !important;
        }
        
        /* Custom arrow styling for circular tooltip - always pointing up from bottom */
        .react-joyride__tooltip .react-joyride__tooltip-arrow {
          border-color: #FFE200 !important;
          top: -16px !important;
          transform: translateX(-50%) !important;
        }
        
        /* Force arrow to point upward */
        .react-joyride__tooltip .react-joyride__tooltip-arrow {
          border-bottom-color: #FFE200 !important;
          border-top-color: transparent !important;
          border-left-color: transparent !important;
          border-right-color: transparent !important;
        }
        
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        /* Custom spotlight animation */
        .react-joyride__spotlight {
          animation: spotlightPulse 2s ease-in-out infinite;
          border-radius: 12px !important;
        }
        
        @keyframes spotlightPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(255, 226, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(255, 226, 0, 0.1);
          }
        }
        
        /* Make overlay clickable cursor */
        .react-joyride__overlay {
          cursor: pointer !important;
        }
      `}</style>
    </>
  );
};

export default CustomJoyride; 