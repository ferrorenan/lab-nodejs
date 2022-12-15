import { Content } from "./content"

describe('Notification content', () => {
    it('should be able to create notification content', () => {
        const content = new Content('Você recebeu uma solicitação');
    
        expect(Content).toBeTruthy();
    })
    
    it('hould not be able to create notification content with less than 5 caracters', () => {
        expect(() => new Content('aaa')).toThrow();
    })
    
    it('should not be able to create notification content with less than 240 caracters', () => {
    
        expect(() => new Content('a'.repeat(241))).toThrow();
    })
})