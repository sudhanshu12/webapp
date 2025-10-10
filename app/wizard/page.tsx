import React from 'react';
import ClientWizard from './wizard-client';
import ConditionalLayout from '../components/conditional-layout';
 
export default function WizardPage(){
	return (
		<ConditionalLayout>
			<ClientWizard />
		</ConditionalLayout>
	);
} 