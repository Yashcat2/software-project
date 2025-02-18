// schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  files: defineTable({
    fileName: v.string(),
    teamId: v.string(),
    createdBy: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
    canvasComponents: v.optional(v.array(v.object({
      id: v.string(),
      name: v.string(),
      svg: v.string(),
      x: v.number(),
      y: v.number(),
      description: v.optional(v.string()),
      instanceId: v.string(),
      price: v.number(),
      specs: v.optional(v.object({
        power: v.array(v.string()),
        resistance: v.array(v.string()),
        tolerance: v.array(v.string())
      }))
    }))),
    budget: v.optional(v.object({
      total: v.number(),
      items: v.array(v.object({
        id: v.string(),
        name: v.string(),
        quantity: v.number(),
        price: v.number()
      }))
    }))
  }),
  teams: defineTable({
    teamName: v.string(),
    createdBy: v.string()
  }),
  user: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.string()
  })
});
