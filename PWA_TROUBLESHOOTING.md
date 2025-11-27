# PWA Troubleshooting Guide

## ✅ Issues Fixed

1. **Icon Filenames**: Updated manifest.json to match your actual icon filenames (`android-launchericon-*`)
2. **Manifest Scope**: Added `scope` field to ensure standalone mode works
3. **Content Type**: Set proper content type for manifest.json
4. **Meta Tags**: Enhanced PWA meta tags for better compatibility

## 🔄 How to Fix Your Installed PWA

Since you've already installed the PWA, you need to **uninstall and reinstall** it for the changes to take effect:

### On Android (Chrome):
1. Long-press the app icon on your home screen
2. Tap "Uninstall" or "Remove"
3. Or go to Settings → Apps → Owner UI → Uninstall

### On iOS (Safari):
1. Long-press the app icon
2. Tap "Remove App" → "Delete App"

### Then Reinstall:
1. Open your browser and go to `http://192.168.0.24:8383`
2. Clear browser cache (optional but recommended):
   - Chrome: Settings → Privacy → Clear browsing data
   - Safari: Settings → Safari → Clear History and Website Data
3. Install again using the same method as before

## 🔍 Verify PWA Configuration

### Test Manifest:
Visit: `http://192.168.0.24:8383/manifest.json`
- Should show JSON with your app details
- Check that icons array matches your files

### Test Service Worker:
Visit: `http://192.168.0.24:8383/sw.js`
- Should show JavaScript code
- Check browser console for registration messages

### Test Icons:
Visit each icon URL directly:
- `http://192.168.0.24:8383/icons/android-launchericon-192-192.png`
- `http://192.168.0.24:8383/icons/android-launchericon-512-512.png`
- All should load without 404 errors

## 📱 Browser-Specific Notes

### Chrome (Android):
- Requires HTTPS in production (localhost/network IP works for development)
- Standalone mode should work after reinstall
- Check: Chrome → Menu → "Add to Home Screen"

### Safari (iOS):
- Requires iOS 11.3+
- Standalone mode works with `apple-mobile-web-app-capable` meta tag
- Check: Share button → "Add to Home Screen"

## 🐛 Common Issues

### Browser UI Still Shows:
1. **Uninstall and reinstall** the PWA (most common fix)
2. Clear browser cache
3. Verify manifest.json has `"display": "standalone"`
4. Check that manifest.json is accessible and valid JSON
5. Ensure you're accessing via the installed app icon, not browser

### Icons Not Showing:
1. Verify icon files exist in `public/icons/`
2. Check manifest.json icon paths match actual filenames
3. Clear browser cache
4. Reinstall the PWA

### Service Worker Not Working:
1. Check browser console for errors
2. Verify `/sw.js` is accessible
3. Check service worker registration in browser DevTools:
   - Chrome: DevTools → Application → Service Workers
   - Safari: Develop → Service Workers

## ✅ Verification Checklist

After reinstalling, verify:
- [ ] App opens without browser address bar
- [ ] App opens without browser navigation buttons
- [ ] Custom icon appears on home screen
- [ ] App name shows correctly
- [ ] Service worker is registered (check DevTools)
- [ ] Manifest is valid (check DevTools → Application → Manifest)

## 🔄 After Making Changes

Whenever you update:
- `manifest.json` → Uninstall and reinstall PWA
- `sw.js` → Update cache version number, then uninstall/reinstall
- Icons → Uninstall and reinstall PWA

## 📞 Still Having Issues?

1. Check browser console for errors
2. Verify all files are accessible via direct URLs
3. Test in a different browser
4. Try incognito/private mode
5. Check that both servers are running (Laravel + Vite)

