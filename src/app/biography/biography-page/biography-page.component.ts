import { Component } from '@angular/core';
import { BiographyCardComponent } from '../biography-card/biography-card.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-biography-page',
  imports: [
    BiographyCardComponent,
    NgForOf
  ],
  templateUrl: './biography-page.component.html',
  styleUrl: './biography-page.component.scss'
})
export class BiographyPageComponent {
  bios = [
    {
      name: 'Cooper Larson',
      description: 'I am a senior Computer Science major at CSU in the general concentration. ' +
        'I am an online student and I live in Erie, Colorado. If I am not coding, I am likely ' +
        'working on my truck, 3D printer, or various side projects.',
      image: 'images/Cooper.jpg',
    },
    {
      name: 'Dominik David',
      description: 'I am a junior computer science major and have been programming for around 12 years ' +
      'since I got into making video games. I also play bass and sing in a band called The Hyms, and ' +
      'enjoy outdoor activities like slacklining, climbing and biking.',
      image: 'images/Dominik.jpg',
    },
    {
      name: 'Spencer Williams',
      description: 'I am a junior computer science major and am relatively new to programming, ' +
      'I also enjoy the gym, riding my motorcycle, and video games. This year I have also taken up skiing.',
      image: 'images/Spencer.jpg',
    },
    {
      name: 'Noah Kivett',
      description: 'I am a Senior computer science student and I have been programming for around 7 years.' +
      'When I am not programming for classes, I am playing any videogame I can get my hands on. Whether its VR, ' +
      'handheld, console, or PC; I enjoy playing and testing new gaming experiences.',
      image: 'images/Noah.png',
    }
  ]
}
