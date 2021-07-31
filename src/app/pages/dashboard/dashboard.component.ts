import {Component, AfterViewInit, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {Poste} from "@/Model/Poste";
import {PosteService} from "@services/poste.service";
import {HttpErrorResponse} from "@angular/common/http";


// Marquer icon
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;



@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements AfterViewInit {
  public postes: Poste[];
	public map;

  constructor(private posteService: PosteService) {
  }

	ngAfterViewInit() : void {
		this.createMap();
	}

  createMap(){
		const Casablanca = {
			lat : 33.5731104,
			lng : -7.5898434
		};

		const ZoomLevel = 12;
		this.map = L.map('map',{
			center: [Casablanca.lat, Casablanca.lng],
			zoom: ZoomLevel
		});

		const mainLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	      minZoom: 11,
	      maxZoom: 17,
	      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	    });

		mainLayer.addTo(this.map);
		this.getPostes();
	}

  public getPostes() : void{
    this.posteService.getAllPostes().subscribe(
      (response: Poste[])=>{
        this.postes=response;
        // ajouter les markers des postes a la map
        this.addMarker(this.postes);
      },
      (error: HttpErrorResponse)=>{alert(error.message)}
    );
  }


	addMarker(postes:Poste[]){

    for(let p of postes.values()){

      const Marker = L.marker({lat:p.y_gps ,lng:p.x_gps});
      Marker.bindPopup('<b>Poste :</b> '+p.libelle.toString()+'<br>'+'<b>Nombre de clients :</b> '
        +p.nb_clients+'<br><b>Fiable :</b> '+p.fiabilise+'<br><b>Consommation du poste :</b> '+p.conso_poste
        +' KWH<br><b>Consommtion des clients :</b> '+p.conso_clients+' KWH<br><b>Rendement :</b> '+p.rendement,{
        closeButton: true
      });
      Marker.addTo(this.map);

    }

	}

}
