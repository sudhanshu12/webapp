// Function to get business settings from the wizard/database
export async function getBusinessSettings() {
  try {
    // This would typically fetch from your database
    // For now, we'll return default settings
    return {
      business_name: 'Create A Website Click',
      business_type: 'Web Development',
      location: 'Global'
    };
  } catch (error) {
    console.error('Error fetching business settings:', error);
    return {
      business_name: 'Business',
      business_type: 'Services',
      location: 'Local Area'
    };
  }
}
