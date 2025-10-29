import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';


export class CreateRoomDto {
  @IsString({message: 'O código da sala deve ser uma string'})
  @IsNotEmpty({message: 'O código da sala não pode estar vazio'})
  code: string;

  @IsString({message: 'O ID do criador deve ser uma string'})
  @IsNotEmpty({message: 'O ID do criador não pode estar vazio'})
  creator_id: string;
}

export class JoinRoomDto {
  @IsString({message: 'O código da sala deve ser uma string'})
  @IsNotEmpty({message: 'O código da sala não pode estar vazio'})
  code: string;

  @IsString({message: 'O nome do usuário deve ser uma string'})
  @IsNotEmpty({message: 'O nome do usuário não pode estar vazio'})
  name: string;

  @IsString({message: 'O ID do usuário deve ser uma string'})
  @IsNotEmpty({message: 'O ID do usuário não pode estar vazio'})
  user_id: string;
}

export class LeaveRoomDto {
  @IsString({message: 'O código da sala deve ser uma string'})
  @IsNotEmpty({message: 'O código da sala não pode estar vazio'})
  code: string;

  @IsString({message: 'O ID do usuário deve ser uma string'})
  @IsNotEmpty({message: 'O ID do usuário não pode estar vazio'})
  user_id: string;
}

// { roomId, playerId, progress, wpm, isFinished }
export class PlayerProgressDto {
  @IsString({message: 'O ID da sala deve ser uma string'})
  @IsNotEmpty({message: 'O ID da sala não pode estar vazio'})
  roomId: string;

  @IsString({message: 'O ID do jogador deve ser uma string'})
  @IsNotEmpty({message: 'O ID do jogador não pode estar vazio'})
  playerId: string;

  @IsNotEmpty({message: 'O progresso não pode estar vazio'})
  @IsNumber({}, {message: 'O progresso deve ser um número'})
  @Type(() => Number)
  progress: number;

  @IsNotEmpty({message: 'A velocidade de palavras por minuto (WPM) não pode estar vazia'})
  @IsNumber({}, {message: 'A velocidade de palavras por minuto (WPM) deve ser um número'})
  @Type(() => Number)
  wpm: number;

  @IsNotEmpty({message: 'O status de finalização não pode estar vazio'})
  @IsBoolean({message: 'O status de finalização deve ser um booleano'})
  isFinished: boolean;
}

