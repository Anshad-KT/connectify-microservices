import { loadEnv, logger } from "@express-assist/connectify";
import { Express, Request, Response } from "express";
import swaggerJsdoc, { Options } from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";

const { PORT } = loadEnv(["PORT"]);

const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Connectify Business Service Docs",
            version: "1.0.0",
        },
        servers: [
            {
                url: `http://localhost:${PORT}/api/business`,
            },
        ],
        components: {
            schemas: {
                user: {
                    properties: {
                        id: {
                            type: "string",
                            require: true,
                        },
                        username: {
                            type: "string",
                            require: true,
                        },
                        name: {
                            type: "string",
                        },
                        email: {
                            type: "string",
                        },
                        avatar: {
                            type: "string",
                        },
                    },
                },
            },
            securitySchemes: {
                userAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: ["./src/routers/auth.routes.ts", "./src/routers/user.routes.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
    app.use("/api/business/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.get("/api/business/docs", (req: Request, res: Response) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    logger.info(`Docs available\t: http://localhost:${port}/api/business/docs`);
}

export default swaggerDocs;
