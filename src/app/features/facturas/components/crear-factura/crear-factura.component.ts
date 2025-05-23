import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { Cliente } from '../../models/cliente.model';
import { Producto } from '../../models/producto.model';
import { ClienteService } from '../../services/cliente.service';
import { ProductoService } from '../../services/producto.service';

/**
 * Componente para la creación de facturas.
 * Permite seleccionar un cliente, agregar productos y calcular totales.
 */
@Component({
  selector: 'app-crear-factura',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatTableModule
  ],
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {

  /**
   * Formulario reactivo que contiene todos los campos de la factura.
   */
  facturaForm!: FormGroup;

  /**
   * Lista de clientes disponibles para seleccionar.
   */
  clientes: Cliente[] = [];

  /**
   * Lista de productos disponibles para agregar a la factura.
   */
  productos: Producto[] = [];

  /**
   * Columnas que se muestran en la tabla de detalles de la factura.
   */
  displayedColumns = ['producto', 'precioUnitario', 'cantidad', 'imagen', 'totalProducto'];

  private readonly _cd = inject(ChangeDetectorRef);
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _clienteService = inject(ClienteService);
  private readonly _productoService = inject(ProductoService);

  constructor() { }

  /**
   * Inicializa el componente cargando los datos necesarios.
   */
  ngOnInit() {
    this._inicializarFormulario();
    this._inicializarClientes();
    this._inicializarProductos();
  }

  /**
   * Carga la lista de clientes desde el servicio.
   */
  private _inicializarClientes() {
    this._clienteService.getClientes().subscribe(res => this.clientes = res);
  }

  /**
   * Carga la lista de productos desde el servicio.
   */
  private _inicializarProductos() {
    this._productoService.getProductos().subscribe(res => this.productos = res);
  }

  /**
   * Inicializa el formulario con sus campos y validaciones.
   */
  private _inicializarFormulario() {
    this.facturaForm = this._formBuilder.group({
      idCliente: ['', Validators.required],
      numeroFactura: ['', Validators.required],
      fechaEmisionFactura: [new Date()],
      detalles: this._formBuilder.array([]),
      subTotalFacturas: [{ value: 0, disabled: true }],
      totalImpuestos: [{ value: 0, disabled: true }],
      totalFactura: [{ value: 0, disabled: true }]
    });
  }

  /**
   * Obtiene el FormArray de detalles de la factura.
   * @returns FormArray con los detalles de la factura
   */
  get detalles(): FormArray {
    return this.facturaForm.get('detalles') as FormArray;
  }

  /**
   * Agrega un nuevo detalle (producto) a la factura.
   * Configura los eventos para actualizar precios y totales.
   */
  agregarDetalle() {
    console.log("Agregando nuevo producto...");

    const detalle = this._formBuilder.group({
      idProducto: ['', Validators.required],
      nombreProducto: [''],
      precioUnitario: [0],
      cantidad: [1, Validators.min(1)],
      totalProducto: [0],
      imagenProducto: [''],
      ext: ['']
    });

    detalle.get('idProducto')?.valueChanges.subscribe(id => {
      const producto = this.productos.find(p => p.id === Number(id));
      if (producto) {
        detalle.patchValue({
          nombreProducto: producto.nombreProducto,
          precioUnitario: producto.precioUnitario,
          imagenProducto: producto.imagenProducto ?? '',
          ext: producto.ext,
          totalProducto: producto.precioUnitario * (detalle.get('cantidad')?.value ?? 0)
        });
      }
      this.recalcularTotales();
    });

    detalle.get('cantidad')?.valueChanges.subscribe(() => {
      const precio = detalle.get('precioUnitario')?.value ?? 0;
      const cantidad = detalle.get('cantidad')?.value ?? 0;
      detalle.get('totalProducto')?.setValue(precio * cantidad, { emitEvent: false });
      this.recalcularTotales();
    });

    this.facturaForm.setControl('detalles', this._formBuilder.array([...this.detalles.controls]));
    this._cd.detectChanges();
  }

  /**
   * Recalcula los totales de la factura basado en los detalles.
   * Actualiza subtotal, impuestos y total final.
   */
  recalcularTotales() {
    const subtotal = this.detalles.controls.reduce((acc, ctrl) => acc + ctrl.get('totalProducto')!.value, 0);
    const impuestos = subtotal * 0.19;
    const total = subtotal + impuestos;

    this.facturaForm.patchValue({
      subTotalFacturas: subtotal,
      totalImpuestos: impuestos,
      totalFactura: total
    }, { emitEvent: false });
  }

  /**
   * Reinicia el formulario a su estado inicial.
   */
  nuevoFormulario() {
    this.facturaForm.reset();
    this.detalles.clear();
    this.facturaForm.patchValue({
      fechaEmisionFactura: new Date(),
      subTotalFacturas: 0,
      totalImpuestos: 0,
      totalFactura: 0
    });
  }

  /**
   * Guarda la factura si el formulario es válido.
   * Actualmente solo muestra los datos en consola.
   */
  guardarFactura() {
    if (this.facturaForm.valid) {
      const factura = this.facturaForm.getRawValue();
      console.log('Factura lista para guardar:', factura);
      // TODO : proceso de guardado de la factura
    } else {
      alert('Formulario inválido');
    }
  }

  /**
   * Función de seguimiento para la tabla de detalles.
   * @param index - Índice del elemento en la tabla
   * @returns El índice del elemento
   */
  trackByIndex(index: number): number {
    return index;
  }
}
