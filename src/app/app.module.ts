import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

// flex
import { FlexLayoutModule } from '@angular/flex-layout';
// ngx monaco
import { MonacoEditorModule } from 'ngx-monaco-editor';
// ngx markdown
import { MarkdownModule } from 'ngx-markdown';
// Akita
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import {
  CadmusCoreModule,
  PendingChangesGuard,
  EnvServiceProvider,
} from 'cadmus-core';
import { CadmusUiModule } from 'cadmus-ui';
import { CadmusPartGeneralUiModule } from 'cadmus-part-general-ui';
import { CadmusPartPhilologyUiModule } from 'cadmus-part-philology-ui';
import { HomeComponent } from './home/home.component';
import { CadmusMaterialModule } from 'cadmus-material';
import {
  AuthInterceptor,
  AdminGuardService,
  AuthGuardService,
  EditorGuardService,
} from 'cadmus-api';
// import { FeatureOrthographyFragmentDemoComponent } from './demo/feature-orthography-fragment-demo/feature-orthography-fragment-demo.component';
// import { FeatureNotePartDemoComponent } from './demo/feature-note-part-demo/feature-note-part-demo.component';
// import { FeatureApparatusFragmentDemoComponent } from './demo/feature-apparatus-fragment-demo/feature-apparatus-fragment-demo.component';
// import { FeatureCategoriesPartDemoComponent } from './demo/feature-categories-part-demo/feature-categories-part-demo.component';
// import { FeatureCommentFragmentDemoComponent } from './demo/feature-comment-fragment-demo/feature-comment-fragment-demo.component';
// import { FeatureChronologyFragmentDemoComponent } from './demo/feature-chronology-fragment-demo/feature-chronology-fragment-demo.component';
// import { FeatureHistoricalDatePartDemoComponent } from './demo/feature-historical-date-part-demo/feature-historical-date-part-demo.component';
// import { FeatureKeywordsPartDemoComponent } from './demo/feature-keywords-part-demo/feature-keywords-part-demo.component';
// import { FeatureTiledTextPartDemoComponent } from './demo/feature-tiled-text-part-demo/feature-tiled-text-part-demo.component';
// import { FeatureTokenTextPartDemoComponent } from './demo/feature-token-text-part-demo/feature-token-text-part-demo.component';
// import { FeatureBibliographyPartDemoComponent } from './demo/feature-bibliography-part-demo/feature-bibliography-part-demo.component';
// import { FeatureQuotationsFragmentDemoComponent } from './demo/feature-quotations-fragment-demo/feature-quotations-fragment-demo.component';
import { PART_EDITOR_KEYS } from './part-editor-keys';
import { ITEM_BROWSER_KEYS } from './item-browser-keys';
import { INDEX_LOOKUP_DEFINITIONS } from './index-lookup-definitions';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // FeatureApparatusFragmentDemoComponent,
    // FeatureCategoriesPartDemoComponent,
    // FeatureChronologyFragmentDemoComponent,
    // FeatureCommentFragmentDemoComponent,
    // FeatureHistoricalDatePartDemoComponent,
    // FeatureIndexKeywordsPartDemoComponent,
    // FeatureKeywordsPartDemoComponent,
    // FeatureNotePartDemoComponent,
    // FeatureOrthographyFragmentDemoComponent,
    // FeatureTokenTextPartDemoComponent,
    // FeatureWitnessesFragmentDemoComponent,
    // FeatureTiledTextPartDemoComponent,
    // FeatureIndexKeywordsPartDemoComponent,
    // FeatureBibliographyPartDemoComponent,
    // FeatureQuotationsFragmentDemoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        {
          path: 'login',
          loadChildren: () =>
            import('cadmus-login').then((module) => module.CadmusLoginModule),
        },
        // {
        //   path: 'demo/categories-part',
        //   component: FeatureCategoriesPartDemoComponent,
        //   pathMatch: 'full',
        // },
        // {
        //   path: 'demo/keywords-part',
        //   component: FeatureKeywordsPartDemoComponent,
        //   pathMatch: 'full',
        // },
        // {
        //   path: 'demo/index-keywords-part',
        //   component: FeatureIndexKeywordsPartDemoComponent,
        //   pathMatch: 'full',
        // },
        // {
        //   path: 'demo/note-part',
        //   component: FeatureNotePartDemoComponent,
        //   pathMatch: 'full',
        // },
        // {
        //   path: 'demo/historical-date-part',
        //   component: FeatureHistoricalDatePartDemoComponent,
        //   pathMatch: 'full',
        // },
        // {
        //   path: 'demo/bibliography-part',
        //   component: FeatureBibliographyPartDemoComponent,
        //   pathMatch: 'full',
        // },
        // {
        //   path: 'demo/token-text-part',
        //   component: FeatureTokenTextPartDemoComponent,
        //   pathMatch: 'full',
        // },
        // {
        //   path: 'demo/tiled-text-part',
        //   component: FeatureTiledTextPartDemoComponent,
        //   pathMatch: 'full',
        // },
        // {
        //   path: 'demo/apparatus-fragment',
        //   component: FeatureApparatusFragmentDemoComponent,
        //   pathMatch: 'full',
        // },
        // {
        //   path: 'demo/chronology-fragment',
        //   component: FeatureChronologyFragmentDemoComponent,
        //   pathMatch: 'full',
        // },
        // {
        //   path: 'demo/comment-fragment',
        //   component: FeatureCommentFragmentDemoComponent,
        //   pathMatch: 'full',
        // },
        // {
        //   path: 'demo/orthography-fragment',
        //   component: FeatureOrthographyFragmentDemoComponent,
        //   pathMatch: 'full',
        // },
        // {
        //   path: 'demo/quotations-fragment',
        //   component: FeatureQuotationsFragmentDemoComponent,
        //   pathMatch: 'full',
        // },
        // {
        //   path: 'demo/witnesses-fragment',
        //   component: FeatureWitnessesFragmentDemoComponent,
        //   pathMatch: 'full',
        // },
        // {
        //   path: 'demo/layers',
        //   loadChildren: () =>
        //     import('cadmus-layer-demo').then(
        //       (module) => module.CadmusLayerDemoModule
        //     ),
        // },
        {
          path: 'items',
          loadChildren: () =>
            import('cadmus-item-list').then(
              (module) => module.CadmusItemListModule
            ),
          canActivate: [AuthGuardService],
        },
        {
          path: 'items/:id',
          loadChildren: () =>
            import('cadmus-item-editor').then(
              (module) => module.CadmusItemEditorModule
            ),
          canActivate: [AuthGuardService],
          canDeactivate: [PendingChangesGuard],
        },
        {
          path: 'items/:iid/general',
          loadChildren: () =>
            import('cadmus-part-general-pg').then(
              (module) => module.CadmusPartGeneralPgModule
            ),
          canActivate: [AuthGuardService],
        },
        {
          path: 'items/:iid/philology',
          loadChildren: () =>
            import('cadmus-part-philology-pg').then(
              (module) => module.CadmusPartPhilologyPgModule
            ),
          canActivate: [AuthGuardService],
        },
        {
          path: 'thesauri',
          loadChildren: () =>
            import('cadmus-thesaurus-list').then(
              (module) => module.CadmusThesaurusListModule
            ),
          canActivate: [EditorGuardService],
        },
        {
          path: 'thesauri/:id',
          loadChildren: () =>
            import('cadmus-thesaurus-editor').then(
              (module) => module.CadmusThesaurusEditorModule
            ),
          canActivate: [EditorGuardService],
        },
        {
          path: 'admin',
          loadChildren: () =>
            import('cadmus-admin').then((module) => module.CadmusAdminModule),
          canActivate: [AdminGuardService],
        },
        {
          path: 'user',
          loadChildren: () =>
            import('cadmus-user').then((module) => module.CadmusUserModule),
          canActivate: [AuthGuardService],
        },
        {
          path: 'reset-password',
          loadChildren: () =>
            import('cadmus-reset-password').then(
              (module) => module.CadmusResetPasswordModule
            ),
        },
        {
          path: 'search',
          loadChildren: () =>
            import('cadmus-item-search').then(
              (module) => module.CadmusItemSearchModule
            ),
          canActivate: [AuthGuardService],
        },
        { path: '**', component: HomeComponent },
      ],
      {
        initialNavigation: 'enabled',
        useHash: true,
      }
    ),
    // flex
    FlexLayoutModule,
    // Monaco
    MonacoEditorModule.forRoot(),
    // markdown
    MarkdownModule.forRoot(),
    // Akita
    AkitaNgDevtools.forRoot(),
    // Cadmus
    CadmusCoreModule,
    CadmusMaterialModule,
    CadmusPartGeneralUiModule,
    CadmusPartPhilologyUiModule,
    CadmusUiModule,
  ],
  providers: [
    EnvServiceProvider,
    // parts and fragments type IDs to editor group keys mappings
    // https://github.com/nrwl/nx/issues/208#issuecomment-384102058
    // inject like: @Inject('partEditorKeys') partEditorKeys: PartEditorKeys
    {
      provide: 'partEditorKeys',
      useValue: PART_EDITOR_KEYS,
    },
    // index lookup definitions
    {
      provide: 'indexLookupDefinitions',
      useValue: INDEX_LOOKUP_DEFINITIONS,
    },
    // item browsers IDs to editor keys mappings
    // inject like: @Inject('itemBrowserKeys') itemBrowserKeys: { [key: string]: string }
    {
      provide: 'itemBrowserKeys',
      useValue: ITEM_BROWSER_KEYS,
    },
    // HTTP interceptor
    // https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
