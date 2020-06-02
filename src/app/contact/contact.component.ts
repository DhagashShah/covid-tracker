import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-contact',
  templateUrl:'./contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  
  listcont:any;
  listdata:any;
  constructor(private service:DataService) { }

  
   ngOnInit() 
  {
    this.service.getContact().subscribe(res => {
      
      this.listdata = res.data.contacts.primary;
      this.listcont=res.data.contacts.regional;
      console.log(res.data.contacts.primary);

    }) 
  }
  

}
