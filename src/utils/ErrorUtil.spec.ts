import * as express from "express";
import { sendError } from "./ErrorUtil";

describe('ErrorUtil', () => {
    describe('sendError', () => {
        it('should respond with status code, and message', () => {
            const statusMock = jest.fn();
            const sendMock = jest.fn();
            const res = {
                status: statusMock,
                send: sendMock
            } as unknown as express.Response;
            sendError(res, 999, "boo");
            expect(statusMock).toBeCalledWith(999);
            expect(sendMock).toBeCalledWith('boo');
        });
    });
});