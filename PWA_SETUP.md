# PWA Setup Guide

Your Laravel application has been configured as a Progressive Web App (PWA). This allows users to install and run your app on mobile devices without the browser header.

## ✅ What's Been Configured

1. **Web App Manifest** (`public/manifest.json`) - Defines app metadata and icons
2. **Service Worker** (`public/sw.js`) - Enables offline functionality and caching
3. **PWA Meta Tags** - Added to `resources/views/app.blade.php`
4. **Routes** - Added routes for manifest and service worker in `routes/web.php`

## 📱 How to Install on Mobile Device

### Step 1: Generate Icons

You need to create app icons. You have two options:

**Option A: Use the Placeholder Generator**
1. Open `http://192.168.0.24:8383/icons/create-placeholder-icons.html` in your browser
2. Click "Download All Icons"
3. Place the downloaded PNG files in `public/icons/` directory

**Option B: Use Your Own Logo**
1. Visit https://www.pwabuilder.com/imageGenerator
2. Upload your logo (at least 512x512px)
3. Download and place icons in `public/icons/` directory

Required icon sizes:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

### Step 2: Start Your Servers

Make sure both servers are running:

```bash
# Terminal 1: Laravel server
php artisan serve --host=0.0.0.0 --port=8383

# Terminal 2: Vite dev server
npm run dev
```

### Step 3: Access from Mobile Device

1. On your mobile device, open a browser (Chrome/Safari)
2. Navigate to: `http://192.168.0.24:8383`
3. You should see the app load normally

### Step 4: Install the PWA

**On Android (Chrome):**
1. Look for the "Add to Home Screen" banner that appears
2. Or tap the menu (3 dots) → "Add to Home Screen" or "Install App"
3. Confirm the installation

**On iOS (Safari):**
1. Tap the Share button (square with arrow)
2. Scroll down and tap "Add to Home Screen"
3. Customize the name if needed
4. Tap "Add"

### Step 5: Launch the Installed App

1. Find the app icon on your home screen
2. Tap to launch
3. The app will open in standalone mode (no browser header)

## 🔧 Configuration

### Update App Name/Theme

Edit `public/manifest.json`:
- `name`: Full app name
- `short_name`: Short name for home screen
- `theme_color`: Status bar color (matches your brand color #d81e43)
- `background_color`: Splash screen background

### Update Service Worker Cache

When you update your app, change the cache version in `public/sw.js`:
```javascript
const CACHE_NAME = 'owner-ui-v2'; // Increment version number
```

This forces all users to get the latest version.

## ⚠️ Important Notes

1. **HTTPS Required for Production**: PWAs require HTTPS in production (localhost is exempt)
2. **Network Access**: Ensure your mobile device is on the same network as your development machine
3. **Firewall**: Make sure Windows Firewall allows connections on ports 8383 and 5173
4. **Icons**: The app will work without icons, but they're recommended for the best experience

## 🐛 Troubleshooting

**App doesn't install:**
- Check browser console for errors
- Verify manifest.json is accessible: `http://192.168.0.24:8383/manifest.json`
- Verify service worker is accessible: `http://192.168.0.24:8383/sw.js`
- Clear browser cache and try again

**Service Worker not registering:**
- Check browser console for registration errors
- Ensure you're accessing via the network IP, not localhost
- Try in an incognito/private window

**Icons not showing:**
- Verify all icon files exist in `public/icons/`
- Check file permissions
- Clear browser cache

## 📚 Additional Resources

- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [PWA Builder](https://www.pwabuilder.com/)
- [Web.dev: PWA](https://web.dev/progressive-web-apps/)

