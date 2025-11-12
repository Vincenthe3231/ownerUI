import BottomNavigation from '@/Components/BottomNavigation';
import ApplicationLogo from '@/Components/ApplicationLogo';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

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
        name: 'Vivo Exclusive Apartment',
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

    const slideCount = heroSlides.length;

    useEffect(() => {
        const timer = window.setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slideCount);
        }, 6000);

        return () => window.clearInterval(timer);
    }, [slideCount]);

    const carouselStyle = useMemo(
        () => ({
            width: `${slideCount * 100}%`,
            transform: `translateX(-${activeSlide * (100 / slideCount)}%)`,
        }),
        [activeSlide, slideCount],
    );

    return (
        <AuthenticatedLayout header={null} hideNavigation={true}>
            <Head title="Home" />
            <main className="min-h-screen bg-slate-50 pb-32">
                <div className="mx-auto flex w-full max-w-md flex-col gap-6 px-4 pt-6">
                    {/* Logo */}
                    <div className="flex items-center mb-6">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center mr-2">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-red-600 font-bold text-lg">RenoXpert</div>
                                <div className="text-gray-400 text-xs">empowered by bolive</div>
                            </div>
                        </div>
                    </div>

                    <section className="space-y-3">
                        {/* Scrollable container */}
                        <div
                            ref={(el) => {
                                if (el) {
                                    el.addEventListener('scroll', () => {
                                        const slideWidth = el.clientWidth;
                                        const newIndex = Math.round(el.scrollLeft / slideWidth);
                                        setActiveSlide(newIndex);
                                    });
                                }
                            }}
                            className="overflow-x-auto rounded-[32px] bg-white shadow-lg shadow-rose-100 scrollbar-hide"
                            style={{
                                scrollSnapType: 'x mandatory',
                                WebkitOverflowScrolling: 'touch',
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
                                            className="h-48 w-full object-cover"
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
                                        const container = document.querySelector('.scrollbar-hide');
                                        if (container) {
                                            container.scrollTo({
                                                left: index * container.clientWidth,
                                                behavior: 'smooth',
                                            });
                                        }
                                        setActiveSlide(index);
                                    }}
                                    className={`h-2.5 rounded-full transition-all ${activeSlide === index
                                        ? 'w-6 bg-rose-500'
                                        : 'w-2 bg-rose-200'
                                        }`}
                                />
                            ))}
                        </div>
                    </section>

                    <section className="rounded-[32px] bg-white/95 p-6 shadow-lg shadow-slate-100">
                        <div className="flex items-center gap-4">
                            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-100 to-rose-50 shadow-inner">
                                <span className="text-4xl">💡</span>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-semibold uppercase tracking-[0.4rem] text-rose-400">
                                    Did You Know?
                                </p>
                                <h3 className="text-xl font-semibold text-slate-900">
                                    Renting whole units misses up to 2× income.
                                </h3>
                            </div>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-slate-600">
                            Transform your unit into a co-living space that is fully managed,
                            fully tenanted and optimised for peace of mind.
                        </p>
                        <button
                            type="button"
                            className="mt-5 w-full rounded-2xl bg-rose-500 py-3 text-sm font-semibold uppercase tracking-wider text-white shadow hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                        >
                            Get free ROI report
                        </button>
                    </section>

                    <ProjectSection
                        title="Upcoming Project"
                        projects={upcomingProjects}
                        accent="from-rose-100 to-rose-50"
                    />

                    <ProjectSection
                        title="Current Project"
                        projects={currentProjects}
                        accent="from-sky-100 to-sky-50"
                    />
                </div>

                <BottomNavigation active="home" />
            </main>
        </AuthenticatedLayout>
    );
}

function ProjectSection({ title, projects, accent }) {
    return (
        <section className="space-y-4">
            <div className="flex items-center gap-3">
                <div
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} shadow-inner`}
                    aria-hidden="true"
                >
                    <svg
                        className="h-6 w-6 text-rose-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4 7.5L12 3L20 7.5V16.5L12 21L4 16.5V7.5Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12 21V13"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <h2 className="text-xl font-semibold uppercase tracking-[0.25rem] text-slate-900">
                    {title}
                </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
                {projects.map((project, index) => {
                    const isLast = index === projects.length - 1;
                    const isOddCount = projects.length % 2 === 1;
                    return (
                        <article
                            key={project.id}
                            className={`group flex flex-col overflow-hidden rounded-[20px] bg-white shadow-md shadow-slate-100 transition hover:-translate-y-0.5 hover:shadow-lg ${isLast && isOddCount
                                    ? 'col-span-2 mx-auto'
                                    : ''
                                }`}
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
        </section>
    );
}

