import { Component, Input, OnChanges, SimpleChange  } from '@angular/core';
import { MembersService } from '../../../members.service';
import { Member } from '../../../models/memberModel';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnChanges{
  @Input() member: Member;
  members: any;
  availableMembers: Array<Member> = [];
  showMember: boolean = false;


  constructor(private membersService: MembersService) { }

  ngOnInit() {
    this.membersService.getMembers().subscribe(members => this.members = members);
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.getValue(changes.member.currentValue);
    
    if (this.availableMembers && this.availableMembers.length === 0) {
      this.showMember = false;
    }
  }

  getValue(string: string) {
    let chara: string = ' ' || ',' || ', ';
    if (string.includes(chara)) {
      let inputMember: string = string;
      let inputMembers: Array<string> = inputMember.split(chara);

      inputMembers.forEach(ele => {
        this.checkMembers(ele);
      });
    } else {
      this.checkMembers(string);
    }
  }

  checkMembers(string: string) {
    console.log(string);
    if (this.members) {
      for (let i = 0; i < this.members.length; i++) {
        if (string === this.members[i].name && !this.availableMembers.includes(this.members[i])) {
          this.availableMembers.push(this.members[i]);
          this.showMember = true;
        }
      }
    }
  }

}
