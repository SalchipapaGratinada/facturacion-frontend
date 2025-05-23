import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Producto } from '../models/producto.model';

/**
 * Servicio para gestionar las operaciones relacionadas con los productos.
 * Proporciona métodos para interactuar con el endpoint de productos de la API.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  /**
   * URL base para las peticiones al endpoint de productos.
   * Se construye utilizando la URL base de la API desde las variables de entorno.
   */
  private readonly baseUrl = `${environment.apiUrl}/producto`;

  /**
   * Constructor del servicio.
   * @param http - Instancia de HttpClient para realizar peticiones HTTP
   */
  constructor(private readonly http: HttpClient) { }

  /**
   * Obtiene la lista de todos los productos disponibles.
   * @returns Observable que emite un array de objetos Producto
   */
  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.baseUrl);
  }

}
