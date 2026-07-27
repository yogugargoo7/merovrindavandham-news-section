# Mero Vrindavan Dham - Deployment Notes

## Local check
```bash
npm install
npm run build
npm run preview
```

## Vercel
- Import the project
- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`

## Hostinger / cPanel Static Upload
```bash
npm install
npm run build
```
Upload everything inside the `dist` folder to `public_html`.

## Before going live
- Verify brochure opens correctly
- Verify WhatsApp number and message
- Verify all social links
- Verify hero video loads on mobile and desktop
- Verify inquiry form opens WhatsApp with filled details
