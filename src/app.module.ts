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
import { MovimentacaoModule } from './modules/movimentacao/movimentacao.module';
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
      host: process.env.DB_HOST,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT),
      autoLoadEntities: true,
      synchronize: Number(process.env.SYNCHRONIZE) ? true : false,
      ssl: {
        rejectUnauthorized: false
      },
    }),
    UsuarioModule,
    PessoaModule,
    CategoriaModule,
    TipoMovimentacaoModule,
    InstituicaoFinanceiraModule,
    TipoContaModule,
    ContaModule,
    MovimentacaoModule
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
