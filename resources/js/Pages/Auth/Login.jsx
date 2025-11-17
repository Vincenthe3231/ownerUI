import { useForm } from '@inertiajs/react';
import { Phone, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function Login() {
    const [countryCode, setCountryCode] = useState('+60');

    const { data, setData, post, processing, errors } = useForm({
        phone: '',
        password: '',
        countryCode: '+60',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login.attempt')); // <-- Adjust to your login route
    };

    const handleCountryCodeChange = (e) => {
        const code = e.target.value;
        setCountryCode(code);
        setData('countryCode', code);
    };

    const countryCodes = [
        { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
        { code: '+61', country: 'Australia', flag: '🇦🇺' },
        { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    ];

    const selectedCountry = countryCodes.find(country => country.code === countryCode);


    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-50 to-gray-100 flex flex-col">
            {/* HERO IMAGE SECTION - Full width without card styling */}
            <div className="relative w-full h-80 overflow-hidden">
                {/* Main hero image - no blur effects on the image itself */}
                <img
                    src="/images/high-angle-pie-chart-with-cities.jpg"
                    alt="Smart Home"
                    className="w-full h-full object-cover"
                />

                {/* Subtle gradient overlay for depth - doesn't blur the image */}
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

                        {/* Main form container */}
                        <div className="relative bg-white/70 backdrop-blur-xl rounded-[2.5rem] shadow-[8px_8px_16px_rgba(163,177,198,0.15),-8px_-8px_16px_rgba(255,255,255,0.8)] border border-white/40 overflow-hidden">

                            {/* CONTENT SECTION */}
                            <div className="px-8 py-8">
                                {/* Title Section */}
                                <div className="text-center mb-8">
                                    <h1 className="text-3xl font-bold text-[#d81e43] mb-2">RenoXpert</h1>
                                    <p className="text-gray-600 text-sm mb-4">Transforming Renovation, One Smart Step at a Time.</p>
                                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                                </div>

                                {/* FORM */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* PHONE INPUT - Floating effect with country code dropdown */}
                                    <div className="relative group">
                                        {/* Floating shadow layer - creates elevation effect */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 shadow-[0_8px_24px_rgba(216,30,67,0.15),0_4px_12px_rgba(216,30,67,0.1),0_-2px_4px_rgba(255,255,255,0.9)] group-hover:shadow-[0_12px_32px_rgba(216,30,67,0.2),0_6px_16px_rgba(216,30,67,0.15),0_-2px_6px_rgba(255,255,255,0.95)] transition-all duration-300"></div>

                                        {/* Main input container */}
                                        <div className="relative bg-white/70 backdrop-blur-md rounded-2xl border border-[#3cc0bd]/20 overflow-hidden transform group-hover:translate-y-[-2px] transition-all duration-300">
                                            <div className="relative flex items-center px-4 py-3.5">
                                                {/* <Phone className="w-5 h-5 text-[#3cc0bd] mr-3 flex-shrink-0" /> */}

                                                {/* Country Code Dropdown */}
                                                <div className="relative flex-shrink-0">
                                                    <div className="relative flex items-center mr-2">
                                                        {/* Flag Icon */}
                                                        <span className="text-lg mr-1">
                                                            {selectedCountry?.flag}
                                                        </span>

                                                        {/* Dropdown */}
                                                        <select
                                                            value={countryCode}
                                                            onChange={handleCountryCodeChange}
                                                            className="border-none focus:border-none focus:ring-0 appearance-none bg-transparent text-gray-700 text-base font-medium pl-1 py-1 outline-none cursor-pointer"
                                                        >
                                                            {countryCodes.map((item) => (
                                                                <option key={item.code} value={item.code}>
                                                                    {item.code}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    {/* <ChevronDown className="appearance-none absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#3cc0bd] pointer-events-none" /> */}
                                                </div>

                                                {/* Divider */}
                                                <div className="w-px h-6">|</div>

                                                {/* Phone Number Input */}
                                                <input
                                                    type="tel"
                                                    placeholder="Number"
                                                    value={data.phone}
                                                    onChange={(e) => setData('phone', e.target.value)}
                                                    className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-base focus:outline-none border-none focus:border-none focus:ring-0"
                                                    required
                                                />
                                            </div>

                                            {/* Focus glow effect */}
                                            <div className="absolute inset-0 rounded-2xl ring-0 focus-within:ring-2 focus-within:ring-[#3cc0bd]/40 focus-within:ring-offset-2 focus-within:ring-offset-transparent transition-all duration-200 pointer-events-none"></div>
                                        </div>
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-sm mt-2 ml-1">{errors.phone}</p>}

                                    {/* PASSWORD INPUT - Optional, matching design */}


                                    {/* SUBMIT BUTTON - Shadow removed */}
                                    <button type="submit" disabled={processing} className="relative w-full group overflow-hidden mt-8">
                                        <div className="relative bg-gradient-to-r from-[#f5833d] to-[#d81e43] rounded-2xl py-3.5 backdrop-blur-sm border border-[#f5833d]/30 transform group-hover:scale-[1.02] transition-all duration-200">
                                            <span className="text-white font-semibold text-lg tracking-wide">
                                                {processing ? (
                                                    <span className="flex items-center justify-center">
                                                        <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                        </svg>
                                                        Loading...
                                                    </span>
                                                ) : (
                                                    'Next'
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