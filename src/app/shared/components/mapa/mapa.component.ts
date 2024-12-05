import { Component, EventEmitter, Output } from '@angular/core';
import {
  icon,
  latLng,
  LeafletMouseEvent,
  LineUtil,
  marker,
  Marker,
  MarkerOptions,
  tileLayer,
} from 'leaflet';
import { Coordenada } from "../../../interfaces/coordenada.interface";

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaComponent {
  @Output()
  coordenadaSeleccionada = new EventEmitter<Coordenada>(); // Cambié el nombre para reflejar mejor su propósito.

  // Configuración inicial del mapa
  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data © OpenStreetMap contributors',
      }),
    ],
    zoom: 15,
    center: latLng(19.882707219725226, -97.39298711668894), // Coordenadas iniciales
  };

  // Opciones del marcador
  markerOption: MarkerOptions = {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png',
    }),
  };

  capas: Marker<any>[] = []; // Lista de marcadores en el mapa

  // Evento al hacer clic en el mapa
  mapClick(event: LeafletMouseEvent): void {
    const latitud = event.latlng.lat;
    const longitud = event.latlng.lng;

    // Añade un nuevo marcador en la ubicación seleccionada
    this.capas.push(marker([latitud, longitud], this.markerOption));

    // Emite las coordenadas seleccionadas
    this.coordenadaSeleccionada.emit({ latitud, longitud });
  }
}
