import { OpenAPIHono } from "@hono/zod-openapi";
import { V1PublicRouter } from "./public-router.ts";
import { inject, injectable } from "@needle-di/core";

@injectable()
export class V1Router {
  private app: OpenAPIHono;

  constructor(
    private publicRouter = inject(V1PublicRouter)
  ) {
    this.app = new OpenAPIHono();
    this.setRoutes();
  }

  public getRouter(): OpenAPIHono {
    return this.app;
  }

  private setRoutes(): void {
    this.app.route("/", this.publicRouter.getRouter());
  }
}
