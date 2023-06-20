import { Injectable, Logger } from "@nestjs/common";
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@Injectable()
@ValidatorConstraint({ async: true })
export class BrithDateValidador implements ValidatorConstraintInterface {
  async validate(date: string): Promise<boolean> {
    try {
      const DateSplit = date.split("/");
      if (DateSplit.length == 3) {
        if (
          DateSplit[2].length === 4 &&
          DateSplit[0].length === 2 &&
          DateSplit[1].length === 2
        ) {
          const ano = parseInt(DateSplit[2]);
          const mes = parseInt(DateSplit[1]);
          const dia = parseInt(DateSplit[0]);
          try {
            const data = new Date(`${ano}-${dia}-${mes}`)
            if (data) return true
            else return false;
          } catch {
            return false;
          }

        }
      }
      return false;
    } catch (err) {
      Logger.error(err);
      return false;
    }
  }
}
export const IsBrithDate = (opcoesDeValidacao: ValidationOptions) => {
  return (objeto: object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade,
      options: opcoesDeValidacao,
      constraints: [],
      validator: BrithDateValidador,
    });
  };
};
