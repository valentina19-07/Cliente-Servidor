import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosComponent } from './pedidos.component';

@NgModule({
  declarations: [PedidosComponent],
  imports: [
    CommonModule,
    FormsModule,
    PedidosRoutingModule
  ],
  exports: [PedidosComponent]
})
export class PedidosModule { }
