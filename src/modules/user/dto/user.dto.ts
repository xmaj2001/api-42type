import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    MinLength,
}
    from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty(
        { message: 'O atributo [name] é obrigatório' }
    )
    @IsString()
    name: string;

    @IsNotEmpty(
        { message: 'O atributo [email] é obrigatório' }
    )
    @IsEmail()
    email: string;

    @IsNotEmpty(
        { message: 'O atributo [password] é obrigatório' }
    )
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    password: string;

    @IsOptional()
    @IsString({ message: 'O atributo [avatar] deve ser uma string' })
    @IsUrl({}, { message: 'O atributo [avatar] deve ser uma URL válida' })
    avatar?: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    password?: string;

    @IsOptional()
    @IsString({ message: 'O atributo [avatar] deve ser uma string' })
    @IsUrl({}, { message: 'O atributo [avatar] deve ser uma URL válida' })
    avatar?: string;
}