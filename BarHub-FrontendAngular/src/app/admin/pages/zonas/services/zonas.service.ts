import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Zona } from "../interface/zona";

@Injectable({
  providedIn: 'root'
})
export class ZonaService {

  private URL_ZONAS = `${environment.urlBackendSpring}/zonas`;

  constructor(
    private httpClient: HttpClient
  ) { }

  //----------------------------------------------------------
  // Funciones para realizar peticiones al backend
  //----------------------------------------------------------

  /**
   * Obtiene todas las zonas
   * @returns devuelve un observable con la lista de zonas
   */
  get(): Observable<Zona[]> {
    return this.httpClient.get<Zona[]>(this.URL_ZONAS);
  }

  /**
   * Se busca una zona con el id que se pasa por parámetros
   * @param id de la zona que va a buscar
   * @returns un observable con la zona
   */
  getId(id: number): Observable<Zona> {
    const url: string = `${this.URL_ZONAS}/${id}`;
    return this.httpClient.get<Zona>(url);
  }

  /**
   * Recibe una zona y la añade
   * @param zona que se va a añadir
   * @returns un observable con la zona añadida
   */
  post(zona: Zona): Observable<Zona> {
    return this.httpClient.post<Zona>(this.URL_ZONAS, zona);
  }

  /**
   * Se realiza una petición para actualizar una zona
   * @param zona zona actualizada
   * @returns un observable con la zona actualizada
   */
  put(zona: Zona): Observable<Zona> {
    const url = `${this.URL_ZONAS}/${zona.id}`;
    return this.httpClient.put<Zona>(url, zona);
  }

  /**
   * Se realiza una petición para eliminar una zona
   * @param zona zona que se va a eliminar
   * @returns un observable con la zona eliminada
   */
  del(zona: Zona): Observable<Zona> {
    const url = `${this.URL_ZONAS}/${zona.id}`;
    return this.httpClient.delete<Zona>(url);
  }
}