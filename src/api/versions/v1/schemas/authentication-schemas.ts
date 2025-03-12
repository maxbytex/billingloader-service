import { z } from "@hono/zod-openapi";

export const RTCIceServerSchema = z.object({
  urls: z.union([z.string(), z.array(z.string())]),
  username: z.string().optional(),
  credential: z.string().optional(),
  credentialType: z.enum(["password", "oauth"]).optional().openapi({
    example: "password",
  }),
});

export type RTCIceServer = z.infer<typeof RTCIceServerSchema>;

export const GetAuthenticationOptionsRequestSchema = z.object({
  transaction_id: z
    .string()
    .uuid()
    .describe("The transaction ID for the authentication request")
    .openapi({
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
});

export type GetAuthenticationOptionsRequest = z.infer<
  typeof GetAuthenticationOptionsRequestSchema
>;

export const GetAuthenticationOptionsResponseSchema = z
  .object({})
  .passthrough()
  .describe("The authentication options required by the server")
  .openapi({
    example: {
      rpId: "…",
      challenge: "…",
      timeout: 60000,
      userVerification: "preferred",
    },
  });

export type GetAuthenticationOptionsResponse = z.infer<
  typeof GetAuthenticationOptionsResponseSchema
>;

export const VerifyAuthenticationRequestSchema = z.object({
  transaction_id: z
    .string()
    .uuid()
    .describe("The transaction ID for the authentication request")
    .openapi({
      example: "123e4567-e89b-12d3-a456-426614174000",
    }),
  authentication_response: z
    .object({})
    .passthrough()
    .describe("The authentication response from the authenticator"),
});

export type VerifyAuthenticationRequest = z.infer<
  typeof VerifyAuthenticationRequestSchema
>;

export const VerifyAuthenticationResponseSchema = z.object({
  user_id: z.string().describe("The user ID"),
  display_name: z.string().describe("The display name of the user"),
  authentication_token: z
    .string()
    .describe("The authentication token of the user"),
  session_key: z.string().describe("The session key of the user"),
  public_ip: z
    .string()
    .ip()
    .nullable()
    .describe("The public IP of the user")
    .openapi({ example: "…" }),
  
});

export type AuthenticationResponse = z.infer<
  typeof VerifyAuthenticationResponseSchema
>;
