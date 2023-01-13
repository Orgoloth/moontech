import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RequestOptions {
  baseURL: string;
  url: string;
  method?: string;
  params?: { [key: string]: string };
}

@Injectable()
export class HttpService {
  constructor(private readonly http: HttpClient) {}

  request<T>(options: RequestOptions): Observable<T> {
    const { method, baseURL, url, params } = options;
    return this.http.request<T>(method ?? 'GET', `${baseURL}${url}`, {
      params,
    });
  }
}
