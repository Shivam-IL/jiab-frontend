'use client'

import useWindowWidth from '@/hooks/useWindowWidth'
import React, { useState, useEffect } from 'react'
import Joyride, {
  Step,
  CallBackProps,
  STATUS,
  EVENTS,
  ACTIONS
} from 'react-joyride'

interface CustomJoyrideProps {
  steps: Step[]
  run: boolean
  onComplete: () => void
  onSkip: () => void
  showProgress?: boolean
  showSkipButton?: boolean
  spotlightClicks?: boolean
  continuous?: boolean
  disableOverlayClose?: boolean
  disableScrolling?: boolean
  scrollOffset?: number
}

const CustomJoyride: React.FC<CustomJoyrideProps> = ({
  steps,
  run,
  onComplete,
  onSkip,
  showProgress = false,
  showSkipButton = false,
  spotlightClicks = false,
  continuous = false,
  disableOverlayClose = false,
  disableScrolling = false,
  scrollOffset = 100
}) => {
  const [stepIndex, setStepIndex] = useState(0)

  const width = useWindowWidth()
  const [fontSize, setFontSize] = useState(32)
  const [contenFontSize, setContenFontSize] = useState(28)

  useEffect(() => {
    if (width < 768) {
      setFontSize(16)
      setContenFontSize(12)
    } else {
      setFontSize(32)
      setContenFontSize(28)
    }
  }, [width])

  // Reset step index when tour is restarted
  useEffect(() => {
    if (!run) {
      setStepIndex(0)
    }
  }, [run])

  // Function to scroll element to specific height
  const scrollToElement = (target: string) => {
    if (typeof window !== 'undefined') {
      const element = document.querySelector(target)
      if (element) {
        // Use different scroll offset for mobile vs desktop
        const currentScrollOffset = width < 768 ? 120 : scrollOffset
        
        const elementRect = element.getBoundingClientRect()
        const elementTop = elementRect.top + window.pageYOffset
        const targetScrollPosition = elementTop - currentScrollOffset

        window.scrollTo({
          top: targetScrollPosition,
          behavior: 'smooth'
        })

        // Recalculate position after scroll animation completes
        setTimeout(() => {
          const newElementRect = element.getBoundingClientRect()
          const newElementTop = newElementRect.top + window.pageYOffset
          const newTargetScrollPosition = newElementTop - currentScrollOffset
          
          // If position is still not correct, adjust it
          if (Math.abs(window.pageYOffset - newTargetScrollPosition) > 10) {
            window.scrollTo({
              top: newTargetScrollPosition,
              behavior: 'smooth'
            })
          }
        }, 500) // Wait for scroll animation to complete
      }
    }
  }

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, type, index, action, step } = data

    // Handle tour completion
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      if (status === STATUS.FINISHED) {
        onComplete()
      } else {
        onSkip()
      }
      setStepIndex(0)
      return
    }

    // Handle step changes and scroll to highlighted element
    if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1)

      // Check if we've reached the end
      if (nextStepIndex >= steps.length) {
        onComplete()
        setStepIndex(0)
      } else {
        setStepIndex(nextStepIndex)
        
        // Scroll to the next step's target element
        const nextStep = steps[nextStepIndex]
        if (nextStep && nextStep.target) {
          // Add a small delay to ensure the step is rendered
          setTimeout(() => {
            scrollToElement(nextStep.target as string)
          }, 100)
        }
      }
    }

    // Handle step start - scroll to current step's target
    if (type === EVENTS.STEP_BEFORE && step && step.target) {
      // Add a small delay to ensure the step is rendered
      setTimeout(() => {
        scrollToElement(step.target as string)
      }, 100)
    }
  }

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
      spotlightPadding: 0
    },
    overlay: {
      cursor: 'pointer'
    },
    tooltip: {
      backgroundColor: '#FFE200',
      borderRadius: '50%', // Make it circular
      border: 'none',
      fontSize: '16px',
      fontFamily: 'inherit',
      padding: '0px',
      width: '139px',
      height: '139px',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center' as const,
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      position: 'relative' as const,
      '@media (min-width: 768px)': {
        width: '325px',
        height: '325px'
      }
    },
    tooltipContainer: {
      textAlign: 'center' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: '85px 12px',
      '@media (min-width: 768px)': {
        padding: '85px 24px'
      }
    },
    tooltipTitle: {
      color: '#000000',
      fontSize: fontSize + 'px',
      fontWeight: '700',
      marginBottom: '10px',
      lineHeight: '1.2'
    },
    tooltipContent: {
      color: '#000000',
      fontSize: contenFontSize + 'px',
      lineHeight: '1.2',
      padding: '0',
      marginBottom: '0'
    },
    // Hide all buttons
    buttonNext: {
      display: 'none'
    },
    buttonBack: {
      display: 'none'
    },
    buttonSkip: {
      display: 'none'
    },
    buttonClose: {
      display: 'none'
    },
    spotlight: {
      borderRadius: '12px',
      backgroundColor: 'transparent',
      boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.6)'
    }
  }

  // Custom locale for button text
  const locale = {
    back: 'Back',
    close: 'x',
    last: 'Finish',
    next: 'Next',
    open: 'Open the dialog',
    skip: 'Skip tour'
  }

  return (
    <>
      <Joyride
        callback={handleJoyrideCallback}
        continuous={continuous}
        run={run}
        stepIndex={stepIndex}
        steps={steps}
        hideCloseButton={true}
        scrollToFirstStep={true}
        showProgress={showProgress}
        showSkipButton={showSkipButton}
        spotlightClicks={spotlightClicks}
        disableOverlayClose={disableOverlayClose}
        disableScrolling={disableScrolling}
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
          width: 139px !important;
          height: 139px !important;
          animation: fadeInScale 0.3s ease-out;
          overflow: hidden !important;
        }

        @media (min-width: 768px) {
          .react-joyride__tooltip {
            width: 325px !important;
            height: 325px !important;
          }
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
          border-color: #ffe200 !important;
          top: -16px !important;
          transform: translateX(-50%) !important;
        }

        /* Force arrow to point upward */
        .react-joyride__tooltip .react-joyride__tooltip-arrow {
          border-bottom-color: #ffe200 !important;
          border-top-color: transparent !important;
          border-left-color: transparent !important;
          border-right-color: transparent !important;
        }

        /* Ensure spotlight is visible and properly highlights elements */
        .react-joyride__spotlight {
          background-color: transparent !important;
          box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.6) !important;
          border-radius: 12px !important;
          z-index: 10000 !important;
        }

        /* Make overlay clickable cursor */
        .react-joyride__overlay {
          cursor: pointer !important;
          background-color: transparent !important;
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

        @keyframes spotlightPulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(255, 226, 0, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(255, 226, 0, 0.1);
          }
        }

        /* Title and content font sizes */
        .react-joyride__tooltip__title {
          font-size: 44px !important;
          font-weight: 700 !important;
          margin-bottom: 3px !important;
          line-height: 1.2 !important;
          max-width: 100% !important;
        }

        .react-joyride__tooltip__content {
          font-size: 28px !important;
          line-height: 0.5 !important;
          max-width: 100% !important;
        }

        @media (min-width: 768px) {
          .react-joyride__tooltip__title {
            margin-bottom: 10px !important;
          }

          .react-joyride__tooltip__content {
            font-size: 12px !important;
          }
        }

        /* Ensure content stays within circle */
        .react-joyride__tooltip__container {
          padding: 85px 12px !important;
          width: 100% !important;
          height: 100% !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
        }

        @media (min-width: 768px) {
          .react-joyride__tooltip__container {
            padding: 85px 24px !important;
          }
        }
      `}</style>
    </>
  )
}

export default CustomJoyride
