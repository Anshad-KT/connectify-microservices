import { IRequest, makeCallback } from "@express-assist/connectify";
import { Router } from "express";
import { IProjectController } from "../../interfaces/controller.interface";

export default function BuildProjectRoutes({
  router,
  projectControllers,
}: {
  router: Router;
  projectControllers: IProjectController;
}) {
  router.get("/", makeCallback(projectControllers.getProjects));//get projects associated to business id
  router.post("/", makeCallback(projectControllers.createProject));
  router.get("/:projectId", makeCallback(projectControllers.getProject));
  router.put("/:projectId", makeCallback(projectControllers.updateProject));
  router.delete("/:projectId", makeCallback(projectControllers.deleteProject));
  router.patch("/:projectId/status", makeCallback(projectControllers.updateProjectStatus));
  router.post("/:projectId/add", makeCallback(projectControllers.addEmployeeToProject));
  router.delete("/:projectId/remove/:employeeId", makeCallback(projectControllers.removeEmployeeFromProject));

  return router;
}