import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {Poste} from "@/Model/Poste";
import {PosteService} from "@services/poste.service";
import {HttpErrorResponse} from "@angular/common/http";
import {SharedDataService} from "@services/shared-data.service";


// Marquer icon (blue)
let iconRetinaUrl = 'assets/marker-icon-2x.png';
let iconUrl = 'assets/marker-icon.png';
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

// Marquer icon (red)
const iconRetinaUrlRed = 'assets/marker-icon-red.png';
const iconUrlRed = 'assets/marker-icon-red.png';
const iconDefaultRed = L.icon({
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


export class DashboardComponent implements OnInit {
  public postes: Poste[];
	public map;
	public posteInfo : Poste;
  public delegations: number[];
  public selectedDeleg: number;
  public markerGroup;



  constructor(private posteService: PosteService,private sharedDataService:SharedDataService) {
    this.selectedDeleg=0;
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
    this.markerGroup = L.layerGroup().addTo(this.map);
    this.posteInfo = this.sharedDataService.getPosteShared();
    if(this.posteInfo!=null){
      const Marker = L.marker({lat:this.posteInfo.y_gps ,lng:this.posteInfo.x_gps});
      Marker.bindPopup('<b>Poste :</b> '+this.posteInfo.libelle.toString()+'<br>'+'<b>Nombre de clients :</b> '
        +this.posteInfo.nb_clients+'<br><b>Fiable :</b> '+this.posteInfo.fiabilise+'<br><b>Consommation du poste :</b> '+this.posteInfo.conso_poste
        +' KWH<br><b>Consommtion des clients :</b> '+this.posteInfo.conso_clients+' KWH<br><b>Rendement :</b> '+this.posteInfo.rendement,{
        closeButton: true
      });
      Marker.addTo(this.markerGroup);
    }
    else{
      this.posteService.getPostesByDeleg(this.selectedDeleg).subscribe(
        (response: Poste[])=>{
          this.postes=response;
          // ajouter les markers des postes a la map
          for (let p of response) {
            const Marker = L.marker({lat: p.y_gps, lng: p.x_gps}).addTo(this.markerGroup);
            Marker.bindPopup('<b>Poste :</b> ' + p.libelle.toString() + '<br>' + '<b>Nombre de clients :</b> '
              + p.nb_clients + '<br><b>Fiable :</b> ' + p.fiabilise + '<br><b>Consommation du poste :</b> ' + p.conso_poste
              + ' KWH<br><b>Consommtion des clients :</b> ' + p.conso_clients + ' KWH<br><b>Rendement :</b> ' + p.rendement, {
              closeButton: true
            });
          }
        },
        (error: HttpErrorResponse)=>{alert(error.message)}
      );
    }

  }

  getDelegations(){
    this.posteService.getAllDeleg().subscribe(
      (response:number[])=>{
        this.delegations=response;
      },
      (error: HttpErrorResponse)=>{alert(error.message)}
    );
  }

  ngOnInit(): void {
    this.getDelegations();
    this.createMap();
  }


  getPostesByDeleg() {
    this.markerGroup.clearLayers();
    this.getPostes();
  }
}
