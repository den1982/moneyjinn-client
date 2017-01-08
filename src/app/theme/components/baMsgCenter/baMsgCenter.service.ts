import {Injectable} from '@angular/core'

@Injectable()
export class BaMsgCenterService {

  private _notifications = [
    {
      name: 'Vlad',
      text: 'Text',
      time: '1 min ago'
    }
  ];

  private _messages = [
    {
      name: 'Nasta',
      text: 'Text',
      time: '1 min ago'
    }
  ];

  public getMessages():Array<Object> {
    return this._messages;
  }

  public getNotifications():Array<Object> {
    return this._notifications;
  }
}
