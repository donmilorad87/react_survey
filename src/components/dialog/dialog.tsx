import { useEffect, useState, useRef } from 'react'
import './dialog.scss'
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Close from '../../assets/icons/close.svg'
import Loader from '../loader/loader';
import { v4 as uuidv4 } from 'uuid';
export interface DialogProps {
    for_me: number
    for_me_answer: string
    for_a_friend: number
    for_a_friend_answer: number
    UUID: string

}

export interface SurveyState {
    step1: boolean
    step2: boolean
}
type UUID = string;

function Dialog() {

    const newUuid: UUID = uuidv4();

    const [isLoading, setIsLoading] = useState(false)

    const [submitMessage, setSubmitMessage] = useState<string | null>(null)

    const surveyStep1Ref = useRef<HTMLInputElement>(null);
    const surveyStep2Ref = useRef<HTMLInputElement>(null);
    const surveyStep3Ref = useRef<HTMLInputElement>(null);

    const errorTextRef = useRef<HTMLParagraphElement>(null);

    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    
    useEffect(() => {
        // Function to update window size in state
        const handleResize = () => {
            if (surveyStep1Ref) {
                surveyStep1Ref.current!.style.transition = '0s'
            }
            if (surveyStep2Ref) {
                surveyStep2Ref.current!.style.transition = '0s'
            }
            if (surveyStep3Ref) {
                surveyStep3Ref.current!.style.transition = '0s'
            }
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        if (submitObject.for_me === 1) {
            if (surveyStep1Ref.current && surveyStep2Ref.current) {
                surveyStep1Ref.current.style.left = `-${surveyStep1Ref.current.offsetWidth}px`
                surveyStep2Ref.current.style.left = `-${surveyStep2Ref.current.offsetWidth}px`
            }
        } else if (submitObject.for_a_friend === 1) {
            if (surveyStep1Ref.current && surveyStep3Ref.current) {
                surveyStep1Ref.current.style.left = `-${surveyStep1Ref.current.offsetWidth}px`
                surveyStep3Ref.current.style.left = `-${2 * surveyStep3Ref.current.offsetWidth}px`
            }
        }
        setTimeout(() => {
            if (surveyStep1Ref) {
                surveyStep1Ref.current!.style.transition = '0.3s'
            }
            if (surveyStep2Ref) {
                surveyStep2Ref.current!.style.transition = '0.3s'
            }
            if (surveyStep3Ref) {
                surveyStep3Ref.current!.style.transition = '0.3s'
            }
        }, 1)


    }, [windowSize])

    const [submitObject, setSubmitObject] = useState<DialogProps>({
        for_me: 0,
        for_me_answer: "",
        for_a_friend: 0,
        for_a_friend_answer: 0,
        UUID: newUuid
    })

    const [step, setStep] = useState<number>(0)

    const [step1Completed, setStep1Completed] = useState<boolean>(false)

    const dialogRef = useRef<HTMLDialogElement>(null);


    useEffect(() => {
        setTimeout(() => {
            if (dialogRef.current) {

                dialogRef.current.showModal()
            }
        }, 500);
    }, [])

    useEffect(() => {
        if (submitObject.for_me === 1) {
            if (surveyStep1Ref.current && surveyStep2Ref.current) {
                surveyStep1Ref.current.style.left = `-${surveyStep1Ref.current.offsetWidth}px`
                surveyStep2Ref.current.style.left = `-${surveyStep2Ref.current.offsetWidth}px`
            }
        } else if (submitObject.for_a_friend === 1) {
            if (surveyStep1Ref.current && surveyStep3Ref.current) {
                surveyStep1Ref.current.style.left = `-${surveyStep1Ref.current.offsetWidth}px`
                surveyStep3Ref.current.style.left = `-${2 * surveyStep3Ref.current.offsetWidth}px`
            }
        }
    }, [submitObject])

    useEffect(() => {
        if (step === 0) {
            if (surveyStep1Ref.current && surveyStep2Ref.current && surveyStep3Ref.current) {
                surveyStep1Ref.current.style.left = `0px`
                surveyStep2Ref.current.style.left = `0px`
                surveyStep3Ref.current.style.left = `0px`
            }
        } else if (step === 1) {
            if (submitObject.for_me === 1) {
                if (surveyStep1Ref.current && surveyStep2Ref.current) {
                    surveyStep1Ref.current.style.left = `-${surveyStep1Ref.current.offsetWidth}px`
                    surveyStep2Ref.current.style.left = `-${surveyStep2Ref.current.offsetWidth}px`
                }
            } else if (submitObject.for_a_friend === 1) {
                if (surveyStep1Ref.current && surveyStep3Ref.current) {
                    surveyStep1Ref.current.style.left = `-${surveyStep1Ref.current.offsetWidth}px`
                    surveyStep3Ref.current.style.left = `-${2 * surveyStep3Ref.current.offsetWidth}px`
                }
            }
        }


    }, [step])

    const closeOnBackdropClick = (e: React.MouseEvent) => {
        if (dialogRef.current) {
            const rect = dialogRef.current.getBoundingClientRect();
            const isInDialog = (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            );

            if (!isInDialog) {
                //@ts-ignore
                if (window.dataSubmiting !== true) {
                    closeDialog()
                }
            }
        }

    }

    const handleFirstStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setStep1Completed(true)

        setStep(name === 'for_me' ? 0 : 1)

        setSubmitObject({
            for_me: value === '1' ? 1 : 0,
            for_me_answer: "",
            for_a_friend: value === '1' ? 0 : 1,
            for_a_friend_answer: 0,
            UUID: newUuid
        })
    }

    const handleSeccondStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSubmitObject({
            ...submitObject,
            for_a_friend_answer: parseInt(value)
        })
    }

    const addUserAnswer = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setSubmitObject({
            ...submitObject,
            for_me_answer: value
        })
    }
    const submitDataForm = () => {
        submitData(true)
    }
    const submitData = (showModal: boolean) => {
        //@ts-ignore
        window.dataSubmiting = true
        const raw = JSON.stringify(submitObject);

        const requestOptions: RequestInit = {
            method: "POST",
            body: raw,
            redirect: "follow",

            referrerPolicy: 'same-origin', // Referrer policy (optional)
        };
        if (showModal) {
            setIsLoading(true)
        }

        fetch("https://blazingsun.space/checkoutChampRoute.php", requestOptions)
            .then((response) => {
                console.log(response);
                if (!response.ok) throw new Error('Error happened');
                return response.text()
            })
            .then((result) => {
                console.log(result);
                 //@ts-ignore
                window.dataSubmiting = true
                if (showModal) {
                    setSubmitMessage(result)
                    setTimeout(() => {

                        dialogRef.current?.close()

                    }, 5000)
                }
            })
            .catch((error) => {
                console.error(error)
                if (showModal) {
                    setSubmitMessage('error')
                    errorTextRef.current?.classList.remove('hide')
                    setTimeout(() => {

                        errorTextRef.current?.classList.add('hide')

                    }, 5000)
                }

                setSubmitObject({
                    for_me: 0,
                    for_me_answer: "",
                    for_a_friend: 0,
                    for_a_friend_answer: 0,
                    UUID: newUuid
                })
                setStep(0)
                setStep1Completed(false)
                //@ts-ignore
                window.dataSubmiting = false
            })
            .finally(() => {
                if (showModal) {
                    setIsLoading(false)
                }
                
            })

    }

    const closeDialog = () => {
        dialogRef.current?.close()
        //@ts-ignore
        if (window.dataSubmiting !== true) {
            submitData(false)
        }

    }
    useEffect(() => {
        // Handler function for keydown event
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                //@ts-ignore
                if (window.dataSubmiting !== true) {
                    submitData(false)
                }
            }
        };

        // Add event listener
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);
    return (

        <dialog id="myDialog" className="my-dialog" ref={dialogRef} onClick={closeOnBackdropClick}>
            <img src={Close} alt="Close Dialog" onClick={closeDialog} className='closeDialog' />
            <div>
                {!isLoading && (submitMessage === null || submitMessage === 'error') && (
                    <>
                        <Breadcrumbs step1Completed={step1Completed} step={step} setStep={setStep} />
                        <h1 className='mainTitle'>Survey</h1>
                    </>

                )}

                <form method="dialog" className='surveyForm'>
                    {!isLoading && (submitMessage === null || submitMessage === 'error') && (
                        <>
                            <div className='dialogHolder'>
                                <div className="dialogHolderDivs first" ref={surveyStep1Ref}>

                                    <h4 className='title'>Did you buy this for you or for a friend?</h4>
                                    <div className='df aic g1 mb1 conter'>
                                        <div className='df g0dot5 aic inputLabels'>
                                            <label htmlFor="for_me">For me</label>
                                            <input type="radio" id="for_me" name="buy_for" className='w20px h20px m0' value="1" onChange={handleFirstStepChange} />
                                        </div>

                                        <div className='df g0dot5 aic inputLabels'>
                                            <label htmlFor="for_a_friend">For a friend</label>
                                            <input type="radio" id="for_a_friend" name="buy_for" className='w20px h20px m0' value="2" onChange={handleFirstStepChange} />
                                        </div>
                                    </div>


                                </div>

                                <div className="dialogHolderDivs second" ref={surveyStep2Ref}>
                                    <h4 className='title'>What problems of you skin do you want to solve?</h4>
                                    <textarea id="for_me_answer" className="for_me_answer conter" name="for_me_answer" onChange={addUserAnswer} value={submitObject.for_me_answer} />
                                </div>

                                <div className="dialogHolderDivs third" ref={surveyStep3Ref}>
                                    <h4 className='title'>Where did you see ads for this product ?</h4>
                                    <div className='df aic g1 mb1 fww conter'>
                                        <div className='df g0dot5 aic inputLabels'>
                                            <label htmlFor="facebook">Facebook</label>
                                            <input type="radio" id="facebook" name="utm_source" className='w20px h20px m0' value="1" onChange={handleSeccondStepChange} checked={submitObject.for_a_friend_answer === 1} />
                                        </div>

                                        <div className='df g0dot5 aic inputLabels'>
                                            <label htmlFor="youtube">YouTube</label>
                                            <input type="radio" id="youtube" name="utm_source" className='w20px h20px m0' value="2" onChange={handleSeccondStepChange} checked={submitObject.for_a_friend_answer === 2} />
                                        </div>

                                        <div className='df g0dot5 aic inputLabels'>
                                            <label htmlFor="email">Email</label>
                                            <input type="radio" id="email" name="utm_source" className='w20px h20px m0' value="3" onChange={handleSeccondStepChange} checked={submitObject.for_a_friend_answer === 3} />

                                        </div>
                                        <div className='df g0dot5 aic inputLabels'>
                                            <label htmlFor="tiktok">Tiktok</label>
                                            <input type="radio" id="tiktok" name="utm_source" className='w20px h20px m0' value="4" onChange={handleSeccondStepChange} checked={submitObject.for_a_friend_answer === 4} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </>

                    )}

                    {
                        isLoading &&
                        <Loader />
                    }

                    <p className='errorText hide' ref={errorTextRef}>Error happend, please try again!</p>

                    {
                        (submitMessage !== null) && (submitMessage !== 'error') &&
                        <p className='successText'>{submitMessage}</p>
                    }
                    {
                        step === 1 && (submitMessage === null || submitMessage === 'error') &&
                        <span role='button' className="button" onClick={submitDataForm}>Submit</span>
                    }

                </form>
            </div>
        </dialog>



    )
}

export default Dialog