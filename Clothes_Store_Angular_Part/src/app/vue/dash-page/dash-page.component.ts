import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { CategoryService } from 'src/app/controller/category.service';
import { CommandService } from 'src/app/controller/command.service';
import { DeliveryPersonService } from 'src/app/controller/delivery-person.service';
import { ProductService } from 'src/app/controller/product.service';
import { RegistrationService } from 'src/app/controller/registration.service';
import { Command } from 'src/app/model/command';
import { Delivery_person } from 'src/app/model/deliveryPerson';
import { Product } from 'src/app/model/product';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-dash-page',
  templateUrl: './dash-page.component.html',
  styleUrls: ['./dash-page.component.css']
})
export class DashPageComponent implements AfterViewInit, OnInit{

  products: any[] = [];
  delivery: any[]= [];
  users: User[]=[];
  productsCount: number = 0;
  deliverycount: number=0 ;
  usercount:number =0 ;
  constructor(private productService: ProductService , private deliveryperson : DeliveryPersonService , private registrationservice : RegistrationService,
     private commandeservice : CommandService , private categoryService : CategoryService
  ) { }
  ngOnInit(): void {
    this.getProducts();
    this.getdelivery();
   this. getUsers();
  }

  getProducts() {
    this.productService.getproducts().subscribe(
      (productData: Product[]) => {
        this.products = productData;
        this.productsCount = this.products.length; 
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des données:', error);
      }
    );
  }

  getdelivery(){
this.deliveryperson.getdeliverypersons().subscribe(


  (deliveryData: Delivery_person[]) => {
    this.delivery = deliveryData;
    this.deliverycount = this.delivery.length; 
  },
  (error) => {
    console.error('Une erreur s\'est produite lors de la récupération des données:', error);
  }


);

  }

  getUsers(): void {
    this.registrationservice.getallusers().subscribe(
      (userData: User[]) => { 
        this.users = userData;
        this.usercount = this.users.length; 
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des données:', error);
      }
    );
  }
  
 
 

  async getAllCommands(): Promise<Command[]> {
    try {
     
      const commands = await this.commandeservice.getAllCommands().toPromise();
      return commands || []; 
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes :', error);
      return [];
    }
  }

  async calculateOrdersPerDay(): Promise<{ [date: string]: number }> {
    const commands = await this.getAllCommands();
    const ordersPerDay: { [date: string]: number } = {};

    
    commands.forEach(command => {
     
      const date = new Date(command.date).toISOString().split('T')[0]; 

    
      ordersPerDay[date] = ordersPerDay[date] ? ordersPerDay[date] + 1 : 1;
    });

    return ordersPerDay;
  }

  @ViewChild('ordersPerDayChart') ordersPerDayChart: ElementRef;
  @ViewChild('columnChart') columnChart: ElementRef;

  ngAfterViewInit() {
    this.drawOrdersPerDayChart();
    this.drawColumnChart();
  }

  private async drawOrdersPerDayChart() {
    const ordersPerDayData = await this.calculateOrdersPerDay(); 
    const dates = Object.keys(ordersPerDayData);
    const ordersPerDay = Object.values(ordersPerDayData);
  
    const ctx = this.ordersPerDayChart.nativeElement.getContext('2d'); 
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates, 
        datasets: [{
          label: 'Orders per Day',
          data: ordersPerDay,
          borderColor: '#e5c3d1',
          backgroundColor: '#e5c3d1',
          fill: false
         
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1 ,
              padding: 3
            }
          },
          x: {
            ticks: {
              autoSkip: true, 
              maxTicksLimit: 10, 
              maxRotation: 0 ,
              padding: 5
            }
          },
        }
      
      }
    });
  }


  async getTotalByCategory(): Promise<{ [categoryId: string]: number }> {
    const commands = await this.getAllCommands();
    const totalByCategory: { [categoryId: string]: number } = {};


    for (const command of commands) {
  
      for (const commandLine of command.command_lines) {
        const categoryId = commandLine.product.fcategory_id;

        
        totalByCategory[categoryId] = (totalByCategory[categoryId] || 0) + commandLine.quantity;
      }
    }

    return totalByCategory;
  }

  async getCategoryNameById(categoryId: number): Promise<string> {
    try {
      const category = await this.categoryService.getCategoryById(categoryId).toPromise();
      if (category) {
        return category.name || 'Unknown';
      } else {
        console.error(`Aucune catégorie trouvée avec l'ID ${categoryId}`);
        return 'Unknown';
      }
    } catch (error) {
      console.error(`Erreur lors de la récupération de la catégorie avec l'ID ${categoryId} :`, error);
      return 'Unknown';
    }
  }
  
  private async drawColumnChart() {
    const totalByCategory = await this.getTotalByCategory();
    const categories = Object.keys(totalByCategory);
    const counts = Object.values(totalByCategory);

    
    const categoryNames = await Promise.all(categories.map(categoryId => this.getCategoryNameById(+categoryId)));

    const ctx = this.columnChart.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: categoryNames, 
        datasets: [{
          label: 'Sales by category',
          data: counts,
          backgroundColor: '#B97989',
          borderColor: '#B97989',
          borderWidth: 1,
          barPercentage: 0.5
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }
  
  
}
