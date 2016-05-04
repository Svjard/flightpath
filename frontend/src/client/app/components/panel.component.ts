import {Component} from 'angular2/core';

@Component({
  selector: 'fp-panel',
  templateUrl: 'app/components/panel.component.html',
  styleUrls: ['app/components/panel.component.css']
})
export class PanelComponent {
  @Input('can-expand') expand: boolean;
  @Input('can-collapse') collapse: boolean;
  @Input('can-remove') remove: boolean;
  @Input() title: string;

  
  
}
