import {
  InMemoryNotificationsRepository
} from "@test/repositories/in-memory-notifications-repository";
import {
  CountRecipientNotifications
} from "@application/use-cases/count-recipient-notifications";
import { makeNotification } from '@test/factories/notification-factory';
import {
  GetRecipientNotifications
} from "@application/use-cases/get-recipients-notifications";

describe('Get recipients notifictions', () => {
  it('should be count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const getRecipientsNotifications = new GetRecipientNotifications(
      notificationsRepository,
    );

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

    const { notifications } = await getRecipientsNotifications.execute({
      recipientId: 'recipient-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient-1' }),
        expect.objectContaining({ recipientId: 'recipient-1' }),
      ]),
    );
  });
});
