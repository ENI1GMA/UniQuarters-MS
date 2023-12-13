import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { RoutePaths } from 'src/app/models/routepaths';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('250ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class NavigationComponent {
  @Input() active!: boolean;
  navData = navbarData;
  routes = RoutePaths;
}

export const navbarData = [
  {
    icon: 'pi pi-chart-bar',
    label: 'Dashboard',
    routeLink: `/${RoutePaths.GESTION}/${RoutePaths.DASHBOARD}`,
  },
  {
    icon: 'pi pi-user',
    label: 'Utilisateurs',
    routeLink: `/${RoutePaths.GESTION}/${RoutePaths.USER}`,
  },
  {
    icon: 'pi pi-map',
    label: 'Universités',
    routeLink: `/${RoutePaths.GESTION}/${RoutePaths.UNIVERSITE}`,
  },
  {
    icon: 'pi pi-map',
    label: 'Foyers',
    routeLink: `/${RoutePaths.GESTION}/${RoutePaths.FOYER}`,
  },

  {
    icon: 'pi pi-building',
    label: 'Blocs',
    routeLink: `/${RoutePaths.GESTION}/${RoutePaths.BLOC}`,
  },
  {
    icon: 'pi pi-home',
    label: 'Chambres',
    routeLink: `/${RoutePaths.GESTION}/${RoutePaths.CHAMBRE}`,
  },  {
    icon: 'pi pi-calendar',
    label: 'Réservations',
    routeLink: `/${RoutePaths.GESTION}/${RoutePaths.RESERVATION}`,
  },
];
