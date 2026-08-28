import { appendBasePath } from "@forsakringskassan/apimock-express/browser";
import awesomeComponentMock from "./awesome-component.mock.mts";

const mocks = [...appendBasePath(awesomeComponentMock, "/api")];

export default mocks;
