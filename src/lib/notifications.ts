export function anilistNotification(message: string) {
  const options = {
      type: 'basic',
      title: 'Anilist',
      message: message,
      iconUrl:'../images/icon128.png'
  };
  chrome.notifications.create('', options);
}
