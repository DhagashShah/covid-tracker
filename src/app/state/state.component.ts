import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  showArrows = {
    uparrowState: false,
    downarrowState: false,
    downarrowConfirmed: false,
    uparrowowConfirmed: false,
    downarrowActive: false,
    uparrowActive: false,
    downarrowRecovered: false,
    uparrowRecovered: false,
    downarrowDeath: false,
    uparrowDeath: false,
  }
  private isAscendingSort: boolean = false;

  public list: {};
  showDistrict:boolean=false
  sortedDataBasedOnDate

  DailystateStatus: Array<any> = [{ state: '', confirmed: '', recovered: '', deaths: '', active: '' }];
  DailyStatus: any = { total: '' }
  statewisedata: Array<any> = [{ state: '', confirmed: '', recovered: '', deaths: '', active: '' }];
  statewisecase: any = { confirmed: '', active: '', recovered: '', deaths: '' }
  startdate = new Date()
  lastupdateddate = new Date();
  lastupdated: any = { hour: 0, minute: 0, second: 0 }
  SingleStateData
  lastrefreshedtime: any;
  stateWiseDate: Array<any> = [{ state: '', confirmed: '', recoverd: '', deaths: '', active: '' }];

  constructor(private service:DataService,private httpService: HttpClient) { }

  ngOnInit() {
    let info;
    info = this.httpService.get('https://api.rootnet.in/covid19-in/stats/')
    info.subscribe(res => {
      //console.log(res.data.regional);
      this.list = res.data.regional;
    })

    this.testData();
    this.getStateWise();
  }

  testData() {
    this.service.getDailyCaseStatus().subscribe(
      response => {
        this.sortedDataBasedOnDate = response.data.history
        this.sortByMaxCases(this.sortedDataBasedOnDate)
       
       // console.log(this.sortedDataBasedOnDate);
        this.calculateDiff(this.sortedDataBasedOnDate)
        this.statewisedata = this.sortedDataBasedOnDate[this.sortedDataBasedOnDate.length - 1].statewise
        this.statewisecase= this.sortedDataBasedOnDate[this.sortedDataBasedOnDate.length - 1].total
     //   console.log(this.statewisecase)
      },
      error => {
        console.log(error);
      }
    );
  }

  calculateDiff(data) {
    let x = data
    let last: any = x[x.length - 1];
    let last2: any = x[x.length - 2];

    function calculate(schema1, schema2) {
      var ret = {};
      for (var key in schema1) {
        if (schema1.hasOwnProperty(key) && schema2.hasOwnProperty(key)) {
          var obj = schema1[key];
          var obj2 = schema2[key]
          if (typeof obj === "number" && !isNaN(obj) && typeof obj2 === "number" && !isNaN(obj2)) {
            ret[key] = obj - obj2;
          }
          else {
            if (typeof obj === 'object' && typeof obj2 === 'object') {
              ret[key] = calculate(obj, obj2);
            }
            else {
              ret[key] = obj;
            }
          }
        }
      }
      return ret;
    }
    let test = calculate(last, last2);
    this.DailyStatus = test;
    this.DailystateStatus = this.DailyStatus.statewise
    console.log(this.DailystateStatus);
    
  }

  getStateWise() {
    this.service.getDataStateWise().subscribe(data => {
    this.lastrefreshedtime=data.data.lastRefreshed   
      this.lastupdateddate = data.data.lastRefreshed
     // console.log(this.lastupdated)

      function getDataDiff(startDate, endDate) {
        var diff = endDate.getTime() - startDate.getTime();
        var days = Math.floor(diff / (60 * 60 * 24 * 1000));
        var hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
        var minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
        var seconds = Math.floor(diff / 1000) - ((days * 24 * 60 * 60) + (hours * 60 * 60) + (minutes * 60));
        return { day: days, hour: hours, minute: minutes, second: seconds };
      }

      this.lastupdated = getDataDiff(new Date(this.lastupdateddate), new Date(this.startdate));

    },
      err => {
        console.log(err)
      })
  }

  OngetState(state) {

    this.getDataofState(state)
    this.service.getState(state)
    this.service.getDataDistrictWise(state)
 
  }

  getDataofState(state: any) {
    console.log(this.statewisedata)
   const f = this.statewisedata.filter(a => a.state==state);
    this.SingleStateData=f[0]
    console.log();
  }

  showHideData(data) {
    if(data && data['show'] == true) {
      data['show'] = false;
    } else {
      data['show'] = true;
    }
  }

  sortAscending(data) {
    this.resetArrows()
    this.isAscendingSort = !this.isAscendingSort;
   this.showArrows.uparrowState=!this.showArrows.uparrowState
    
    data.forEach(item => item.statewise.sort(function (a, b) {
      if (a.state < b.state) {
        return -1;
      }
      if (a.state > b.state) {
        return 1;
      }
      return 0;
    }))


    this.calculateDiff(this.sortedDataBasedOnDate)

    if (!this.isAscendingSort) {
      this.resetArrows()
      this.showArrows.downarrowState=!this.showArrows.downarrowState
      let a = data.forEach(item => item.statewise.sort(function (a, b) {
      
      if (b.state < a.state) {
        return -1;
      }
      if (b.state > a.state) {
        return 1;
      }
      return 0;
    }))
      this.calculateDiff(this.sortedDataBasedOnDate)
    }
  }

  resetArrows() {
    this.showArrows = {
      uparrowState: false,
      downarrowState: false,
      downarrowConfirmed:false,
      uparrowowConfirmed:false,
      downarrowActive:false,
      uparrowActive:false,
      downarrowRecovered:false,
      uparrowRecovered:false,
      downarrowDeath:false,
      uparrowDeath:false,
  }
    
  }

  sortByMaxCases(sortedDataBasedOnDate) {
    this.resetArrows()
    this.isAscendingSort = !this.isAscendingSort;
   this.showArrows.downarrowConfirmed=!this.showArrows.downarrowConfirmed


 
    sortedDataBasedOnDate.forEach(item => item.statewise.sort(function (a, b) {
      if (b.confirmed < a.confirmed) {
        return -1;
      }
      if (b.confirmed > a.confirmed) {
        return 1;
      }
      return 0;
    }))
    this.calculateDiff(this.sortedDataBasedOnDate)

    if (!this.isAscendingSort) {
      this.resetArrows()
     this.showArrows.uparrowowConfirmed=!this.showArrows.uparrowowConfirmed
    sortedDataBasedOnDate.forEach(item => item.statewise.sort(function (a, b) {
        if (a.confirmed < b.confirmed) {
          return -1;
        }
        if (a.confirmed > b.confirmed) {
          return 1;
        }
        return 0;
      }))

      this.calculateDiff(this.sortedDataBasedOnDate)
    }
  }

  sortByMaxActive(sortedDataBasedOnDate) {
    this.resetArrows()
    this.isAscendingSort = !this.isAscendingSort;
   this.showArrows.uparrowActive=!this.showArrows.uparrowActive
   
    sortedDataBasedOnDate.forEach(item => item.statewise.sort(function (a, b) {
      if (a.active < b.active) {
        return -1;
      }
      if (a.active > b.active) {
        return 1;
      }
      return 0;
    }))
    this.calculateDiff(this.sortedDataBasedOnDate)

    if (!this.isAscendingSort) {
      this.resetArrows()
     this.showArrows.downarrowActive=!this.showArrows.downarrowActive

      sortedDataBasedOnDate.forEach(item => item.statewise.sort(function (a, b) {
        if (b.active < a.active) {
          return -1;
        }
        if (b.active > a.active) {
          return 1;
        }
        return 0;
      }))
      this.calculateDiff(this.sortedDataBasedOnDate)
    }

  }

  sortByMaxRecovered(sortedDataBasedOnDate) {

    this.resetArrows()
    this.isAscendingSort = !this.isAscendingSort;
   this.showArrows.uparrowRecovered=!this.showArrows.uparrowRecovered
    sortedDataBasedOnDate.forEach(item => item.statewise.sort(function (a, b) {
      if (b.recovered < a.recovered) {
        return -1;
      }
      if (b.recovered > a.recovered) {
        return 1;
      }
      return 0;
    }))
    this.calculateDiff(this.sortedDataBasedOnDate)

    if (!this.isAscendingSort) {

      this.resetArrows()
     this.showArrows.downarrowRecovered=!this.showArrows.downarrowRecovered
      sortedDataBasedOnDate.forEach(item => item.statewise.sort(function (a, b) {
        if (a.recovered < b.recovered) {
          return -1;
        }
        if (a.recovered > b.recovered) {
          return 1;
        }
        return 0;
      }))

      this.calculateDiff(this.sortedDataBasedOnDate)
    }

  }

  sortByMaxDeath(sortedDataBasedOnDate) {
    
    this.resetArrows()
    this.isAscendingSort = !this.isAscendingSort;
   this.showArrows.uparrowDeath=!this.showArrows.uparrowDeath
    sortedDataBasedOnDate.forEach(item => item.statewise.sort(function (a, b) {
     
    if (a.deaths < b.deaths) {
      return -1;
    }
    if (a.deaths > b.deaths) {
      return 1;
    }
    return 0;
  }))
    this.calculateDiff(this.sortedDataBasedOnDate)

    if (!this.isAscendingSort) {
      this.resetArrows()
         this.showArrows.downarrowDeath=!this.showArrows.downarrowDeath
      sortedDataBasedOnDate.forEach(item => item.statewise.sort(function (a, b) {
        if (b.deaths < a.deaths) {
          return -1;
        }
        if (b.deaths > a.deaths) {
          return 1;
        }
        return 0;
      }))
  
  

      this.calculateDiff(this.sortedDataBasedOnDate)
    }

  }

}



