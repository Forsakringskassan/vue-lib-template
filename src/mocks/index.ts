import { type Mock } from "@forsakringskassan/apimock-express";
import guideMocks from "./guide/index.mts";

const mocks: Mock[] = [...guideMocks];

export default mocks;
