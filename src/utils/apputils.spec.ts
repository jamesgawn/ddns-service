import { AppUtils } from "./apputils";
import * as fs from 'fs';

jest.mock('fs');
const mockedFs: jest.Mocked<typeof fs> = fs as any;

describe('apputils', () => {
    describe('normaliseport', () => {
        it('should return default if no port specified', () => {
            const port = AppUtils.normalisePort(3000);
            expect(port).toBe(3000);
        });
        it('should return default if no port specified in evn var is not a number', () => {
            process.env.port = "asdfasf";
            const port = AppUtils.normalisePort(4500);
            expect(port).toBe(4500);
        });
        it('should return default if no port specified in evn var is 0', () => {
            process.env.port = "0";
            const port = AppUtils.normalisePort(3000);
            expect(port).toBe(3000);
        });
        it('should return env var specified port if it is a number', () => {
            process.env.port = "4000";
            const port = AppUtils.normalisePort(3000);
            expect(port).toBe(4000);
        });
    });
    describe('normaliseVersion',  () => {
        it('should return the default if there is not file', () => {
            mockedFs.existsSync.mockReturnValue(false);
            const version = AppUtils.normaliseVersion("0.0.0");
            expect(version).toBe("0.0.0");
        });
        it('should return the version in the file if there is a file', () => {
            mockedFs.existsSync.mockReturnValue(true);
            mockedFs.readFileSync.mockReturnValue("0.1.0\n");
            const version = AppUtils.normaliseVersion("0.0.0");
            expect(version).toBe("0.1.0");
        });
        it('should return the default if the value in the file isn not valid', () => {
            mockedFs.existsSync.mockReturnValue(true);
            mockedFs.readFileSync.mockReturnValue("0.1.0123asdasd\n");
            const version = AppUtils.normaliseVersion("0.2.0");
            expect(version).toBe("0.2.0");
        });
    });
});