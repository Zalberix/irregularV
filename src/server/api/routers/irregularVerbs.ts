import { z } from "zod";
import fs from "fs";
import path from "path";
import {type irregularVerbT} from "src/server/model/irregularVerbs"

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const irregularVerbsRouter = createTRPCRouter({
    get: publicProcedure
        .input(z.object({ page: z.number().min(1).default(1), limit: z.number().min(1).default(10)}))
        .query(({ input }) => {
            const fileContent : string = fs.readFileSync(path.resolve('src/server/db/db.json'), { encoding: 'utf-8' });
            const irregularVerbs: irregularVerbT[] = JSON.parse(fileContent) as irregularVerbT[];

            const startID = (input.page-1)*input.limit;
            const finishID = (input.page)*input.limit;

            const irregularVerbsFilter = irregularVerbs.filter((_, index) => index > startID && index <= finishID)

            return {
                irregularVerbs: irregularVerbsFilter,
            };
        }),
    add: publicProcedure
        .input(z.object({
            v1: z.string().min(1),
            v2: z.string().min(1),
            v3: z.string().min(1),
            translate: z.string().min(1)
        }))
        .query(({ input }) => {

            const fileContent : string = fs.readFileSync(path.resolve('src/server/db/db.json'), { encoding: 'utf-8' });
            const irregularVerbs: irregularVerbT[] = JSON.parse(fileContent) as irregularVerbT[];

            const newID = Math.max(...irregularVerbs.map(verb => verb.ID))+1;

            const newIrregularVerb: irregularVerbT = {} as irregularVerbT
            newIrregularVerb.ID = newID;
            newIrregularVerb.v1 = input.v1;
            newIrregularVerb.v2 = input.v2;
            newIrregularVerb.v3 = input.v3;
            newIrregularVerb.translate = input.translate;

            irregularVerbs.push(newIrregularVerb)

            return {
                verb:JSON.stringify(irregularVerbs)
            }
        }),
});
