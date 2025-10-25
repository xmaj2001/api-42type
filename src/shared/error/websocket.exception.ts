// ws-exception.filter.ts (Refinado para lidar com WsException e HttpExceptions)

import { Catch, ArgumentsHost, HttpException, WsExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { WsException } from '@nestjs/websockets'; // Importar WsException
import { Socket } from 'socket.io';

@Catch()
export class WebsocketExceptionsFilter implements WsExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const client = host.switchToWs().getClient<Socket>();
        
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
        let data: unknown = null; // Para dados adicionais, como erros de validação

        if (exception instanceof HttpException) {
            // Caso 1: Exceções de Negócio do Service (ex: NotFoundException, ConflictException)
            status = exception.getStatus();
            message = exception.message;
            // Opcional: Se a HttpException tiver uma resposta complexa (como a do Pipe padrão), você pode pegar.
            data = exception.getResponse(); 

        } else if (exception instanceof WsException) {
            // Caso 2: Exceções de WebSocket, como as lançadas pelo seu WsValidationPipe
            // O 'error' do WsException é frequentemente um objeto customizado
            const error = exception.getError();

            if (typeof error === 'object' && error !== null) {
                // Seu WsValidationPipe lança { message: '...', errors: [...] }
                message = (error as any).message || message;
                data = (error as any).errors || data; // Captura os erros de validação
                status = HttpStatus.BAD_REQUEST; // WsException geralmente implica erro do cliente (400)
            } else {
                message = String(error);
                status = HttpStatus.BAD_REQUEST;
            }

        } else if (exception instanceof Error) {
            // Caso 3: Erros genéricos de JavaScript
            message = exception.message;
        }
        
        // Logger.error(`WebSocket Error: [${status}] ${message}`, exception instanceof Error ? exception.stack : 'No stack');

        // Envia o erro de volta ao cliente
        client.emit('error', {
            status,
            message,
            data, // Inclui os erros de validação se houver
            timestamp: new Date().toISOString(),
        });
    }
}