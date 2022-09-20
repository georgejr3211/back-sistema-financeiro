import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';

import { Planejamento } from '../../entities/planejamento.entity';
import { PlanejamentoService } from './planejamento.service';

@Crud({
  model: {
    type: Planejamento,
  },
  query: {
    alwaysPaginate: true,
    maxLimit: 10,
    sort: [{ field: 'id', order: 'DESC' }],
    join: {
      pessoa: { eager: true },
      categorias: { eager: true },
    },
  },
})
@ApiTags('Planejamento')
@Controller('planejamentos')
export class PlanejamentoController {
  constructor(private readonly service: PlanejamentoService) { }

}
