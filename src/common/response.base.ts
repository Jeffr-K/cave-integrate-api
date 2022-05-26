import { Injectable } from "@nestjs/common";

export class ResponseBase {
  private code: number;

  private object?: Object;

  constructor(code: number, object?: Object, message?: string) {
    this.code = code;
    this.object = object;
  }

  async toEntity(...args: any) {}

  async toDto(...args: any) {}
  
}