import { createServer } from "vite";
import { defaultPlugins } from "@forsakringskassan/vite-lib-config/vite";

let server: ViteDevServer;

export async function setup(): Promise<void> {
    server = await createServer({
        plugins: defaultPlugins,
        server: { port: 8080 },
    });

    await server.listen();
}

export async function teardown(): Promise<void> {
    await server?.close();
}
