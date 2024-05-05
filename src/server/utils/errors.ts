import { customErrorFactory } from "ts-custom-error";

export const DatabaseError = customErrorFactory(function DBError(code: number, message: string) {
  this.code = code;
  this.message = `${message}`;
});

export const TranspileError = customErrorFactory(function TranspileError(code: number, message: string) {
  this.code = code;
  this.message = `${message}`;
});
