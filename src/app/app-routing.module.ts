import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
import { PlanetSelectComponent } from "./planet-select/planet-select.component";
import { ResultComponent } from "./result/result.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "search", component: SearchComponent },
  { path: "planet-select", component: PlanetSelectComponent },
  { path: "result", component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
