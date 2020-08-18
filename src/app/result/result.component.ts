import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FindFalconeService } from "../services/find-falcone.service";

@Component({
  selector: "app-result",
  templateUrl: "./result.component.html",
  styleUrls: ["./result.component.scss"],
})
export class ResultComponent implements OnInit {
  selectedData: object[] = [];
  response: object = {};
  isLoaded: boolean = false;

  constructor(
    private router: Router,
    private findFalconeService: FindFalconeService
  ) {
    const navigation = this.router.getCurrentNavigation().extras.state as {
      selection: any[];
    };
    const { selection } = navigation;
    this.selectedData = selection;
  }

  ngOnInit() {
    this.findFalconeService.sendTokenRequest().subscribe((token) => {
      let body = {};
      body["token"] = token["token"];
      body["planet_names"] = [];
      body["vehicle_names"] = [];

      for (let data of this.selectedData) {
        body["planet_names"].push(data["planet"]);
        body["vehicle_names"].push(data["vehicle"]);
      }

      this.findFalconeService.sendFalconeRequest(body).subscribe(
        (result) => {
          this.response = result;
          this.isLoaded = true;
          console.log(this.response);
        },
        (error) => {
          alert("Error : " + error);
          this.router.navigate([""]);
        }
      );
    });
  }
}
