# Sanity CMS Integration for Excella U Energy Website

## Overview
Your website now integrates with Sanity CMS to manage all content dynamically. This means you can update text, images, and services through the Sanity Studio instead of editing HTML files directly.

## Setup Instructions

### 1. Access Sanity Studio
- Run `cd excellau && npm run dev` in the terminal
- Open your browser to the URL shown in the terminal (usually http://localhost:3333)
- This opens the Sanity Studio where you can manage content

### 2. Create Your First Page
1. In Sanity Studio, click "Page" to create a new page
2. Fill in the following fields for your homepage:

**Basic Info:**
- Admin Title: "Homepage"
- Slug: "home" (this must match your HTML file)

**Hero Section:**
- Hero Title: "Welcome to Excella U Energy Limited"
- Hero Subtitle: "Where Vision Meets Innovation in Oil, Gas, and Maritime Solutions"
- Hero CTA Text: "Learn More"
- Hero CTA URL: "#about" or any URL you want
- Hero Background Image: Upload your hero background image

**About Section:**
- About Title: "About Us"
- About Heading: "Comprehensive Solutions, Tailored for Every Scale"
- About Body: Use the rich text editor to write your about content
- About Image: Upload your about section image

**SEO:**
- SEO Description: Write a description for search engines

### 3. Create Services
1. Click "Service" in Sanity Studio
2. For each service, fill in:
   - Title: Service name
   - Slug: URL-friendly version (auto-generated)
   - Image: Upload service image
   - Description: Service description text
   - Link Text: "Read More" or custom text
   - Link URL: Link to service detail page

### 4. Link Services to Homepage
1. Go back to your Homepage in Sanity Studio
2. In the "Featured Services" section, click "Add item"
3. Select the services you want to display on the homepage
4. Save the page

## Content Fields Available

### Page Schema
- **title**: Admin title for identification
- **slug**: URL slug (must be "home" for homepage)
- **heroTitle**: Main hero headline
- **heroSubtitle**: Hero subtext
- **heroCtaText**: Hero button text
- **heroCtaUrl**: Hero button link
- **heroImage**: Hero background image
- **aboutTitle**: About section title
- **aboutHeading**: About section heading
- **aboutBody**: About section content (rich text)
- **aboutImage**: About section image
- **services**: Array of service references
- **contactTitle**: Contact section title
- **seoDescription**: Meta description for SEO

### Service Schema
- **title**: Service name
- **slug**: URL slug for the service
- **image**: Service image
- **description**: Service description
- **linkText**: Link button text
- **linkUrl**: Link destination

## How It Works

### Data Attributes
Your HTML uses special data attributes that tell the JavaScript which Sanity fields to use:

- `data-sanity-field="fieldName"`: Populates text content
- `data-sanity-pt="fieldName"`: Populates rich text content
- `data-sanity-img="fieldName"`: Populates image sources

### Dynamic Content Loading
When someone visits your website:
1. JavaScript fetches content from Sanity based on the page slug
2. Content is dynamically inserted into HTML elements
3. Images are loaded and optimized
4. Services are rendered from the template

## Updating Content

### Text Changes
1. Open Sanity Studio
2. Navigate to the Page you want to edit
3. Update the relevant fields
4. Click "Publish"
5. Changes appear on your website immediately

### Adding New Services
1. Create a new Service in Sanity Studio
2. Fill in all the fields
3. Publish the service
4. Go to your Page and add the service to the "Featured Services" list
5. Publish the page

### Image Updates
1. In Sanity Studio, click on the image field
2. Upload a new image or select from existing ones
3. Sanity automatically optimizes and serves the image
4. Publish your changes

## File Structure
```
excellau/
├── sanity.config.js       # Sanity configuration
├── schemaTypes/
│   ├── index.js          # Exports all schemas
│   ├── page.js           # Page content schema
│   └── service.js        # Service schema
└── schemas/
    └── schema.js         # Legacy schema file
```

## Troubleshooting

### Common Issues

**1. Content not loading:**
- Check that your page slug matches the slug in Sanity
- Ensure the page is published in Sanity Studio
- Check browser console for JavaScript errors

**2. Images not showing:**
- Verify images are uploaded and published in Sanity
- Check that image fields are not empty
- Ensure proper data attributes in HTML

**3. Services not appearing:**
- Create at least one service in Sanity Studio
- Link services to your page in the "Featured Services" field
- Publish both services and the page

### Development Commands
```bash
# Start Sanity Studio
cd excellau
npm run dev

# Deploy Sanity Studio (when ready)
npm run build
npm run deploy
```

## Next Steps

1. **Create content in Sanity Studio** following the setup instructions above
2. **Test your website** to ensure content loads properly
3. **Add more services** as needed
4. **Customize styling** in the CSS files if needed
5. **Deploy Sanity Studio** when ready for production

## Benefits of This Setup

- ✅ **Content Management**: Easy content updates without touching code
- ✅ **Image Optimization**: Automatic image optimization and CDN delivery
- ✅ **SEO Friendly**: Proper meta tags and structured content
- ✅ **Performance**: Fast loading with CDN and caching
- ✅ **Scalability**: Easy to add new content types and fields
- ✅ **Version Control**: Content versioning and revision history in Sanity

Your website is now powered by a professional CMS that makes content management simple and efficient!
