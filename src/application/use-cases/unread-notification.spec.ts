import {
  InMemoryNotificationsRepository
} from "@test/repositories/in-memory-notifications-repository";
import {
  NotificationNotFound
} from '@application/use-cases/errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { UnreadNotification } from '@application/use-cases/unread-notification';

describe('Ununread notifiction', () => {
  it('should be able to unread a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    const notification = makeNotification({
      readtAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readtAt).toBeNull();
  });

  it('should not be able to unread a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationsRepository);

    await expect(() => {
      return unreadNotification.execute({
        notificationId: 'fale-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
