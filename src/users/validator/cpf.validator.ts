import { Injectable, Logger } from "@nestjs/common";
import validator from "cpf-cnpj-validator";
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@Injectable()
@ValidatorConstraint({ async: true })
export class CpfValidator implements ValidatorConstraintInterface {
  async validate(cpf: string): Promise<boolean> {
    const Joi = require("@hapi/joi").extend(validator);
    const cnpjSchema = Joi.document().cpf().validate(cpf);
    if (cnpjSchema.error) return false;
    else return true;
  }
}
export const IsCPF = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: CpfValidator,
    });
  };
};
