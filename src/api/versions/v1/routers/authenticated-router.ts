import { OpenAPIHono } from "@hono/zod-openapi";
import { inject, injectable } from "@needle-di/core";
import { HonoVariablesType } from "../../../../core/types/hono-variables-type.ts";
import { AuthenticationMiddleware } from "../../../middlewares/authentication-middleware.ts";
import { AuthenticatedWebSocketRouter } from "./authenticated/authenticated-websocket-router.ts";
@injectable()
export class V1AuthenticatedRouter {
  private app: OpenAPIHono<{ Variables: HonoVariablesType }>;

  constructor(
    private authenticationMiddleware = inject(AuthenticationMiddleware),
    private webSocketRouter = inject(AuthenticatedWebSocketRouter)
  ) {
    this.app = new OpenAPIHono();
    this.setMiddlewares();
    this.setRoutes();
  }

  public getRouter(): OpenAPIHono<{ Variables: HonoVariablesType }> {
    return this.app;
  }

  private setMiddlewares(): void {
    this.setAuthenticationMiddleware();
  }

  private setAuthenticationMiddleware(): void {
    this.app.use("*", this.authenticationMiddleware.create());
  }

  private setRoutes(): void {
    this.app.route("/websocket", this.webSocketRouter.getRouter());
  }
}
