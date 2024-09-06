import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";

export class AtualizaUsuarioDTO{
  @IsNotEmpty({message: 'o nome nao pode ser vazio!'})
  @IsOptional()
  nome: string;

  @IsEmail(undefined, {message: 'email informado é inválido!'})
  @EmailUnico({message: 'ja existe um usuario com decorator!'})
  @IsOptional()
  email: string;

  @MinLength(6, {message: 'senha precisa ter pelo menos 6 caracteres!'})
  @IsOptional()
  senha: string;
}