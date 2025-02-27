import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { HonoVariablesType } from "../types/hono-variables-type.ts";

export class OpenAPIService {
  public static configure(
    app: OpenAPIHono<{ Variables: HonoVariablesType }>,
  ): void {
    app.openAPIRegistry.registerComponent("securitySchemes", "bearer", {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    });
  }

  public static setRoutes(
    app: OpenAPIHono<{ Variables: HonoVariablesType }>,
  ): void {
    app.doc31("/.well-known/openapi", {
      openapi: "3.1.0",
      info: {
        version: "1.0.0",
        title: "Game server API",
        description: "Reference documentation for a game server",
      },
    });

    app.get(
      "/",
      apiReference({
        pageTitle: "Game server API",
        metaData: {
          title: "Game server API",
          description: "Reference documentation for a game server.",
          ogTitle: "Game server API",
          ogDescription: "Reference documentation for a game server.",
        },
        theme: "kepler",
        darkMode: true,
        defaultOpenAllTags: true,
        authentication: {
          preferredSecurityScheme: "bearer",
        },
        spec: {
          url: "/.well-known/openapi",
        },
      }),
    );
  }
}
