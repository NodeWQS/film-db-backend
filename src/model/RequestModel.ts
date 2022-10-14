import { Request } from "express";

export type ReqWithBody<T> = Request<{},{},T>
export type ReqWithParams<P> = Request<P>
export type ReqWithParamsAndBody<T,B> = Request<T,{},B>
export type ReqWithQuery<T> = Request<{},{},{},T>