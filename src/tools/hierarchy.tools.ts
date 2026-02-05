import { Tool } from "@modelcontextprotocol/sdk/types.js";
import { ClickUpService } from "../services/clickup.service.js";
import { logger } from "../logger.js";

// Tool Definition
export const getWorkspaceHierarchyTool: Tool = {
    name: "get_workspace_hierarchy",
    description:
        "Returns all spaces, folders, and lists in workspace (excludes tasks). Use to browse workspace structure. DO NOT use this tool to find tasks, use get_task.",
    inputSchema: {
        type: "object",
        properties: {
            team_id: {
                type: "string",
                description: "The ID of the Workspace (Team) to operate on.",
            },
        },
        required: ["team_id"],
    },
};

// Handler Function
export async function handleGetWorkspaceHierarchy(
    clickUpService: ClickUpService,
    args: any,
): Promise<any> {
    logger.info(`Handling tool call: ${getWorkspaceHierarchyTool.name}`);
    try {
        const hierarchy = await clickUpService.getWorkspaceHierarchy(args.team_id);
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(hierarchy, null, 2),
                },
            ],
        };
    } catch (error) {
        logger.error(`Error in ${getWorkspaceHierarchyTool.name}:`, error);
        throw error instanceof Error ? error : new Error("Failed to get workspace hierarchy");
    }
}
