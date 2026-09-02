import { defineMock } from "@forsakringskassan/apimock-express/helpers";

export default defineMock([
    {
        meta: {
            url: "/awesome-endpoint",
            method: "GET",
        },
        defaultResponse: {
            status: 200,
            body: {
                reply: "Pong!",
            },
            delay: 300,
        },
    },
]);
