import { Component } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { ServiceschedulerService } from '../../../services/servicescheduler.service';
import { Router } from '@angular/router';
import { BlocService } from 'src/app/services/bloc.service';
import 'devextreme/ui/select_box';
import 'devextreme/ui/color_box';
import { Bloc } from 'src/app/models/Bloc';
@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent {
  ListTravaux: any;
  resourcesList: string[] = ['bloc', 'all'];
  selectedResource: string = this.resourcesList[0];
  audienceList: Bloc[] = [];
  //filter by bloc
  onLocationFilterChanged(event: any) {
    const location = event.target.value
    console.log("onLocationFilterChanged function location :: " + location);

    if (!location) {
      // Load all appointments
      this.store = new CustomStore({
        key: 'idTravaux ',
        load: (loadOptions) => {

          return new Promise((resolve, reject) => {
            this.dataService.getEventList().subscribe(
                (audienceList) => {
                  resolve(audienceList);
                },
                (error) => {
                  reject(error);
                }
            );
          });
        },
        insert: (values) => {

          return this.dataService.addEvent(values).toPromise();
        },
        update: (key, values) => {

          return this.dataService.updateEvent(key, values).toPromise();
        },
        remove: (key) => {
          return this.dataService.deleteEvent(key).toPromise().then(() => {

          }).catch(error => {
            console.log('Error deleting data:', error);
          });

        },
      });

    } else {

      this.store = new CustomStore({
        key: 'idTravaux',
        load: (loadOptions) => {
          console.log("ee" + location)
          return new Promise((resolve, reject) => {
            this.dataService.getFilteredEventsByLocation(location).subscribe(
                (filteredAppointments) => {
                  resolve(filteredAppointments);
                },
                (error) => {
                  reject(error);
                }
            );
          });
        },
        insert: (values) => {

          return this.dataService.addEvent(values).toPromise();
        },
        update: (key, values) => {

          return this.dataService.updateEvent(key, values).toPromise();
        },
        remove: (key) => {

          return this.dataService.deleteEvent(key).toPromise().then(() => {

          }).catch(error => {
            console.log('Error deleting data:', error);
          });

        },

      });
    }
  }
  store: CustomStore;
  // add fields to the form
  onAppointmentFormCreated(e: any) {
    console.log("onAppointmentFormOpening fires");

    e.popup.option("showTitle", true);
    e.popup.option(
        "title",
        e.appointmentData.text
            ? e.appointmentData.text
            :" Ajouter Event"    );

    const form = e.form;
    let mainGroupItems = form.itemOption("mainGroup").items;

    let formItems = form.option("items");


    form.option("items", formItems);

  }
  getResourcesColor(resourceData: any): string {
    // Implement logic to retrieve the color from the resource data
    // For example, assuming that the color information is in the 'color' field
    return resourceData.color || 'defaultColor';
  }
  constructor(private dataService: ServiceschedulerService, private router: Router,private blocService: BlocService) {
    {
      //list travaux
      this.ListTravaux = this.blocService.getAllBlocs2().subscribe(
          (data) => {
            this.ListTravaux = data;
            console.log(this.ListTravaux );
          },
          (error) => {
            console.log(error);
          }
      );


      console.log( this.ListTravaux );
      // crud schedule
      this.store = new CustomStore({
        key: "idTravaux",
        load: (loadOptions) => {

          return new Promise((resolve, reject) => {
            dataService.getEventList().subscribe(
                (audienceList) => {
                  resolve(audienceList);

                },
                (error) => {
                  reject(error);
                }
            );
          });
        },
        insert: (values) => {

          return dataService.addEvent(values).toPromise();
        },
        update: (key, values) => {

          return dataService.updateEvent(key, values).toPromise();
        },
        remove: (key) => {
          return dataService.deleteEvent(key).toPromise().then(() => {
            console.log(key);
          }).catch(error => {
            console.log('Error deleting data:', error);
          });

        },
      });
    }
  }
}
