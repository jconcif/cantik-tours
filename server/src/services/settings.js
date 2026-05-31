export const globalSettings = {
  sendToAdmin: true,
  sendToClient: true,
  exchangeRate: 1.08 // Default rate
};

export const getGlobalSettings = () => globalSettings;

export const updateGlobalSettings = (settings) => {
  if (typeof settings.sendToAdmin === 'boolean') {
    globalSettings.sendToAdmin = settings.sendToAdmin;
  }
  if (typeof settings.sendToClient === 'boolean') {
    globalSettings.sendToClient = settings.sendToClient;
  }
  if (typeof settings.exchangeRate === 'number') {
    globalSettings.exchangeRate = settings.exchangeRate;
  }
  return globalSettings;
};
