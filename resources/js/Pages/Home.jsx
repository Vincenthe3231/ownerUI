import BottomNavigation from '@/Components/BottomNavigation';
import ApplicationLogo from '@/Components/ApplicationLogo';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const heroSlides = [
    {
        id: 1,
        image:
            'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80',
        eyebrow: 'Renovate for Rent',
        title: 'Built for ROI',
        description:
            'Refresh your unit into a co-living asset with premium finishes and smart space planning.',
    },
    {
        id: 2,
        image:
            'https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?auto=format&fit=crop&w=900&q=80',
        eyebrow: 'Turnkey Delivery',
        title: 'From Plan to Keys',
        description:
            'Guided renovations with progress updates and a dedicated project specialist.',
    },
    {
        id: 3,
        image:
            'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=900&q=80',
        eyebrow: 'Trusted Partners',
        title: 'Certified Craftsmanship',
        description:
            'Work with vetted contractors and materials curated for durability and style.',
    },
];

const upcomingProjects = [
    {
        id: 1,
        name: 'Nexus Taman Pertama',
        image:
            'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
        location: 'Cheras',
    },
    {
        id: 2,
        name: 'The Harmony OKR',
        image:
            'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=600&q=80',
        location: 'Old Klang Road',
    },
    {
        id: 3,
        name: "D'Erica Residences",
        image:
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=600&q=80',
        location: 'Mont Kiara',
    },
    {
        id: 4,
        name: 'Aurora Suites',
        image:
            'https://images.unsplash.com/photo-1487956382158-bb926046304a?auto=format&fit=crop&w=600&q=80',
        location: 'Damansara',
    },
];

const currentProjects = [
    {
        id: 1,
        name: 'M Vertica Residences',
        image:
            'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=600&q=80',
        location: 'Cheras',
    },
    {
        id: 2,
        name: 'Meta City',
        image:
            'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
        location: 'Serdang',
    },
    {
        id: 3,
        name: 'Vivo Executive Apartment',
        image:
            'https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=600&q=80',
        location: 'Bukit Jalil',
    },
    // {
    //     id: 4,
    //     name: 'Skyline Icon',
    //     image:
    //         'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=600&q=80',
    //     location: 'KL City',
    // },
];

export default function Home() {
    const [activeSlide, setActiveSlide] = useState(0);
    const carouselRef = useRef(null);

    const slideCount = heroSlides.length;

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slideCount);
        }, 1500);

        return () => window.clearInterval(timer);
    }, [slideCount]);
    // Scroll carousel when activeSlide changes
    useEffect(() => {
        if (carouselRef.current) {
            const slideWidth = carouselRef.current.clientWidth;
            carouselRef.current.scrollTo({
                left: activeSlide * slideWidth,
                behavior: 'smooth',
            });
        }
    }, [activeSlide]);

    return (
        <AuthenticatedLayout header={null} hideNavigation={true}>
            <Head title="Home" />
            <style>{`
                @media (max-width: 320px) {
                    .mobile-single-col {
                        grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
                    }
                    .mobile-full-width {
                        grid-column: span 1 / span 1 !important;
                        max-width: 100% !important;
                        margin-left: 0 !important;
                        margin-right: 0 !important;
                        width: 100% !important;
                    }
                }
            `}</style>
            <main className="min-h-screen bg-slate-50 pb-32">
                <div className="mx-auto flex w-full max-w-md flex-col gap-4 sm:gap-6 px-3 sm:px-4 pt-4 sm:pt-6">
                    {/* Logo */}
                    <div className="flex items-center mb-6">
                        <div className="flex items-center">
                            <ApplicationLogo className="h-8 w-auto mr-2" />
                        </div>
                    </div>

                    <section className="space-y-3">
                        {/* Scrollable container with hybrid morphism */}
                        <div
                            ref={carouselRef}
                            onScroll={(e) => {
                                const slideWidth = e.target.clientWidth;
                                const newIndex = Math.round(e.target.scrollLeft / slideWidth);
                                setActiveSlide(newIndex);
                            }}
                            className="overflow-x-auto rounded-3xl bg-white scrollbar-hide"
                            style={{
                                scrollSnapType: 'x mandatory',
                                WebkitOverflowScrolling: 'touch',
                                boxShadow: '0 10px 25px -5px rgba(216, 30, 67, 0.2), 0 4px 6px -2px rgba(216, 30, 67, 0.1)',
                            }}
                        >
                            <div className="flex">
                                {heroSlides.map((slide) => (
                                    <article
                                        key={slide.id}
                                        className="flex w-full flex-shrink-0 flex-col scroll-snap-align-start"
                                        style={{
                                            scrollSnapAlign: 'start',
                                            scrollSnapStop: 'always',
                                        }}
                                    >
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            className="h-40 sm:h-48 w-full object-cover rounded-t-3xl"
                                            loading="lazy"
                                        />
                                        <div className="space-y-1 px-4 sm:px-5 pb-4 sm:pb-5 pt-3 sm:pt-4">
                                            <p className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.2rem] sm:tracking-[0.4rem] text-rose-500">
                                                {slide.eyebrow}
                                            </p>
                                            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                                                {slide.title}
                                            </h2>
                                            <p className="text-xs sm:text-sm text-slate-600">{slide.description}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        {/* Dot indicator */}
                        <div className="flex justify-center gap-2">
                            {heroSlides.map((slide, index) => (
                                <button
                                    key={slide.id}
                                    type="button"
                                    aria-label={`Go to slide ${index + 1}`}
                                    onClick={() => {
                                        if (carouselRef.current) {
                                            carouselRef.current.scrollTo({
                                                left: index * carouselRef.current.clientWidth,
                                                behavior: 'smooth',
                                            });
                                        }
                                        setActiveSlide(index);
                                    }}
                                    className={`h-2.5 rounded-full transition-all ${activeSlide === index
                                        ? 'w-6'
                                        : 'w-2 bg-gray-300'
                                        }`}
                                    style={{
                                        backgroundColor: activeSlide === index ? '#d81e43' : undefined,
                                    }}
                                />
                            ))}
                        </div>
                    </section>

                    {/* Section 2: Current Projects & Upcoming Projects */}
                    <section className="space-y-6">
                        {/* Current Projects */}
                        <div className="space-y-3">
                            <h2 className="text-base sm:text-lg font-semibold text-slate-900 px-1">
                                Current Projects
                            </h2>
                            <div className="grid grid-cols-2 gap-3 mobile-single-col">
                                {currentProjects.map((project, index) => {
                                    const isLast = index === currentProjects.length - 1;
                                    const isOddCount = currentProjects.length % 2 === 1;
                                    return (
                                        <article
                                            key={project.id}
                                            className={`group flex flex-col overflow-hidden rounded-3xl bg-white transition-transform hover:scale-105 ${
                                                isLast && isOddCount ? 'col-span-2 mx-auto max-w-[calc(50%-0.375rem)] mobile-full-width' : ''
                                            }`}
                                            style={{
                                                boxShadow: '0 8px 20px -5px rgba(60, 192, 189, 0.25), 0 4px 6px -2px rgba(60, 192, 189, 0.1)',
                                            }}
                                        >
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="h-32 sm:h-28 w-full object-cover"
                                                loading="lazy"
                                            />
                                            <div className="px-3 pb-3 pt-2">
                                                <h3 className="text-sm font-semibold text-slate-900">
                                                    {project.name}
                                                </h3>
                                                <p className="text-xs text-slate-500">{project.location}</p>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Upcoming Projects */}
                        <div className="space-y-3">
                            <h2 className="text-base sm:text-lg font-semibold text-slate-900 px-1">
                                Upcoming Projects
                            </h2>
                            <div className="grid grid-cols-2 gap-3 mobile-single-col">
                                {upcomingProjects.map((project, index) => {
                                    const isLast = index === upcomingProjects.length - 1;
                                    const isOddCount = upcomingProjects.length % 2 === 1;
                                    return (
                                        <article
                                            key={project.id}
                                            className={`group flex flex-col overflow-hidden rounded-3xl bg-white transition-transform hover:scale-105 ${
                                                isLast && isOddCount ? 'col-span-2 mx-auto max-w-[calc(50%-0.375rem)] mobile-full-width' : ''
                                            }`}
                                            style={{
                                                boxShadow: '0 8px 20px -5px rgba(60, 192, 189, 0.25), 0 4px 6px -2px rgba(60, 192, 189, 0.1)',
                                            }}
                                        >
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="h-32 sm:h-28 w-full object-cover"
                                                loading="lazy"
                                            />
                                            <div className="px-3 pb-3 pt-2">
                                                <h3 className="text-sm font-semibold text-slate-900">
                                                    {project.name}
                                                </h3>
                                                <p className="text-xs text-slate-500">{project.location}</p>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Our Other Services */}
                        <div className="space-y-3">
                            <h2 className="text-base sm:text-lg font-semibold text-slate-900 px-1">
                                Our Other Services
                            </h2>
                            <div className="grid grid-cols-2 gap-3 mobile-single-col">
                                {/* Spacify - Active Service */}
                                <a
                                    href="https://www.spacify.asia"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex flex-col overflow-hidden rounded-3xl transition-transform hover:scale-105 backdrop-blur-md bg-white/80 border border-white/40"
                                    style={{
                                        boxShadow: '0 8px 32px -5px rgba(60, 192, 189, 0.25), 0 4px 6px -2px rgba(60, 192, 189, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.6)',
                                        WebkitBackdropFilter: 'blur(12px)',
                                    }}
                                >
                                    <div className="h-28 w-full bg-gradient-to-br from-gray-50/80 to-cyan-50/80 backdrop-blur-sm flex items-center justify-center relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
                                        <img 
                                            src="https://www.spacify.asia/spacify/general/logo.webp" 
                                            alt="Spacify" 
                                            className="w-16 h-16 relative z-10 drop-shadow-sm" 
                                        />
                                    </div>
                                    <div className="px-3 pb-3 pt-2 relative z-10 bg-white/20 backdrop-blur-sm">
                                        <h3 className="text-sm font-semibold text-slate-900 drop-shadow-sm">
                                            Spacify
                                        </h3>
                                        <p className="text-xs text-slate-600 drop-shadow-sm">Property Rental Management</p>
                                    </div>
                                </a>

                                {/* Ninja Price - Upcoming */}
                                <div
                                    className="group flex flex-col overflow-hidden rounded-3xl transition-transform opacity-90 backdrop-blur-md bg-white/75 border border-white/40"
                                    style={{
                                        boxShadow: '0 8px 32px -5px rgba(60, 192, 189, 0.15), 0 4px 6px -2px rgba(60, 192, 189, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)',
                                        WebkitBackdropFilter: 'blur(12px)',
                                    }}
                                >
                                    <div className="h-28 w-full bg-gradient-to-br from-red-400/70 to-red-600/70 backdrop-blur-sm flex items-center justify-center relative">
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
                                        <svg className="w-16 h-16 text-white relative z-10 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="absolute top-2 right-2 px-2 py-1 bg-white/95 backdrop-blur-md rounded-full text-[0.65rem] font-semibold text-red-600 border border-white/50 drop-shadow-sm z-10">
                                            Coming Soon
                                        </span>
                                    </div>
                                    <div className="px-3 pb-3 pt-2 relative z-10 bg-white/20 backdrop-blur-sm">
                                        <h3 className="text-sm font-semibold text-slate-900 drop-shadow-sm">
                                            Ninja Price
                                        </h3>
                                        <p className="text-xs text-slate-600 drop-shadow-sm">Upcoming</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <BottomNavigation active="home" />
            </main>
        </AuthenticatedLayout>
    );
}


