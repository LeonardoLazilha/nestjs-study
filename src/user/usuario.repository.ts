import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] =  [];
  
  async saveUser(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  async listUser() {
    return this.usuarios;
  }

  async existeComEmail(email :String){
    const possivelUser = this.usuarios.find(
      usuario => usuario.email === email
    );

    return possivelUser != undefined;
  }

  private buscaPorId(id: string){
    const possivelUser = this.usuarios.find(
      user => user.id === id
    );
    if(!possivelUser){
      throw new Error('Usuário não existe!');
    }
    return possivelUser;
  }

  async atualizaUser(id: string, dadosUpdate: Partial<UsuarioEntity>){
    const user = this.buscaPorId(id);
    Object.entries(dadosUpdate).forEach(([chave, valor]) => {
      if(chave === 'id'){
        return;
      };
      user[chave] = valor;
    });
    return user
  }

  async deleteUser(id:string){
   const usuario = this.buscaPorId(id);
   this.usuarios = this.usuarios.filter(
    usuarioSalvo => usuarioSalvo.id !== id
   );
   return usuario;
  }


}