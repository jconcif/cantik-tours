import fs from 'fs';
import path from 'path';

const settingsFile = path.resolve(process.cwd(), 'settings.json');

export let globalSettings = {
  sendClientOnBooking: true,
  sendAdminOnBooking: true,
  sendAdminOnPayment: true,
  exchangeRate: 1.08 // Default rate
};

try {
  if (fs.existsSync(settingsFile)) {
    const data = fs.readFileSync(settingsFile, 'utf8');
    const parsed = JSON.parse(data);
    globalSettings = { ...globalSettings, ...parsed };
  }
} catch (err) {
  console.error('Error loading settings.json:', err);
}

const saveSettings = () => {
  try {
    fs.writeFileSync(settingsFile, JSON.stringify(globalSettings, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving settings.json:', err);
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
  if (typeof settings.exchangeRate === 'number') {
    globalSettings.exchangeRate = settings.exchangeRate;
    changed = true;
  }
  
  if (changed) {
    saveSettings();
  }
  return globalSettings;
};
