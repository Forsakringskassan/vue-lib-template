import { appendBasePath } from "@forsakringskassan/apimock-express/browser";
import awesomeApiMock from "./awesome-api.mock.mts";

const mocks = [...appendBasePath(awesomeApiMock, "/api")];

export default mocks;
