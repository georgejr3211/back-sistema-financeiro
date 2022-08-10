import * as admin from 'firebase-admin';

import { INotification } from '../interfaces/notification';

export function sendPushNotification(message: INotification) {
  admin.messaging().send(message)
    .then(response => console.log('Notificação enviada com sucesso:', response))
    .catch(error => console.log('Falha ao enviar notificação:', error));
}
