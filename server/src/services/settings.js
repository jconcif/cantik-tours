export const emailSettings = {
  sendOnBooking: true,
  sendOnPayment: true
};

export const getEmailSettings = () => {
  return emailSettings;
};

export const updateEmailSettings = (settings) => {
  if (typeof settings.sendOnBooking === 'boolean') {
    emailSettings.sendOnBooking = settings.sendOnBooking;
  }
  if (typeof settings.sendOnPayment === 'boolean') {
    emailSettings.sendOnPayment = settings.sendOnPayment;
  }
  return emailSettings;
};
