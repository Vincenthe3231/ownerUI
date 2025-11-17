import BottomNavigation from '@/Components/BottomNavigation';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import { useMemo, useState, useRef, useEffect } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Edit() {
    const { auth } = usePage().props;
    const user = auth?.user ?? {};
    const { post, processing } = useForm();
    const [profileImage, setProfileImage] = useState(user.profile_photo_url || user.avatar || null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    // Sync profile image with user data when it updates
    useEffect(() => {
        console.log('User data updated:', {
            profile_photo_url: user.profile_photo_url,
            avatar: user.avatar,
            profile_photo: user.profile_photo,
        });
        
        if (user.profile_photo_url) {
            console.log('Setting profile image from URL:', user.profile_photo_url);
            setProfileImage(user.profile_photo_url);
            // Clear preview once we have the actual image URL from server
            setImagePreview(null);
        } else if (user.avatar) {
            setProfileImage(user.avatar);
        } else if (!imagePreview) {
            // Only clear if there's no preview (to avoid clearing during upload)
            setProfileImage(null);
        }
    }, [user.profile_photo_url, user.avatar, user.profile_photo]);

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
                    className="h-7 w-7 text-white"
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
                    className="h-7 w-7 text-white"
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
                    className="h-7 w-7 text-white"
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select an image file');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);

            // Set uploading state
            setIsUploading(true);
            
            // Create FormData manually to ensure file is sent correctly
            const formData = new FormData();
            formData.append('profile_photo', file);
            
            // Use router.post with FormData - don't set Content-Type, browser will set it with boundary
            router.post(route('profile.update-photo'), formData, {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: (page) => {
                    // Keep preview until user data is updated
                    // The useEffect will update profileImage when user.profile_photo_url changes
                    setIsUploading(false);
                    // Don't clear preview immediately - let useEffect handle it
                },
                onError: (errors) => {
                    console.error('Upload error details:', errors);
                    
                    // Get error message from response errors
                    let errorMessage = 'Failed to upload image. Please try again.';
                    
                    if (errors?.profile_photo) {
                        const error = errors.profile_photo;
                        errorMessage = Array.isArray(error) ? error[0] : error;
                    } else if (errors?.message) {
                        errorMessage = errors.message;
                    } else if (typeof errors === 'string') {
                        errorMessage = errors;
                    }
                    
                    alert(errorMessage);
                    setImagePreview(null);
                    setIsUploading(false);
                },
                onFinish: () => {
                    setIsUploading(false);
                },
            });
        }
    };

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <AuthenticatedLayout header={null} hideNavigation>
            <Head title="Profile" />
            <main className="min-h-screen bg-white pb-32">
                <div className="px-4 pt-6">
                    {/* Logo */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-md flex items-center justify-center mr-2" style={{ backgroundColor: '#d81e43' }}>
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-bold text-lg" style={{ color: '#d81e43' }}>RenoXpert</div>
                                <div className="text-gray-400 text-[0.6rem]">empowered by
                                    <span className="font-bold" style={{ color: '#3cc0bd' }}>&nbsp;be</span>
                                    <span className="font-bold" style={{ color: '#f5833d' }}>live</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 pt-2">
                    {/* Profile Card with Hybrid Morphism */}
                    <div 
                        className="rounded-3xl bg-white p-6"
                        style={{
                            boxShadow: '0 10px 25px -5px rgba(216, 30, 67, 0.2), 0 4px 6px -2px rgba(216, 30, 67, 0.1)',
                            backdropFilter: 'blur(10px)',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        }}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-4">
                                <div 
                                    className="flex h-24 w-24 items-center justify-center rounded-3xl overflow-hidden"
                                    style={{
                                        background: imagePreview || profileImage 
                                            ? 'transparent' 
                                            : 'linear-gradient(135deg, rgba(216, 30, 67, 0.15) 0%, rgba(255, 255, 255, 0.9) 100%)',
                                        boxShadow: 'inset 0 2px 4px rgba(216, 30, 67, 0.1), 0 4px 8px rgba(216, 30, 67, 0.15)',
                                    }}
                                >
                                    {imagePreview || profileImage ? (
                                        <img
                                            src={imagePreview || profileImage}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-2xl font-semibold" style={{ color: '#d81e43' }}>
                                            {initials}
                                        </span>
                                    )}
                                </div>
                                {/* Edit Button - Top Right Corner */}
                                <button
                                    type="button"
                                    onClick={handleEditClick}
                                    disabled={isUploading}
                                    className="absolute -top-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                                    style={{
                                        backgroundColor: '#d81e43',
                                        boxShadow: '0 2px 8px rgba(216, 30, 67, 0.4)',
                                    }}
                                    aria-label="Edit profile picture"
                                >
                                    {isUploading ? (
                                        <svg
                                            className="w-4 h-4 text-white animate-spin"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            className="w-4 h-4 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {/* Hidden File Input */}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <p className="mt-1 text-base font-medium" style={{ color: '#d81e43' }}>
                                {user.role ?? 'Account Owner'}
                            </p>
                        </div>
                    </div>

                    {/* Contact Information Section */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                                Contact Information
                            </h2>
                            <span 
                                className="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white"
                                style={{
                                    backgroundColor: '#d81e43',
                                    boxShadow: '0 2px 4px rgba(216, 30, 67, 0.2)',
                                }}
                            >
                                Read Only
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {contactCards.map(({ icon, label, value }) => (
                                <div
                                    key={label}
                                    className="flex items-center gap-4 rounded-3xl bg-white p-4 transition-transform hover:scale-105"
                                    style={{
                                        boxShadow: '0 8px 20px -5px rgba(107, 114, 128, 0.15), 0 4px 6px -2px rgba(107, 114, 128, 0.1)',
                                        backdropFilter: 'blur(10px)',
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    }}
                                >
                                    <div 
                                        className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl"
                                        style={{
                                            backgroundColor: '#d81e43',
                                            boxShadow: 'inset 0 2px 4px rgba(216, 30, 67, 0.2), 0 2px 4px rgba(216, 30, 67, 0.15)',
                                        }}
                                    >
                                        {icon}
                                    </div>
                                    <div className="flex flex-1 flex-col text-left">
                                        <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                            {label}
                                        </span>
                                        <span className="mt-1 text-lg font-semibold text-gray-900">
                                            {value}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Account Actions Section with CTA Styling */}
                    <div 
                        className="space-y-4 rounded-3xl p-6"
                        style={{
                            background: 'linear-gradient(135deg, rgba(245, 131, 61, 0.1) 0%, rgba(255, 255, 255, 0.9) 100%)',
                            boxShadow: '0 8px 20px -5px rgba(245, 131, 61, 0.25), 0 4px 6px -2px rgba(245, 131, 61, 0.1)',
                            backdropFilter: 'blur(10px)',
                        }}
                    >
                        <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#f5833d' }}>
                            Account Actions
                        </h2>

                        <button
                            type="button"
                            onClick={handleLogout}
                            disabled={processing}
                            className="flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-3 text-lg font-semibold text-white transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                            style={{
                                background: 'linear-gradient(135deg, #f5833d 0%, #d81e43 100%)',
                                boxShadow: '0 4px 12px rgba(245, 131, 61, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                            }}
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

                        <p className="text-center text-sm leading-relaxed text-gray-600">
                            We are continuously improving your experience. If
                            you notice anything that could be easier to use,
                            please reach us at{' '}
                            <a
                                className="font-semibold underline underline-offset-4"
                                style={{ color: '#d81e43' }}
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
