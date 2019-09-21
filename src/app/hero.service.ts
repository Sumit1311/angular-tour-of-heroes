import { Injectable } from '@angular/core';
import {Hero} from './models/hero.model'
import {HEROES} from './mock-heroes'
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/v1/heroes';

  constructor(private messageService: MessageService,
    private http:HttpClient) { }
  
  private log(message:string){
    this.messageService.add(message);
  }

  getHeroes(): Observable<Hero[]> {
    
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('HeroService: fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  handleError<T>(operation = 'operation', result?:T){
      return (error: any): Observable<T> => {
        console.error(error);
        this.log("${operation} failed : ${error.message}");
        return of(result as T);
      }
  }
  
  getHero(id: number): Observable<Hero> {
    let url:string = `${this.heroesUrl}/${id}`
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`HeroService : Fetched hero details id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }
}
