import { Body, Controller, Post, Get, Put, Param, Delete } from "@nestjs/common";
import { UsuarioRepository } from "./usuario.repository";
import { CriaUsuarioDTO } from "./dto/CriaUsuario.dto";
import { UsuarioEntity } from "./usuario.entity";
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Controller('/usuarios')
export class UsuarioController {

  constructor(private usuarioRepository: UsuarioRepository) { }

  @Post()
  async criarUsuario(@Body() dadosUser: CriaUsuarioDTO) {
    const usuarioEntity = new UsuarioEntity();
    usuarioEntity.email = dadosUser.email;
    usuarioEntity.senha = dadosUser.senha;
    usuarioEntity.nome = dadosUser.nome;
    usuarioEntity.id = uuid();
    this.usuarioRepository.saveUser(usuarioEntity);
    return { 
      usuario: new ListaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
      message: 'Usuário criado com sucesso!' 
    
  };
  }

  @Get()
  async listUsuarios() {
    const userSalvos = await this.usuarioRepository.listUser()
    const userLista = userSalvos.map(
      user => new ListaUsuarioDTO(user.id, user.nome)
    );
    return userLista;
  }

  @Put('/:id')
  async updateUsuarios(@Param('id') id: string, @Body() dadosUpdate: AtualizaUsuarioDTO){
    const userAtualizado = await this.usuarioRepository.atualizaUser(id, dadosUpdate);
    return {
      usuario: userAtualizado,
      message: 'Usuário atualizado!',
    };
  }

  @Delete('/:id')
  async deleteUsuarios(@Param('id') id: string){
    const userDeleteado = await this.usuarioRepository.deleteUser(id);
    return{
      usuario: userDeleteado,
      message: 'Usuário deletado com sucesso!'
    };
  }
  

}

    


