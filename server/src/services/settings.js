import fs from 'fs';
import path from 'path';
import { supabase } from '../db.js';

const settingsFile = path.resolve(process.cwd(), 'settings.json');

export const globalSettings = {
  sendClientOnBooking: true,
  sendClientConfirmation: true,
  sendAdminOnBooking: true,
  sendAdminOnPayment: true,
  exchangeRate: 1.08, // Default rate
  notifications: {}   // Grid configurations
};

// Load local configuration as fallback/initial seed
try {
  if (fs.existsSync(settingsFile)) {
    const data = fs.readFileSync(settingsFile, 'utf8');
    const parsed = JSON.parse(data);
    Object.assign(globalSettings, parsed);
  }
} catch (err) {
  console.error('Error loading settings.json:', err);
}

// Load from Supabase with top-level await
try {
  const { data, error } = await supabase.from('settings').select('*').eq('key', 'global').maybeSingle();
  if (error) {
    console.warn('⚠️ Supabase settings table not ready or error:', error.message);
  } else if (data && data.value) {
    Object.assign(globalSettings, data.value);
    console.log('✅ Global settings loaded successfully from Supabase.');
  }
} catch (err) {
  console.error('⚠️ Failed to load settings from Supabase (using local/default values):', err.message);
}

const saveSettings = async () => {
  // Save local file
  try {
    fs.writeFileSync(settingsFile, JSON.stringify(globalSettings, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving settings.json:', err);
  }

  // Save to Supabase
  try {
    const { error } = await supabase.from('settings').upsert({
      key: 'global',
      value: globalSettings
    });
    if (error) {
      console.error('⚠️ Failed to save settings to Supabase:', error.message);
    } else {
      console.log('✅ Settings saved to Supabase successfully.');
    }
  } catch (err) {
    console.error('⚠️ Failed to save settings to Supabase (exception):', err.message);
  }
};

export const getGlobalSettings = () => globalSettings;

export const updateGlobalSettings = (settings) => {
  let changed = false;
  if (typeof settings.sendClientOnBooking === 'boolean') {
    globalSettings.sendClientOnBooking = settings.sendClientOnBooking;
    changed = true;
  }
  if (typeof settings.sendAdminOnBooking === 'boolean') {
    globalSettings.sendAdminOnBooking = settings.sendAdminOnBooking;
    changed = true;
  }
  if (typeof settings.sendAdminOnPayment === 'boolean') {
    globalSettings.sendAdminOnPayment = settings.sendAdminOnPayment;
    changed = true;
  }
  if (typeof settings.sendClientConfirmation === 'boolean') {
    globalSettings.sendClientConfirmation = settings.sendClientConfirmation;
    changed = true;
  }
  
  // Accept string numbers or floats for exchange rate
  if (settings.exchangeRate !== undefined) {
    const parsed = parseFloat(settings.exchangeRate);
    if (!isNaN(parsed) && parsed > 0) {
      globalSettings.exchangeRate = parsed;
      changed = true;
    }
  }

  if (settings.notifications && typeof settings.notifications === 'object') {
    globalSettings.notifications = { ...globalSettings.notifications, ...settings.notifications };
    changed = true;
  }
  
  if (changed) {
    saveSettings();
  }
  return globalSettings;
};

