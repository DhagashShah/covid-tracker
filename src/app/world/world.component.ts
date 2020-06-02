import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

  // listdata:Array<any>=[];
  constructor(private service:DataService) { }

  ngOnInit()
  {
    // this.service.getAllData().then(res =>{
    //   this.listdata=res.data.Countries;
    //   console.log(res.data);
    // })
  }

}
