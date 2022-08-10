import { DocumentBuilder } from '@nestjs/swagger';

const options = new DocumentBuilder()
  .setTitle('TrocaQui')
  .setVersion('1.0.0')
  .build();

export default options;
