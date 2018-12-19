import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Component({
    selector: '',
    templateUrl: './dashboard.component.html',
    styles: []
})
export class DashboardComponent{
		displayedColumns: string[] = ['position', 'category', 'description', 'date', 'amount'];
		totals = {income: 0, expence: 0, total: 0, balance: 0};
    dataSource = [];

    public userData = {};
	constructor(private http:HttpClient, private router:Router, private store:Store<any>){}
    
    ngOnInit(){
			this.store.select('tranReducer').subscribe(d=>{
					let EData = [], i = 0, ETotals = {income: 0, expence: 0, total: 0, balance: 0};
					let catGroup = {};
					for(const t of d.transactions){
						EData.push({
							'position': ++i, 'category': t.category.name, 'description': t.description, 'date': t.date, 'amount': t.amount
						});
						
						if(t.category.type=='income') ETotals.income += t.amount;
						if(t.category.type=='expence') ETotals.expence += t.amount;

						if(!catGroup[t.category.name]) catGroup[t.category.name] = 0;
						catGroup[t.category.name] += t.amount;
					}
					ETotals.total = ETotals.income - ETotals.expence;
					//ETotals.balance = d.balance;

					this.doughnutChartLabels = Object.keys(catGroup);
					this.doughnutChartData = Object.values(catGroup);
//console.log(this.doughnutChartLabels, this.doughnutChartData);
					this.dataSource = EData;
					this.totals = ETotals
			});
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
		public doughnutChartLabels:string[] = [];
		public doughnutChartData:number[] = [];
		public doughnutChartType:string = 'doughnut';
		
		// events
		public chartClicked(e:any):void {
			console.log(e);
		}
		
		public chartHovered(e:any):void {
			console.log(e);
		}
}