type EventCallback = (data?: any) => void;
type Event = { [key: string]: EventCallback[] };

export class EventManager {
  static events: Event = {};

  static on(event: string, callback: EventCallback): void {
    if (!EventManager.events[event]) EventManager.events[event] = [];
    EventManager.events[event].push(callback);
  }

  static emit(event: string, data?: any): void | string {
    if (!EventManager.events[event]) return 'event not found';
    EventManager.events[event].forEach((cb) => cb(data));
  }
}
