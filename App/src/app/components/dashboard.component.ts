import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface PeriodicElement {
	name: string;
	position: number;
	weight: number;
	symbol: string;
  }
  
  const ELEMENT_DATA: PeriodicElement[] = [
	{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
	{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
	{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
	{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
	{position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
	{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
	{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
	{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
	{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
	{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

@Component({
	selector: '',
	templateUrl: './dashboard.component.html',
	styles: []
})
export class DashboardComponent{
	public userData = {};
	displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
	dataSource = ELEMENT_DATA;
	constructor(private http:HttpClient, private router:Router){}

	ngOnInit(){
		// this.http.get('http://127.0.0.1:4000/api/dashboard').toPromise()
		// 	.then((d:any)=>{
		// 		this.userData = d.data;
		// 	})
		// 	.catch(e=>{
		// 	console.log(e);
		// 		this.router.navigate(['login']);
		// 	});
	}


	public barChartOptions:any = {
		scaleShowVerticalLines: false,
		responsive: true
	  };
	  public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	  public barChartType:string = 'bar';
	  public barChartLegend:boolean = true;
	 
	  public barChartData:any[] = [
		{data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
		{data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
	  ];
	 
	  public randomize():void {
		// Only Change 3 values
		let data = [
		  Math.round(Math.random() * 100),
		  59,
		  80,
		  (Math.random() * 100),
		  56,
		  (Math.random() * 100),
		  40];
		let clone = JSON.parse(JSON.stringify(this.barChartData));
		clone[0].data = data;
		this.barChartData = clone;
		/**
		 * (My guess), for Angular to recognize the change in the dataset
		 * it has to change the dataset variable directly,
		 * so one way around it, is to clone the data, change it and then
		 * assign it;
		 */
	  }

	  //
	  // Doughnut
		public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
		public doughnutChartData:number[] = [350, 450, 100];
		public doughnutChartType:string = 'doughnut';
		
		// events
		public chartClicked(e:any):void {
			console.log(e);
		}
		
		public chartHovered(e:any):void {
			console.log(e);
		}
}