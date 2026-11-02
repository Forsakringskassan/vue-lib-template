import { type Mock } from "@forsakringskassan/apimock-express";
import guideMocks from "./guide/index.mts";

/** @public */
export default [...guideMocks] satisfies Mock[];
