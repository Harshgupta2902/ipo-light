import { endpoints } from '@/api/endpoints';
import React, { useState, ChangeEvent } from 'react';

const CheckPan: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showKycModal, setShowKycModal] = useState(false);
    const [panNumber, setPanNumber] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [validationMessage, setValidationMessage] = useState<string | null>(null);
    const [kycData, setKycData] = useState<any | null>(null);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const upperValue = value.toUpperCase();

        if (upperValue.length <= 10) {
            if (
                (upperValue.length <= 5 && /^[A-Z]*$/.test(upperValue)) ||
                (upperValue.length > 5 && upperValue.length <= 9 && /^[A-Z]{5}[0-9]*$/.test(upperValue)) ||
                (upperValue.length === 10 && /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(upperValue))
            ) {
                setPanNumber(upperValue);
                validatePan(upperValue);
            }
        }
    };

    const validatePan = (value: string) => {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!panRegex.test(value)) {
            setErrorMessage('Invalid PAN number. Please enter a valid PAN number.');
        } else {
            setErrorMessage('');
            handleValidPan(value);
        }
    };

    const handleValidPan = async (value: string) => {
        try {
            const response = await fetch(`${endpoints.checkPan}?pan=${value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (response.ok) {
                setValidationMessage('PAN validation successful');
                setKycData(data);
                setIsModalOpen(false);
                setShowKycModal(true);
                console.log('PAN validation successful:', data);
            } else {
                setValidationMessage('PAN validation failed');
                console.error('PAN validation failed:', data);
            }
        } catch (error) {
            setValidationMessage('Error validating PAN');
            console.error('Error validating PAN:', error);
        }
    };

    return (
        <div className="order-2 flex items-center md:order-2 lg:ml-0">
            <button
                onClick={toggleModal}
                className="btn btn-outline-primary border-0"
                type="button"
            >
                Verify Your PAN
            </button>
            {isModalOpen && (
                <div id="kyc-modal" aria-hidden="false" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden">
                    <div className="relative p-4 w-full max-w-5xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow ">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Check Your PAN KYC Here
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                                    onClick={toggleModal}
                                >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5 space-y-4">
                                <label className="block mb-2 text-sm font-medium text-gray-900">
                                    Enter Your Pan Number to Check KYC
                                </label>
                                <input
                                    type="text"
                                    value={panNumber}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="XXXXX****X"
                                    maxLength={10}
                                />
                                {errorMessage && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errorMessage}</p>
                                )}
                                <p className="mt-2 text-sm text-gray-500">
                                    We’ll never share your details with anyone
                                </p>
                            </div>
                            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
                                <button
                                    onClick={toggleModal}
                                    type="button"
                                    className="btn btn-outline-primary border-0"
                                >
                                    I accept
                                </button>
                                <button
                                    onClick={toggleModal}
                                    type="button"
                                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showKycModal && (
                <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden">
                    <div className="relative p-4 w-full max-w-5xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    KYC Details
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center "
                                    onClick={() => setShowKycModal(false)}
                                >
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4 md:p-5 space-y-4">
                                <pre>{JSON.stringify(kycData, null, 2)}</pre>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckPan;
