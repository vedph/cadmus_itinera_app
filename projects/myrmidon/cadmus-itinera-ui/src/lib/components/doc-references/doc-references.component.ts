import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThesaurusEntry } from '@myrmidon/cadmus-core';
import { DocReference } from '@myrmidon/cadmus-itinera-core';
import { InplaceEditorBase } from '../inplace-editor-base';

/**
 * In-place editor for a set of DocReference's.
 */
@Component({
  selector: 'cadmus-doc-references',
  templateUrl: './doc-references.component.html',
  styleUrls: ['./doc-references.component.css'],
})
export class DocReferencesComponent
  extends InplaceEditorBase<DocReference[]>
  implements OnInit {
  public references: FormArray;

  @Input()
  public tagEntries: ThesaurusEntry[];
  // TODO other thesauri (author/work)

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  ngOnInit(): void {
    this.references = this.formBuilder.array([]);

    this.initEditor('references', {
      references: this.references,
    });
  }

  private getReferenceGroup(reference?: DocReference): FormGroup {
    return this.formBuilder.group({
      tag: this.formBuilder.control(reference?.tag, [Validators.maxLength(50)]),
      author: this.formBuilder.control(reference?.author, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      work: this.formBuilder.control(reference?.work, [
        Validators.required,
        Validators.maxLength(100),
      ]),
      location: this.formBuilder.control(reference?.location, [
        Validators.maxLength(20),
      ]),
      note: this.formBuilder.control(reference?.note, [
        Validators.maxLength(300),
      ]),
    });
  }

  public addReference(reference?: DocReference): void {
    this.references.push(this.getReferenceGroup(reference));
  }

  public addReferenceBelow(index: number): void {
    this.references.insert(index + 1, this.getReferenceGroup());
  }

  public removeReference(index: number): void {
    this.references.removeAt(index);
  }

  public moveReferenceUp(index: number): void {
    if (index < 1) {
      return;
    }
    const item = this.references.controls[index];
    this.references.removeAt(index);
    this.references.insert(index - 1, item);
  }

  public moveReferenceDown(index: number): void {
    if (index + 1 >= this.references.length) {
      return;
    }
    const item = this.references.controls[index];
    this.references.removeAt(index);
    this.references.insert(index + 1, item);
  }

  protected setModel(value: DocReference[]): void {
    if (!this.references) {
      return;
    }
    if (!value) {
      this.form.reset();
    } else {
      for (const r of value) {
        this.addReference(r);
      }
      this.form.markAsPristine();
    }
  }

  protected getModel(): DocReference[] {
    const references: DocReference[] = [];

    for (let i = 0; i < this.references.length; i++) {
      const g = this.references.controls[i] as FormGroup;
      references.push({
        tag: g.controls.tag.value?.trim(),
        author: g.controls.author.value?.trim(),
        work: g.controls.work.value?.trim(),
        note: g.controls.note.value?.trim(),
      });
    }

    return references;
  }
}
