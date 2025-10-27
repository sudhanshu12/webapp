# WordPress Contact Form Setup Guide

## Overview
This guide explains how to set up and use the contact form system in your WordPress theme to capture user-submitted messages.

## Features
- ✅ Secure form submission with nonce verification
- ✅ AJAX form submission for better user experience
- ✅ Database storage of all messages
- ✅ Email notifications to admin
- ✅ Auto-reply emails to users
- ✅ Admin panel to view and manage messages
- ✅ Message status tracking (New, Read, Replied, Closed)
- ✅ Admin notes for each message
- ✅ IP address and user agent logging

## Setup Instructions

### 1. Database Table Creation
The contact messages table will be created automatically when you activate the theme. If it doesn't get created, you can run the SQL file:

```sql
-- Run this in your WordPress database
-- File: wp-theme/CONTACT_FORM_SETUP.sql
```

### 2. Form Display
The contact form is automatically displayed on:
- Contact page (`contact.php`)
- Service pages (`page-service.php`) 
- Location pages (`location.php`)

### 3. Admin Panel Access
1. Log into your WordPress admin dashboard
2. Go to **Appearance > Contact Messages**
3. View all submitted messages
4. Update message status and add admin notes

## How It Works

### Form Submission Process
1. User fills out the contact form
2. Form data is validated and sanitized
3. Message is saved to database
4. Admin receives email notification
5. User receives auto-reply confirmation
6. Success message is displayed to user

### Database Structure
The `wp_bsg_contact_messages` table stores:
- `id` - Unique message ID
- `name` - User's name
- `email` - User's email address
- `subject` - Message subject
- `message` - Full message content
- `ip_address` - User's IP address
- `user_agent` - User's browser info
- `submitted_at` - Timestamp of submission
- `status` - Message status (new/read/replied/closed)
- `admin_notes` - Admin notes about the message

### Email Notifications
- **Admin Email**: Sent to the business email address with full message details
- **User Auto-Reply**: Sent to the user confirming their message was received

## Customization

### Form Styling
The form uses theme colors from your wizard settings:
- Primary button color
- Text colors
- Border colors
- Background colors

### Email Templates
You can customize the email templates by modifying the functions in `functions.php`:
- `bsg_handle_contact_form_submission()` - Regular form submission
- `bsg_ajax_contact_form_submission()` - AJAX form submission

### Form Fields
The form includes these fields:
- Name (required)
- Email (required)
- Subject (optional)
- Message (required)

## Security Features
- ✅ Nonce verification for CSRF protection
- ✅ Input sanitization and validation
- ✅ Email validation
- ✅ SQL injection prevention
- ✅ XSS protection

## Troubleshooting

### Form Not Working
1. Check if the database table exists
2. Verify WordPress email settings
3. Check browser console for JavaScript errors
4. Ensure theme is properly activated

### Emails Not Sending
1. Check WordPress email configuration
2. Verify SMTP settings if using email plugin
3. Check spam folders
4. Test with a simple WordPress email

### Database Issues
1. Run the SQL setup file manually
2. Check database permissions
3. Verify table prefix is correct

## File Locations
- **Main Functions**: `wp-theme/functions.php`
- **Contact Page**: `wp-theme/contact.php`
- **Simple Contact Page**: `wp-theme/page-contact.php`
- **SQL Setup**: `wp-theme/CONTACT_FORM_SETUP.sql`

## Support
If you encounter any issues:
1. Check the WordPress error logs
2. Verify all files are properly uploaded
3. Test with a fresh WordPress installation
4. Contact support with specific error messages

---

**Note**: This contact form system is designed to work seamlessly with your existing WordPress theme and business settings from the wizard.
