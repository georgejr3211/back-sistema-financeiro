import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard } from './common/guards/auth.guard';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { ContaModule } from './modules/conta/conta.module';
import { InstituicaoFinanceiraModule } from './modules/instituicao-financeira/instituicao-financeira.module';
import { PessoaModule } from './modules/pessoa/pessoa.module';
import { TipoContaModule } from './modules/tipo-conta/tipo-conta.module';
import { TipoMovimentacaoModule } from './modules/tipo-movimentacao/tipo-movimentacao.module';
import { UsuarioModule } from './modules/usuario/usuario.module';

@Module({
  imports: [
    // EasyconfigModule.register({}),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ec2-34-235-31-124.compute-1.amazonaws.com',
      username: 'tbhhkkoruveshh',
      password: '327971a3a90af0153334a796cd4431dc36b74599312dc69161adab2147343824',
      database: 'd9fni0vrogk6q',
      port: 5432,
      autoLoadEntities: true,
      synchronize: true
    }),
    UsuarioModule,
    PessoaModule,
    CategoriaModule,
    TipoMovimentacaoModule,
    InstituicaoFinanceiraModule,
    TipoContaModule,
    ContaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
