-- Contact Form Database Setup
-- Run this SQL in your WordPress database if the table doesn't get created automatically

CREATE TABLE IF NOT EXISTS wp_bsg_contact_messages (
    id mediumint(9) NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    subject varchar(200) DEFAULT '',
    message text NOT NULL,
    ip_address varchar(45) DEFAULT '',
    user_agent text DEFAULT '',
    submitted_at datetime DEFAULT CURRENT_TIMESTAMP,
    status varchar(20) DEFAULT 'new',
    admin_notes text DEFAULT '',
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Note: Replace 'wp_' with your actual WordPress table prefix if different
