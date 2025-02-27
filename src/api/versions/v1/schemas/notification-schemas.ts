import { z } from "@hono/zod-openapi";

export const PushServerNotificationSchema = z
  .string()
  .min(1)
  .describe("The text of the notification")
  .openapi({
    example: "This is a test notification coming from the server",
  });

export type PushServerNotification = z.infer<
  typeof PushServerNotificationSchema
>;
