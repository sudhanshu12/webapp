import React from 'react';
import { Metadata } from 'next';
import ClientWizard from './wizard-client';
import ConditionalLayout from '../components/conditional-layout';

export const metadata: Metadata = {
  title: 'Website Builder Wizard - Create Professional Business Websites',
  description: 'Build your professional business website in minutes with our AI-powered wizard. Customize templates, add content, and launch your site instantly.',
  keywords: 'website builder, business website, AI website generator, professional website, website wizard',
  robots: 'noindex, nofollow',
  openGraph: {
    title: 'Website Builder Wizard - Create Professional Business Websites',
    description: 'Build your professional business website in minutes with our AI-powered wizard. Customize templates, add content, and launch your site instantly.',
    type: 'website',
  },
  twitter: {
    title: 'Website Builder Wizard - Create Professional Business Websites',
    description: 'Build your professional business website in minutes with our AI-powered wizard. Customize templates, add content, and launch your site instantly.',
    card: 'summary_large_image',
  },
};
 
export default function WizardPage(){
	return (
		<ConditionalLayout>
			<ClientWizard />
		</ConditionalLayout>
	);
} 