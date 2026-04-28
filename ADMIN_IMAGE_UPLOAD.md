# Admin Product Image Upload System

## Overview
Admins can now upload product images directly through the admin panel. Each product can have multiple images uploaded via Cloudinary (free plan).

**Key Features:**
- ✅ Direct file upload from admin panel
- ✅ Automatic Cloudinary upload
- ✅ Multiple images per product
- ✅ No dummy/placeholder images - only admin-uploaded images
- ✅ Image preview in admin
- ✅ Easy remove functionality
- ✅ Free Cloudinary storage

## Quick Start

### 1. Create Cloudinary Account (FREE)
1. Visit https://cloudinary.com/users/register/free
2. Sign up with email
3. Verify email
4. Go to Cloudinary Dashboard

### 2. Get Cloud Name
1. In your dashboard, find **Cloud Name** at the top
2. Example: `d1234abcd` or `mycompany`

### 3. Update `.env.local`
```bash
# Replace 'demo' with your actual cloud name
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
```

### 4. Create Upload Preset (IMPORTANT!)
This allows admins to upload images without exposing API keys.

**Steps:**
1. Go to Cloudinary Dashboard
2. Click **Settings** (gear icon) → **Upload**
3. Scroll to **Upload presets** section
4. Click **Add upload preset**
5. Fill in:
   - **Name**: `watches_admin`
   - **Signing Mode**: ⭕ **Unsigned** (important!)
   - **Folder**: `watches-products` (optional)
   - **Resource Type**: Image
6. Click **Save**

### 5. Verify Setup
```bash
npm run dev
```

1. Open http://localhost:3000/admin/products
2. Click "New Product" or edit existing
3. Scroll to "Images" section
4. Choose image file and upload
5. Image should appear in list

## How It Works

### Admin Upload Workflow
```
Admin selects file
    ↓
File sent to /api/upload/image
    ↓
API uploads to Cloudinary
    ↓
Cloudinary returns secure URL
    ↓
URL stored in product.images array
    ↓
Product saved to database
    ↓
Images appear on website
```

### File Validation
✅ **Allowed**: JPG, PNG, WebP, GIF, BMP, etc.
✅ **Max Size**: 5MB
✅ **Max per product**: Unlimited

## Using the Admin Panel

### Add Image to Product
1. Go to Admin → Products
2. Click **New Product** or edit existing
3. Scroll down to **Images** section
4. Click file input → select image
5. Wait for upload (shows "Uploading...")
6. Image appears in list when done
7. Click **Save/Update Product**

### Remove Image
1. In Images list
2. Click **Remove** button on unwanted image
3. Click **Save/Update Product**

### Multiple Images
- Add first image → Upload → it appears in list
- Add second image → Upload → both shown
- Repeat for more images
- All images saved with product

## API Details

**Endpoint:** `POST /api/upload/image`

**Request:**
```javascript
const formData = new FormData();
formData.append("file", fileInput.files[0]);

fetch("/api/upload/image", {
  method: "POST",
  body: formData
})
```

**Response:**
```json
{
  "url": "https://res.cloudinary.com/..../image.jpg",
  "publicId": "watches-products/abc123",
  "size": 45230,
  "width": 1000,
  "height": 1000
}
```

**Error Response:**
```json
{
  "error": "File must be an image"
}
```

## Troubleshooting

### "Upload failed" Error
**Check:**
1. ✅ `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` set correctly in `.env.local`
2. ✅ Cloud name matches Cloudinary dashboard
3. ✅ Upload preset `watches_admin` exists
4. ✅ Preset is set to **Unsigned**
5. ✅ Browser console for error details

### Images not uploading
1. Check file size (max 5MB)
2. Verify file is an image
3. Check browser network tab
4. See API error response

### Images not showing on website
1. Verify image URL in product admin
2. Check image exists in Cloudinary
3. Test URL directly in browser
4. Verify product is marked as "Active"

### Slow uploads
- Large images (>2MB) take longer
- Cloudinary auto-compresses
- First upload slower (caching)
- Subsequent requests faster from CDN

## Product with No Images

When products are seeded, they start with **empty image arrays**.
- Add images via admin panel
- Images appear on homepage/listing
- Product details show all images

## Environment Variables

```bash
# Cloudinary cloud name (required)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=demo

# Upload preset name (required)
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=watches_admin
```

Both are public (visible in frontend) - no sensitive data exposed.

## Free Plan Limits

| Feature | Limit |
|---------|-------|
| Monthly Bandwidth | 25 GB |
| Storage | 25 GB |
| Transformations | Unlimited |
| Upload Presets | Unlimited |
| API Rate | Sufficient |

## Best Practices

✅ **Do:**
- Upload at least 1-2 images per product
- Use clear, well-lit product photos
- Keep images under 5MB
- Use consistent image dimensions

❌ **Don't:**
- Upload non-image files
- Exceed 5MB file size
- Use low-quality images
- Delete products with images without backup

## Next Features

Potential enhancements:
- Image cropping/resizing
- Drag-to-reorder images
- Image optimization settings
- Bulk image upload
- CDN caching optimization

## Support

For Cloudinary issues:
- Check Cloudinary Status: https://status.cloudinary.com
- Review API Docs: https://cloudinary.com/documentation
- Contact Support: https://support.cloudinary.com

For app issues:
- Check `/api/upload/image` endpoint
- Review ProductForm component
- Check browser console errors
- Verify environment variables

