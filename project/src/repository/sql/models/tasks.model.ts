
// Task model
import { DataTypes, ModelDefined, Sequelize } from "sequelize";
import { ITask } from "../../../interfaces/entity.interface";

export function taskModel(sequelize: Sequelize) {
  const TaskModel: ModelDefined<IDBTask, ITask> = sequelize.define(
    "Task",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          "todo",
          "in progress",
          "on hold",
          "in review",
          "ready for execution",
          "completed"
        ),
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      priority: {
        type: DataTypes.BOOLEAN,
      },
      projectId: {
        type: DataTypes.UUID,
      },
      assignees: {
        type: DataTypes.ARRAY(DataTypes.UUID),
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );

  return TaskModel;
}

export type IDBTask = ITask & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};
