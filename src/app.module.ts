import { DomainModule } from './_domain/domain.module';

import { InfrastructureModule } from './_infrastructure/infrastructure.module';
import { ControllerModule } from './controllers/controller.module';
import { Module, OnModuleInit } from '@nestjs/common';

@Module({
  imports: [
    
    InfrastructureModule,
    ControllerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {

  onModuleInit() {

    console.log(`
   _____         .__                                  
  /  _  \\ ______ |__|                                 
 /  /_\\  \\\\____ \\|  |                                 
/    |    \\  |_> >  |                                 
\\____|__  /   __/|__|                                 
        \\/|__|                                        
.___                                                  
|   | _____ _____________   ____   ______ __________  
|   |/     \\\\____ \\_  __ \\_/ __ \\ /  ___//  ___/  _ \\ 
|   |  Y Y  \\  |_> >  | \\/\\  ___/ \\___ \\ \\___ (  <_> )
|___|__|_|  /   __/|__|    \\___  >____  >____  >____/ 
          \\/|__|               \\/     \\/     \\/       
    `)
  }
}
