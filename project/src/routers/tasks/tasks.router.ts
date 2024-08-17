import { IRequest, makeCallback } from "@express-assist/connectify";
import { Router } from "express";
import { ITaskController } from "../../interfaces/controller.interface";

export default function BuildTaskRoutes({
  router,
  taskControllers,
}: {
  router: Router;
  taskControllers: ITaskController;
}) {
  router.get("/", makeCallback(taskControllers.getTasks));
  router.post("/", makeCallback(taskControllers.createTask));
  router.get("/:taskId", makeCallback(taskControllers.getTask));
  router.put("/:taskId", makeCallback(taskControllers.updateTask));
  router.delete("/:taskId", makeCallback(taskControllers.deleteTask));
  // router.post("/:taskId/assign", makeCallback(taskControllers.assignTask));
  // router.delete("/:taskId/assign", makeCallback(taskControllers.removeTaskAssignment));
  router.patch("/:taskId/due-date", makeCallback(taskControllers.updateTaskDueDate));
  router.delete("/:taskId/due-date", makeCallback(taskControllers.removeTaskDueDate));
  router.patch("/:taskId/priority", makeCallback(taskControllers.markTaskAsPriority));

  return router;
}