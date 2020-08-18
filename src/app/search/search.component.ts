import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { Vehicles } from "../models/Vehicles";
import { Planets } from "../models/Planets";
import { FindFalconeService } from "../services/find-falcone.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent implements OnInit {
  selectedPlanets: object[];
  vehicles: any[];
  userSelection: any[] = [];
  response: any[] = [];
  timeTaken: number = 0;

  constructor(
    private router: Router,
    private findFalconeService: FindFalconeService
  ) {
    const navigation = this.router.getCurrentNavigation().extras.state as {
      planets: string[];
    };
    const { planets } = navigation;

    this.selectedPlanets = planets.map((item) => ({
      name: item["name"],
      distance: item["distance"],
    }));
  }

  ngOnInit(): void {
    this.findFalconeService.sendVehiclesRequest().subscribe((data) => {
      this.vehicles = JSON.parse(JSON.stringify(data));
      this.response = JSON.parse(JSON.stringify(data));
    });
  }

  handleChange(vehicle: string, name: string) {
    let flag: boolean = false;
    let prevVehicle = this.userSelection.filter(
      (ele) => ele["planet"] === name
    );

    if (prevVehicle.length > 0) {
      this.vehicles = this.vehicles.map((item) => {
        if (item["name"] === prevVehicle[0]["vehicle"]) {
          item["total_no"]++;
          this.calculateTime(item["speed"], item["max_distance"], "dec");
        }
        return item;
      });
    }

    if (this.userSelection.length > 0) {
      this.userSelection = this.userSelection.map((ele) =>
        ele["planet"] === name
          ? (flag = true && { ...ele, vehicle: vehicle["name"] })
          : ele
      );
      if (!flag)
        this.userSelection.push({ planet: name, vehicle: vehicle["name"] });
    } else this.userSelection.push({ planet: name, vehicle: vehicle["name"] });

    let currVehicle = this.userSelection.filter(
      (ele) => ele["planet"] === name
    );

    if (currVehicle.length > 0) {
      this.vehicles = this.vehicles.map((item) => {
        if (item["name"] === currVehicle[0]["vehicle"]) {
          item["total_no"]--;
          this.calculateTime(item["speed"], item["max_distance"], "inc");
        }
        return item;
      });
    }
  }

  calculateTime(speed: number, distance: number, operation: string) {
    this.timeTaken =
      operation === "dec"
        ? this.timeTaken - distance / speed
        : this.timeTaken + distance / speed;
  }

  refresh() {
    this.timeTaken = 0;
    this.userSelection.length = 0;
    this.vehicles.length = 0;
    this.vehicles = JSON.parse(JSON.stringify(this.response));
  }

  submit() {
    if (this.userSelection.length === 4) {
      const navigationExtras: NavigationExtras = {
        state: {
          selection: this.userSelection,
        },
      };
      this.router.navigate(["result"], navigationExtras);
    } else alert("You will have to select vehicles for each planet to proceed");
  }
}
