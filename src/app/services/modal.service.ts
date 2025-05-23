import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: IModal[] = [];

  constructor() { }

  register(id: string){
    this.modals.push({
      id,
      visible: false
    })
    console.log(this.modals)
  }

  unregister(id: string){
    this.modals = this.modals.filter(
      element => element.id !== id
    )
  }

  isModalVisible(id: string) :boolean{
    return Boolean(this.modals.find(element => element.id === id)?.visible)
  }

  toggleModal(id: string){
    const modal = this.modals.find(element => element.id === id)

    if (modal) {
      modal.visible = !modal.visible;
    }
    // this.visible = !this.visible;
  }
}
