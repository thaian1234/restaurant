import { CustomCtx } from "convex-helpers/server/customFunctions";
import { GenericEnt, GenericEntWriter } from "convex-ents";
import { TableNames } from "./_generated/dataModel";
import { mutation, query } from "./functions";
import { entDefinitions } from "./schema";

export type QueryCtx = CustomCtx<typeof query>;
export type MutationCtx = CustomCtx<typeof mutation>;
export type CtxType = CustomCtx<typeof mutation>;

type TestType = CustomCtx<typeof mutation & typeof query>;

export type Ent<TableName extends TableNames> = GenericEnt<
	typeof entDefinitions,
	TableName
>;
export type EntWriter<TableName extends TableNames> = GenericEntWriter<
	typeof entDefinitions,
	TableName
>;
