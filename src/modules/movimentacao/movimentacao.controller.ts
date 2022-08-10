import { Controller, Get, HttpStatus, Param, Query, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from '@nestjsx/crud';
import { Response } from 'express';
import * as moment from 'moment-timezone';
import { Result } from 'src/common/interfaces/response';

import { Movimentacao } from '../../entities/movimentacao.entity';
import { MENSAGENS } from './../../common/enums/mensagens';
import { MovimentacaoService } from './movimentacao.service';

@Crud({
  model: {
    type: Movimentacao,
  },
  query: {
    alwaysPaginate: true,
    maxLimit: 10,
    sort: [{ field: 'id', order: 'DESC' }],
    join: {
      categoria: { eager: true },
      tipoMovimentacao: { eager: true },
      pessoa: { eager: true },
      conta: { eager: true },
    },
  },
})
@ApiTags('Movimentação')
@Controller('movimentacoes')
export class MovimentacaoController {
  constructor(public readonly service: MovimentacaoService) { }

  get base(): CrudController<Movimentacao> {
    return this;
  }

  @Get('saldo')
  async getSaldo(@Req() req, @Query('dtPeriodo') dtPeriodo: string | string[]) {
    if (dtPeriodo) {
      if (Array.isArray(dtPeriodo)) {
        dtPeriodo = dtPeriodo.map(dt => moment.utc(dt).format('YYYY-MM'));
      } else {
        dtPeriodo = moment.utc(dtPeriodo).format('YYYY-MM');
      }
    }

    const result = await this.service.getSaldo(
      req.usuario.pessoa.id,
      dtPeriodo,
    );

    return result;
  }

  @Get('saldo/lancamento-futuro')
  async getSaldoFuturo(@Req() req, @Query('dtPeriodo') dtPeriodo: string | string[],
  ) {
    if (dtPeriodo) {
      if (Array.isArray(dtPeriodo)) {
        dtPeriodo = dtPeriodo.map(dt => moment.utc(dt).format('YYYY-MM'));
      } else {
        dtPeriodo = moment.utc(dtPeriodo).format('YYYY-MM');
      }
    }

    const result = await this.service.getSaldoFuturo(
      req.usuario.pessoa.id,
      dtPeriodo,
    );

    return result;
  }

  @Get('tipo-movimentacao/:tipoMovimentacao/saldo')
  async getSaldoByTipoMovimentacao(
    @Req() req,
    @Param('tipoMovimentacao') tipoMovimentacao: number,
    @Res() res: Response,
    @Query('dtPeriodo') dtPeriodo: string | string[],
  ) {
    if (dtPeriodo) {
      if (Array.isArray(dtPeriodo)) {
        dtPeriodo = dtPeriodo.map(dt => moment.utc(dt).format('YYYY-MM'));
      } else {
        dtPeriodo = moment.utc(dtPeriodo).format('YYYY-MM');
      }
    }

    const result = await this.service.getSaldoByTipoMovimentacao(
      req.usuario.pessoa.id,
      tipoMovimentacao,
      dtPeriodo,
    );
    return res.status(HttpStatus.OK).send(result);
  }

  @Get('tipo-movimentacao/:tipoMovimentacao/nao-concluidas')
  async getCountContasByTipoMovimentacaoAndNaoConcluida(
    @Req() req,
    @Param('tipoMovimentacao') tipoMovimentacao: number,
    @Res() res: Response,
    @Query('dtPeriodo') dtPeriodo: string | string[],
  ) {
    if (dtPeriodo) {
      if (Array.isArray(dtPeriodo)) {
        dtPeriodo = dtPeriodo.map(dt => moment.utc(dt).format('YYYY-MM'));
      } else {
        dtPeriodo = moment.utc(dtPeriodo).format('YYYY-MM');
      }
    }
    const result = await this.service.getCountContasByTipoMovimentacaoAndNaoConcluida(
      req.usuario.pessoa.id,
      tipoMovimentacao,
      dtPeriodo,
    );
    return res.status(HttpStatus.OK).send(result);
  }

  @Get('atrasadas')
  async getCountContasAtrasadas(
    @Req() req,
    @Res() res: Response,
    @Query('dtPeriodo') dtPeriodo: string | string[],
  ) {
    if (dtPeriodo) {
      if (Array.isArray(dtPeriodo)) {
        dtPeriodo = dtPeriodo.map(dt => moment.utc(dt).format('YYYY-MM'));
      } else {
        dtPeriodo = moment.utc(dtPeriodo).format('YYYY-MM');
      }
    }

    const result = await this.service.getCountContasAtrasadas(req.usuario.pessoa.id, dtPeriodo);
    return res.status(HttpStatus.OK).send(result);
  }

  @Get('despesas-categoria')
  async getDespesasGroupByCategoria(
    @Req() req,
    @Res() res: Response,
    @Query('dtPeriodo') dtPeriodo: string | string[],
  ) {
    if (dtPeriodo) {
      if (Array.isArray(dtPeriodo)) {
        dtPeriodo = dtPeriodo.map(dt => moment.utc(dt).format('YYYY-MM'));
      } else {
        dtPeriodo = moment.utc(dtPeriodo).format('YYYY-MM');
      }
    }
    const result = await this.service.getDespesasGroupByCategoria(
      req.usuario.pessoa.id,
      dtPeriodo,
    );
    return res.status(HttpStatus.OK).send({ data: result });
  }

  @Get('categoria/:categoriaId/total')
  async getDespesaTotalByCategoria(
    @Req() req,
    @Res() res: Response,
    @Param('categoriaId') categoriaId: number,
    @Query('dtPeriodo') dtPeriodo: string | string[],
  ) {
    if (dtPeriodo) {
      if (Array.isArray(dtPeriodo)) {
        dtPeriodo = dtPeriodo.map(dt => moment.utc(dt).format('YYYY-MM'));
      } else {
        dtPeriodo = moment.utc(dtPeriodo).format('YYYY-MM');
      }
    }
    const result = await this.service.getTotalByCategoria(
      categoriaId,
      req.usuario.pessoa.id,
      dtPeriodo,
    );

    return res.status(HttpStatus.OK).send(result);
  }

  @Get('movimentacoes-tipo-movimentacao')
  async getMovimentacoesGroupByTipoMovimentacao(
    @Req() req,
    @Res() res: Response,
    @Query('dtPeriodo') dtPeriodo: string | string[],
  ) {
    if (dtPeriodo) {
      if (Array.isArray(dtPeriodo)) {
        dtPeriodo = dtPeriodo.map(dt => moment.utc(dt).format('YYYY-MM'));
      } else {
        dtPeriodo = moment.utc(dtPeriodo).format('YYYY-MM');
      }
    }

    const result = await this.service.getMovimentacoesGroupByTipoMovimentacao(
      req.usuario.pessoa.id,
      dtPeriodo,
    );
    return res.status(HttpStatus.OK).send({ data: result });
  }

  @Get('tipo-movimentacao/:tipoMovimentacao/pendentes')
  async getMovimentacoesPendentes(
    @Req() req,
    @Param('tipoMovimentacao') tipoMovimentacao: number,
    @Res() res: Response,
    @Query('dtPeriodo') dtPeriodo: string | string[],
  ) {
    if (dtPeriodo) {
      if (Array.isArray(dtPeriodo)) {
        dtPeriodo = dtPeriodo.map(dt => moment.utc(dt).format('YYYY-MM'));
      } else {
        dtPeriodo = moment.utc(dtPeriodo).format('YYYY-MM');
      }
    }
    const result = await this.service.getMovimentacoesPendentes(
      req.usuario.pessoa.id,
      dtPeriodo,
      tipoMovimentacao,
    );
    return res.status(HttpStatus.OK).send(
      new Result({
        data: result[0],
        error: null,
        total: result[1],
        message: MENSAGENS.SUCESSO,
      }),
    );
  }

  @Get('balanco')
  async getBalanco(
    @Req() req,
    @Res() res: Response,
    @Query('dtPeriodo') dtPeriodo: string | string[],
  ) {
    if (dtPeriodo) {
      if (Array.isArray(dtPeriodo)) {
        dtPeriodo = dtPeriodo.map(dt => moment.utc(dt).format('YYYY-MM'));
      } else {
        dtPeriodo = moment.utc(dtPeriodo).format('YYYY-MM');
      }
    }
    const result = await this.service.getBalanco(
      req.usuario.pessoa.id,
      dtPeriodo,
    );
    return res.status(HttpStatus.OK).send(result);
  }

  @Override()
  async getMany(@ParsedRequest() req: CrudRequest) {
    const result: any = await this.base.getManyBase(req);

    result.data = this.setSituacao(result.data);

    return result;
  }

  private setSituacao(result: Movimentacao[]) {
    return result.map(res => {

      let situacao = '';

      const dtHoje = moment
        .tz(new Date(), process.env.TIMEZONE)
        .format('YYYY-MM-DD');

      if (!res.concluido) {
        situacao = 'Pendente';
      }

      // Receita
      if (res.dtConta.toString() >= dtHoje && res.tipoMovimentacao.id === 1 && !res.concluido) {
        situacao = 'À receber';
      }

      // Despesa
      if (res.dtConta.toString() >= dtHoje && res.tipoMovimentacao.id === 2 && !res.concluido) {
        situacao = 'À vencer';
      }

      if (dtHoje > res.dtConta.toString() && !res.concluido) {
        situacao = 'Atrasada';
      }

      if (res.concluido) {
        situacao = 'Concluída';
      }

      return { ...res, situacao };
    });
  }
}
