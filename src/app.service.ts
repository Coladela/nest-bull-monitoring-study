import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue('audio') private readonly audioQueue: Queue) {}

  getHello(): string {
    return 'Hello World!';
  }
}
