import { Notification } from '@application/entities/notfication';

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
}