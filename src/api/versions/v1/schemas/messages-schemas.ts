import { z } from "@hono/zod-openapi";

export const CreateMessageRequestSchema = z.object({
  title: z
    .string()
    .describe("The message title")
    .openapi({ example: "Hello world!" }),
  content: z.string().describe("The message content").openapi({
    example: "This is a really great message just for you.",
  }),
});

export type CreateMessageRequest = z.infer<typeof CreateMessageRequestSchema>;

export const DeleteMessageRequestSchema = z.object({
  timestamp: z
    .string()
    .describe("The timestamp of the message to delete")
    .openapi({
      example: "1740325296918",
    }),
});

export type DeleteMessageRequest = z.infer<typeof DeleteMessageRequestSchema>;

export const GetMessageResponseSchema = z.array(
  z.object({
    title: z
      .string()
      .describe("The message title")
      .openapi({ example: "Hello world!" }),
    content: z.string().describe("The message content").openapi({
      example: "This is a really great message just for you.",
    }),
    timestamp: z
      .number()
      .describe("The message created timestamp")
      .openapi({ example: 1740325296918 }),
  }),
);

export type GetMessageResponse = z.infer<typeof GetMessageResponseSchema>;
