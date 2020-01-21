import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('audio')
export class AudioProcessor {
  private readonly logger = new Logger(AudioProcessor.name);

  @Process('transcode')
  handleTranscode(job: Job) {
    this.logger.log('Start transcoding...');
    setTimeout(() => {
        this.logger.log(job.data);
        this.logger.log('Transcoding completed');
    }, 5000);
  }
}