// Site-wide content loader for header and footer
import {createClient} from "https://esm.sh/@sanity/client@6";

const client = createClient({
  projectId: "r74j65mx",
  dataset: "production",
  apiVersion: "2025-08-22",
  useCdn: true,
  perspective: "published"
});

// Global site settings loader
export async function loadSiteSettings() {
  const query = `*[_type=="siteSettings"][0]{
    title,
    header{
      "logoUrl": logo.asset->url,
      companyName,
      phone,
      email,
      navigation[]{
        title,
        url,
        isActive
      }
    },
    footer{
      contactInfo{
        emails,
        phones,
        address
      },
      navigationLinks[]{
        title,
        url
      },
      socialMedia[]{
        platform,
        url
      },
      copyrightText
    },
    seo{
      defaultTitle,
      defaultDescription,
      "faviconUrl": favicon.asset->url
    }
  }`;

  try {
    return await client.fetch(query);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

// Apply header content
export function applyHeaderContent(settings) {
  if (!settings?.header) return;

  const { header } = settings;

  // Update logo
  if (header.logoUrl) {
    document.querySelectorAll('[data-site="logo"]').forEach(img => {
      img.src = header.logoUrl;
      img.alt = header.companyName || 'Company Logo';
    });
  }

  // Update company name
  if (header.companyName) {
    document.querySelectorAll('[data-site="companyName"]').forEach(el => {
      el.textContent = header.companyName;
    });
  }

  // Update phone number
  if (header.phone) {
    document.querySelectorAll('[data-site="phone"]').forEach(el => {
      el.textContent = header.phone;
      if (el.tagName === 'A') {
        el.href = `tel:${header.phone}`;
      }
    });
  }

  // Update email
  if (header.email) {
    document.querySelectorAll('[data-site="email"]').forEach(el => {
      el.textContent = header.email;
      if (el.tagName === 'A') {
        el.href = `mailto:${header.email}`;
      }
    });
  }

  // Update navigation
  if (header.navigation && header.navigation.length > 0) {
    const navContainer = document.querySelector('[data-site="navigation"]');
    if (navContainer) {
      navContainer.innerHTML = '';
      header.navigation.forEach(item => {
        const li = document.createElement('li');
        if (item.isActive) li.classList.add('active');
        
        const a = document.createElement('a');
        a.href = item.url;
        a.textContent = item.title;
        
        li.appendChild(a);
        navContainer.appendChild(li);
      });
    }
  }
}

// Apply footer content
export function applyFooterContent(settings) {
  if (!settings?.footer) return;

  const { footer } = settings;

  // Update contact emails
  if (footer.contactInfo?.emails) {
    const emailContainer = document.querySelector('[data-site="emails"]');
    if (emailContainer) {
      emailContainer.innerHTML = '';
      footer.contactInfo.emails.forEach(email => {
        const p = document.createElement('p');
        p.className = 'mb-2 btn-light-white';
        p.innerHTML = `<i class="fa fa-envelope me-3"></i> ${email}`;
        emailContainer.appendChild(p);
      });
    }
  }

  // Update contact phones
  if (footer.contactInfo?.phones) {
    const phoneContainer = document.querySelector('[data-site="phones"]');
    if (phoneContainer) {
      phoneContainer.innerHTML = '';
      footer.contactInfo.phones.forEach(phone => {
        const p = document.createElement('p');
        p.className = 'mb-2 btn-light-white';
        p.innerHTML = `<i class="fa fa-phone me-3"></i> ${phone}`;
        phoneContainer.appendChild(p);
      });
    }
  }

  // Update address
  if (footer.contactInfo?.address) {
    document.querySelectorAll('[data-site="address"]').forEach(el => {
      el.innerHTML = `<i class="fa fa-map-marker-alt me-3"></i> ${footer.contactInfo.address}`;
    });
  }

  // Update footer navigation
  if (footer.navigationLinks) {
    const footerNavContainer = document.querySelector('[data-site="footerNavigation"]');
    if (footerNavContainer) {
      footerNavContainer.innerHTML = '';
      footer.navigationLinks.forEach(link => {
        const a = document.createElement('a');
        a.className = 'btn1 btn-link';
        a.href = link.url;
        a.textContent = link.title;
        footerNavContainer.appendChild(a);
      });
    }
  }

  // Update social media links
  if (footer.socialMedia) {
    const socialContainer = document.querySelector('[data-site="socialMedia"]');
    if (socialContainer) {
      socialContainer.innerHTML = '';
      footer.socialMedia.forEach(social => {
        const iconMap = {
          facebook: 'fab fa-facebook-f',
          twitter: 'fab fa-twitter',
          linkedin: 'fab fa-linkedin-in',
          youtube: 'fab fa-youtube',
          instagram: 'fab fa-instagram'
        };
        
        const a = document.createElement('a');
        a.className = 'btn1 btn-square btn-primary rounded-circle me-2';
        a.href = social.url;
        a.target = '_blank';
        a.innerHTML = `<i class="${iconMap[social.platform] || 'fab fa-globe'}"></i>`;
        socialContainer.appendChild(a);
      });
    }
  }

  // Update copyright
  if (footer.copyrightText) {
    document.querySelectorAll('[data-site="copyright"]').forEach(el => {
      el.textContent = footer.copyrightText;
    });
  }
}

// Apply SEO settings
export function applySEOSettings(settings) {
  if (!settings?.seo) return;

  const { seo } = settings;

  // Update favicon
  if (seo.faviconUrl) {
    let favicon = document.querySelector('link[rel="shortcut icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.rel = 'shortcut icon';
      favicon.type = 'image/x-icon';
      document.head.appendChild(favicon);
    }
    favicon.href = seo.faviconUrl;
  }

  // Update default title if no specific title is set
  if (seo.defaultTitle && document.title === 'Excella Home') {
    document.title = seo.defaultTitle;
  }

  // Update default meta description if no specific description is set
  if (seo.defaultDescription) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc || metaDesc.content === '') {
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = seo.defaultDescription;
    }
  }
}

// Main function to load and apply all site settings
export async function initializeSiteContent() {
  const settings = await loadSiteSettings();
  if (settings) {
    applyHeaderContent(settings);
    applyFooterContent(settings);
    applySEOSettings(settings);
    console.log('Site settings loaded:', settings);
  }
}
