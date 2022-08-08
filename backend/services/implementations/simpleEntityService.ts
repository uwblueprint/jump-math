import MgSimpleEntity, { SimpleEntity } from "../../models/simpleEntity.model";
import {
  ISimpleEntityService,
  SimpleEntityRequestDTO,
  SimpleEntityResponseDTO,
} from "../interfaces/simpleEntityService";
import { getErrorMessage } from "../../utilities/errorUtils";
import logger from "../../utilities/logger";

const Logger = logger(__filename);

class SimpleEntityService implements ISimpleEntityService {
  /* eslint-disable class-methods-use-this */
  async getEntity(id: string): Promise<SimpleEntityResponseDTO> {
    let entity: SimpleEntity | null;
    try {
      entity = await MgSimpleEntity.findById(id);
      if (!entity) {
        throw new Error(`Entity id ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(`Failed to get entity. Reason = ${getErrorMessage(error)}`);
      throw error;
    }

    return {
      id: entity.id,
      stringField: entity.stringField,
      intField: entity.intField,
      enumField: entity.enumField,
      stringArrayField: entity.stringArrayField,
      boolField: entity.boolField,
    };
  }

  async getEntities(): Promise<SimpleEntityResponseDTO[]> {
    try {
      const entities: Array<SimpleEntity> = await MgSimpleEntity.find();
      return entities.map((entity) => ({
        id: entity.id,
        stringField: entity.stringField,
        intField: entity.intField,
        enumField: entity.enumField,
        stringArrayField: entity.stringArrayField,
        boolField: entity.boolField,
      }));
    } catch (error: unknown) {
      Logger.error(
        `Failed to get entities. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }

  async createEntity(
    entity: SimpleEntityRequestDTO,
  ): Promise<SimpleEntityResponseDTO> {
    let newEntity: SimpleEntity | null;
    try {
      newEntity = await MgSimpleEntity.create(entity);
    } catch (error: unknown) {
      Logger.error(
        `Failed to create entity. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
    return {
      id: newEntity.id,
      stringField: newEntity.stringField,
      intField: newEntity.intField,
      enumField: newEntity.enumField,
      stringArrayField: newEntity.stringArrayField,
      boolField: newEntity.boolField,
    };
  }

  async updateEntity(
    id: string,
    entity: SimpleEntityRequestDTO,
  ): Promise<SimpleEntityResponseDTO | null> {
    let updatedEntity: SimpleEntity | null;
    try {
      updatedEntity = await MgSimpleEntity.findByIdAndUpdate(id, entity, {
        new: true,
        runValidators: true,
      });
      if (!updatedEntity) {
        throw new Error(`Entity id ${id} not found`);
      }
    } catch (error: unknown) {
      Logger.error(
        `Failed to update entity. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
    return {
      id: updatedEntity.id,
      stringField: updatedEntity.stringField,
      intField: updatedEntity.intField,
      enumField: updatedEntity.enumField,
      stringArrayField: updatedEntity.stringArrayField,
      boolField: updatedEntity.boolField,
    };
  }

  async deleteEntity(id: string): Promise<string> {
    try {
      const deletedEntity: SimpleEntity | null = await MgSimpleEntity.findByIdAndDelete(
        id,
      );
      if (!deletedEntity) {
        throw new Error(`Entity id ${id} not found`);
      }
      return id;
    } catch (error: unknown) {
      Logger.error(
        `Failed to delete entity. Reason = ${getErrorMessage(error)}`,
      );
      throw error;
    }
  }
}

export default SimpleEntityService;
