import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Usuario, RolUsuario } from "../interface/usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL_USUARIOS = `${environment.urlBackendSpring}/usuarios/`;

  constructor(
    private httpClient: HttpClient
  ) { }

  //----------------------------------------------------------
  // Funciones para realizar peticiones al backend
  //----------------------------------------------------------

  /**
   * Obtiene todos los usuarios con sus roles
   * @returns Observable con la lista completa de usuarios
   */
  get(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.URL_USUARIOS);
  }

  /**
   * Crea un nuevo usuario
   * @param usuario Datos del usuario a crear
   * @returns Observable con el usuario creado
   */
  post(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.URL_USUARIOS, usuario);
  }

  /**
   * Obtiene un usuario específico por su ID
   * @param id Identificador del usuario
   * @returns Observable con los datos del usuario
   */
  getId(id: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.URL_USUARIOS}${id}`);
  }

  /**
   * Actualiza un usuario existente
   * @param usuario Datos actualizados del usuario
   * @returns Observable con el usuario actualizado
   */
  put(usuario: Usuario): Observable<Usuario> {
    const url = `${this.URL_USUARIOS}${usuario.id}`;
    return this.httpClient.put<Usuario>(url, usuario);
  }

  /**
   * Elimina un usuario
   * @param usuario Usuario a eliminar
   * @returns Observable con el usuario eliminado
   */
  del(usuario: Usuario): Observable<Usuario> {
    const url = `${this.URL_USUARIOS}${usuario.id}`;
    return this.httpClient.delete<Usuario>(url);
  }

  /**
   * Actualiza los roles de un usuario
   * @param usuarioId ID del usuario
   * @param roles Array de roles a asignar
   * @returns Observable con los roles actualizados
   */
  actualizarRoles(usuarioId: number, roles: RolUsuario[]): Observable<RolUsuario[]> {
    const url = `${this.URL_USUARIOS}${usuarioId}/roles`;
    return this.httpClient.put<RolUsuario[]>(url, roles);
  }
}