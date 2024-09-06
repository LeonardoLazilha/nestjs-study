import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";

export class CriaUsuarioDTO{
  @IsNotEmpty({message: 'o nome nao pode ser vazio!'})
  nome: string;

  @IsEmail(undefined, {message: 'email informado é inválido!'})
  @EmailUnico({message: 'ja existe um usuario com esse email!'})
  email: string;

  @MinLength(6, {message: 'senha precisa ter pelo menos 6 caracteres!'})
  senha: string;
}