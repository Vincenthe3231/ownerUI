import BottomNavigation from '@/Components/BottomNavigation';
import ApplicationLogo from '@/Components/ApplicationLogo';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
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

const actionButtons = [
    {
        id: 1,
        label: 'View Quotations',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        href: '/quotations',
    },
    {
        id: 2,
        label: 'Track Progress',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
        ),
        href: '#',
    },
    {
        id: 3,
        label: 'View Invoices',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        href: '#',
    },
    {
        id: 4,
        label: 'Contact Chat',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
        ),
        href: '#',
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
        }, 6000);

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
            <main className="min-h-screen bg-slate-50 pb-32">
                <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 pt-6">
                    {/* Logo */}
                    <div className="flex items-center mb-6">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-md flex items-center justify-center mr-2" style={{ backgroundColor: '#d81e43' }}>
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <div>
                            <div>
                                <div className="font-bold text-lg" style={{ color: '#d81e43' }}>RenoXpert</div>
                                <div className="text-gray-400 text-[0.6rem]">empowered by
                                    <span className="font-bold" style={{ color: '#3cc0bd' }}>&nbsp;be</span>
                                    <span className="font-bold" style={{ color: '#f5833d' }}>live</span></div>
                            </div>
                            </div>
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
                                            className="h-48 w-full object-cover rounded-t-3xl"
                                            loading="lazy"
                                        />
                                        <div className="space-y-1 px-5 pb-5 pt-4">
                                            <p className="text-xs font-semibold uppercase tracking-[0.4rem] text-rose-500">
                                                {slide.eyebrow}
                                            </p>
                                            <h2 className="text-2xl font-semibold text-slate-900">
                                                {slide.title}
                                            </h2>
                                            <p className="text-sm text-slate-600">{slide.description}</p>
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
                            <h2 className="text-lg font-semibold text-slate-900 px-1">
                                Current Projects
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {currentProjects.map((project, index) => {
                                    const isLast = index === currentProjects.length - 1;
                                    const isOddCount = currentProjects.length % 2 === 1;
                                    return (
                                        <article
                                            key={project.id}
                                            className={`group flex flex-col overflow-hidden rounded-3xl bg-white transition-transform hover:scale-105 ${
                                                isLast && isOddCount ? 'col-span-2 mx-auto max-w-[calc(50%-0.375rem)]' : ''
                                            }`}
                                            style={{
                                                boxShadow: '0 8px 20px -5px rgba(60, 192, 189, 0.25), 0 4px 6px -2px rgba(60, 192, 189, 0.1)',
                                            }}
                                        >
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="h-28 w-full object-cover"
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
                            <h2 className="text-lg font-semibold text-slate-900 px-1">
                                Upcoming Projects
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {upcomingProjects.map((project, index) => {
                                    const isLast = index === upcomingProjects.length - 1;
                                    const isOddCount = upcomingProjects.length % 2 === 1;
                                    return (
                                        <article
                                            key={project.id}
                                            className={`group flex flex-col overflow-hidden rounded-3xl bg-white transition-transform hover:scale-105 ${
                                                isLast && isOddCount ? 'col-span-2 mx-auto max-w-[calc(50%-0.375rem)]' : ''
                                            }`}
                                            style={{
                                                boxShadow: '0 8px 20px -5px rgba(60, 192, 189, 0.25), 0 4px 6px -2px rgba(60, 192, 189, 0.1)',
                                            }}
                                        >
                                            <img
                                                src={project.image}
                                                alt={project.name}
                                                className="h-28 w-full object-cover"
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
                    </section>

                    {/* Section 3: Quick Action Buttons */}
                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold text-slate-900 px-1">
                            Quick Actions
                        </h2>
                        <div className="grid grid-cols-4 gap-2">
                            {actionButtons.map((button) => (
                                <Link
                                    key={button.id}
                                    href={button.href}
                                    className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-white transition-all hover:scale-105"
                                    style={{
                                        boxShadow: '0 8px 20px -5px rgba(245, 131, 61, 0.25), 0 4px 6px -2px rgba(245, 131, 61, 0.1)',
                                    }}
                                >
                                    <div className="text-orange-500 scale-75">
                                        {button.icon}
                                    </div>
                                    <span className="text-[0.65rem] font-semibold text-slate-900 text-center leading-tight">
                                        {button.label}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </section>
                </div>

                <BottomNavigation active="home" />
            </main>
        </AuthenticatedLayout>
    );
}


