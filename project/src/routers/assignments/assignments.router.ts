import { IRequest, makeCallback, ResponseCreator } from "@express-assist/connectify";
import { Router } from "express";
import { IAssignmentController } from "../../interfaces/controller.interface";

export default function BuildAssignmentRoutes({
  router,
  assignmentsControllers,
}: {
  router: Router;
  assignmentsControllers: IAssignmentController;
}) {
  router.post("/", makeCallback(assignmentsControllers.createAssignment));
  router.delete("/:assignmentId", makeCallback(assignmentsControllers.removeAssignment));

  return router;
}

