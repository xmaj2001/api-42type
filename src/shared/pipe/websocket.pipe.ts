// src/shared/pipes/ws-validation.pipe.ts

import { ValidationPipe, ValidationError } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

/**
 * Customiza o ValidationPipe para lançar uma WsException 
 * em vez de BadRequestException.
 * Isso garante que a exceção seja tratada pelo WsExceptionFilter 
 * e enviada ao cliente via WebSocket.
 */
export class WsValidationPipe extends ValidationPipe {
    constructor() {
        super({
            // Opções padrão do ValidationPipe
            transform: true,
            whitelist: true, // Garante que campos não decorados sejam removidos
            
            // Customização essencial: Mapeia o erro de validação para WsException
            exceptionFactory: (errors: ValidationError[]) => {
                // Formata os erros em um objeto ou array simples para envio
                const messages = errors.map(error => 
                    Object.values(error.constraints || {})
                ).flat();

                // Lança uma WsException, que será capturada pelo seu filtro
                // Você pode escolher enviar o objeto de erros completo, 
                // mas enviar as mensagens formatadas é mais comum.
                return new WsException({
                    message: 'Validation failed',
                    errors: messages,
                });
            },
        });
    }
}