// Utility function to get business settings for favicon generation
export function getBusinessSettings() {
  // This would typically fetch from your database or settings store
  // For now, we'll return a default structure
  return {
    business_name: 'Business',
    business_type: 'Services',
    location: 'Local Area'
  };
}

// Generate favicon URL based on business name
export function generateFaviconUrl(businessName: string, size: number = 32): string {
  const initials = businessName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
  
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.4}" font-weight="bold" 
            text-anchor="middle" dominant-baseline="central" fill="white">${initials}</text>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
