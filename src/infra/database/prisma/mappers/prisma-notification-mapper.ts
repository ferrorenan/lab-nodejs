import { Notification } from '@application/entities/notfication';
import { Notification as RawNotification } from '@prisma/client';
import { Content } from '@application/entities/content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readtAt,
      creaedAt: notification.createdAt,
    };
  }

  static toDomain(raw: RawNotification): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readtAt: raw.readAt,
        canceledAt: raw.canceledAt,
        createdAt: raw.creaedAt,
      },
      raw.id,
    );
  }
}