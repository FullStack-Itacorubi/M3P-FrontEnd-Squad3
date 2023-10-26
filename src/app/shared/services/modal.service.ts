import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  EventEmitter,
  Injectable,
  Type,
  createComponent,
} from '@angular/core';

import { GenericModalComponent } from 'src/app/shared/components/generic-modal/generic-modal.component';
import { IOptionsModal } from '../interfaces/options-modal.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  newModalComponent!: ComponentRef<GenericModalComponent>;
  options!: IOptionsModal | undefined;
  response?: any;
  responseEmitter?: EventEmitter<any>;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) {}

  open<C>(component: Type<C>, options?: IOptionsModal) {
    this.openWithComponent(component);
    this.options = options as IOptionsModal | undefined;
  }

  private openWithComponent(component: Type<unknown>) {
    const newComponent = createComponent(component, {
      environmentInjector: this.injector,
    });

    this.newModalComponent = createComponent(GenericModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [[newComponent.location.nativeElement]],
    });

    document.body.appendChild(this.newModalComponent.location.nativeElement);

    this.appRef.attachView(newComponent.hostView);
    this.appRef.attachView(this.newModalComponent.hostView);
  }

  close() {
    this.newModalComponent.instance.close();
    this.responseEmitter?.emit(this.response);
  }

  setResponse<T>(response: T | null) {
    this.response = response;
  }

  responseObservable<T>() {
    this.responseEmitter = new EventEmitter<T>();
    return this.responseEmitter as EventEmitter<T>;
  }
}
