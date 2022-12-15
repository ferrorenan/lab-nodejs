import { Content } from "./content"
import { Notification } from "./notfication"

describe('Notification', () => {
    it('should be able to create notification', () => {
        const notification = new Notification({
            content: new Content('Nova solicitação'),
            category: 'social',
            recipientId: 'example-recipient-id'
        });
    
        expect(notification).toBeTruthy();
    });

});