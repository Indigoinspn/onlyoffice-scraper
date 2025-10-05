module.exports = {
  // Containers
  OFFICE_CONTAINER: '.flex-bl-wr-sb > div[itemtype="https://schema.org/PostalAddress"]',

  // Office contact information
  LOCALITY: '[itemprop*="addressLocality"]',
  COMPANY_NAME: '[itemtype="https://schema.org/PostalAddress"] b',
  STREET: '[itemprop="streetAddress"]',
  COUNTRY: '[itemprop="addressCountry"]',
  POSTAL_CODE: '[itemprop="postalCode"]',
  PHONE: '[itemprop="telephone"] a',

  // Navigation selectors
  RESOURCES_LINK: '#navitem_about',
  RESOURCES_MENU: '#navitem_about_menu',
  CONTACTS_LINK: '#navitem_about_contacts',
};
