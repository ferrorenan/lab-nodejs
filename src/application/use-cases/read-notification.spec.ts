import {
  InMemoryNotificationsRepository
} from "@test/repositories/in-memory-notifications-repository";
import {
  NotificationNotFound
} from '@application/use-cases/errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';
import { ReadNotification } from '@application/use-cases/read-notification';

describe('Read notifiction', () => {
  it('should be able to read a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepository.notifications[0].readtAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a notification when it does not exist', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const readNotification = new ReadNotification(notificationsRepository);

    await expect(() => {
      return readNotification.execute({
        notificationId: 'fale-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
