import { appendBasePath } from "@forsakringskassan/apimock-express/browser";
import catApiMock from "./cat-api.mock.mts";

const mocks = [...appendBasePath([catApiMock], "/api")];

export default mocks;
