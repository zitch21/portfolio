const fs = require('fs');
const path = require('path');

const outputPath = path.join(__dirname, '..', 'env-config.js');

const config = {
  SUPABASE_URL: process.env.SUPABASE_URL || 'https://rbeqfojzlxrkjgiutlms.supabase.co',
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || 'YOUR_LOCAL_FALLBACK_KEY',
  EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY || 'YOUR_LOCAL_EMAILJS_PUBLIC_KEY',
  EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID || 'YOUR_LOCAL_SERVICE_ID',
  EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID || 'YOUR_LOCAL_TEMPLATE_ID'
};

const content = `// Generated for Vercel deployment
window.env = {
    SUPABASE_URL: ${JSON.stringify(config.SUPABASE_URL)},
    SUPABASE_ANON_KEY: ${JSON.stringify(config.SUPABASE_ANON_KEY)},
    EMAILJS_PUBLIC_KEY: ${JSON.stringify(config.EMAILJS_PUBLIC_KEY)},
    EMAILJS_SERVICE_ID: ${JSON.stringify(config.EMAILJS_SERVICE_ID)},
    EMAILJS_TEMPLATE_ID: ${JSON.stringify(config.EMAILJS_TEMPLATE_ID)}
};
`;

fs.writeFileSync(outputPath, content);
console.log(`Generated ${outputPath}`);
