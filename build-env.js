const fs = require('fs');

const envConfig = `window.env = {
    SUPABASE_URL: "${process.env.SUPABASE_URL || 'https://your-fallback-development-url.supabase.co'}",
    SUPABASE_ANON_KEY: "${process.env.SUPABASE_ANON_KEY || 'local_development_dummy_key'}",
    EMAILJS_SERVICE_ID: "${process.env.EMAILJS_SERVICE_ID || 'local_development_dummy_id'}",
    EMAILJS_TEMPLATE_ID: "${process.env.EMAILJS_TEMPLATE_ID || 'local_development_dummy_id'}",
    EMAILJS_PUBLIC_KEY: "${process.env.EMAILJS_PUBLIC_KEY || 'local_development_dummy_key'}"
};`;

try {
    fs.writeFileSync('env-config.js', envConfig);
    console.log('Successfully generated env-config.js');
} catch (err) {
    console.error('Failed to generate env-config.js:', err);
    process.exit(1);
}