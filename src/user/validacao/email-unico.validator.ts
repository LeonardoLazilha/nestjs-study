import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({async: true})
export class EmailUnicoValidator implements ValidatorConstraintInterface{

  constructor(private usuarioRepository: UsuarioRepository) {}

  async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> { 
    const usuarioComEmailExist = await this.usuarioRepository.existeComEmail(value);
    return !usuarioComEmailExist;
  }

}

export const EmailUnico = (opcoesValidacao: ValidationOptions) => {
  return (objeto: Object, propriedade: string) => {
    registerDecorator({
      target: objeto.constructor,
      propertyName: propriedade, 
      options: opcoesValidacao,
      constraints: [],
      validator: EmailUnicoValidator,
    });
  };
};