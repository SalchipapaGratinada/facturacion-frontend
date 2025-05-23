import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Cliente } from '../models/cliente.model';

/**
 * Servicio para gestionar las operaciones relacionadas con los clientes.
 * Proporciona métodos para interactuar con el endpoint de clientes de la API.
 */
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  /**
   * URL base para las peticiones al endpoint de clientes.
   * Se construye utilizando la URL base de la API desde las variables de entorno.
   */
  private readonly baseUrl = `${environment.apiUrl}/cliente`;

  /**
   * Constructor del servicio.
   * @param http - Instancia de HttpClient para realizar peticiones HTTP
   */
  constructor(private readonly http: HttpClient) { }

  /**
   * Obtiene la lista de todos los clientes.
   * @returns Observable que emite un array de objetos Cliente
   */
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }
}
