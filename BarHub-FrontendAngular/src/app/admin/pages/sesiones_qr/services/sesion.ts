import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Sesion } from "../interface/sesion";

@Injectable({ providedIn: 'root' })
export class SesionService {
  private URL_SESIONES = `${environment.urlBackendSpring}/sesiones_qr/`;

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Sesion[]> {
    return this.httpClient.get<Sesion[]>(this.URL_SESIONES);
  }

  post(sesion: Sesion): Observable<Sesion> {
    return this.httpClient.post<Sesion>(this.URL_SESIONES, sesion);
  }

  getId(id: string): Observable<Sesion> {
    return this.httpClient.get<Sesion>(`${this.URL_SESIONES}${id}`);
  }

  put(sesion: Sesion): Observable<Sesion> {
    return this.httpClient.put<Sesion>(`${this.URL_SESIONES}${sesion.id}`, sesion);
  }

  del(sesion: Sesion): Observable<string> {
    return this.httpClient.delete(`${this.URL_SESIONES}${sesion.id}`, { responseType: 'text' });
  }  
}