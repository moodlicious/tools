import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        APP_NAME: z.string().min(1).default("tools.feli.page"),
    },
    client: {
        NEXT_PUBLIC_BASE_URL: z.url().default("https://tools.feli.page"),
    },
    runtimeEnv: {
        APP_NAME: process.env.APP_NAME,
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    },
});
