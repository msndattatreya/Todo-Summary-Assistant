// Add cross-fetch for Node.js environment
const fetch = require('cross-fetch');
global.fetch = fetch;

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = supabase;
