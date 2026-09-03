import { defineMock } from "@forsakringskassan/apimock-express/helpers";
import { type Cat, cats } from "./cat-data.ts";

export default defineMock<Cat | { error: string }>({
    meta: {
        url: "/cat",
        method: "GET",
    },
    defaultResponse(params) {
        const id = params.parameters?.id;
        const cat = cats.find((c) => c.id === id);
        if (cat) {
            return {
                status: 200,
                body: cat,
                delay: 300,
            };
        }
        return {
            status: 404,
            body: { error: `Cat with ID "${id}" not found` },
            delay: 300,
        };
    },
});
