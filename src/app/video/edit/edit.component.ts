import { Component, OnInit, OnDestroy, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import IClip from 'src/app/models/clip.models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClipsService } from 'src/app/services/clips.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {
  @Input() activeClip: IClip | null = null
  @Input() modalID= '';
  @Output() update = new EventEmitter()

  clipID = new FormControl('')
  title = new FormControl('',[
    Validators.required,
    Validators.minLength(3)
  ])
  editForm = new FormGroup({
    title: this.title,
    id: this.clipID
  })

  constructor(private modal: ModalService, private clipService: ClipsService) { }


  ngOnInit(): void {
    this.modal.register('editClip')
  }

  ngOnDestroy(): void {
    this.modal.unregister('editClip')
  }

  ngOnChanges(){
    if (!this.activeClip) {
      return
    }
    this.clipID.setValue(this.activeClip.docID)
    this.title.setValue(this.activeClip.title)
  }

  async submit(){
    if (!this.activeClip) {
      return
    }

    try {
      await this.clipService.updateClip(this.clipID.value, this.title.value)
    } catch (error) {
      console.log(error)
      return
    }
    this.activeClip.title = this.title.value
    this.update.emit(this.activeClip)


    setTimeout(()=>{
      this.modal.toggleModal('editClip')
    }, 300)

  }

}
