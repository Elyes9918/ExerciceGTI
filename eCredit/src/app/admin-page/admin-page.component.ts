import { Component, OnInit, ViewChild,ElementRef, Injectable } from '@angular/core';
import { Customer, Representative } from 'src/app/api/customer';
import { CustomerService } from 'src/app/api/service/customer.service';
import { Product } from 'src/app/api/product';
import { ProductService } from 'src/app/api/service/product.service';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService } from 'primeng/api';


interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  providers: [MessageService, ConfirmationService]
  
})
export class AdminPageComponent {

    loading: boolean = false;

    customers1: Customer[] = [];

    statuses: any[] = [];

    representatives: Representative[] = [];



  

}
