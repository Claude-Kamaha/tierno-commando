import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../home.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

export interface geoLocation {
  query: string;
  lon: string;
  lat: string;
  timezone: string,

}

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrl: './create-client.component.scss'
})
export class CreateClientComponent {
  createDocForm!: FormGroup;
  deviceId!: string;
  data!: geoLocation;
  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    private http: HttpClient

  ) {

  }

  userType =
    [{
      name: 'Client',
      value: 'client'
    },
    {
      name: 'Marchand',
      value: 'merchant'
    }

    ]
  language = [
    {
      name: 'Anglais',
      value: 'en'
    },
    {
      name: 'Francais',
      value: 'fr'
    },
  ]



  ngOnInit() {
    this.getCountries()
    this.createUser();
    this.gen();
    this.geolatitude();
  }




  createUser() {
    this.createDocForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        emailAddress: ['', Validators.required],
        password: ['', Validators.required],
        phoneNumber: [''],
        phoneId: ['', Validators.required],
        language: ['', Validators.required],
        firstName: [, Validators.required],
        lastName: [''],
        gender: ['', Validators.required],
        customerType: ['', Validators.required],
        longitude: ['', Validators.required],
        latitude: [, Validators.required],
        ipAddress: [, Validators.required],
        location: [, Validators.required],
      }
    )
  }

  public gen() {
    this.deviceId = uuidv4();
    return this.deviceId;
  }
  getCountries() {
    this.homeService.getCountries().subscribe(() => { })
  }


  getGEOLocation(): Observable<geoLocation> {
    let url = `http://ip-api.com/json/`;
    return this.http.get<geoLocation>(url);
  }
  geolatitude() {
    this.getGEOLocation().subscribe((data: geoLocation): void => {
      this.data = data;
    });
  }

  submitDoc() {
    this.createDocForm.value.phoneId = this.deviceId
    this.createDocForm.value.longitude = this.data.lon;
    this.createDocForm.value.latitude = this.data.lat;
    this.createDocForm.value.ipAddress = this.data.query;
    this.createDocForm.value.location = this.data.timezone?.split('/')[1];
    this.homeService.createClient(this.createDocForm.value).subscribe((response) => {

    },
      error => {

      })
  }
}
