import React, { useEffect, useState } from 'react'
import './breadcrumbs.scss'


export default function Breadcrumbs(
  { step1Completed, 
    step,
    setStep 
  }: 
  { 
    step1Completed: boolean, 
    step:number
    setStep: React.Dispatch<React.SetStateAction<number>> 
  }) {
  const [firstBreadcrumb, setFirstBreadcrumb] = useState<string>('active')
  const [secondBreadcrumb, setSecondBreadcrumb] = useState<string>('disabled')

  useEffect(() => {
    if (step1Completed) {
      setFirstBreadcrumb('finished')
      setSecondBreadcrumb('active')
    }

    
  }, [step1Completed])
  useEffect(() => {
    if (step === 1) {
      setFirstBreadcrumb('finished')
      setSecondBreadcrumb('active')
    }
  }, [step])
  const selectTab = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (step1Completed) {
      if (event.currentTarget.dataset.index === '0') {
        setFirstBreadcrumb('active')
        setSecondBreadcrumb('')
      } else if (event.currentTarget.dataset.index === '1') {
        setFirstBreadcrumb('finished')
        setSecondBreadcrumb('active')
      }

      setStep(event.currentTarget.dataset.index === '0' ? 0 : 1)
    }

  }

  return (
    <div className="breadcrumb">
      <span className={`breadcrumb__step breadcrumb__step ${firstBreadcrumb}`} onClick={selectTab} data-index="0">Step 1</span>
      <span className={`breadcrumb__step breadcrumb__step ${secondBreadcrumb}`} onClick={selectTab} data-index="1">Step 2</span>
    </div>
  )
}