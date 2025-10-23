jQuery(document).ready(function($) {
    'use strict';
    
    // Helper nonces and robust AJAX URL
    const wpNonce = function(){ return (typeof bsgAdmin !== 'undefined' && bsgAdmin.nonce) ? bsgAdmin.nonce : ''; };
    const aiNonce = function(){
        const el = document.querySelector('#bsg-settings-form input[name="bsg_ai_nonce"]');
        return (el && el.value) ? el.value : wpNonce();
    };
    const ajaxURL = (typeof bsgAdmin !== 'undefined' && bsgAdmin.ajaxUrl) ? bsgAdmin.ajaxUrl : (typeof window.ajaxurl !== 'undefined' ? window.ajaxurl : '/wp-admin/admin-ajax.php');
    
    // Initialize color pickers
    if (typeof $.fn.wpColorPicker !== 'undefined') {
        $('.color-picker').wpColorPicker();
    }
    
    // Service counter for dynamic IDs
    let serviceCounter = 0;
    let locationCounter = $('.bsg-location-item').length;
    
    // FAQ counter for dynamic IDs
    let faqCounter = window.faqCounter || 0;

    // Initialize the admin interface
    initAdminInterface();
    
    function initAdminInterface() {
        // Load existing settings first
        loadExistingSettings();
        
        // WP media uploader for any .bsg-upload-image button
        $(document).on('click', '.bsg-upload-image', function(e) {
            e.preventDefault();
            const targetSelector = $(this).data('target');
            const $target = targetSelector ? $(targetSelector) : $(this).prev('input[type="text"]');
            let frame = wp.media({
                title: 'Select or Upload Image',
                button: { text: 'Use this image' },
                multiple: false
            });
            frame.on('select', function() {
                const attachment = frame.state().get('selection').first().toJSON();
                if ($target && $target.length) {
                    $target.val(attachment.url).trigger('change');
                }
                // If an about preview exists, update it
                const $preview = $('#about-image-preview');
                if ($preview.length) {
                    $preview.html('<img src="' + attachment.url + '" style="max-width:100%; max-height:100%; object-fit:cover; display:block;"/>');
                }
            });
            frame.open();
        });
        
        // Business type change handler
        $('#business_type').on('change', function() {
            const businessType = $(this).val();
            loadBusinessTypeTemplate(businessType);
        });
        
        // Add service button
        $('#add-service').on('click', function() {
            addServiceItem();
        });
        
        // Add location button
        $('#add-location').on('click', function() {
            addLocationItem();
        });
        
        // Remove service/location handlers (delegated)
        $(document).on('click', '.remove-service', function() {
            $(this).closest('.service-item').remove();
            updateServiceNumbers();
        });
        
        $(document).on('click', '.remove-location', function() {
            $(this).closest('.location-item').remove();
            updateLocationNumbers();
        });
        
        // Generate website button
        $('#generate-website').on('click', function(e) {
            e.preventDefault();
            
            var button = $(this);
            var originalText = button.text();
            
            button.prop('disabled', true).text(bsgAdmin.strings.generating);
            
            var formData = $('#bsg-settings-form').serialize();
            
            $.ajax({
                url: ajaxURL,
                type: 'POST',
                data: {
                    action: 'bsg_generate_website',
                    nonce: bsgAdmin.nonce,
                    settings: formData
                },
                success: function(response) {
                    if (response.success) {
                        alert(bsgAdmin.strings.success);
                        if (response.data.url) {
                            window.open(response.data.url, '_blank');
                        }
                    } else {
                        alert(bsgAdmin.strings.error);
                    }
                },
                error: function() {
                    alert(bsgAdmin.strings.error);
                },
                complete: function() {
                    button.prop('disabled', false).text(originalText);
                }
            });
        });
        
        // Auto-save settings on form changes
        setupAutoSave();
        
        // Live preview updates
        setupLivePreview();
        
        // Add feature button
        $('#add-feature').on('click', function() {
            addFeatureItem();
        });
        
        // Remove feature handler (delegated)
        $(document).on('click', '.remove-feature', function() {
            $(this).closest('.feature-item').remove();
            updateFeatureNumbers();
        });
        
        // Add service area (state) button
        $('#add-service-area').on('click', function() {
            addServiceAreaItem();
        });
        
        // Remove service area handler (delegated)
        $(document).on('click', '.remove-service-area', function() {
            $(this).closest('.service-area-item').remove();
            updateServiceAreaNumbers();
        });
        
        // Add footer nav button
        $('#add-footer-nav').on('click', function() {
            addFooterNavItem();
        });
        
        // Remove footer nav handler (delegated)
        $(document).on('click', '.remove-footer-nav', function() {
            $(this).closest('.footer-nav-item').remove();
            updateFooterNavNumbers();
        });
        
        // Add footer social button
        $('#add-footer-social').on('click', function() {
            addFooterSocialItem();
        });
        
        // Remove footer social handler (delegated)
        $(document).on('click', '.remove-footer-social', function() {
            $(this).closest('.footer-social-item').remove();
            updateFooterSocialNumbers();
        });
        
        // Add review button
        $('#add-review').on('click', function() {
            addReviewItem();
        });
        
        // Remove review handler (delegated)
        $(document).on('click', '.remove-review', function() {
            $(this).closest('.review-item').remove();
            updateReviewNumbers();
        });

        // Save button handler (native form submission; no AJAX hijack)
        $('#bsg-settings-form').off('submit.bsg').on('submit.bsg', function() {
            var $btn = $(this).find('button[type="submit"]');
            $btn.prop('disabled', true).text('Saving...');
            $('#bsg-save-message').html('<div class="bsg-notice bsg-notice-info">Saving...</div>');
        });

        // Ensure immediate visual feedback on clicking the save button
        $('#bsg-settings-form button[type="submit"]').off('click.bsgSave').on('click.bsgSave', function(){
            $(this).prop('disabled', true).text('Saving...');
            $('#bsg-save-message').html('<div class="bsg-notice bsg-notice-info">Saving...</div>');
        });

        // Update live preview on input change
        $('#bsg-settings-form').on('input change', 'input, textarea, select', function() {
            updateLivePreviewHtml();
        });
        
        // Manual save test button
        $('#manual-save-test').on('click', function() {
            const formData = collectFormData();
            console.log('Manual save test - Form data:', formData);
            
            // Submit the form directly
            $('#bsg-settings-form').submit();
        });
        
        // Initial preview
        updateLivePreviewHtml();

        // Add FAQ button
        $('#bsg-add-faq').off('click').on('click', function() {
            addFaqItem();
        });

        // Remove FAQ handler (delegated)
        $(document).off('click', '.bsg-remove-faq').on('click', '.bsg-remove-faq', function() {
            $(this).closest('.bsg-faq-item').remove();
            updateFaqNumbers();
        });

        function addFaqItem(faqData = null) {
            const index = faqCounter++;
            const faq = faqData || { question: '', answer: '' };
            const faqHtml = `
                <div class="bsg-faq-item" data-index="${index}" style="border:1px solid #e0e0e0;padding:1rem;margin-bottom:1.5rem;border-radius:8px;">
                    <label>Question
                        <input type="text" name="faqs[${index}][question]" value="${faq.question}" class="regular-text" placeholder="FAQ Question">
                    </label><br>
                    <label>Answer
                        <textarea name="faqs[${index}][answer]" class="large-text" placeholder="FAQ Answer">${faq.answer}</textarea>
                    </label><br>
                    <button type="button" class="button bsg-remove-faq" data-index="${index}">Remove FAQ</button>
                </div>
            `;
            $('#bsg-faqs-list').append(faqHtml);
            updateFaqNumbers();
        }

        function updateFaqNumbers() {
            $('.bsg-faq-item').each(function(index) {
                $(this).attr('data-index', index);
                $(this).find('input[name^="faqs["]').attr('name', `faqs[${index}][question]`);
                $(this).find('textarea[name^="faqs["]').attr('name', `faqs[${index}][answer]`);
            });
        }

        console.log('FAQ logic initialized');

        // Add Footer Service Item
        // Change selector from #add-footer-service to #add-footer-service-link
        // Use event delegation for the Add Footer Service Link button
        $(document).on('click', '#add-footer-service-link', function() {
            const index = $('#footer-services-container .footer-service-item').length;
            const serviceHtml = `
                <div class="footer-service-item" data-index="${index}" style="border:1px solid #e0e0e0;padding:1rem;margin-bottom:1rem;border-radius:8px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;">
                        <span>Service ${index + 1}</span>
                        <button type="button" class="button remove-footer-service">Delete</button>
                    </div>
                    <table class="form-table">
                        <tr>
                            <th scope="row">Label</th>
                            <td><input type="text" name="footer_services[${index}][label]" class="regular-text" placeholder="e.g., Roof Repair"></td>
                        </tr>
                        <tr>
                            <th scope="row">URL</th>
                            <td><input type="text" name="footer_services[${index}][url]" class="regular-text" placeholder="e.g., /roof-repair"></td>
                        </tr>
                    </table>
                </div>
            `;
            $('#footer-services-container').append(serviceHtml);
        });
        // Remove Footer Service Item
        $(document).on('click', '.remove-footer-service', function() {
            $(this).closest('.footer-service-item').remove();
            // Optionally update numbers
            $('#footer-services-container .footer-service-item').each(function(i) {
                $(this).find('span').text(`Service ${i + 1}`);
            });
        });

        // Bulk add cities to locations
        $('#add-bulk-cities').on('click', function() {
            const $input = $('#bulk-city-input');
            const lines = $input.val().split('\n').map(line => line.trim()).filter(line => line.length > 0);
            if (!lines.length) return;
            const $list = $('#bsg-locations-list');
            let i = $list.children('.bsg-location-item').length;
            lines.forEach(city => {
                const html = `<div class="bsg-location-item" data-index="${i}">
                    <input type="text" name="locations[${i}][name]" value="${city}" placeholder="Location Name" class="regular-text" />
                    <input type="text" name="locations[${i}][meta_title]" placeholder="Meta Title" class="regular-text" />
                    <textarea name="locations[${i}][meta_description]" placeholder="Meta Description" class="large-text"></textarea>
                    <textarea name="locations[${i}][description]" placeholder="Description" class="large-text"></textarea>
                    <input type="text" name="locations[${i}][button_text]" placeholder="Button Text" class="regular-text" />
                    <button type="button" class="button bsg-generate-ai" data-type="location" data-index="${i}">Generate with AI</button>
                    <button type="button" class="button bsg-remove-location" data-index="${i}">Remove</button>
                </div>`;
                $list.append(html);
                i++;
            });
            $input.val('');
        });
    }
    
    function loadExistingSettings() {
        // Get existing settings via AJAX
        $.ajax({
            url: ajaxURL,
            type: 'POST',
            data: {
                action: 'bsg_get_settings',
                nonce: bsgAdmin.nonce
            },
            success: function(response) {
                if (response.success && response.data.settings) {
                    console.log('Loaded existing settings:', response.data.settings);
                    populateFormWithSettings(response.data.settings);
                }
            },
            error: function(xhr, status, error) {
                console.error('Error loading existing settings:', error);
            }
        });
    }
    
    function populateFormWithSettings(settings) {
        // Populate simple fields
        Object.keys(settings).forEach(function(key) {
            const $field = $(`[name="${key}"]`);
            if ($field.length && !Array.isArray(settings[key])) {
                if ($field.attr('type') === 'checkbox') {
                    $field.prop('checked', settings[key] === '1' || settings[key] === 1);
                } else {
                    $field.val(settings[key]);
                }
            }
        });
        
        // Handle color pickers
        if (typeof $.fn.wpColorPicker !== 'undefined') {
            $('.wp-color-picker').each(function() {
                const name = $(this).attr('name');
                if (name && settings[name]) {
                    $(this).wpColorPicker('color', settings[name]);
                }
            });
        }
    }
    
    function loadBusinessTypeTemplate(businessType) {
        if (businessType === 'custom') return;
        
        $.ajax({
            url: ajaxURL,
            type: 'POST',
            data: {
                action: 'bsg_get_business_template',
                business_type: businessType,
                nonce: bsgAdmin.nonce
            },
            success: function(response) {
                if (response.success && response.data) {
                    const template = response.data;
                    
                    // Update services
                    if (template.services) {
                        $('#services-container').empty();
                        template.services.forEach(function(service) {
                            addServiceItem(service);
                        });
                    }
                    
                    // Update colors
                    if (template.colors) {
                        $('#primary_color').wpColorPicker('color', template.colors.primary);
                        $('#secondary_color').wpColorPicker('color', template.colors.secondary);
                        $('#accent_color').wpColorPicker('color', template.colors.accent);
                    }
                    
                    // Update preview
                    updateLivePreview();
                }
            },
            error: function() {
                showNotice('Error loading business template', 'error');
            }
        });
    }
    
    function addServiceItem(serviceData = null) {
        const index = serviceCounter++;
        const service = serviceData || {
            name: '',
            description: '',
            icon: 'tools'
        };
        
        const serviceHtml = `
            <div class="service-item" data-index="${index}" style="border:1px solid #e0e0e0;padding:1rem;margin-bottom:1.5rem;border-radius:8px;">
                <div class="service-header" style="display:flex;align-items:center;justify-content:space-between;">
                    <h4 style="margin:0;">Service ${index + 1}</h4>
                    <button type="button" class="button remove-service">Remove</button>
                </div>
                <table class="form-table">
                    <tr>
                        <th scope="row">Service Name</th>
                        <td>
                            <input type="text" name="services[${index}][name]" 
                                   value="${service.name}" 
                                   class="regular-text" placeholder="e.g., Roof Installation">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Description</th>
                        <td>
                            <textarea name="services[${index}][description]" rows="3" 
                                      class="large-text" placeholder="Detailed description of the service">${service.description}</textarea>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Icon</th>
                        <td>
                            <select name="services[${index}][icon]">
                                <option value="tools" ${service.icon === 'tools' ? 'selected' : ''}>Tools</option>
                                <option value="wrench" ${service.icon === 'wrench' ? 'selected' : ''}>Wrench</option>
                                <option value="hammer" ${service.icon === 'hammer' ? 'selected' : ''}>Hammer</option>
                                <option value="screwdriver" ${service.icon === 'screwdriver' ? 'selected' : ''}>Screwdriver</option>
                                <option value="search" ${service.icon === 'search' ? 'selected' : ''}>Search</option>
                                <option value="check" ${service.icon === 'check' ? 'selected' : ''}>Check</option>
                                <option value="star" ${service.icon === 'star' ? 'selected' : ''}>Star</option>
                                <option value="admin-tools" ${service.icon === 'admin-tools' ? 'selected' : ''}>Admin Tools</option>
                                <option value="admin-generic" ${service.icon === 'admin-generic' ? 'selected' : ''}>Generic</option>
                                <option value="admin-appearance" ${service.icon === 'admin-appearance' ? 'selected' : ''}>Appearance</option>
                                <option value="admin-home" ${service.icon === 'admin-home' ? 'selected' : ''}>Home</option>
                                <option value="admin-settings" ${service.icon === 'admin-settings' ? 'selected' : ''}>Settings</option>
                                <option value="clock" ${service.icon === 'clock' ? 'selected' : ''}>Clock</option>
                                <option value="admin-building" ${service.icon === 'admin-building' ? 'selected' : ''}>Building</option>
                            </select>
                        </td>
                    </tr>
                </table>
            </div>
        `;
        
        $('#services-container').append(serviceHtml);
    }
    
    function addLocationItem(locationData = null) {
        console.log('addLocationItem function called!');
        const index = locationCounter++;
        const location = locationData || {
            name: '',
            state: '',
            zip_code: '',
            meta_title: '',
            meta_description: '',
            description: '',
            use_ai_prompt: 1,
            ai_prompt: '',
            ai_style: 'professional',
            ai_length: 'medium'
        };
        
        const locationHtml = `
            <div class="bsg-location-item" data-index="${index}" style="border:1px solid #e0e0e0;padding:1rem;margin-bottom:1.5rem;border-radius:8px;">
                <div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;margin-bottom:0.5rem;">
                    <h4 style="margin:0;">Location ${index + 1}</h4>
                </div>

                <label>City Name
                    <input type="text" name="locations[${index}][name]" value="${location.name}" class="regular-text" placeholder="City Name">
                </label><br>

                <label>State
                    <select name="locations[${index}][state]" class="regular-text">
                        <option value="">Select State</option>
                        <option value="Alabama" ${location.state === 'Alabama' ? 'selected' : ''}>Alabama</option>
                        <option value="Alaska" ${location.state === 'Alaska' ? 'selected' : ''}>Alaska</option>
                        <option value="Arizona" ${location.state === 'Arizona' ? 'selected' : ''}>Arizona</option>
                        <option value="Arkansas" ${location.state === 'Arkansas' ? 'selected' : ''}>Arkansas</option>
                        <option value="California" ${location.state === 'California' ? 'selected' : ''}>California</option>
                        <option value="Colorado" ${location.state === 'Colorado' ? 'selected' : ''}>Colorado</option>
                        <option value="Connecticut" ${location.state === 'Connecticut' ? 'selected' : ''}>Connecticut</option>
                        <option value="Delaware" ${location.state === 'Delaware' ? 'selected' : ''}>Delaware</option>
                        <option value="District of Columbia" ${location.state === 'District of Columbia' ? 'selected' : ''}>District of Columbia</option>
                        <option value="Florida" ${location.state === 'Florida' ? 'selected' : ''}>Florida</option>
                        <option value="Georgia" ${location.state === 'Georgia' ? 'selected' : ''}>Georgia</option>
                        <option value="Hawaii" ${location.state === 'Hawaii' ? 'selected' : ''}>Hawaii</option>
                        <option value="Idaho" ${location.state === 'Idaho' ? 'selected' : ''}>Idaho</option>
                        <option value="Illinois" ${location.state === 'Illinois' ? 'selected' : ''}>Illinois</option>
                        <option value="Indiana" ${location.state === 'Indiana' ? 'selected' : ''}>Indiana</option>
                        <option value="Iowa" ${location.state === 'Iowa' ? 'selected' : ''}>Iowa</option>
                        <option value="Kansas" ${location.state === 'Kansas' ? 'selected' : ''}>Kansas</option>
                        <option value="Kentucky" ${location.state === 'Kentucky' ? 'selected' : ''}>Kentucky</option>
                        <option value="Louisiana" ${location.state === 'Louisiana' ? 'selected' : ''}>Louisiana</option>
                        <option value="Maine" ${location.state === 'Maine' ? 'selected' : ''}>Maine</option>
                        <option value="Maryland" ${location.state === 'Maryland' ? 'selected' : ''}>Maryland</option>
                        <option value="Massachusetts" ${location.state === 'Massachusetts' ? 'selected' : ''}>Massachusetts</option>
                        <option value="Michigan" ${location.state === 'Michigan' ? 'selected' : ''}>Michigan</option>
                        <option value="Minnesota" ${location.state === 'Minnesota' ? 'selected' : ''}>Minnesota</option>
                        <option value="Mississippi" ${location.state === 'Mississippi' ? 'selected' : ''}>Mississippi</option>
                        <option value="Missouri" ${location.state === 'Missouri' ? 'selected' : ''}>Missouri</option>
                        <option value="Montana" ${location.state === 'Montana' ? 'selected' : ''}>Montana</option>
                        <option value="Nebraska" ${location.state === 'Nebraska' ? 'selected' : ''}>Nebraska</option>
                        <option value="Nevada" ${location.state === 'Nevada' ? 'selected' : ''}>Nevada</option>
                        <option value="New Hampshire" ${location.state === 'New Hampshire' ? 'selected' : ''}>New Hampshire</option>
                        <option value="New Jersey" ${location.state === 'New Jersey' ? 'selected' : ''}>New Jersey</option>
                        <option value="New Mexico" ${location.state === 'New Mexico' ? 'selected' : ''}>New Mexico</option>
                        <option value="New York" ${location.state === 'New York' ? 'selected' : ''}>New York</option>
                        <option value="North Carolina" ${location.state === 'North Carolina' ? 'selected' : ''}>North Carolina</option>
                        <option value="North Dakota" ${location.state === 'North Dakota' ? 'selected' : ''}>North Dakota</option>
                        <option value="Ohio" ${location.state === 'Ohio' ? 'selected' : ''}>Ohio</option>
                        <option value="Oklahoma" ${location.state === 'Oklahoma' ? 'selected' : ''}>Oklahoma</option>
                        <option value="Oregon" ${location.state === 'Oregon' ? 'selected' : ''}>Oregon</option>
                        <option value="Pennsylvania" ${location.state === 'Pennsylvania' ? 'selected' : ''}>Pennsylvania</option>
                        <option value="Rhode Island" ${location.state === 'Rhode Island' ? 'selected' : ''}>Rhode Island</option>
                        <option value="South Carolina" ${location.state === 'South Carolina' ? 'selected' : ''}>South Carolina</option>
                        <option value="South Dakota" ${location.state === 'South Dakota' ? 'selected' : ''}>South Dakota</option>
                        <option value="Tennessee" ${location.state === 'Tennessee' ? 'selected' : ''}>Tennessee</option>
                        <option value="Texas" ${location.state === 'Texas' ? 'selected' : ''}>Texas</option>
                        <option value="Utah" ${location.state === 'Utah' ? 'selected' : ''}>Utah</option>
                        <option value="Vermont" ${location.state === 'Vermont' ? 'selected' : ''}>Vermont</option>
                        <option value="Virginia" ${location.state === 'Virginia' ? 'selected' : ''}>Virginia</option>
                        <option value="Washington" ${location.state === 'Washington' ? 'selected' : ''}>Washington</option>
                        <option value="West Virginia" ${location.state === 'West Virginia' ? 'selected' : ''}>West Virginia</option>
                        <option value="Wisconsin" ${location.state === 'Wisconsin' ? 'selected' : ''}>Wisconsin</option>
                        <option value="Wyoming" ${location.state === 'Wyoming' ? 'selected' : ''}>Wyoming</option>
                    </select>
                </label><br>

                <label>ZIP (auto / override)
                    <input type="text" name="locations[${index}][zip_code]" value="${location.zip_code}" class="regular-text" placeholder="e.g., 10001">
                    <p class="description">Left blank to auto-detect from City + State. Enter to override.</p>
                    <small class="zip-hint" style="display:block;color:#666;margin-top:4px;"></small>
                </label><br>

                <div class="bsg-slug-preview" style="margin:6px 0 12px 0;color:#555;font-size:12px;background:#f8f9fa;border:1px solid #e9ecef;border-radius:4px;padding:6px;">
                    Slug preview: <code>/service-locations/</code>
                </div>

                <!-- Location AI Prompt Section (same UI pattern as Services) -->
                <div class="bsg-ai-prompt-section" style="margin: 1rem 0; padding: 1rem; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef; display: block !important;">
                    <div class="bsg-ai-prompt-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                        <label style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600;">
                            <input type="checkbox" name="locations[${index}][use_ai_prompt]" value="1" class="bsg-location-ai-toggle" checked="checked" style="display: inline-block !important;">
                            🤖 Use Default AI Prompt
                        </label>
                        <button type="button" class="button bsg-generate-location-ai-content" data-location-index="${index}" style="background: #007cba; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">${location.use_ai_prompt ? 'Generate Description' : 'Generate with Custom Prompt'}</button>
                    </div>

                    <div class="bsg-location-ai-content" style="display: ${location.use_ai_prompt ? 'none' : 'block'};">
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Custom AI Prompt for Location Description</label>
                            <textarea name="locations[${index}][ai_prompt]" class="large-text" rows="4" placeholder="Write a custom prompt for AI to generate this city-specific description...">${location.ai_prompt || ''}</textarea>
                            <p class="description">Placeholders: {city}, {state}, {zip}, {businessName}, {businessType}. The city/state/zip will be auto-inserted.</p>
                        </div>
                        <div style="margin-bottom: 1rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Content Style</label>
                            <select name="locations[${index}][ai_style]" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                                <option value="professional" ${location.ai_style === 'professional' ? 'selected' : ''}>Professional</option>
                                <option value="conversational" ${location.ai_style === 'conversational' ? 'selected' : ''}>Conversational</option>
                                <option value="technical" ${location.ai_style === 'technical' ? 'selected' : ''}>Technical</option>
                                <option value="casual" ${location.ai_style === 'casual' ? 'selected' : ''}>Casual</option>
                            </select>
                        </div>
                        <div style="margin-bottom: 0.5rem;">
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Content Length</label>
                            <select name="locations[${index}][ai_length]" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                                <option value="short" ${location.ai_length === 'short' ? 'selected' : ''}>Short (200-350 words)</option>
                                <option value="medium" ${location.ai_length === 'medium' ? 'selected' : ''}>Medium (350-600 words)</option>
                                <option value="long" ${location.ai_length === 'long' ? 'selected' : ''}>Long (600-900 words)</option>
                            </select>
                        </div>
                        <div class="bsg-ai-status" style="display: none; padding: 0.75rem; border-radius: 4px; margin-top: 0.5rem;">
                            <div class="bsg-ai-loading" style="display: none;">
                                <span style="display: inline-block; width: 16px; height: 16px; border: 2px solid #f3f3f3; border-top: 2px solid #007cba; border-radius: 50%; animation: spin 1s linear infinite;"></span>
                                Generating AI content...
                            </div>
                            <div class="bsg-ai-success" style="display: none; color: #28a745;">✅ Location description generated successfully!</div>
                            <div class="bsg-ai-error" style="display: none; color: #dc3545;">❌ Error generating content. Please try again.</div>
                        </div>
                    </div>
                </div>

                <label>Meta Title
                    <input type="text" name="locations[${index}][meta_title]" value="${location.meta_title}" class="regular-text" placeholder="Meta Title">
                </label><br>
                <label>Meta Description
                    <textarea name="locations[${index}][meta_description]" class="large-text" placeholder="Meta Description">${location.meta_description || ''}</textarea>
                </label><br>

                <label>Description (HTML)
                    <textarea name="locations[${index}][description]" class="large-text" rows="4" placeholder="AI-generated HTML description for the location page...">${location.description || ''}</textarea>
                </label>

                <button type="button" class="button bsg-remove-location" data-index="${index}">Remove</button>
            </div>
        `;
        
        // Debug: Check if locationHtml is generated properly
        console.log('Location HTML length:', locationHtml.length);
        console.log('Location HTML starts with:', locationHtml.substring(0, 100));
        console.log('Location HTML ends with:', locationHtml.substring(locationHtml.length - 100));
        
        try {
            $('#bsg-locations-list').append(locationHtml);
            console.log('Location HTML appended successfully');
        } catch (error) {
            console.error('Error appending location HTML:', error);
            console.log('Location HTML that failed to append:', locationHtml);
        }
        
        // Debug: Log that location was added
        console.log('Location added with index:', index);
        console.log('Location HTML template includes AI section:', locationHtml.includes('bsg-ai-prompt-section'));
        console.log('Location HTML template includes checkbox:', locationHtml.includes('bsg-location-ai-toggle'));
        console.log('Location HTML template includes use_ai_prompt field:', locationHtml.includes('use_ai_prompt'));
        console.log('Location HTML template includes ai_prompt field:', locationHtml.includes('ai_prompt'));
        console.log('Location HTML template includes ai_style field:', locationHtml.includes('ai_style'));
        console.log('Location HTML template includes ai_length field:', locationHtml.includes('ai_length'));
        
        // Update location numbers
        updateLocationNumbers();
        
        // Initialize the new location item
        const $newLocation = $(`#bsg-locations-list .bsg-location-item[data-index="${index}"]`);
        
        // Set up AI toggle functionality
        $newLocation.find('.bsg-location-ai-toggle').on('change', function() {
            const $content = $newLocation.find('.bsg-location-ai-content');
            const $button = $newLocation.find('.bsg-generate-location-ai-content');
            
            if ($(this).is(':checked')) {
                $content.slideUp(200);
                $button.text('Generate Description');
            } else {
                $content.slideDown(200);
                $button.text('Generate with Custom Prompt');
            }
        });
        
        // Set initial state for new location items
        const $toggle = $newLocation.find('.bsg-location-ai-toggle');
        const $content = $newLocation.find('.bsg-location-ai-content');
        const $button = $newLocation.find('.bsg-generate-location-ai-content');
        
        // Ensure checkbox is checked by default for new items
        if (!$toggle.prop('checked')) {
            $toggle.prop('checked', true);
        }
        
        if ($toggle.is(':checked')) {
            $content.hide();
            $button.text('Generate Description');
        } else {
            $content.show();
            $button.text('Generate with Custom Prompt');
        }
        
        // Debug: Check if AI section is visible in DOM
        console.log('AI section exists in DOM:', $newLocation.find('.bsg-ai-prompt-section').length > 0);
        console.log('AI section is visible:', $newLocation.find('.bsg-ai-prompt-section').is(':visible'));
        console.log('Checkbox exists in DOM:', $newLocation.find('.bsg-location-ai-toggle').length > 0);
        console.log('Checkbox is checked:', $newLocation.find('.bsg-location-ai-toggle').is(':checked'));
        
        // Set up slug preview updates
        $newLocation.find('input[name$="[name]"], input[name$="[zip_code]"]').on('input', function() {
            updateSlugPreview($newLocation);
        });
        
        // Set up auto-fetch ZIP code
        $newLocation.find('input[name$="[name]"]').on('blur change', function() {
            const city = $(this).val();
            const state = $newLocation.find('select[name$="[state]"]').val();
            
            if (city && state) {
                fetchZipCode(city, state, $newLocation);
            }
        });
        
        return $newLocation;
    }
    
    function updateServiceNumbers() {
        $('.service-item').each(function(index) {
            $(this).find('h4').text(`Service ${index + 1}`);
        });
    }
    
    function updateLocationNumbers() {
        $('.bsg-location-item').each(function(index) {
            $(this).find('h4').text(`Location ${index + 1}`);
        });
        // Update the counter to match the current number of items
        locationCounter = $('.bsg-location-item').length;
    }
    
    function generateWebsite() {
        const $button = $('#generate-website');
        const originalText = $button.html();
        
        // Show loading state
        $button.html('<span class="dashicons dashicons-update"></span>Generating...');
        $button.addClass('bsg-loading');
        
        // Collect form data
        const settings = collectFormData();
        
        $.ajax({
            url: bsgAdmin.ajaxUrl,
            type: 'POST',
            data: {
                action: 'bsg_generate_website',
                settings: settings,
                nonce: bsgAdmin.nonce
            },
            success: function(response) {
                if (response.success) {
                    showNotice(response.data.message || 'Website generated successfully!', 'success');
                    
                    // Show generated pages info
                    if (response.data.pages) {
                        showGeneratedPages(response.data.pages);
                    }
                } else {
                    showNotice(response.data.message || 'Error generating website', 'error');
                }
            },
            error: function() {
                showNotice('Error generating website. Please try again.', 'error');
            },
            complete: function() {
                // Restore button
                $button.html(originalText);
                $button.removeClass('bsg-loading');
            }
        });
    }
    
    function collectFormData() {
        const settings = {};
        
        // First, make sure all tabs are visible temporarily to collect all form data
        const originalDisplay = {};
        $('.bsg-tab-content > div').each(function() {
            const $tab = $(this);
            originalDisplay[$tab.attr('id') || $tab.index()] = $tab.css('display');
            $tab.show();
        });
        
        // Collect all form data using jQuery serializeArray and convert to object
        const formData = $('#bsg-settings-form').serializeArray();
        
        // Restore original display
        $('.bsg-tab-content > div').each(function() {
            const $tab = $(this);
            const key = $tab.attr('id') || $tab.index();
            if (originalDisplay[key] !== undefined) {
                $tab.css('display', originalDisplay[key]);
            }
        });
        
        // Debug: Log the form data being collected
        console.log('Form data being collected:', formData);
        
        formData.forEach(function(item) {
            if (item.name.includes('[') && item.name.includes(']')) {
                // Handle array fields like features[0][title]
                const matches = item.name.match(/^(\w+)\[(\d+)\]\[(\w+)\]$/);
                if (matches) {
                    const [, arrayName, index, field] = matches;
                    if (!settings[arrayName]) settings[arrayName] = [];
                    if (!settings[arrayName][index]) settings[arrayName][index] = {};
                    settings[arrayName][index][field] = item.value;
                } else {
                    // Handle simple array fields
                    const matches = item.name.match(/^(\w+)\[(\d+)\]$/);
                    if (matches) {
                        const [, arrayName, index] = matches;
                        if (!settings[arrayName]) settings[arrayName] = [];
                        settings[arrayName][index] = item.value;
                    }
                }
            } else {
                settings[item.name] = item.value;
            }
        });
        
        // Handle checkboxes that might not be in serializeArray
        $('#bsg-settings-form input[type="checkbox"]').each(function() {
            const name = $(this).attr('name');
            if (name && !settings[name]) {
                settings[name] = $(this).is(':checked') ? '1' : '0';
            }
        });
        
        // Handle color pickers
        if (typeof $.fn.wpColorPicker !== 'undefined') {
            $('#bsg-settings-form .wp-color-picker').each(function() {
                const name = $(this).attr('name');
                if (name) {
                    settings[name] = $(this).wpColorPicker('color');
                }
            });
        }
        
        // Debug: Log the final settings object
        console.log('Final settings object:', settings);
        
        return settings;
    }
    
            function setupAutoSave() {
            // Disabled auto-save to avoid conflicts with native form submission
        }
    
    	function saveSettings(callback) {
		const settings = collectFormData();
		
		// Show saving indicator (works for both manual and auto-save)
		const $form = $('#bsg-settings-form');
		const $btn = $form.find('button[type="submit"]');
		if ($btn.length) { $btn.prop('disabled', true).text('Saving...'); }
		$('#bsg-save-message').html('<div class="bsg-notice bsg-notice-info">Saving...</div>');
		
		// Debug: Show what we're about to send
		console.log('Sending settings to server:', settings);
		
		$.ajax({
            url: bsgAdmin.ajaxUrl,
            type: 'POST',
            data: {
                action: 'bsg_save_settings',
                settings: settings,
                nonce: bsgAdmin.nonce
            },
            success: function(response) {
				console.log('Server response:', response);
				if (response.success) {
					// Settings saved successfully
					updateLivePreview();
					$('#bsg-save-message').html('<div class="bsg-notice bsg-notice-success">Settings saved!</div>');
					if ($btn && $btn.length) { $btn.text('Saved!'); setTimeout(function(){ $btn.text('Save Changes').prop('disabled', false); }, 1200); }
					if (callback) {
						callback(true, response.data.message || 'Settings saved successfully!');
					}
				} else {
					$('#bsg-save-message').html('<div class="bsg-notice bsg-notice-error">'+(response.data && response.data.message ? response.data.message : 'Error saving settings')+'</div>');
					if ($btn && $btn.length) { $btn.text('Save Changes').prop('disabled', false); }
					if (callback) {
						callback(false, response.data && response.data.message ? response.data.message : 'Error saving settings');
					}
				}
			},
			error: function(xhr, status, error) {
				console.error('AJAX error:', {xhr, status, error});
				$('#bsg-save-message').html('<div class="bsg-notice bsg-notice-error">Error saving settings: '+error+'</div>');
				if ($btn && $btn.length) { $btn.text('Save Changes').prop('disabled', false); }
				if (callback) {
					callback(false, 'Error saving settings: ' + error);
				}
			}
		});
    }
    
            function setupLivePreview() {
            // Keep live preview lightweight; no network calls when saving natively
        }
    
    function updateLivePreview() {
        // Preview disabled for stability during saves
    }
    
    function showNotice(message, type) {
        const noticeClass = type === 'success' ? 'bsg-notice-success' : 'bsg-notice-error';
        const notice = `<div class="bsg-notice ${noticeClass}">${message}</div>`;
        
        // Remove existing notices
        $('.bsg-notice').remove();
        
        // Add new notice
        $('.bsg-admin h1').after(notice);
        
        // Auto-remove after 5 seconds
        setTimeout(function() {
            $('.bsg-notice').fadeOut(function() {
                $(this).remove();
            });
        }, 5000);
    }
    
    function showGeneratedPages(pages) {
        const pagesInfo = `
            <div class="bsg-notice bsg-notice-success">
                <h4>Generated Pages:</h4>
                <ul>
                    <li><strong>Homepage:</strong> <a href="${pages.homepage ? getEditUrl(pages.homepage) : '#'}" target="_blank">Edit Page</a></li>
                    <li><strong>About:</strong> <a href="${pages.about ? getEditUrl(pages.about) : '#'}" target="_blank">Edit Page</a></li>
                    <li><strong>Contact:</strong> <a href="${pages.contact ? getEditUrl(pages.contact) : '#'}" target="_blank">Edit Page</a></li>
                    <li><strong>Services:</strong> <a href="${pages.services ? getEditUrl(pages.services) : '#'}" target="_blank">Edit Page</a></li>
                </ul>
                <p><a href="${adminurl}edit.php?post_type=page" target="_blank">View All Pages</a></p>
            </div>
        `;
        
        $('.bsg-notice').remove();
        $('.bsg-admin h1').after(pagesInfo);
    }
    
    function getEditUrl(pageId) {
        return `${adminurl}post.php?post=${pageId}&action=edit`;
    }
    
    // Add Feature Item
    function addFeatureItem(featureData = null) {
        const index = $('#features-container .feature-item').length;
        const feature = featureData || { icon: '', title: '', description: '' };
        const featureHtml = `
            <div class="feature-item" data-index="${index}" style="border:1px solid #e0e0e0;padding:1rem;margin-bottom:1.5rem;border-radius:8px;">
                <div class="feature-header" style="display:flex;align-items:center;justify-content:space-between;">
                    <h4 style="margin:0;">Feature ${index + 1}</h4>
                    <button type="button" class="button remove-feature">Remove</button>
                </div>
                <table class="form-table">
                    <tr>
                        <th scope="row">Icon (Dashicon class or SVG URL)</th>
                        <td>
                            <input type="text" name="features[${index}][icon]" value="${feature.icon}" class="regular-text" placeholder="e.g., dashicons-awards or https://.../icon.svg">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Title</th>
                        <td>
                            <input type="text" name="features[${index}][title]" value="${feature.title}" class="regular-text" placeholder="e.g., Free Roof Inspections">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Description</th>
                        <td>
                            <textarea name="features[${index}][description]" rows="2" class="large-text" placeholder="Short description of the feature."></textarea>
                        </td>
                    </tr>
                </table>
            </div>
        `;
        $('#features-container').append(featureHtml);
    }
    function updateFeatureNumbers() {
        $('#features-container .feature-item').each(function(index) {
            $(this).find('h4').text(`Feature ${index + 1}`);
        });
    }

    // Add Service Area (State) Item
    function addServiceAreaItem(areaData = null) {
        const index = $('#service-areas-container .service-area-item').length;
        const area = areaData || { state: '', cities: '' };
        const areaHtml = `
            <div class="service-area-item" data-index="${index}" style="border:1px solid #e0e0e0;padding:1rem;margin-bottom:1.5rem;border-radius:8px;">
                <div class="service-area-header" style="display:flex;align-items:center;justify-content:space-between;">
                    <h4 style="margin:0;">State ${index + 1}</h4>
                    <button type="button" class="button remove-service-area">Delete</button>
                </div>
                <table class="form-table">
                    <tr>
                        <th scope="row">State Name</th>
                        <td>
                            <input type="text" name="service_areas[${index}][state]" value="${area.state}" class="regular-text" placeholder="e.g., Colorado">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Cities (one per line)</th>
                        <td>
                            <textarea name="service_areas[${index}][cities]" rows="4" class="large-text" placeholder="Orlando&#10;Miami&#10;Tampa&#10;Jacksonville">${area.cities}</textarea>
                        </td>
                    </tr>
                </table>
            </div>
        `;
        $('#service-areas-container').append(areaHtml);
    }
    function updateServiceAreaNumbers() {
        $('#service-areas-container .service-area-item').each(function(index) {
            $(this).find('h4').text(`State ${index + 1}`);
        });
    }
    
    // Add Footer Navigation Item
    function addFooterNavItem(navData = null) {
        const index = $('#footer-nav-container .footer-nav-item').length;
        const nav = navData || { label: '', url: '' };
        const navHtml = `
            <div class="footer-nav-item" data-index="${index}" style="border:1px solid #e0e0e0;padding:1rem;margin-bottom:1rem;border-radius:8px;">
                <div style="display:flex;align-items:center;justify-content:space-between;">
                    <span>Link ${index + 1}</span>
                    <button type="button" class="button remove-footer-nav">Delete</button>
                </div>
                <table class="form-table">
                    <tr>
                        <th scope="row">Label</th>
                        <td><input type="text" name="footer_nav[${index}][label]" value="${nav.label}" class="regular-text" placeholder="e.g., About Us"></td>
                    </tr>
                    <tr>
                        <th scope="row">URL</th>
                        <td><input type="text" name="footer_nav[${index}][url]" value="${nav.url}" class="regular-text" placeholder="e.g., /about"></td>
                    </tr>
                </table>
            </div>
        `;
        $('#footer-nav-container').append(navHtml);
    }
    
    function updateFooterNavNumbers() {
        $('#footer-nav-container .footer-nav-item').each(function(index) {
            $(this).find('span').text(`Link ${index + 1}`);
        });
    }
    
    // Add Footer Social Item
    function addFooterSocialItem(socialData = null) {
        const index = $('#footer-social-container .footer-social-item').length;
        const social = socialData || { icon: '', url: '' };
        const socialHtml = `
            <div class="footer-social-item" data-index="${index}" style="border:1px solid #e0e0e0;padding:1rem;margin-bottom:1rem;border-radius:8px;">
                <div style="display:flex;align-items:center;justify-content:space-between;">
                    <span>Social ${index + 1}</span>
                    <button type="button" class="button remove-footer-social">Delete</button>
                </div>
                <table class="form-table">
                    <tr>
                        <th scope="row">Icon (dashicon class or SVG URL)</th>
                        <td><input type="text" name="footer_social[${index}][icon]" value="${social.icon}" class="regular-text" placeholder="e.g., dashicons-facebook or https://.../icon.svg"></td>
                    </tr>
                    <tr>
                        <th scope="row">URL</th>
                        <td><input type="text" name="footer_social[${index}][url]" value="${social.url}" class="regular-text" placeholder="e.g., https://facebook.com/yourpage"></td>
                    </tr>
                </table>
            </div>
        `;
        $('#footer-social-container').append(socialHtml);
    }
    
    function updateFooterSocialNumbers() {
        $('#footer-social-container .footer-social-item').each(function(index) {
            $(this).find('span').text(`Social ${index + 1}`);
        });
    }
    
    // Add Review Item
    function addReviewItem(reviewData = null) {
        const index = $('#reviews-container .review-item').length;
        const review = reviewData || { name: '', photo: '', rating: 5, text: '', location: '' };
        const reviewHtml = `
            <div class="review-item" data-index="${index}" style="border:1px solid #e0e0e0;padding:1rem;margin-bottom:1.5rem;border-radius:8px;">
                <div class="review-header" style="display:flex;align-items:center;justify-content:space-between;">
                    <h4 style="margin:0;">Review ${index + 1}</h4>
                    <button type="button" class="button remove-review">Remove</button>
                </div>
                <table class="form-table">
                    <tr>
                        <th scope="row">Customer Name</th>
                        <td>
                            <input type="text" name="reviews[${index}][name]" value="${review.name}" class="regular-text" placeholder="e.g., John Smith">
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Customer Photo</th>
                        <td>
                            <input type="text" name="reviews[${index}][photo]" value="${review.photo}" class="regular-text bsg-image-upload" placeholder="Photo URL">
                            <button type="button" class="button bsg-upload-image">Upload Image</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Rating (1-5)</th>
                        <td>
                            <select name="reviews[${index}][rating]">
                                <option value="5" ${review.rating == 5 ? 'selected' : ''}>5 Stars</option>
                                <option value="4" ${review.rating == 4 ? 'selected' : ''}>4 Stars</option>
                                <option value="3" ${review.rating == 3 ? 'selected' : ''}>3 Stars</option>
                                <option value="2" ${review.rating == 2 ? 'selected' : ''}>2 Stars</option>
                                <option value="1" ${review.rating == 1 ? 'selected' : ''}>1 Star</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Review Text</th>
                        <td>
                            <textarea name="reviews[${index}][text]" rows="3" class="large-text" placeholder="Customer testimonial...">${review.text}</textarea>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Location/City</th>
                        <td>
                            <input type="text" name="reviews[${index}][location]" value="${review.location}" class="regular-text" placeholder="e.g., Denver, CO">
                        </td>
                    </tr>
                </table>
            </div>
        `;
        $('#reviews-container').append(reviewHtml);
    }
    
    function updateReviewNumbers() {
        $('#reviews-container .review-item').each(function(index) {
            $(this).find('h4').text(`Review ${index + 1}`);
        });
    }
    
    function updateLivePreviewHtml() {
        var s = collectFormData();
        var html = '';
        html += '<div style="background: '+(s.hero_bg_color||'#2563eb')+'; color: '+(s.hero_text_color||'#fff')+'; padding: '+(s.hero_padding||109)+'px; border-radius: 12px; margin-bottom: 2rem;">';
        html += '<h2 style="font-size:2.2rem; margin-bottom:0.5rem;">'+(s.hero_headline||'Your Business Headline')+'</h2>';
        if(s.hero_cta) html += '<a href="'+(s.hero_cta_link||'#')+'" style="display:inline-block; background:'+(s.hero_button_color||'#f59e0b')+'; color:#fff; font-weight:600; padding:1rem 2rem; border-radius:6px; text-decoration:none; font-size:1.1rem;">'+s.hero_cta+'</a>';
        html += '</div>';
        if(s.features && s.features.length) {
            html += '<div style="background:'+(s.features_bg_color||'#fff')+'; color:'+(s.features_text_color||'#232834')+'; padding:'+(s.features_padding||60)+'px; border-radius:10px; margin-bottom:2rem;">';
            html += '<h3 style="margin-bottom:1rem;">Features</h3><ul style="display:flex;gap:2rem;list-style:none;padding:0;">';
            s.features.forEach(function(f) {
                html += '<li style="background:'+(s.features_card_color||'#232834')+';color:'+(s.features_text_color||'#fff')+';padding:1rem 1.5rem;border-radius:8px;min-width:120px;text-align:center;">';
                html += '<div style="font-size:2rem;">'+(f.icon||'⭐')+'</div>';
                html += '<div style="font-weight:600;">'+(f.title||'Feature')+'</div>';
                html += '<div style="font-size:0.95rem;">'+(f.description||'')+'</div>';
                html += '</li>';
            });
            html += '</ul></div>';
        }
        $('#bsg-live-preview').html(html);
    }
    
    // Test form submission button
    $('#test-form-submission').on('click', function() {
        const formData = collectFormData();
        $('#test-results').html('<p>Testing form data collection...</p>').show();
        
        console.log('Test - Form data collected:', formData);
        
        // Also test what fields are actually in the form
        const allFields = [];
        $('#bsg-settings-form input, #bsg-settings-form textarea, #bsg-settings-form select').each(function() {
            const $field = $(this);
            allFields.push({
                name: $field.attr('name'),
                type: $field.attr('type') || $field.prop('tagName').toLowerCase(),
                value: $field.val(),
                visible: $field.is(':visible')
            });
        });
        console.log('Test - All form fields:', allFields);
        
        // Test AJAX save
        $.ajax({
            url: ajaxURL,
            type: 'POST',
            data: {
                action: 'bsg_save_settings',
                settings: formData,
                nonce: bsgAdmin.nonce
            },
            success: function(response) {
                console.log('Test - AJAX response:', response);
                $('#test-results').html('<p style="color: green;">✓ Form data processed successfully!</p><pre>' + JSON.stringify(formData, null, 2) + '</pre><h4>All Form Fields:</h4><pre>' + JSON.stringify(allFields, null, 2) + '</pre>');
            },
            error: function(xhr, status, error) {
                console.error('Test - AJAX error:', error);
                $('#test-results').html('<p style="color: red;">✗ Error processing form data: ' + error + '</p>');
            }
        });
    });
    
    // Manual save test button
    $('#manual-save-test').on('click', function() {
        const formData = collectFormData();
        console.log('Manual save test - Form data:', formData);
        
        // Submit the form directly
        $('#bsg-settings-form').submit();
    });
    
    // Initial preview
    updateLivePreviewHtml();

    // Add service button (new UI)
    $(document).on('click', '.bsg-add-service', function() {
        const $list = $('#bsg-services-list');
        const i = $list.children('.bsg-service-item').length;
        const html = `<div class="bsg-service-item" data-index="${i}" style="border:1px solid #e0e0e0;padding:1rem;margin-bottom:1.5rem;border-radius:8px;">
            <h4>Service ${i + 1}</h4>
            <label>Service Title
                <input type="text" name="services[${i}][name]" class="regular-text" placeholder="Service Title">
            </label><br>
            
            <!-- AI Prompt Section -->
            <div class="bsg-ai-prompt-section" style="margin: 1rem 0; padding: 1rem; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
                <div class="bsg-ai-prompt-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                    <label style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600;">
                        <input type="checkbox" name="services[${i}][use_ai_prompt]" value="1" class="bsg-ai-prompt-toggle" checked>
                        🤖 Use Default AI Prompt
                    </label>
                    <button type="button" class="button bsg-generate-ai-content" data-service-index="${i}" style="background: #007cba; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                        Generate Description
                    </button>
                </div>
                
                <div class="bsg-ai-prompt-content" style="display: none;">
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Custom AI Prompt for Service Description</label>
                        <textarea name="services[${i}][ai_prompt]" class="large-text" rows="4" placeholder="Write a custom prompt for AI to generate this service description..."></textarea>
                        <p class="description">Customize the AI prompt for this specific service. Use placeholders like {serviceName}, {businessName}, {location}.</p>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Content Style</label>
                        <select name="services[${i}][ai_style]" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                            <option value="professional" selected>Professional</option>
                            <option value="conversational">Conversational</option>
                            <option value="technical">Technical</option>
                            <option value="casual">Casual</option>
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Content Length</label>
                        <select name="services[${i}][ai_length]" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                            <option value="short">Short (300-500 words)</option>
                            <option value="medium" selected>Medium (500-800 words)</option>
                            <option value="long">Long (800-1200 words)</option>
                        </select>
                    </div>
                    
                    <div class="bsg-ai-status" style="display: none; padding: 0.75rem; border-radius: 4px; margin-top: 1rem;">
                        <div class="bsg-ai-loading" style="display: none;">
                            <span style="display: inline-block; width: 16px; height: 16px; border: 2px solid #f3f3f3; border-top: 2px solid #007cba; border-radius: 50%; animation: spin 1s linear infinite;"></span>
                            Generating AI content...
                        </div>
                        <div class="bsg-ai-success" style="display: none; color: #28a745;">
                            ✅ Description generated successfully!
                        </div>
                        <div class="bsg-ai-error" style="display: none; color: #dc3545;">
                            ❌ Error generating content. Please try again.
                        </div>
                    </div>
                </div>
            </div>
            
            <label>Service Description
                <textarea name="services[${i}][description]" class="large-text" rows="4" placeholder="Service description for the service page..."></textarea>
                <p class="description">This description will be displayed on the service page. Use this to describe what this specific service includes.</p>
            </label><br>
            <label>Meta Title
                <input type="text" name="services[${i}][meta_title]" class="regular-text" placeholder="Meta Title">
            </label><br>
            <label>Meta Description
                <textarea name="services[${i}][meta_description]" class="large-text" placeholder="Meta Description"></textarea>
            </label><br>
            <label>Service Features (One per line)
                <textarea name="services[${i}][service_features]" class="large-text" rows="6" placeholder="Enter service features, one per line"></textarea>
                <p class="description">List the features included in this service. One feature per line.</p>
            </label><br>
            <button type="button" class="button bsg-remove-service" data-index="${i}">Remove</button>
        </div>`;
        $list.append(html);
    });
    // Remove service button (new UI)
    $(document).on('click', '.bsg-remove-service', function() {
        $(this).closest('.bsg-service-item').remove();
    });
    // Add location button (new UI)
    $(document).on('click', '.bsg-add-location', function() {
        console.log('Add Location button clicked - calling addLocationItem function');
        addLocationItem();
    });
    // Remove location button (new UI)
    $(document).on('click', '.bsg-remove-location', function() {
        $(this).closest('.bsg-location-item').remove();
        updateLocationNumbers();
    });
    // Generate with AI button handler for services and locations
    $(document).on('click', '.bsg-generate-ai', function() {
        const $btn = $(this);
        const type = $btn.data('type');
        const index = $btn.data('index');
        const $item = $btn.closest(type === 'service' ? '.bsg-service-item' : '.bsg-location-item');
        const name = $item.find('input[name$="[name]"]').val();
        
        if (!name) {
            alert('Please enter a name first.');
            return;
        }
        
        $btn.prop('disabled', true).text('Generating...');
        
        $.ajax({
            url: ajaxURL,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'bsg_generate_ai_content',
                nonce: aiNonce(),
                type: type,
                fields: { name: name }
            },
            success: function(response) {
                if (response.success && response.data.content) {
                    const content = response.data.content;
                    const parsed = parseAIContent(content, type);
                    
                    if (type === 'service') {
                        $item.find('input[name$="[meta_title]"]').val(parsed.metaTitle);
                        $item.find('textarea[name$="[meta_description]"]').val(parsed.metaDescription);
                        $item.find('textarea[name$="[description]"]').val(parsed.description);
                    } else if (type === 'location') {
                        $item.find('input[name$="[meta_title]"]').val(parsed.metaTitle);
                        $item.find('textarea[name$="[meta_description]"]').val(parsed.metaDescription);
                        $item.find('textarea[name$="[description]"]').val(parsed.description);
                    }
                } else {
                    alert(response.data && response.data.message ? response.data.message : 'AI generation failed.');
                }
            },
            error: function(xhr) {
                alert('AI generation failed.');
            },
            complete: function() {
                $btn.prop('disabled', false).text('Generate with AI');
            }
        });
    });
    
    // Generate with AI button handler for About section
    $(document).on('click', '.bsg-generate-about-ai-content', function() {
        const $btn = $(this);
        const $section = $btn.closest('.bsg-ai-prompt-section');
        const $status = $section.find('.bsg-ai-status');
        const $loading = $status.find('.bsg-ai-loading');
        const $success = $status.find('.bsg-ai-success');
        const $error = $status.find('.bsg-ai-error');
        
        // Show loading
        $status.show();
        $loading.show();
        $success.hide();
        $error.hide();
        
        // Get form data
        const $form = $('#bsg-settings-form');
        const formData = new FormData($form[0]);
        formData.append('action', 'bsg_generate_ai_content');
        formData.append('type', 'about');
        formData.append('nonce', aiNonce());
        
        // Add about-specific fields
        const aiPrompt = $section.find('textarea[name="about_ai_prompt"]').val();
        const aiStyle = $section.find('select[name="about_ai_style"]').val();
        const aiLength = $section.find('select[name="about_ai_length"]').val();
        
        formData.append('fields[ai_prompt]', aiPrompt);
        formData.append('fields[ai_style]', aiStyle);
        formData.append('fields[ai_length]', aiLength);
        
        $.ajax({
            url: ajaxURL,
            type: 'POST',
            dataType: 'json',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                if (response.success && response.data.content) {
                    const content = response.data.content;
                    
                    // Process the structured content and populate fields
                    if (typeof content === 'object') {
                        // Populate About section fields with structured content
                        if (content.hero_tagline) {
                            $('input[name="about_home_tagline"]').val(content.hero_tagline.replace(/<[^>]*>/g, ''));
                        }
                        if (content.hero_title) {
                            $('input[name="about_home_headline"]').val(content.hero_title.replace(/<[^>]*>/g, ''));
                        }
                        if (content.who_we_are_description) {
                            $('textarea[name="about_home_desc"]').val(content.who_we_are_description.replace(/<[^>]*>/g, ''));
                        }
                        if (content.years_experience) {
                            $('input[name="about_home_years"]').val(content.years_experience);
                        }
                        if (content.experience_label) {
                            $('input[name="about_home_experience_label"]').val(content.experience_label);
                        }
                        if (content.cta_text) {
                            $('input[name="about_home_cta"]').val(content.cta_text.replace(/<[^>]*>/g, ''));
                        }
                        if (content.cta_link) {
                            $('input[name="about_home_cta_link"]').val(content.cta_link);
                        }
                        
                        // Also populate the main about page fields
                        if (content.who_we_are_title) {
                            $('input[name="about_headline"]').val(content.who_we_are_title.replace(/<[^>]*>/g, ''));
                        }
                        if (content.who_we_are_description) {
                            $('textarea[name="about_description"]').val(content.who_we_are_description.replace(/<[^>]*>/g, ''));
                        }
                        if (content.cta_text) {
                            $('input[name="about_cta"]').val(content.cta_text.replace(/<[^>]*>/g, ''));
                        }
                        if (content.cta_link) {
                            $('input[name="about_cta_link"]').val(content.cta_link);
                        }
                        
                        // Show success message
                        $loading.hide();
                        $success.show().text('About content generated successfully!');
                        
                        // Auto-save settings
                        saveSettings();
                        
                    } else {
                        $loading.hide();
                        $error.show().text('Invalid content format received.');
                    }
                } else {
                    $loading.hide();
                    $error.show().text(response.data && response.data.message ? response.data.message : 'AI generation failed.');
                }
            },
            error: function(xhr) {
                $loading.hide();
                $error.show().text('AI generation failed. Please try again.');
            }
        });
    });
    
    // Function to parse AI-generated content
    function parseAIContent(content, type) {
        const lines = (content || '').split('\n');
        const parsed = {};
        let currentField = '';
        let currentContent = '';

        lines.forEach(function(line) {
            const trimmedLine = line.trim();

            if (type === 'about') {
                if (trimmedLine.toLowerCase().startsWith('meta title:')) {
                    parsed.metaTitle = trimmedLine.replace(/meta title:/i, '').trim();
                } else if (trimmedLine.toLowerCase().startsWith('meta description:')) {
                    parsed.metaDescription = trimmedLine.replace(/meta description:/i, '').trim();
                } else if (trimmedLine.toLowerCase().startsWith('about headline:')) {
                    parsed.headline = trimmedLine.replace(/about headline:/i, '').trim();
                } else if (trimmedLine.toLowerCase().startsWith('about subheadline:')) {
                    parsed.subheadline = trimmedLine.replace(/about subheadline:/i, '').trim();
                } else if (trimmedLine.toLowerCase().startsWith('about description:')) {
                    currentField = 'description';
                    currentContent = trimmedLine.replace(/about description:/i, '').trim() + '\n';
                } else if (trimmedLine.toLowerCase().startsWith('about image alt:')) {
                    parsed.imageAlt = trimmedLine.replace(/about image alt:/i, '').trim();
                } else if (trimmedLine.toLowerCase().startsWith('about cta:')) {
                    parsed.cta = trimmedLine.replace(/about cta:/i, '').trim();
                } else if (trimmedLine.toLowerCase().startsWith('about cta link:')) {
                    parsed.ctaLink = trimmedLine.replace(/about cta link:/i, '').trim();
                } else if (currentField === 'description' && trimmedLine) {
                    currentContent += trimmedLine + '\n';
                }
            } else if (type === 'service') {
                if (trimmedLine.toLowerCase().startsWith('meta title:')) {
                    parsed.metaTitle = trimmedLine.replace(/meta title:/i, '').trim();
                } else if (trimmedLine.toLowerCase().startsWith('meta description:')) {
                    parsed.metaDescription = trimmedLine.replace(/meta description:/i, '').trim();
                } else if (trimmedLine.toLowerCase().startsWith('service description:')) {
                    currentField = 'description';
                    currentContent = trimmedLine.replace(/service description:/i, '').trim() + '\n';
                } else if (currentField === 'description' && trimmedLine) {
                    currentContent += trimmedLine + '\n';
                }
            } else if (type === 'location') {
                if (trimmedLine.toLowerCase().startsWith('meta title:')) {
                    parsed.metaTitle = trimmedLine.replace(/meta title:/i, '').trim();
                } else if (trimmedLine.toLowerCase().startsWith('meta description:')) {
                    parsed.metaDescription = trimmedLine.replace(/meta description:/i, '').trim();
                } else if (trimmedLine.toLowerCase().startsWith('location description:')) {
                    currentField = 'description';
                    currentContent = trimmedLine.replace(/location description:/i, '').trim() + '\n';
                } else if (currentField === 'description' && trimmedLine) {
                    currentContent += trimmedLine + '\n';
                }
            }
        });

        if (currentContent) {
            parsed.description = currentContent.trim();
        }

        // Fallback: if no structured markers, and content looks like HTML, use raw content as description
        if (!parsed.description && /<\/?[a-z][\s\S]*>/i.test(content || '')) {
            parsed.description = content;
        }

        return parsed;
    }
    
    // AI Prompt System for Services
    function initAIPromptSystem() {
        // Handle AI prompt toggle
        $(document).on('change', '.bsg-ai-prompt-toggle', function() {
            const $serviceItem = $(this).closest('.bsg-service-item');
            const $promptContent = $serviceItem.find('.bsg-ai-prompt-content');
            const $generateButton = $serviceItem.find('.bsg-generate-ai-content');
            
            if ($(this).is(':checked')) {
                // Use default prompt - hide custom settings, show generate button with default text
                $promptContent.slideUp(200);
                $generateButton.show().text('Generate Description');
            } else {
                // Use custom prompt - show custom settings, show generate button with custom text
                $promptContent.slideDown(200);
                $generateButton.show().text('Generate with Custom Prompt');
            }
        });
        
        // Handle generate AI content button
        $(document).on('click', '.bsg-generate-ai-content', function() {
            const $button = $(this);
            const $serviceItem = $button.closest('.bsg-service-item');
            const serviceIndex = $serviceItem.data('index');
            const $status = $serviceItem.find('.bsg-ai-status');
            const $loading = $status.find('.bsg-ai-loading');
            const $success = $status.find('.bsg-ai-success');
            const $error = $status.find('.bsg-ai-error');
            
            // Get service data
            const serviceName = $serviceItem.find('input[name="services[' + serviceIndex + '][name]"]').val();
            const customPrompt = $serviceItem.find('textarea[name="services[' + serviceIndex + '][ai_prompt]"]').val();
            const aiStyle = $serviceItem.find('select[name="services[' + serviceIndex + '][ai_style]"]').val();
            const aiLength = $serviceItem.find('select[name="services[' + serviceIndex + '][ai_length]"]').val();
            
            if (!serviceName) {
                alert('Please enter a service name first.');
                return;
            }
            
            // Show loading state
            $button.prop('disabled', true).text('Generating...');
            $status.show();
            $loading.show();
            $success.hide();
            $error.hide();
            
            // Prepare data for AJAX
            const formData = {
                service_name: serviceName,
                custom_prompt: customPrompt,
                ai_style: aiStyle,
                ai_length: aiLength,
                service_index: serviceIndex
            };
            
            // Make AJAX call to generate content
            $.ajax({
                url: ajaxURL,
                type: 'POST',
                data: {
                    action: 'bsg_generate_service_description',
                    nonce: wpNonce(),
                    form_data: formData
                },
                success: function(response) {
                    $loading.hide();
                    
                    if (response.success && response.data.description) {
                        // Update the description field
                        $serviceItem.find('textarea[name="services[' + serviceIndex + '][description]"]').val(response.data.description);
                        
                        // Show success message
                        $success.show();
                        
                        // Hide success message after 3 seconds
                        setTimeout(function() {
                            $success.fadeOut();
                        }, 3000);
                    } else {
                        // Show error message
                        $error.show().text(response.data && response.data.message ? response.data.message : 'Failed to generate content.');
                        
                        // Hide error message after 5 seconds
                        setTimeout(function() {
                            $error.fadeOut();
                        }, 5000);
                    }
                },
                error: function() {
                    $loading.hide();
                    $error.show().text('Network error occurred. Please try again.');
                    
                    // Hide error message after 5 seconds
                    setTimeout(function() {
                        $error.fadeOut();
                    }, 5000);
                },
                complete: function() {
                    $button.prop('disabled', false).text('Generate Description');
                }
            });
        });
        
        // Initialize existing AI prompt toggles
        $('.bsg-ai-prompt-toggle:checked').each(function() {
            const $serviceItem = $(this).closest('.bsg-service-item');
            const $promptContent = $serviceItem.find('.bsg-ai-prompt-content');
            const $generateButton = $serviceItem.find('.bsg-generate-ai-content');
            
            // Default is checked, so hide custom settings and show generate button with default text
            $promptContent.hide();
            $generateButton.show().text('Generate Description');
        });
        
        // Initialize unchecked toggles (show custom settings)
        $('.bsg-ai-prompt-toggle:not(:checked)').each(function() {
            const $serviceItem = $(this).closest('.bsg-service-item');
            const $promptContent = $serviceItem.find('.bsg-ai-prompt-content');
            const $generateButton = $serviceItem.find('.bsg-generate-ai-content');
            
            $promptContent.show();
            $generateButton.show().text('Generate with Custom Prompt');
        });
    }
    
    // Initialize AI prompt system
    initAIPromptSystem();
    
    // Initialize AI template system
    initAITemplateSystem();
    
    // AI Template System Functions
    function initAITemplateSystem() {
        // Handle service template system toggle
        $('input[name="use_ai_template_system"]').on('change', function() {
            const $templateEditor = $('.bsg-template-editor');
            if ($(this).is(':checked')) {
                $templateEditor.slideDown(200);
            } else {
                $templateEditor.slideUp(200);
            }
        });
        
        // Handle location template system toggle
        $('input[name="use_location_ai_template"]').on('change', function() {
            const $templateEditor = $(this).closest('.bsg-ai-template-settings').find('.bsg-template-editor');
            if ($(this).is(':checked')) {
                $templateEditor.slideDown(200);
            } else {
                $templateEditor.slideUp(200);
            }
        });
    }
    
    // Reset to default template
    window.resetToDefaultTemplate = function() {
        if (confirm('Are you sure you want to reset to the default template? This will overwrite your current template.')) {
            const defaultTemplate = `<div class="service-description">
    <p class="service-intro">{service_intro}</p>
    
    <br>
    
    <h3>Why Choose Our {service_name}</h3>
    <p>{why_choose_intro}</p>
    <ul class="benefits-list">
        {benefits_list}
    </ul>
    
    <br>
    
    <h3>Our {service_name} Process</h3>
    <p>{process_intro}</p>
    <ol class="process-steps">
        {process_steps}
    </ol>
    
    <br>
    
    <div class="call-to-action">
        <h3>Ready to Get Started?</h3>
        <p>{cta_text}</p>
        <p class="contact-info">Call us today at <strong>{phone_number}</strong> for a free consultation!</p>
    </div>
</div>`;
            $('textarea[name="ai_service_template"]').val(defaultTemplate);
        }
    };
    
    // Preview template
    window.previewTemplate = function() {
        const template = $('textarea[name="ai_service_template"]').val();
        alert('Template Preview:\n\n' + template);
    };
    
    // Reset to default location template
    window.resetToDefaultLocationTemplate = function() {
        if (confirm('Are you sure you want to reset to the default location template? This will overwrite your current template.')) {
            const defaultTemplate = `<div class="location-description">
    <p class="location-intro">{location_intro}</p>
    
    <div class="location-section">
        <h2>Why Choose {business_name} in {city}</h2>
        <p>{why_choose_intro}</p>
        <ul class="benefits-list">
            {benefits_list}
        </ul>
    </div>
    
    <div class="location-section">
        <h2>Our Services in {city}</h2>
        <p>{services_intro}</p>
        <ul class="services-list">
            {services_list}
        </ul>
    </div>
    
    <div class="location-section">
        <h2>Local Expertise</h2>
        <p>{local_expertise_intro}</p>
        <ul class="expertise-points">
            {expertise_points}
        </ul>
    </div>
    
    <div class="location-section">
        <h2>What Makes Us Different</h2>
        <ul class="differentiation-points">
            {differentiation_points}
        </ul>
    </div>
    
    <div class="call-to-action">
        <h3>Ready to Get Started in {city}?</h3>
        <p>{cta_text}</p>
        <p class="contact-info">Call us today at <strong>{phone_number}</strong> for a free consultation in {city}, {state}!</p>
    </div>
</div>`;
            $('textarea[name="ai_location_template"]').val(defaultTemplate);
        }
    };
    
    // Preview location template
    window.previewLocationTemplate = function() {
        const template = $('textarea[name="ai_location_template"]').val();
        alert('Location Template Preview:\n\n' + template);
    };
    
    // Add AI prompt section to new services
    const originalAddServiceItem = addServiceItem;
    addServiceItem = function(serviceData = null) {
        const $newService = originalAddServiceItem(serviceData);
        
        // Add AI prompt section to the new service
        const serviceIndex = $newService.data('index');
        const aiPromptSection = `
            <!-- AI Prompt Section -->
            <div class="bsg-ai-prompt-section" style="margin: 1rem 0; padding: 1rem; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
                <div class="bsg-ai-prompt-header" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
                    <label style="display: flex; align-items: center; gap: 0.5rem; font-weight: 600;">
                        <input type="checkbox" name="services[${serviceIndex}][use_ai_prompt]" value="1" checked class="bsg-ai-prompt-toggle">
                        🤖 Use Default AI Prompt
                    </label>
                    <button type="button" class="button bsg-generate-ai-content" data-service-index="${serviceIndex}" style="background: #007cba; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
                        Generate Description
                    </button>
                </div>
                
                <div class="bsg-ai-prompt-content" style="display: none;">
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Custom AI Prompt for Service Description</label>
                        <textarea name="services[${serviceIndex}][ai_prompt]" class="large-text" rows="4" placeholder="Write a custom prompt for AI to generate this service description..."></textarea>
                        <p class="description">Customize the AI prompt for this specific service. Use placeholders like {serviceName}, {businessName}, {location}.</p>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Content Style</label>
                        <select name="services[${serviceIndex}][ai_style]" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                            <option value="professional">Professional</option>
                            <option value="conversational">Conversational</option>
                            <option value="technical">Technical</option>
                            <option value="casual">Casual</option>
                        </select>
                    </div>
                    
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Content Length</label>
                        <select name="services[${serviceIndex}][ai_length]" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
                            <option value="short">Short (300-500 words)</option>
                            <option value="medium">Medium (500-800 words)</option>
                            <option value="long">Long (800-1200 words)</option>
                        </select>
                    </div>
                    
                    <div class="bsg-ai-status" style="display: none; padding: 0.75rem; border-radius: 4px; margin-top: 1rem;">
                        <div class="bsg-ai-loading" style="display: none;">
                            <span style="display: inline-block; width: 16px; height: 16px; border: 2px solid #f3f3f3; border-top: 2px solid #007cba; border-radius: 50%; animation: spin 1s linear infinite;"></span>
                            Generating AI content...
                        </div>
                        <div class="bsg-ai-success" style="display: none; color: #28a745;">
                            ✅ Description generated successfully!
                        </div>
                        <div class="bsg-ai-error" style="display: none; color: #dc3545;">
                            ❌ Error generating content. Please try again.
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert AI prompt section after service title
        $newService.find('label:contains("Service Title")').closest('label').after(aiPromptSection);
        
        return $newService;
    };

    // Generate Description for Locations (new button)
    $(document).on('click', '.bsg-generate-location-ai-content', function() {
        const $button = $(this);
        const $item = $button.closest('.bsg-location-item');
        const index = $item.data('index');
        const $status = $item.find('.bsg-ai-status');
        const $loading = $status.find('.bsg-ai-loading');
        const $success = $status.find('.bsg-ai-success');
        const $error = $status.find('.bsg-ai-error');

        const cityName = $item.find('input[name="locations['+index+'][name]"]').val();
        const stateName = $item.find('select[name="locations['+index+'][state]"]').val();
        const zipCodeOverride = $item.find('input[name="locations['+index+'][zip_code]"]').val();
        const useDefault = $item.find('.bsg-location-ai-toggle').is(':checked');
        const customPrompt = $item.find('textarea[name="locations['+index+'][ai_prompt]"]').val();
        const aiStyle = $item.find('select[name="locations['+index+'][ai_style]"]').val() || 'professional';
        const aiLength = $item.find('select[name="locations['+index+'][ai_length]"]').val() || 'medium';
        if (!cityName) { alert('Please enter city name first.'); return; }

        // Show loading state
        $button.prop('disabled', true).text('Generating...');
        $status.show(); $loading.show(); $success.hide(); $error.hide();

        $.ajax({
            url: ajaxURL,
            type: 'POST',
            dataType: 'json',
            data: {
                action: 'bsg_generate_ai_content',
                nonce: aiNonce(),
                type: 'location',
                fields: { ai_style: aiStyle, ai_length: aiLength, ai_prompt: useDefault ? '' : (customPrompt||'') },
                location_data: { name: cityName, state: stateName, zip_code: zipCodeOverride }
            },
            success: function(response) {
                $loading.hide();
                if (response.success && response.data.content) {
                    const parsed = parseAIContent(response.data.content, 'location');
                    const finalDesc = parsed.description || response.data.content || '';
                    if (finalDesc) $item.find('textarea[name="locations['+index+'][description]"]').val(finalDesc);
                    if (parsed.metaTitle) { $item.find('input[name="locations['+index+'][meta_title]"]').val(parsed.metaTitle); }
                    if (parsed.metaDescription) { $item.find('textarea[name="locations['+index+'][meta_description]"]').val(parsed.metaDescription); }
                    $success.show(); setTimeout(()=>{$success.fadeOut();},3000);
                } else {
                    $error.show().text(response.data && response.data.message ? response.data.message : 'Failed to generate content.');
                    setTimeout(()=>{$error.fadeOut();},5000);
                }
            },
            error: function(){ $loading.hide(); $error.show().text('Network error occurred. Please try again.'); setTimeout(()=>{$error.fadeOut();},5000); },
            complete: function(){ $button.prop('disabled', false).text(useDefault ? 'Generate Description' : 'Generate with Custom Prompt'); }
        });
    });

        function toSlug(s){return (s||'').toString().toLowerCase().trim().replace(/[^a-z0-9\s-]/g,'').replace(/[\s-]+/g,'-');}
    
    function updateSlugPreview($item){
        const city = $item.find('input[name$="[name]"]').val();
        const zip = $item.find('input[name$="[zip_code]"]').val();
        const slug = city ? toSlug(city) + (zip ? '-' + zip : '') : '';
        $item.find('.bsg-slug-preview code').text('/service-locations/' + slug);
    }
    
    function fetchZipCode(city, state, $item) {
        if (!city || !state) return;
        
        // Convert state name to abbreviation
        const stateAbbr = getStateAbbreviation(state);
        if (!stateAbbr) return;
        
        const zipHint = $item.find('.zip-hint');
        if (zipHint.length) zipHint.text('Searching for ZIP code...');
        
        const url = `https://api.zippopotam.us/us/${stateAbbr.toLowerCase()}/${encodeURIComponent(city.toLowerCase())}`;
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data && data.places && data.places.length > 0) {
                    const zipCode = data.places[0]['post code'];
                    $item.find('input[name$="[zip_code]"]').val(zipCode);
                    if (zipHint.length) zipHint.text(`✅ Auto-detected ZIP: ${zipCode}`);
                    updateSlugPreview($item);
                } else {
                    if (zipHint.length) zipHint.text('ZIP code not found for this city/state combination');
                }
            })
            .catch(error => {
                console.error('Could not auto-fetch ZIP code:', error);
                if (zipHint.length) zipHint.text('❌ Error fetching ZIP code. Please enter manually.');
            });
    }
    
    function getStateAbbreviation(stateName) {
        const stateMap = {
            'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
            'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'District of Columbia': 'DC',
            'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL',
            'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA',
            'Maine': 'ME', 'Maryland': 'MD', 'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN',
            'Mississippi': 'MS', 'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
            'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
            'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK', 'Oregon': 'OR',
            'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC', 'South Dakota': 'SD',
            'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT', 'Virginia': 'VA',
            'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY'
        };
        return stateMap[stateName] || null;
    }

    // Auto-fetch ZIP and state when city changes for a location card
    $(document).on('blur change', '.bsg-location-item input[name$="[name]"]', function(){
        const $cityInput = $(this);
        const $item = $cityInput.closest('.bsg-location-item');
        const index = $item.data('index');
        const city = $cityInput.val().trim();
        const stateSelect = $item.find('select[name="locations['+index+'][state]"]');
        const zipInput = $item.find('input[name="locations['+index+'][zip_code]"]');
        const zipHint = $item.find('.zip-hint');

        updateSlugPreview($item);

        // If city is empty, skip
        if (!city) return;

        // Check if state is already selected
        let stateFull = stateSelect.val();
        if (!stateFull) {
            const globalState = $('select#state, input#state').val();
            if (globalState) stateFull = globalState;
        }

        // If state is selected, search in that state
        if (stateFull) {
            searchCityInState(city, stateFull, $item);
        } else {
            // If no state selected, search across common states
            searchCityAcrossStates(city, $item);
        }
    });

    // Function to search city in a specific state
    function searchCityInState(city, stateFull, $item) {
        const stateSelect = $item.find('select[name*="[state]"]');
        const zipInput = $item.find('input[name*="[zip_code]"]');
        const zipHint = $item.find('.zip-hint');
        
        const stateMap = { 'Alabama':'AL','Alaska':'AK','Arizona':'AZ','Arkansas':'AR','California':'CA','Colorado':'CO','Connecticut':'CT','Delaware':'DE','District of Columbia':'DC','Florida':'FL','Georgia':'GA','Hawaii':'HI','Idaho':'ID','Illinois':'IL','Indiana':'IN','Iowa':'IA','Kansas':'KS','Kentucky':'KY','Louisiana':'LA','Maine':'ME','Maryland':'MD','Massachusetts':'MA','Michigan':'MI','Minnesota':'MN','Mississippi':'MS','Missouri':'MO','Montana':'MT','Nebraska':'NE','Nevada':'NV','New Hampshire':'NH','New Jersey':'NJ','New Mexico':'NM','New York':'NY','North Carolina':'NC','North Dakota':'ND','Ohio':'OH','Oklahoma':'OK','Oregon':'OR','Pennsylvania':'PA','Rhode Island':'RI','South Carolina':'SC','South Dakota':'SD','Tennessee':'TN','Texas':'TX','Utah':'UT','Vermont':'VT','Virginia':'VA','Washington':'WA','West Virginia':'WV','Wisconsin':'WI','Wyoming':'WY' };
        const abbr = stateMap[stateFull] || '';
        if (!abbr) return;

        if (zipHint.length) zipHint.text('Searching for ZIP code...');

        const url = `https://api.zippopotam.us/us/${encodeURIComponent(abbr.toLowerCase())}/${encodeURIComponent(city.toLowerCase())}`;
        fetch(url)
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (!data || !Array.isArray(data.places) || !data.places.length) {
                    if (zipHint.length) zipHint.text('ZIP code not found for this city/state combination');
                    return;
                }
                const place = data.places[0];
                const zip = place['post code'] || '';
                if (zip) {
                    zipInput.val(zip);
                    if (zipHint.length) zipHint.text(`✅ Auto-detected ZIP: ${zip}`);
                    updateSlugPreview($item);
                }
            })
            .catch((error) => {
                console.error('Error fetching ZIP code:', error);
                if (zipHint.length) zipHint.text('❌ Error fetching ZIP code. Please enter manually.');
            });
    }

    // Function to search city across multiple states
    function searchCityAcrossStates(city, $item) {
        const stateSelect = $item.find('select[name*="[state]"]');
        const zipInput = $item.find('input[name*="[zip_code]"]');
        const zipHint = $item.find('.zip-hint');
        
        // Common states to search (most populated states first)
        const commonStates = [
            'California', 'Texas', 'Florida', 'New York', 'Pennsylvania', 'Illinois', 'Ohio', 'Georgia', 
            'North Carolina', 'Michigan', 'New Jersey', 'Virginia', 'Washington', 'Arizona', 'Massachusetts', 
            'Tennessee', 'Indiana', 'Missouri', 'Maryland', 'Colorado', 'Wisconsin', 'Minnesota', 'South Carolina', 
            'Alabama', 'Louisiana', 'Kentucky', 'Oregon', 'Oklahoma', 'Connecticut', 'Utah', 'Iowa', 'Nevada', 
            'Arkansas', 'Mississippi', 'Kansas', 'New Mexico', 'Nebraska', 'West Virginia', 'Idaho', 'Hawaii', 
            'New Hampshire', 'Maine', 'Montana', 'Rhode Island', 'Delaware', 'South Dakota', 'North Dakota', 
            'Alaska', 'District of Columbia', 'Vermont', 'Wyoming'
        ];

        if (zipHint.length) zipHint.text('Searching for city across states...');

        const stateMap = { 'Alabama':'AL','Alaska':'AK','Arizona':'AZ','Arkansas':'AR','California':'CA','Colorado':'CO','Connecticut':'CT','Delaware':'DE','District of Columbia':'DC','Florida':'FL','Georgia':'GA','Hawaii':'HI','Idaho':'ID','Illinois':'IL','Indiana':'IN','Iowa':'IA','Kansas':'KS','Kentucky':'KY','Louisiana':'LA','Maine':'ME','Maryland':'MD','Massachusetts':'MA','Michigan':'MI','Minnesota':'MN','Mississippi':'MS','Missouri':'MO','Montana':'MT','Nebraska':'NE','Nevada':'NV','New Hampshire':'NH','New Jersey':'NJ','New Mexico':'NM','New York':'NY','North Carolina':'NC','North Dakota':'ND','Ohio':'OH','Oklahoma':'OK','Oregon':'OR','Pennsylvania':'PA','Rhode Island':'RI','South Carolina':'SC','South Dakota':'SD','Tennessee':'TN','Texas':'TX','Utah':'UT','Vermont':'VT','Virginia':'VA','Washington':'WA','West Virginia':'WV','Wisconsin':'WI','Wyoming':'WY' };

        // Search through states sequentially
        let currentIndex = 0;
        
        function searchNextState() {
            if (currentIndex >= commonStates.length) {
                if (zipHint.length) zipHint.text('City not found in common states. Please select state manually.');
                return;
            }

            const stateFull = commonStates[currentIndex];
            const abbr = stateMap[stateFull];
            
            if (zipHint.length) zipHint.text(`Searching in ${stateFull}...`);

            const url = `https://api.zippopotam.us/us/${encodeURIComponent(abbr.toLowerCase())}/${encodeURIComponent(city.toLowerCase())}`;
            
            fetch(url)
                .then(r => r.ok ? r.json() : null)
                .then(data => {
                    if (data && Array.isArray(data.places) && data.places.length > 0) {
                        // Found the city!
                        const place = data.places[0];
                        const zip = place['post code'] || '';
                        
                        if (zip) {
                            // Auto-select the state
                            stateSelect.val(stateFull).trigger('change');
                            // Set the ZIP code
                            zipInput.val(zip);
                            if (zipHint.length) zipHint.text(`✅ Found in ${stateFull}: ${zip}`);
                            updateSlugPreview($item);
                            return; // Stop searching
                        }
                    }
                    
                    // Not found in this state, try next
                    currentIndex++;
                    setTimeout(searchNextState, 200); // Small delay to avoid overwhelming the API
                })
                .catch((error) => {
                    console.error(`Error searching in ${stateFull}:`, error);
                    currentIndex++;
                    setTimeout(searchNextState, 200);
                });
        }
        
        searchNextState();
    }

    // Also update slug preview when state/zip changes
    $(document).on('change input', '.bsg-location-item select[name$="[state]"]', function(){
        const $item = $(this).closest('.bsg-location-item');
        updateSlugPreview($item);
        
        // If state is selected and city is filled but ZIP is empty, try to fetch ZIP
        const cityInput = $item.find('input[name$="[name]"]');
        const zipInput = $item.find('input[name$="[zip_code]"]');
        const city = cityInput.val().trim();
        const zip = zipInput.val().trim();
        
        if (city && !zip) {
            // Trigger the city input blur event to fetch ZIP
            cityInput.trigger('blur');
        }
    });
    $(document).on('input', '.bsg-location-item input[name$="[zip_code]"]', function(){
        updateSlugPreview($(this).closest('.bsg-location-item'));
    });

    // Ensure only one content field is used: Description (AI) + Meta Description
    // No changes required to parsing: we already map AI -> description, meta -> meta_description.

    // Toggle show/hide for Location AI custom prompt
    $(document).on('change', '.bsg-location-ai-toggle', function(){
        const $item = $(this).closest('.bsg-location-item');
        const $content = $item.find('.bsg-location-ai-content');
        const $btn = $item.find('.bsg-generate-location-ai-content');
        if ($(this).is(':checked')) { $content.slideUp(200); $btn.text('Generate Description'); }
        else { $content.slideDown(200); $btn.text('Generate with Custom Prompt'); }
    });

    // Initialize existing toggles on load
    $('.bsg-location-ai-toggle').each(function(){
        const $item = $(this).closest('.bsg-location-item');
        const $content = $item.find('.bsg-location-ai-content');
        const $btn = $item.find('.bsg-generate-location-ai-content');
        
        // Ensure checkbox is checked by default if not explicitly unchecked
        if (!$(this).prop('checked') && !$(this).prop('indeterminate')) {
            $(this).prop('checked', true);
        }
        
        if ($(this).is(':checked')) { 
            $content.hide(); 
            $btn.text('Generate Description'); 
        } else { 
            $content.show(); 
            $btn.text('Generate with Custom Prompt'); 
        }
    });

    // Theme palette: update hidden field and live preview
    const palettes = {
        ocean: { primary:'#2563eb', accent:'#0ea5e9', surface:'#f1f5f9', text:'#0f172a' },
        emerald: { primary:'#059669', accent:'#10b981', surface:'#ecfdf5', text:'#064e3b' },
        amber: { primary:'#f59e0b', accent:'#fbbf24', surface:'#fffbeb', text:'#78350f' },
        rose: { primary:'#e11d48', accent:'#f43f5e', surface:'#fff1f2', text:'#881337' },
        slate: { primary:'#334155', accent:'#64748b', surface:'#f8fafc', text:'#0f172a' },
        violet: { primary:'#7c3aed', accent:'#a78bfa', surface:'#f5f3ff', text:'#2e1065' },
        indigo: { primary:'#4f46e5', accent:'#818cf8', surface:'#eef2ff', text:'#1e1b4b' },
        sky: { primary:'#0284c7', accent:'#38bdf8', surface:'#e0f2fe', text:'#0c4a6e' },
        lime: { primary:'#65a30d', accent:'#84cc16', surface:'#f7fee7', text:'#365314' },
        orange: { primary:'#ea580c', accent:'#fb923c', surface:'#fff7ed', text:'#7c2d12' },
        pink: { primary:'#db2777', accent:'#f472b6', surface:'#fdf2f8', text:'#831843' },
        neutral: { primary:'#111827', accent:'#6b7280', surface:'#f3f4f6', text:'#111827' }
    };

    function applyPreview(theme){
        if(!theme){ theme = $('#color_theme').val(); }
        if(!theme){ theme = 'ocean'; }
        const p = palettes[theme] || palettes['ocean'];
        $('#color_theme').val(theme);
        $('#bsg-prev-tag').css({color:p.accent});
        $('#bsg-prev-title').css({color:p.text});
        $('#bsg-prev-text').css({color:p.text});
        $('#bsg-theme-preview > div').css({background:p.surface});
        $('#bsg-prev-btn').css({background:p.primary, color:'#fff'});
    }

    // Click handler for palette tiles
    $(document).on('click','.bsg-theme-palette',function(){
        const theme = $(this).data('theme');
        $(this).find('input[type="radio"]').prop('checked', true);
        applyPreview(theme);
    });

    // Initialize preview with saved theme
    applyPreview($('#color_theme').val() || 'ocean');

    // Before saving, propagate palette colors into key settings
    const _collectFormData = collectFormData;
    collectFormData = function(){
        const data = _collectFormData();
        let theme = $('#color_theme').val();
        if(!theme){ theme = 'ocean'; }
        const p = palettes[theme] || palettes['ocean'];
        // Map to commonly used colors across templates
        data.primary_color = p.primary;
        data.secondary_color = p.accent;
        data.text_color = p.text;
        data.surface_color = p.surface;
        // Enforce unified buttons (primary background, white text) everywhere
        const unifiedBg = p.primary;
        const unifiedText = '#ffffff';
        const unifyFields = [
            'hero_book_btn_bg','hero_book_btn_text','hero_call_btn_bg','hero_call_btn_text',
            'services_cta_bg','services_cta_text_color','locations_button_bg','locations_button_text',
            'about_button_bg_color','about_button_text_color','contact_submit_bg','contact_submit_text'
        ];
        data.hero_book_btn_bg = unifiedBg;
        data.hero_book_btn_text = unifiedText;
        data.hero_call_btn_bg = unifiedBg;
        data.hero_call_btn_text = unifiedText;
        data.services_cta_bg = unifiedBg;
        data.services_cta_text_color = unifiedText;
        data.locations_button_bg = unifiedBg;
        data.locations_button_text = unifiedText;
        data.about_button_bg_color = unifiedBg;
        data.about_button_text_color = unifiedText;
        data.contact_submit_bg = unifiedBg;
        data.contact_submit_text = unifiedText;
        // Headings (site-wide tone)
        data.heading_color = p.text;
        // About hero text (do not change background here)
        data.about_hero_text_color = '#ffffff';
        // Why Work With Us section: allow section color to follow theme and icons use accent
        data.why_work_bg_color = p.primary;
        data.why_work_heading_color = '#ffffff';
        data.why_work_subtitle_color = '#ffffff';
        data.why_work_card_title_color = '#ffffff';
        data.why_work_card_text_color = '#ffffff';
        data.why_work_icon_bg = p.accent;
        data.why_work_icon_color = '#ffffff';
        // About section defaults
        if(!data.about_who_we_are_bg_color) data.about_who_we_are_bg_color = p.surface;
        if(!data.about_who_we_are_text_color) data.about_who_we_are_text_color = p.text;
        return data;
    };

    // Disable per-button color inputs in UI to reduce customization noise
    $(function(){
        const disableSelectors = [
          'input[name="hero_book_btn_bg"]','input[name="hero_book_btn_text"]',
          'input[name="hero_call_btn_bg"]','input[name="hero_call_btn_text"]',
          'input[name="services_cta_bg"]','input[name="services_cta_text_color"]',
          'input[name="locations_button_bg"]','input[name="locations_button_text"]',
          'input[name="about_button_bg_color"]','input[name="about_button_text_color"]',
          'input[name="contact_submit_bg"]','input[name="contact_submit_text"]'
        ];
        disableSelectors.forEach(sel => {
            const $el = $(sel);
            if($el.length){
                $el.prop('disabled', true).closest('td, div, label').css('opacity',0.6).append('<div style="font-size:12px;color:#666;margin-top:4px;">Controlled by Color Theme</div>');
            }
        });
    });

    // Force native submission on plugin settings page to avoid stuck 'Saving...'
    if ($('.bsg-admin').length) {
        $('#bsg-settings-form').off('submit');
        $('#bsg-settings-form button[type="submit"]').off('click.bsgSave');
    }

    let __bsgManualPosting = false;
});
