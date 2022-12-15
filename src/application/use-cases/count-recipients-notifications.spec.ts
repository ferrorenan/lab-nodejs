import {
  InMemoryNotificationsRepository
} from "@test/repositories/in-memory-notifications-repository";
import { Notification } from '@application/entities/notfication';
import { Content } from '@application/entities/content';
import {
  CountRecipientNotifications
} from "@application/use-cases/count-recipient-notifications";
import { makeNotification } from "@test/factories/notification-factory";

describe('Count recipient notifictions', () => {
  it('should be count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationsRepository,
    );

    /*await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação'),
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação'),
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      new Notification({
        category: 'social',
        content: new Content('Nova solicitação'),
        recipientId: 'recipient-2',
      }),
    );*/

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-1',
      }),
    );

    await notificationsRepository.create(
      makeNotification({
        recipientId: 'recipient-2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
