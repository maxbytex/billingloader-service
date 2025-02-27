import { injectable } from "@needle-di/core";
import { NOTIFICATION_EVENT } from "../constants/event-constants.ts";

@injectable()
export class NotificationService {
  public notify(text: string): void {
    const message = text.trim();
    const customEvent = new CustomEvent(NOTIFICATION_EVENT, {
      detail: {
        message,
      },
    });

    dispatchEvent(customEvent);
  }
}
