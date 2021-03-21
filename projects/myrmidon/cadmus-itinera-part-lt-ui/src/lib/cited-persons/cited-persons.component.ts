import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { CitedPerson, PersonName } from '@myrmidon/cadmus-itinera-core';

@Component({
  selector: 'itinera-cited-persons',
  templateUrl: './cited-persons.component.html',
  styleUrls: ['./cited-persons.component.css'],
})
export class CitedPersonsComponent implements OnInit {
  private _persons: CitedPerson[] | undefined;

  public editedPerson: CitedPerson | undefined;

  @Input()
  public get persons(): CitedPerson[] | undefined {
    return this._persons;
  }
  public set persons(value: CitedPerson[] | undefined) {
    this._persons = value;
    this.editedPerson = undefined;
  }

  // languages
  @Input()
  public langEntries: ThesaurusEntry[] | undefined;
  // person-name-tags
  @Input()
  public nameTagEntries: ThesaurusEntry[] | undefined;
  // person-name-types
  @Input()
  public nameTypeEntries: ThesaurusEntry[] | undefined;
  // person-id-tags
  @Input()
  public idTagEntries: ThesaurusEntry[] | undefined;

  @Output()
  public personsChange: EventEmitter<CitedPerson[] | undefined>;

  constructor() {
    this.personsChange = new EventEmitter<CitedPerson[] | undefined>();
  }

  ngOnInit(): void {}

  public editPerson(person: CitedPerson): void {
    this.editedPerson = person;
  }

  public addPerson(): void {
    this.editPerson({
      name: {
        language: 'ita',
        parts: [],
      },
    });
  }

  public onPersonChange(person: CitedPerson): void {
    if (!this.editedPerson) {
      return;
    }
    const i = this.persons.indexOf(this.editedPerson);
    if (i === -1) {
      this.persons.push(person);
    } else {
      this.persons[i] = person;
    }
    this.editedPerson = undefined;
    this.personsChange.emit(this.persons);
  }

  public onPersonEditorClose(): void {
    this.editedPerson = undefined;
  }

  public removePerson(index: number): void {
    this.persons.splice(index, 1);
    this.personsChange.emit(this.persons);
  }

  public movePersonUp(index: number): void {
    if (index < 1) {
      return;
    }
    const Person = this.persons[index];
    this.persons.splice(index, 1);
    this.persons.splice(index - 1, 0, Person);
    this.personsChange.emit(this.persons);
  }

  public movePersonDown(index: number): void {
    if (index + 1 >= this.persons.length) {
      return;
    }
    const Person = this.persons[index];
    this.persons.splice(index, 1);
    this.persons.splice(index + 1, 0, Person);
    this.personsChange.emit(this.persons);
  }

  private getFullName(name?: PersonName): string {
    if (!name) {
      return '';
    }
    const sb: string[] = [];
    for (let i = 0; i < name.parts?.length || 0; i++) {
      sb.push(name.parts[i].value);
    }
    return sb.join(' ');
  }

  public personToString(person: CitedPerson): string {
    return this.getFullName(person.name);
  }
}
