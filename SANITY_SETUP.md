# Sanity CMS Integration for Excella U Energy Website

## Overview
Your website now integrates with Sanity CMS to manage all content dynamically, including site-wide settings for header and footer content. This means you can update text, images, services, navigation, and contact information through the Sanity Studio instead of editing HTML files directly.

## Setup Instructions

### 1. Access Sanity Studio
- Your deployed studio: https://excellauenergy.sanity.studio/
- Local development: Run `cd excellau && npm run dev` then open http://localhost:3333

### 2. Create Site Settings (IMPORTANT - Do This First!)
1. In Sanity Studio, click "Site Settings" to create site-wide configuration
2. Fill in the following sections:

**Basic Info:**
- Site Title: "Excella U Energy Limited"

**Header Section:**
- Company Logo: Upload your logo image
- Company Name: "Excella U Energy"
- Phone Number: "+2348037091874"
- Email Address: "info@excellauenergy.com"
- Navigation Menu: Add menu items (Home, About us, Services, Contact us, etc.)

**Footer Section:**
- Contact Information:
  - Email Addresses: Add multiple email addresses
  - Phone Numbers: Add multiple phone numbers  
  - Physical Address: Your company address
- Footer Navigation: Links for footer menu
- Social Media Links: Add Facebook, LinkedIn, etc.
- Copyright Text: "Copyright ©2025 All rights reserved"

**SEO Settings:**
- Default Page Title: "Excella U Energy Limited"
- Default Meta Description: Your company description
- Favicon: Upload your favicon image

### 3. Create Your Homepage
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

### 4. Create Services
1. Click "Service" in Sanity Studio
2. For each service, fill in:
   - Title: Service name
   - Slug: URL-friendly version (auto-generated)
   - Image: Upload service image
   - Description: Service description text
   - Link Text: "Read More" or custom text
   - Link URL: Link to service detail page

### 5. Link Services to Homepage
1. Go back to your Homepage in Sanity Studio
2. In the "Featured Services" section, click "Add item"
3. Select the services you want to display on the homepage
4. Save the page

## Content Management Features

### Site-Wide Content (Header & Footer)
All pages now automatically load content from your Site Settings:

**Header Content:**
- Company logo and name
- Contact phone and email
- Navigation menu
- All manageable from one place in Sanity

**Footer Content:**
- Contact information (emails, phones, address)
- Footer navigation links
- Social media links
- Copyright text

### Page-Specific Content
Each page can have its own:
- Hero section content
- About section content
- Featured services
- SEO settings

## Adding Sanity to Other Pages

To add header and footer management to other pages:

1. **Add the data attributes to HTML elements:**

```html
<!-- Header -->
<img data-site="logo" src="assets/img/logo/excella.png" alt="">
<span data-site="companyName">Company Name</span>
<span data-site="phone">Phone Number</span>
<span data-site="email">Email Address</span>
<ul data-site="navigation"><!-- Navigation items --></ul>

<!-- Footer -->
<div data-site="emails"><!-- Email addresses --></div>
<div data-site="phones"><!-- Phone numbers --></div>
<p data-site="address"><!-- Address --></p>
<div data-site="footerNavigation"><!-- Footer links --></div>
<div data-site="socialMedia"><!-- Social media links --></div>
<p data-site="copyright"><!-- Copyright text --></p>
```

2. **Include the site loader script:**

```html
<script type="module" src="./assets/js/sanity-site-loader.js"></script>
```

This will automatically load and apply all header and footer content from Sanity.

## Integration Status

✅ **Complete Integration**: All HTML pages now have Sanity CMS integration for site-wide header and footer content:

### Pages with Full Integration:
- `index.html` - Homepage (page content + site settings)
- `about.html` - About page (site settings)
- `services.html` - Services page (site settings)  
- `contact.html` - Contact page (site settings)
- `oil.html` - Oil & Gas service page (site settings)
- `oilfield.html` - Oil Field Engineering page (site settings)
- `maritime.html` - Maritime services page (site settings)
- `international.html` - International trading page (site settings)
- `exploration.html` - Exploration page (site settings)
- `commodity.html` - Commodity trading page (site settings)
- `hse.html` - Health, Safety & Environment page (site settings)
- `team.html` + `team1.html` through `team8.html` - Team pages (site settings)

All pages will automatically load and display:
- Company logo and name from Sanity
- Header phone number and email  
- Navigation menu items
- Footer contact information (emails, phones, address)
- Footer navigation links
- Copyright text
- Social media links (when configured)

## Content Fields Available

### Site Settings Schema
- **header**: Logo, company name, contact info, navigation
- **footer**: Contact details, navigation, social media, copyright
- **seo**: Default title, description, favicon

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

### Site-Wide Loading
When any page loads:
1. JavaScript fetches site settings from Sanity
2. Header and footer content is automatically populated
3. Navigation, contact info, and social links are updated
4. SEO settings are applied

### Page-Specific Loading
For pages with specific content (like homepage):
1. Page-specific content is fetched based on the page slug
2. Dynamic content is inserted into designated elements
3. Services are rendered from templates

## Updating Content

### Site-Wide Changes (Header/Footer)
1. Open Sanity Studio
2. Navigate to "Site Settings"
3. Update any header or footer information
4. Click "Publish"
5. Changes appear on ALL pages immediately

### Page-Specific Changes
1. Open Sanity Studio
2. Navigate to the specific Page
3. Update the relevant fields
4. Click "Publish"
5. Changes appear on that specific page

### Adding New Services
1. Create a new Service in Sanity Studio
2. Fill in all the fields and publish
3. Go to your Page and add the service to "Featured Services"
4. Publish the page

## File Structure
```
excellau/
├── sanity.config.js           # Sanity configuration
├── schemaTypes/
│   ├── index.js              # Exports all schemas
│   ├── page.js               # Page content schema
│   ├── service.js            # Service schema
│   └── siteSettings.js       # Site-wide settings schema
└── schemas/
    └── schema.js             # Legacy schema file

assets/js/
├── sanity-site-loader.js     # Reusable site settings loader
└── site-settings.js          # Deprecated - functionality moved to pages
```

## Benefits of This Setup

- ✅ **Centralized Management**: Update header/footer content once, affects all pages
- ✅ **Content Management**: Easy content updates without touching code
- ✅ **Image Optimization**: Automatic image optimization and CDN delivery
- ✅ **SEO Friendly**: Proper meta tags and structured content
- ✅ **Performance**: Fast loading with CDN and caching
- ✅ **Scalability**: Easy to add new content types and fields
- ✅ **Consistency**: Ensures consistent branding across all pages
- ✅ **Version Control**: Content versioning and revision history in Sanity

Your website is now powered by a professional CMS with centralized site management!
