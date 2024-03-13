import { type i18n as I18n, createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

const defaultNS = 'translations';

const resources = {
  en: {
    translations: {
      'datetime.days': ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      'datetime.months': [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      'form.append': 'Append',
      'form.errors.required': 'This field is required',
      'form.errors.unknown': 'Unknown error',
      'form.radio.labels.false': 'False',
      'form.radio.labels.true': 'True',
      'form.remove': 'Remove',
      'form.reset': 'Clear',
      'form.submit': 'Submit',
      'notifications.types.error': 'Error',
      'notifications.types.info': 'Info',
      'notifications.types.success': 'Success',
      'notifications.types.warning': 'Warning',
      'searchBar.placeholder': 'Search...',
      'table.pagination.info': 'Showing {{first}} to {{last}} of {{total}} results',
      'table.pagination.next': 'Next',
      'table.pagination.previous': 'Previous'
    }
  },
  fr: {
    translations: {
      'datetime.days': ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      'datetime.months': [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
      ],
      'form.append': 'Ajouter',
      'form.errors.required': 'Ce champ est obligatoire',
      'form.errors.unknown': 'Erreur inconnue',
      'form.radio.labels.false': 'Faux',
      'form.radio.labels.true': 'Vrai',
      'form.remove': 'Supprimer',
      'form.reset': 'Réinitialiser',
      'form.submit': 'Soumettre',
      'notifications.types.error': 'Erreur',
      'notifications.types.info': 'Attention',
      'notifications.types.success': 'Succès',
      'notifications.types.warning': 'Avertissement',
      'searchBar.placeholder': 'Rechercher...',
      'table.pagination.info': 'Affichage de {{first}} à {{last}} sur {{total}} résultats',
      'table.pagination.next': 'Suivante',
      'table.pagination.previous': 'Précédente'
    }
  }
} as const;

const i18n = createInstance({
  defaultNS,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  resources,
  returnObjects: true,
  supportedLngs: ['en', 'fr']
}) as I18n;

void i18n.use(initReactI18next).init();

export { defaultNS, resources };

export default i18n;
