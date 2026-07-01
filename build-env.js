const fs = require('fs');

const envConfig = `window.env = {
    SUPABASE_URL: "${process.env.SUPABASE_URL || 'https://rbeqfojzlxrkjgiutlms.supabase.co'}",
    SUPABASE_ANON_KEY: "${process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJiZXFmb2p6bHhya2pnaXV0bG1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MTMxODIsImV4cCI6MjA5ODI4OTE4Mn0.3OzaN8ynDTMimb6Jtx_HQiQmRFc1GIWrEyUvTSeYD5Y'}",
    EMAILJS_SERVICE_ID: "${process.env.EMAILJS_SERVICE_ID || 'service_b6hmc3m'}",
    EMAILJS_TEMPLATE_ID: "${process.env.EMAILJS_TEMPLATE_ID || 'template_khez39i'}",
    EMAILJS_PUBLIC_KEY: "${process.env.EMAILJS_PUBLIC_KEY || 'I2raPgJS9o1Jh21Af'}"
};`;

try {
    fs.writeFileSync('env-config.js', envConfig);
    console.log('Successfully generated env-config.js');
} catch (err) {
    console.error('Failed to generate env-config.js:', err);
    process.exit(1);
}