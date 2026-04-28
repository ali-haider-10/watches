# Cloudinary Integration Setup

## Overview
This project now uses **Cloudinary's free plan** to serve and optimize all product images. The free plan includes:
- ✅ Fetch API - serve external URLs with optimization
- ✅ Auto format conversion & compression
- ✅ Responsive image delivery
- ✅ 25 GB monthly storage & bandwidth (free tier)
- ✅ No watermarks

## Current Implementation

### Image URL Format
All images are now served through Cloudinary using the **fetch API**:
```
https://res.cloudinary.com/{CLOUD_NAME}/image/fetch/w_1000,q_auto,f_auto/{EXTERNAL_URL}
```

**Parameters:**
- `w_1000` - Resize to 1000px width
- `q_auto` - Auto optimize quality (Cloudinary detects best quality)
- `f_auto` - Auto select best format (WebP, AVIF, etc.)

### Seed Configuration
The file `scripts/seed-products.ts` reads from environment variable:
```javascript
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";
```

## Setup Instructions

### 1. Create Cloudinary Account (Free)
1. Go to https://cloudinary.com/users/register/free
2. Sign up with email
3. Verify your account
4. Go to your **Dashboard**

### 2. Get Your Cloud Name
1. In Cloudinary Dashboard, look for **"Cloud Name"** (usually at top of page)
2. It looks like: `d1234abcd` or `mycompany`

### 3. Update Environment Variable
Update `.env.local`:
```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
```

Replace `your_cloud_name_here` with your actual cloud name from step 2.

### 4. Reseed Database
Run the seed script to apply Cloudinary URLs:
```bash
npm run seed
```

## Testing

### Check Images in Browser
1. Start dev server: `npm run dev`
2. Visit http://localhost:3000
3. Open DevTools → Network tab
4. Load a product page
5. Image URLs should show: `https://res.cloudinary.com/{your_cloud_name}/image/fetch/...`

### Verify Optimization
Click any image URL → you should see:
- Smaller file size (auto-optimized)
- Responsive delivery based on device
- WebP format (if browser supports it)

## How It Works

### Fetch API
Cloudinary's fetch API:
1. Accepts external URL (e.g., Unsplash images)
2. Downloads & caches it
3. Optimizes on-the-fly
4. Serves globally via CDN

### Free Plan Limits
- **25 GB/month** bandwidth (plenty for most sites)
- **Storage:** Limited to images you actively serve
- **API calls:** Sufficient for typical ecommerce use

### Benefits Over Direct URLs
| Feature | Direct URL | Cloudinary Fetch |
|---------|-----------|------------------|
| CDN Delivery | ❌ | ✅ |
| Format Optimization | ❌ | ✅ |
| Compression | ❌ | ✅ |
| Responsive Images | ❌ | ✅ |
| Caching | Limited | ✅ Fast |

## Troubleshooting

### Images Not Loading
1. Check `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` in `.env.local`
2. Verify cloud name matches Cloudinary dashboard
3. Check browser console for 404 errors
4. Test URL directly: `https://res.cloudinary.com/demo/image/fetch/w_100,q_auto,f_auto/{source_url}`

### Slow Images
- Cloudinary caches images automatically
- First request may take 1-2 seconds (normal)
- Subsequent requests are instant from CDN

### Over Bandwidth
- Free plan: 25 GB/month
- Monitor in Cloudinary Dashboard → Usage → Bandwidth
- Can upgrade to paid plan anytime

## Advanced Configuration

### Custom Transformations
You can add more transforms in `seed-products.ts`:
```javascript
// Add blur, brightness, effects, etc.
`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/w_1000,q_auto,f_auto,e_blur:300/${unsplashUrl}`
```

### Responsive Images
For different screen sizes, use:
```javascript
// Mobile
`https://res.cloudinary.com/.../.../w_400,q_auto,f_auto/...`
// Tablet  
`https://res.cloudinary.com/.../.../w_700,q_auto,f_auto/...`
// Desktop
`https://res.cloudinary.com/.../.../w_1000,q_auto,f_auto/...`
```

## Next.js Image Component
For future optimization, consider using `next/image`:
```javascript
import Image from 'next/image';

<Image
  src="https://res.cloudinary.com/..."
  width={1000}
  height={1000}
  alt="Product"
/>
```

## Resources
- Cloudinary Docs: https://cloudinary.com/documentation
- Fetch API Guide: https://cloudinary.com/documentation/fetch_api
- Free Plan Details: https://cloudinary.com/pricing
- URL Builder: https://cloudinary.com/tools/url-builder

## Support
For issues with:
- **Images not loading:** Check Cloudinary dashboard quota
- **URL format:** Review fetch API documentation
- **Performance:** Monitor usage in Cloudinary dashboard
