export const globalSettings = {
  sendClientOnBooking: true,
  sendAdminOnBooking: true,
  sendAdminOnPayment: true,
  exchangeRate: 1.08 // Default rate
};

export const getGlobalSettings = () => globalSettings;

export const updateGlobalSettings = (settings) => {
  if (typeof settings.sendClientOnBooking === 'boolean') {
    globalSettings.sendClientOnBooking = settings.sendClientOnBooking;
  }
  if (typeof settings.sendAdminOnBooking === 'boolean') {
    globalSettings.sendAdminOnBooking = settings.sendAdminOnBooking;
  }
  if (typeof settings.sendAdminOnPayment === 'boolean') {
    globalSettings.sendAdminOnPayment = settings.sendAdminOnPayment;
  }
  if (typeof settings.exchangeRate === 'number') {
    globalSettings.exchangeRate = settings.exchangeRate;
  }
  return globalSettings;
};
