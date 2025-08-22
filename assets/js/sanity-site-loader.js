// Reusable site settings loader for all pages
// Include this script on every page to load header and footer content from Sanity

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', async function() {
  try {
    // Import createClient dynamically
    const { createClient } = await import("https://esm.sh/@sanity/client@6");
    
    const client = createClient({
      projectId: "r74j65mx",
      dataset: "production",
      apiVersion: "2025-08-22",
      useCdn: true,
      perspective: "published"
    });

    // Load site settings
    async function loadSiteSettings() {
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
        const result = await client.fetch(query);
        console.log('Site settings loaded:', result);
        return result;
      } catch (error) {
        console.error('Error fetching site settings:', error);
        return null;
      }
    }

    // Apply site settings to page
    function applySiteSettings(settings) {
      if (!settings) {
        console.log('No site settings available');
        return;
      }

      // Apply header content
      if (settings.header) {
        const { header } = settings;

        // Update logo (canonical: data-site="logo")
        if (header.logoUrl) {
          const logoImgs = document.querySelectorAll('[data-site="logo"]');
          logoImgs.forEach(img => {
            if (img.tagName === 'IMG') {
              img.src = header.logoUrl;
              img.alt = header.companyName || 'Company Logo';
            } else {
              // If it's a container, find the img inside
              const imgTag = img.querySelector('img');
              if (imgTag) {
                imgTag.src = header.logoUrl;
                imgTag.alt = header.companyName || 'Company Logo';
              }
            }
          });
        }

        // Update company name (canonical: data-site="companyName")
        if (header.companyName) {
          const companyNames = document.querySelectorAll('[data-site="companyName"]');
          companyNames.forEach(el => {
            el.textContent = header.companyName;
          });
        }

        // Update phone number (canonical: data-site="phone")
        if (header.phone) {
          const phoneElements = document.querySelectorAll('[data-site="phone"]');
          phoneElements.forEach(el => {
            el.textContent = header.phone;
          });
        }

        // Update email (canonical: data-site="email")
        if (header.email) {
          const emailElements = document.querySelectorAll('[data-site="email"]');
          emailElements.forEach(el => {
            el.textContent = header.email;
          });
        }

        // Update navigation (canonical: data-site="navigation")
        if (header.navigation && header.navigation.length > 0) {
          const navElements = document.querySelectorAll('[data-site="navigation"]');
          navElements.forEach(nav => {
            const navItems = header.navigation.map(item => 
              `<li${item.isActive ? ' class="active"' : ''}><a href="${item.url}">${item.title}</a></li>`
            ).join('');
            nav.innerHTML = navItems;
          });
        }
      }

      // Apply footer content
      if (settings.footer) {
        const { footer } = settings;

        // Update contact emails (canonical: data-site="emails")
        if (footer.contactInfo?.emails) {
          const emailContainers = document.querySelectorAll('[data-site="emails"]');
          emailContainers.forEach(container => {
            const emailItems = footer.contactInfo.emails.map(email => 
              `<p class="mb-2 btn-light-white"><i class="fa fa-envelope me-3"></i> ${email}</p>`
            ).join('');
            container.innerHTML = emailItems;
          });
        }

        // Update contact phones (canonical: data-site="phones")
        if (footer.contactInfo?.phones) {
          const phoneContainers = document.querySelectorAll('[data-site="phones"]');
          phoneContainers.forEach(container => {
            const phoneItems = footer.contactInfo.phones.map(phone => 
              `<p class="mb-2 btn-light-white"><i class="fa fa-phone me-3"></i> ${phone}</p>`
            ).join('');
            container.innerHTML = phoneItems;
          });
        }

        // Update address (canonical: data-site="address")
        if (footer.contactInfo?.address) {
          const addressElements = document.querySelectorAll('[data-site="address"]');
          addressElements.forEach(el => {
            const icon = el.querySelector('i');
            if (icon) {
              el.innerHTML = `<i class="${icon.className}"></i> ${footer.contactInfo.address}`;
            } else {
              el.textContent = footer.contactInfo.address;
            }
          });
        }

        // Update footer navigation (canonical: data-site="footerNavigation")
        if (footer.navigationLinks) {
          const footerNavs = document.querySelectorAll('[data-site="footerNavigation"]');
          footerNavs.forEach(nav => {
            const navItems = footer.navigationLinks.map(link => 
              `<a class="btn1 btn-link" href="${link.url}">${link.title}</a>`
            ).join('');
            nav.innerHTML = navItems;
          });
        }

        // Update social media (canonical: data-site="socialMedia")
        if (footer.socialMedia) {
          const socialContainers = document.querySelectorAll('[data-site="socialMedia"]');
          socialContainers.forEach(container => {
            const socialItems = footer.socialMedia.map(social => {
              const iconClass = getIconClass(social.platform);
              return `<a class="btn1 btn-square btn-primary rounded-circle me-2" href="${social.url}"><i class="${iconClass}"></i></a>`;
            }).join('');
            container.innerHTML = socialItems;
          });
        }

        // Update copyright (canonical: data-site="copyright")
        if (footer.copyrightText) {
          const copyrightElements = document.querySelectorAll('[data-site="copyright"]');
          copyrightElements.forEach(el => {
            el.textContent = footer.copyrightText;
          });
        }
      }

      // Apply SEO settings
      if (settings.seo) {
        if (settings.seo.faviconUrl) {
          const favicon = document.querySelector('link[rel="shortcut icon"]');
          if (favicon) {
            favicon.href = settings.seo.faviconUrl;
          }
        }

        if (settings.seo.defaultDescription) {
          const metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) {
            metaDesc.content = settings.seo.defaultDescription;
          }
        }
      }
    }

    // Helper function to get icon class for social media platforms
    function getIconClass(platform) {
      const iconMap = {
        'facebook': 'fab fa-facebook-f',
        'twitter': 'fab fa-twitter',
        'linkedin': 'fab fa-linkedin-in',
        'instagram': 'fab fa-instagram',
        'youtube': 'fab fa-youtube',
        'whatsapp': 'fab fa-whatsapp'
      };
      return iconMap[platform?.toLowerCase()] || 'fas fa-link';
    }

    // Load and apply site settings
    const settings = await loadSiteSettings();
    if (settings) {
      applySiteSettings(settings);
      console.log('✅ Site settings applied successfully');
    } else {
      console.log('❌ No site settings found - please create Site Settings in Sanity Studio');
    }

    // Export functions for debugging
    window.SanityHelpers = {
      loadSiteSettings,
      applySiteSettings,
      client
    };

  } catch (error) {
    console.error('❌ Error loading Sanity integration:', error);
  }
});
