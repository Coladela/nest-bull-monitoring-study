import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { AudioProcessor } from './AudioProcessor';
const Arena = require('bull-arena');

@Module({
  imports: [
    BullModule.registerQueue({ name: 'audio'}),
  ],
  controllers: [AppController],
  providers: [AppService, AudioProcessor],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    const queues = this.createArenaQueues();
    const arena = Arena(
      { queues }, 
      { 
        basePath: '/arena',
        disableListen: true 
      });
    consumer.apply(arena).forRoutes('/system/queues');
  }

  createArenaQueues() {
    return [
      {
        name: 'audio',
        hostId: 'MyAwesomeQueues',
        url: 'redis://localhost',     
       },
    ];
  }
}
