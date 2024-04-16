import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../weather.service';
import { error } from 'console';
import { Weather } from '../../../models/weather.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-weather-home',
  templateUrl: './weather-home.component.html',
  styleUrl: './weather-home.component.scss'
})
export class WeatherHomeComponent implements OnInit, OnDestroy{

  initialCityName: string = 'Brasilia';
  weather!: Weather;
  private readonly destroy$: Subject<void> = new Subject();

  constructor(private service: WeatherService) {}
  
  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }
 
  getWeatherDatas(cityName: string): void {
    this.service.getWeatherDatas(cityName).pipe(takeUntil(this.destroy$)).subscribe({
      next: (response: Weather) => {
        this.weather = response;
      },
      error: (error) => console.log("Error: ", error)
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
