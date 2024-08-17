import { IRequest, makeCallback } from "@express-assist/connectify";
import { Router } from "express";
import { IResourceController } from "../../interfaces/controller.interface";

export default function BuildResourceRoutes({
  router,
  resourceControllers,
}: {
  router: Router;
  resourceControllers: IResourceController;
}) {
  router.get("/", makeCallback(resourceControllers.getResources));
  router.post("/", makeCallback(resourceControllers.createResource));
  router.get("/:resourceId", makeCallback(resourceControllers.getResource));
  router.put("/:resourceId", makeCallback(resourceControllers.updateResource));
  router.delete("/:resourceId", makeCallback(resourceControllers.deleteResource));

  return router;
}