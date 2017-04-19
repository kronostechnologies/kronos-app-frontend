# Migration notes for 1.x.x to 2.x.x

application.js est séparé en plusieurs classes es6. Application, View and EditView, etc.
index.js exporte toutes les classes

- Dépendance sur Promise. Utiliser webpack + babel-polyfill


**Application**
- Migrated to es6
- Implementations sould extends in es6
- Retrait de `_onBeforeFetchView` (équivalent à `_onFetchView`)
- Retrait de `_checkGears`, `initGears` etc...
- Retrait de `registerView()` utiliser les routeur
- `_onViewClose()`  =>  `app.on('viewClose')`
- _webkit, _opera, _msie, _opera, _iPad, _iPod, _iPhone, _blackberry, _palm_pre, _mobile => browser.webkit ...


**View**
- Migrated to es6
- Implementations sould extends in es6
- Takes Application in constructor
- Le contenu des view est maintenant chargé APRÈS le `init()` et le `load()` et comme toujours, avant le `hook()`.  Tout code qui a besoin des parms et du html doit être placé dans le `hook()`
- `init()`, `hook()`, `load()` DOIVENT retourner des objet `Promise`
 `_hook()`, `_load()` PEUVENT retourner des objet `Promise`
`View._init()` n'existe plus.  Extend `init()` à la place

- View extends EventEmitter
- event `load` : Code de load non bloquant pour le chargement de la vue
- event `hook` : Code de hook non bloquant pour le chargement de la vue
- event `close` : Code de close non bloquant pour le chargement de la vue

**EditView**
- event `saveInit` : Avant la sauvegarde et les validations
- event `saveSave`: Début de la sauvegarde réelle (hit xhr)
- event `save`: Succès de sauvegarde. Retourne les info de la sauvegarde
- event `saveEnd`: Catch all pour cleanup.
- EditView.save() ne retourne plus de valeur si la sauvegarde est annulé. Utiliser l'argument cancel_callback
- EditView._onValidateFail n'existe plus
- EditView.validate() retourne une Promise
- Utiliser EditView.initValidateSteps() pour définir la validation par défaut de l'application
- Utiliser EdivView.addValidateStep() pour ajouter une étape. Comme par exemple, un dialoge de validation.
- cancel(), cancelTo() resume(), stop()  - Retiré.  Utiliser le système de promesse du save()
- save() ne prends plus d'argument. Retourne une promesse avec l'état du save.  La navigation doit être faite par l'app dans le then()
- retrait de `_afterSave()`   Utiliser l'évènement `save`
- retrait de `_onCose()`  =>  Utiliser l'évènement `close`
- `_saveBuildPost()`: Retourne maintenant un objet d'option à passer à fetch au lieu de retourner une string de post.

**Removed lib**

- jquery.json-2.3.min.js => npm  jquery-json
- ui.datepicker-fr.js  => npm jquery-ui
- highcharts.js => npm kronostechnologies/highcharts
