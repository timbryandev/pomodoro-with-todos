export const hasNotifications = 'Notification' in window

export function requestNotifications() {
  if (!hasNotifications) return

  if (
    Notification.permission !== 'granted' &&
    Notification.permission !== 'denied'
  ) {
    return Notification.requestPermission().then(function (permission) {
      if (permission === 'granted') {
        new Notification(
          'You can disable notifications at any time - check your browser settings to learn how!',
        )
      }
    })
  }
}

export async function showNotification(message: string) {
  await requestNotifications()

  if (Notification.permission === 'granted') {
    new Notification(message)
  }
}
