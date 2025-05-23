import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ClipsService } from '../services/clips.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-clip-list',
  templateUrl: './clip-list.component.html',
  styleUrls: ['./clip-list.component.css'],
  providers: [DatePipe]
})
export class ClipListComponent implements OnInit, OnDestroy {
  @Input() scrollable = true

  constructor(public clipService: ClipsService) {
    this.clipService.getClips()
   }

  ngOnInit(): void {
    if (this.scrollable) {
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  ngOnDestroy(): void {
    if (this.scrollable) {
      window.removeEventListener('scroll', this.handleScroll)
    }

    this.clipService.pageClips = []
  }

  handleScroll = ()=> {
    const {scrollTop, offsetHeight} = document.documentElement
    const {innerHeight} = window

    const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight

    if (bottomOfWindow) {
      this.clipService.getClips()
    }
  }

}
