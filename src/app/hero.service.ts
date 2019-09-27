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
  private httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

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
        this.log(`${operation} failed : ${error.message}`);
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

  updateHero(hero : Hero) : Observable<Hero> {
    let url:string = `${this.heroesUrl}/${hero.id}`
    return this.http.put<Hero>(url, hero, this.httpOptions)
    .pipe(
      tap((newHero: Hero) => this.log(`Updated hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('updateHero'))
    );
  }

  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(hero: Hero): Observable<Hero> {
    return this.http.delete<Hero>(`${this.heroesUrl}/${hero.id}`)
    .pipe(
      tap(() => this.log(`deleted hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
}
