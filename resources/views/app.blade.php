<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- PWA Meta Tags -->
        <meta name="description" content="Owner Management Application">
        <meta name="theme-color" content="#d81e43">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="apple-mobile-web-app-title" content="Owner UI">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="application-name" content="Owner UI">
        <meta name="msapplication-TileColor" content="#d81e43">
        <meta name="msapplication-tap-highlight" content="no">
        
        <!-- Apple Touch Icons -->
        <link rel="apple-touch-icon" href="/icons/android-launchericon-192-192.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/icons/android-launchericon-144-144.png">
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/android-launchericon-192-192.png">
        <link rel="apple-touch-icon" sizes="512x512" href="/icons/android-launchericon-512-512.png">
        
        <!-- Manifest -->
        <link rel="manifest" href="/manifest.json">

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia

        <!-- Service Worker Registration -->
        <script>
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js')
                        .then((registration) => {
                            console.log('SW registered: ', registration);
                        })
                        .catch((registrationError) => {
                            console.log('SW registration failed: ', registrationError);
                        });
                });
            }
        </script>
    </body>
</html>
