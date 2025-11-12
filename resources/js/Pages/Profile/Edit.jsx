import BottomNavigation from '@/Components/BottomNavigation';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Edit() {
    const { auth } = usePage().props;
    const user = auth?.user ?? {};
    const { post, processing } = useForm();

    const initials = useMemo(() => {
        if (!user.name) {
            return '?';
        }

        return user.name
            .split(' ')
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join('');
    }, [user.name]);

    const phoneNumber =
        user.phone_number ?? user.phone ?? user.contact_number ?? '';

    const contactCards = [
        {
            label: 'Full Name',
            value: user.name ?? 'Your name is not set yet',
            icon: (
                <svg
                    role="img"
                    aria-hidden="true"
                    className="h-7 w-7 text-indigo-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M20.5911 21.9783C19.9326 17.7418 16.343 14.5 12 14.5C7.65702 14.5 4.06739 17.7418 3.40894 21.9783C3.34926 22.3743 3.62756 22.7394 4.03174 22.7394H19.9683C20.3724 22.7394 20.6507 22.3743 20.5911 21.9783Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            label: 'Phone Number',
            value: phoneNumber || '+60 1111476550',
            icon: (
                <svg
                    role="img"
                    aria-hidden="true"
                    className="h-7 w-7 text-indigo-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8.5 4H7C5.34315 4 4 5.34315 4 7V8.5C4 15.1274 8.87258 20 15.5 20H17C18.6569 20 20 18.6569 20 17V15.9867C20 15.3478 19.6558 14.7574 19.0923 14.4534L16.1101 12.8388C15.6332 12.5802 15.0415 12.6387 14.6256 12.987L13.8119 13.6755C13.3314 14.0844 12.6281 14.1011 12.1299 13.7142C10.1578 12.1937 8.80629 10.8422 7.28584 8.87005C6.89895 8.37186 6.91565 7.66857 7.32448 7.18812L8.01305 6.3744C8.36133 5.95851 8.41984 5.3668 8.1612 4.8899L6.54664 1.9077C6.24262 1.34424 5.65219 1 5.01333 1H4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
        {
            label: 'Email Address',
            value: user.email ?? 'Add your email address',
            icon: (
                <svg
                    role="img"
                    aria-hidden="true"
                    className="h-7 w-7 text-indigo-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4 6.75C4 5.50736 5.00736 4.5 6.25 4.5H17.75C18.9926 4.5 20 5.50736 20 6.75V17.25C20 18.4926 18.9926 19.5 17.75 19.5H6.25C5.00736 19.5 4 18.4926 4 17.25V6.75Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    />
                    <path
                        d="M4.5 6.5L12 12.25L19.5 6.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            ),
        },
    ];

    const handleLogout = () => {
        post(route('logout'));
    };

    return (
        <AuthenticatedLayout header={null} hideNavigation>
            <Head title="Profile" />
            <main className="min-h-screen bg-slate-50 pb-32">
                <div className="px-4 pt-6">
                    {/* Logo */}
                    <div className="flex items-center mb-3">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center mr-2">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-red-600 font-bold text-lg">RenoXpert</div>
                                <div className="text-gray-400 text-xs">empowered by BeLive</div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 pt-4">
                    <div className="rounded-3xl bg-white p-5 shadow-md shadow-indigo-50">
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-100 via-white to-indigo-50 shadow-inner">
                                <span className="text-2xl font-semibold text-indigo-600">
                                    {initials}
                                </span>
                                <span className="absolute -bottom-1 right-1.5 rounded-full bg-amber-400 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-wider text-amber-900 shadow">
                                    Active
                                </span>
                            </div>
                            {/* <p className="text-sm uppercase tracking-[0.3rem] text-slate-400">
                                RenoXpert
                            </p> */}
                            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                                {user.name ?? 'Test User'}
                            </h1>
                            <p className="mt-1 text-base font-medium text-indigo-700">
                                {user.role ?? 'Account Owner'}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                                Contact Information
                            </h2>
                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-600">
                                Read Only
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {contactCards.map(({ icon, label, value }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-4 rounded-2xl border border-indigo-50 bg-white p-4 shadow-sm shadow-indigo-100"
                                >
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-indigo-100">
                                        {icon}
                                    </div>
                                    <div className="flex flex-1 flex-col text-left">
                                        <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                            {label}
                                        </span>
                                        <span className="mt-1 text-lg font-semibold text-slate-900">
                                            {value}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 rounded-3xl bg-rose-50 p-5 shadow-md shadow-rose-100">
                        <h2 className="text-sm font-semibold uppercase tracking-wide text-rose-500">
                            Account Actions
                        </h2>

                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={processing}
                            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-transparent bg-rose-500 px-5 py-3 text-lg font-semibold text-white transition hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <svg
                                role="img"
                                aria-hidden="true"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M15 7L20 12L15 17"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M20 12H9.5"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M13 4H7C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H13"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            Logout
                        </button>

                        <p className="text-center text-sm leading-relaxed text-slate-600">
                            We are continuously improving your experience. If
                            you notice anything that could be easier to use,
                            please reach us at{' '}
                            <a
                                className="font-semibold text-indigo-600 underline underline-offset-4"
                                href="mailto:itsupport@renoxpert.my"
                            >
                                itsupport@renoxpert.my
                            </a>
                            .
                        </p>
                    </div>
                </section>

                <BottomNavigation active="profile" />
            </main>
        </AuthenticatedLayout>
    );
}
