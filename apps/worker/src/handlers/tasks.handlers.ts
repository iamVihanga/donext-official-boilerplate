import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskByID,
  updateTask
} from "@repo/core/queries/task.queries";

import { WorkerRouteHandler } from "@/types";
import type {
  ListRoute,
  CreateRoute,
  GetOneRoute,
  PatchRoute,
  RemoveRoute
} from "@/routes/tasks.routes";

// Get all tasks as paginated response handler
export const list: WorkerRouteHandler<ListRoute> = async (c) => {
  try {
    const queryParams = c.req.valid("query");

    const queryResponse = await getAllTasks(queryParams);

    if (queryResponse instanceof Error) {
      throw queryResponse;
    }

    return c.json(queryResponse, HttpStatusCodes.OK);
  } catch (error) {
    return c.json(
      {
        message:
          (error as Error).message || HttpStatusPhrases.INTERNAL_SERVER_ERROR
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Create new task handler
export const create: WorkerRouteHandler<CreateRoute> = async (c) => {
  try {
    const session = c.get("session");
    const body = c.req.valid("json");

    if (!session) {
      return c.json(
        { message: HttpStatusPhrases.UNAUTHORIZED },
        HttpStatusCodes.UNAUTHORIZED
      );
    }

    const queryResponse = await createTask(body);

    if (queryResponse instanceof Error) {
      throw queryResponse;
    }

    return c.json(queryResponse, HttpStatusCodes.CREATED);
  } catch (error) {
    return c.json(
      {
        message:
          (error as Error).message || HttpStatusPhrases.INTERNAL_SERVER_ERROR
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Get single task by ID handler
export const getOne: WorkerRouteHandler<GetOneRoute> = async (c) => {
  try {
    const { id } = c.req.valid("param");

    const queryResponse = await getTaskByID(id);

    if (queryResponse instanceof Error) {
      throw queryResponse;
    }

    if (!queryResponse) {
      return c.json({ message: "Task not found !" }, HttpStatusCodes.NOT_FOUND);
    }

    return c.json(queryResponse, HttpStatusCodes.OK);
  } catch (error) {
    return c.json(
      {
        message:
          (error as Error).message || HttpStatusPhrases.INTERNAL_SERVER_ERROR
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Update task handler
export const patch: WorkerRouteHandler<PatchRoute> = async (c) => {
  try {
    const session = c.get("session");

    if (!session) {
      return c.json(
        { message: HttpStatusPhrases.UNAUTHORIZED },
        HttpStatusCodes.UNAUTHORIZED
      );
    }

    const body = c.req.valid("json");
    const { id } = c.req.valid("param");

    const queryResponse = await updateTask(id, body);

    if (queryResponse instanceof Error) {
      throw queryResponse;
    }

    if (!queryResponse) {
      return c.json({ message: "Task not found !" }, HttpStatusCodes.NOT_FOUND);
    }

    return c.json(queryResponse, HttpStatusCodes.OK);
  } catch (error) {
    return c.json(
      {
        message:
          (error as Error).message || HttpStatusPhrases.INTERNAL_SERVER_ERROR
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Delete task handler
export const remove: WorkerRouteHandler<RemoveRoute> = async (c) => {
  try {
    const session = c.get("session");

    if (!session) {
      return c.json(
        { message: HttpStatusPhrases.UNAUTHORIZED },
        HttpStatusCodes.UNAUTHORIZED
      );
    }

    const { id } = c.req.valid("param");

    const queryResponse = deleteTask(id);

    if (queryResponse instanceof Error) {
      throw queryResponse;
    }

    if (!queryResponse) {
      return c.json({ message: "Task not found !" }, HttpStatusCodes.NOT_FOUND);
    }

    return c.json(HttpStatusCodes.NO_CONTENT);
  } catch (error) {
    return c.json(
      {
        message:
          (error as Error).message || HttpStatusPhrases.INTERNAL_SERVER_ERROR
      },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
