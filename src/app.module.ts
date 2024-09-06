import { Module } from '@nestjs/common';
import { UsuarioModule } from './user/usuario.module'; 
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [UsuarioModule, ProdutoModule] 
})
export class AppModule {}
