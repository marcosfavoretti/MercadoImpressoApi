import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Material } from './entities/material.entity';
import { MaterialService } from './material-service/material.service';

@Module({
    imports: [TypeOrmModule.forFeature([Material])],
    providers: [MaterialService],
    exports: [MaterialService]
})
export class MaterialModule {
}
