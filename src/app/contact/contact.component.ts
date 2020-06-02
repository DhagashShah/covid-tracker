import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-contact',
  templateUrl:'./contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  listdata:any;
  listcont:Array<any>=[];
  constructor(private service:DataService) { }

   async ngOnInit() 
  {
    await this.service.getContact().then(res =>{
      this.listdata=res.data.contacts.primary;
      console.log(res.data)
    })

    await this.service.getContact().then(res =>{
      this.listcont=res.data.contacts.regional;
      console.log(res.data)
    })
  }

}
