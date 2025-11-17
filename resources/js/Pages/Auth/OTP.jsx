import { useForm, router } from '@inertiajs/react';
import { RefreshCcw, ArrowLeft } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

// Component for the OTP input fields
const OtpInput = ({ otp, setOtp, onComplete, isProcessing }) => {
    const inputRefs = useRef([]);
    const length = 6;

    // Focus the first input field on load
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (/[^0-9]/.test(value)) return; // Only allow digits

        const newOtp = [...otp];

        if (value.length > 1) {
            // If user pastes more than one digit, fill the rest of the inputs
            for (let i = 0; i < length; i++) {
                newOtp[i] = value[i] || '';
            }
        } else {
            newOtp[index] = value;
        }

        setOtp(newOtp);

        // Auto-focus to the next input
        if (value && index < length - 1) {
            inputRefs.current[index + 1].focus();
        }

        if (newOtp.every(digit => digit !== '')) {
            onComplete(newOtp.join(''));
        }
    };

    const handleKeyDown = (e, index) => {
        // Backspace functionality
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            // Move focus to the previous input if current is empty
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className="flex justify-between space-x-2">
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    ref={el => (inputRefs.current[index] = el)}
                    type="tel"
                    maxLength="1"
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    disabled={isProcessing}
                    className="w-10 h-14 text-2xl font-bold text-center text-gray-800 bg-white/70 backdrop-blur-md rounded-xl border border-gray-300 shadow-md transition-all duration-200 focus:border-[#3cc0bd] focus:ring-2 focus:ring-[#3cc0bd]/40"
                    style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }}
                />
            ))}
        </div>
    );
};

// The main OTP component
export default function OTP({ phoneNumber = '+60 12 345 6789' }) {
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [timer, setTimer] = useState(60); // 60 seconds initial countdown

    const { data, setData, post, processing, errors } = useForm({
        otp_code: '',
    });

    // This hook will handle the timer logic
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    // Handle OTP verification
    const handleVerify = (e) => {
        e.preventDefault();

        const fullOtp = otp.join('');
        if (fullOtp.length !== 6) return;

        router.post(route('otp.verify'), {
            otp_code: fullOtp,
        });
    };


    // Handle resend OTP
    const handleResend = () => {
        if (timer > 0) return;

        post(route('otp.resend'), {
            preserveScroll: true,
            onSuccess: () => {
                setTimer(60); // Reset timer
            },
        });
    };

    const handleOtpComplete = (fullOtp) => {
        // Auto-focus submit button when OTP is complete
        console.log("OTP fully entered:", fullOtp);
    };

    const handleBack = () => {
        router.visit(route('login'));
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-gray-100 flex flex-col">
            {/* HERO IMAGE SECTION - Must match Login.jsx styling */}
            <div className="relative w-full h-80 overflow-hidden">
                <img
                    src="/images/high-angle-pie-chart-with-cities.jpg"
                    alt="Smart Home"
                    className="w-full h-full object-cover"
                />
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-white/20"></div>
                {/* Color shadow morphism effects around the edges only */}
                <div className="absolute -bottom-4 left-4 right-4 h-8 bg-gradient-to-r from-orange-200/40 via-yellow-200/30 to-orange-200/40 blur-xl"></div>
            </div>

            {/* MAIN CONTENT CONTAINER */}
            <div className="flex-1 flex items-center justify-center p-4 -mt-6">
                <div className="w-full max-w-sm">
                    <div className="relative">
                        {/* Outer glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-[2.5rem] blur-xl"></div>

                        {/* Main form container (Glassmorphic Card) */}
                        <div className="relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-[8px_8px_16px_rgba(163,177,198,0.15),-8px_-8px_16px_rgba(255,255,255,0.8)] border border-white/40 overflow-hidden">

                            {/* Back Button */}
                            <button
                                onClick={handleBack}
                                className="absolute top-6 left-6 p-2 rounded-full bg-white/50 text-gray-700 hover:bg-white/80 transition duration-150 z-10"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>

                            {/* CONTENT SECTION */}
                            <div className="px-8 py-8">
                                {/* Title Section */}
                                <div className="text-center mb-10">
                                    <h1 className="text-3xl font-bold text-[#d81e43] mb-2">Verify Your Account</h1>
                                    <p className="text-gray-600 text-sm">
                                        We sent a 6-digit code to <span className="font-semibold text-gray-800">{phoneNumber}</span>
                                    </p>
                                    <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                                </div>

                                {/* FORM */}
                                <form onSubmit={handleVerify} className="space-y-8">
                                    {/* OTP INPUTS */}
                                    <OtpInput
                                        otp={otp}
                                        setOtp={setOtp}
                                        onComplete={handleOtpComplete}
                                        isProcessing={processing}
                                    />

                                    {/* Verification Message / Error */}
                                    {errors.otp_code && <p className="text-red-500 text-sm mt-2 ml-1 text-center">{errors.otp_code}</p>}

                                    {/* RESEND LINK & TIMER */}
                                    <div className="text-center">
                                        {timer > 0 ? (
                                            <p className="text-sm text-gray-500">
                                                Resend code in <span className="font-bold text-[#d81e43]">{timer}s</span>
                                            </p>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleResend}
                                                disabled={processing}
                                                className="flex items-center justify-center mx-auto text-sm font-medium text-[#3cc0bd] hover:text-[#d81e43] disabled:text-gray-400 transition"
                                            >
                                                <RefreshCcw className="w-4 h-4 mr-1" />
                                                Resend Code
                                            </button>
                                        )}
                                    </div>

                                    {/* VERIFY BUTTON */}
                                    <button
                                        type="submit"
                                        disabled={processing || otp.some(d => d === '')}
                                        className="relative w-full group overflow-hidden pt-2"
                                    >
                                        <div className="relative bg-gradient-to-r from-[#f5833d] to-[#d81e43] rounded-2xl py-3.5 backdrop-blur-sm border border-[#f5833d]/30 transform group-hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100">
                                            <span className="text-white font-semibold text-lg tracking-wide">
                                                {processing ? (
                                                    <span className="flex items-center justify-center">
                                                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Verifying...
                                                    </span>
                                                ) : (
                                                    'Verify'
                                                )}
                                            </span>
                                        </div>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}