/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */


import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProfesorDto {
    @IsString()
    @IsNotEmpty()
    readonly nombre: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly cedula: number;
    
    @IsString()
    @IsNotEmpty()
    readonly departamento: string;
    
    @IsNumber()
    @IsNotEmpty()
    readonly extension: number;

    @IsBoolean()
    @IsNotEmpty()
    readonly esParEvaluador: boolean;

}
