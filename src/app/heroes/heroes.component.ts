import { Component, OnInit, Input, Output } from '@angular/core';
import {HeroService} from '../hero.service';
import {Hero} from '../models/hero.model'

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes : Hero[];

  constructor(private heroService: HeroService) { 
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);

  }

  add(name: string): void {
    if(!name) {
      return;
    }
    this.heroService.addHero({name} as Hero)
    .subscribe((hero) => {
      this.heroes.push(hero);
    })
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero)
    .subscribe(() => {
      this.heroes = this.heroes.filter((h) => (h!= hero))      
    });
  }

  ngOnInit() {
    this.getHeroes();
  }

}
