import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BASE_URL } from "../constants";
import { Observable } from "rxjs";
import { Planets } from "../models/Planets";
import { map } from "rxjs/operators";
import { Vehicles } from "../models/Vehicles";

@Injectable({
  providedIn: "root",
})
export class FindFalconeService {
  constructor(public httpClient: HttpClient) {}

  sendPlanetsRequest(): Observable<Planets | any> {
    return this.httpClient.get(`${BASE_URL}planets`);
  }

  sendVehiclesRequest(): Observable<Vehicles | any> {
    return this.httpClient.get(`${BASE_URL}vehicles`);
  }

  sendTokenRequest(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
      }),
    };
    return this.httpClient.post(`${BASE_URL}token`, null, httpOptions);
  }

  sendFalconeRequest(body): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Accept: "application/json",
        "Content-Type": "application/json",
      }),
    };
    return this.httpClient.post(`${BASE_URL}find`, body, httpOptions);
  }
}
