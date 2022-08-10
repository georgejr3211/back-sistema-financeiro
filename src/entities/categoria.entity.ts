import { ApiProperty } from '@nestjs/swagger';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsDefined, IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

import { BaseColumn } from '../common/classes/base-columns';
import { Pessoa } from './pessoa.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('categorias')
@Unique('uk_descricao_pessoa', ['descricao', 'pessoa'])
export class Categoria extends BaseColumn {

  @ApiProperty()
  @IsOptional()
  @PrimaryGeneratedColumn({ name: 'id_categoria' })
  id: number;

  @ApiProperty()
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @Column({ length: 45, nullable: false })
  descricao: string;

  @ApiProperty()
  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, })
  limite: number;

  @ApiProperty()
  @IsDefined({ groups: [CREATE] })
  @IsOptional({ groups: [UPDATE] })
  @ManyToOne(() => Pessoa, { nullable: false })
  @JoinColumn({ name: 'id_pessoa' })
  pessoa: Pessoa;

  constructor(data: Omit<Categoria, 'id'>, id?: number) {
    super();
    Object.assign(this, data);

    if (id) {
      Object.assign(this.id, id);
    }
  }
}
