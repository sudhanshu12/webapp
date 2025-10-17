'use client';

import { useEffect } from 'react';

interface DynamicFaviconProps {
  businessName: string;
}

export default function DynamicFavicon({ businessName }: DynamicFaviconProps) {
  useEffect(() => {
    if (!businessName || typeof window === 'undefined') return;
    
    try {
      // Generate initials from business name
      const initials = businessName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase())
        .join('')
        .substring(0, 2);
      
      // Create SVG favicon with unique ID to avoid conflicts
      const uniqueId = `grad-${Date.now()}`;
      const svg = `
        <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="${uniqueId}" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="6" fill="url(#${uniqueId})"/>
          <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="12" font-weight="bold" 
                text-anchor="middle" dominant-baseline="central" fill="white">${initials}</text>
        </svg>
      `;
      
      // Convert SVG to data URL
      const dataUrl = `data:image/svg+xml;base64,${btoa(svg)}`;
      
      // Update favicon function
      const updateFavicon = (href: string, sizes?: string) => {
        try {
          let link = document.querySelector(`link[rel="icon"${sizes ? ` sizes="${sizes}"` : ''}]`) as HTMLLinkElement;
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            if (sizes) link.sizes = sizes;
            document.head.appendChild(link);
          }
          link.href = href;
        } catch (error) {
          console.warn('Error updating favicon:', error);
        }
      };
      
      // Update different favicon sizes
      updateFavicon(dataUrl, '16x16');
      updateFavicon(dataUrl, '32x32');
      updateFavicon(dataUrl, '48x48');
      updateFavicon(dataUrl); // Default favicon
      
      // Update apple-touch-icon
      try {
        let appleLink = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;
        if (!appleLink) {
          appleLink = document.createElement('link');
          appleLink.rel = 'apple-touch-icon';
          document.head.appendChild(appleLink);
        }
        appleLink.href = dataUrl;
      } catch (error) {
        console.warn('Error updating apple-touch-icon:', error);
      }
      
    } catch (error) {
      console.error('Error generating dynamic favicon:', error);
    }
    
  }, [businessName]);
  
  return null; // This component doesn't render anything
}
