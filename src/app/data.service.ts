import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit{

  data1
  state
  district
  BannerData: BehaviorSubject<any> = new BehaviorSubject('')
  districtdata: Subject<any> = new Subject<any>();

  constructor(private http:HttpClient) { }

  url_statewise = 'https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise'
  url_dailycases = 'https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise/history'
  ulr_districtwise = "https://api.covid19india.org/state_district_wise.json"
  
  
  ngOnInit()
  {
    this.getDataStateWise()
  }
  
  getDataStateWise(): Observable<any> {
    return this.http.get(this.url_statewise)
  }

 getDailyCaseStatus(): Observable<any> {
    return this.http.get(this.url_dailycases)
  }

  getState(state) {
    this.state = state
  }
  getNationData():Promise<any>
  {
    return this.http.get(`${environment.Base_URL}latest`).toPromise();
  }

  getContact():Promise<any>
  {
    return this.http.get(`${environment.contact_url}contacts`).toPromise();
  }

  getDataDistrictWise(state) {
    this.http.get(this.ulr_districtwise).subscribe(data => {
      this.data1 = data
    //  console.log(this.data1)
   //   console.log(this.data1[state])
      this.district = this.data1[state].districtData
    //  console.log(state)
      this.districtdata.next(this.district)
    }
    )
  }

  
}
