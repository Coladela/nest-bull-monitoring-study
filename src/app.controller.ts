import { Controller, Get, Post, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(@InjectQueue('audio') private readonly audioQueue: Queue) {}

  @Get()
  async getHello(): Promise<any> {
    return await this.audioQueue.name;
  }

  @Post('transcode')
  async transcode() {
    this.logger.log('transcode')
    await this.audioQueue.add('transcode', {
      file: 'audio.mp3',
    });
  }
}
