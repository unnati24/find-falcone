import { Component, OnInit } from "@angular/core";
import { FindFalconeService } from "../services/find-falcone.service";
import { Planets } from "../models/Planets";
import { Router, NavigationExtras } from "@angular/router";

@Component({
  selector: "app-planet-select",
  templateUrl: "./planet-select.component.html",
  styleUrls: ["./planet-select.component.scss"],
})
export class PlanetSelectComponent implements OnInit {
  planets: Planets[];
  selectedCount = 0;
  maxCount = 4;

  constructor(
    public findFalconeService: FindFalconeService,
    public router: Router
  ) {}

  ngOnInit() {
    this.findFalconeService.sendPlanetsRequest().subscribe((data) => {
      this.planets = data;
    });
  }

  updateSelectedCount(count: number) {
    this.selectedCount = count;
  }

  clickHandler(selectedItems: any[]) {
    let filterItems: string[] = selectedItems.map(
      (item) => item._text.nativeElement.textContent.split(" ")[1]
    );

    let planetsSelected: Planets[] = this.planets.filter(
      (item) => filterItems.indexOf(item.name) >= 0
    );

    if (this.selectedCount < this.maxCount)
      alert("Uh oh! You will have to select four planets to proceed!!");
    else {
      const navigationExtras: NavigationExtras = {
        state: {
          planets: planetsSelected,
        },
      };

      this.router.navigate(["search"], navigationExtras);
    }
  }
}
